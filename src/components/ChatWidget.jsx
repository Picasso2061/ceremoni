import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import './ChatWidget.css';

// ─── Paste your Gemini API key here ───────────────────────────
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
// ──────────────────────────────────────────────────────────────

const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = `You are Ceri, a friendly and knowledgeable AI assistant for Ceremoni — a premium Nigerian wedding and event vendor marketplace. 

Your job is to help customers with:
- Finding the right vendors (photographers, caterers, venues, decor, makeup, MC/entertainment)
- Understanding pricing and what to expect from Nigerian event vendors
- Handling complaints and escalating issues professionally
- Answering questions about bookings, availability, and the planning process
- Giving general event planning advice tailored to Nigerian weddings and burial ceremonies

Tone: warm, professional, and culturally aware of Nigerian event traditions. Keep replies concise (2–4 sentences max unless asked for more detail). Always be helpful and empathetic.`;

const QUICK_REPLIES = [
  '💍 Find a wedding vendor',
  '📅 Check availability',
  '💸 Pricing questions',
  '😞 File a complaint',
  '🎉 Event planning tips',
];

function formatTime(date) {
  return date.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: "Hello! 👋 I'm **Ceri**, your Ceremoni assistant. I'm here to help with vendor recommendations, bookings, complaints, or anything about your event. How can I help you today?",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const historyRef = useRef([]); // Gemini conversation history

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages]);

  const addMessage = (role, text) => {
    const msg = { id: Date.now(), role, text, time: new Date() };
    setMessages(prev => [...prev, msg]);
    return msg;
  };

  const sendToGemini = async (userText) => {
    // Build conversation history
    historyRef.current.push({ role: 'user', parts: [{ text: userText }] });

    const body = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: historyRef.current,
    };

    const res = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`API error ${res.status}`);

    const data = await res.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that. Please try again.";

    // Add model reply to history
    historyRef.current.push({ role: 'model', parts: [{ text: replyText }] });
    return replyText;
  };

  const handleSend = async (text) => {
    const msgText = (text || input).trim();
    if (!msgText || isTyping) return;

    setInput('');
    setHasInteracted(true);
    addMessage('user', msgText);
    setIsTyping(true);

    if (!GEMINI_API_KEY) {
      setTimeout(() => {
        setIsTyping(false);
        addMessage('bot', "⚠️ No API key configured yet. Please add your Gemini API key to the `.env` file as `VITE_GEMINI_API_KEY=your_key_here` and redeploy.");
      }, 800);
      return;
    }

    try {
      const reply = await sendToGemini(msgText);
      setIsTyping(false);
      addMessage('bot', reply);
    } catch (err) {
      setIsTyping(false);
      addMessage('bot', "I'm having trouble connecting right now. Please try again in a moment or contact us directly at support@ceremoni.ng.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Render markdown-like bold text
  const renderText = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );
  };

  return (
    <>
      {/* ── Chat Panel ── */}
      {isOpen && (
        <div className="chat-panel" role="dialog" aria-label="Ceremoni AI Chat" id="chat-panel">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header__avatar">💍</div>
            <div className="chat-header__info">
              <span className="chat-header__name">Ceri — Ceremoni Assistant</span>
              <span className="chat-header__status">Online · Powered by Gemini AI</span>
            </div>
            <button
              className="chat-header__close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              id="chat-close-btn"
            >
              <X size={15} />
            </button>
          </div>

          {/* Quick Replies (show only before first interaction) */}
          {!hasInteracted && (
            <div className="chat-quick-replies" id="chat-quick-replies">
              {QUICK_REPLIES.map(qr => (
                <button
                  key={qr}
                  className="chat-qr-btn"
                  onClick={() => handleSend(qr)}
                >
                  {qr}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="chat-messages" id="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-msg chat-msg--${msg.role}`}>
                <div className="chat-msg__avatar">
                  {msg.role === 'bot' ? '💍' : '👤'}
                </div>
                <div>
                  <div className="chat-msg__bubble">{renderText(msg.text)}</div>
                  <div className="chat-msg__time">{formatTime(msg.time)}</div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="chat-typing">
                <div className="chat-typing__avatar">💍</div>
                <div className="chat-typing__dots">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <textarea
              ref={inputRef}
              className="chat-input"
              rows={1}
              placeholder="Type your message…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              id="chat-input"
              aria-label="Chat message input"
            />
            <button
              className="chat-send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              id="chat-send-btn"
            >
              <Send size={16} />
            </button>
          </div>

          <div className="chat-footer">Ceri may make mistakes · Ceremoni Support</div>
        </div>
      )}

      {/* ── Floating Trigger ── */}
      <button
        className="chat-trigger"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Open support chat"
        id="chat-trigger-btn"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && <span className="chat-trigger__badge">1</span>}
      </button>
    </>
  );
}
