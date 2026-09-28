import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, FileText, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import vendors from '../data/vendors';
import './ChatWidget.css';

const QUICK_REPLIES = [
  'Find a vendor for my event',
  'Help me plan my event',
  'Explain vendor pricing',
];

function formatTime(date) {
  return date.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export default function ChatWidget() {
  const { state, dispatch } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ id: 1, role: 'bot', text: "Hello! I'm **Ceri**, Ceremoni's supervised concierge. I can help you find vendors, plan your event, or prepare a quote request for your review.", time: new Date() }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [draftOpen, setDraftOpen] = useState(false);
  const [draft, setDraft] = useState({ vendorId: '', eventDate: state.event.date || '', guestCount: state.event.guestCount || '', specialRequests: '' });
  const [preview, setPreview] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const historyRef = useRef([]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages]);

  const addMessage = (role, text) => {
    const message = { id: Date.now() + Math.random(), role, text, time: new Date() };
    setMessages(previous => [...previous, message]);
  };

  const marketplaceVendors = vendors.map(vendor => ({
    id: vendor.id,
    name: vendor.name,
    category: vendor.category,
    location: vendor.location,
    rating: vendor.rating,
    verified: vendor.verified,
    eventTypes: vendor.eventTypes,
    services: vendor.services,
  }));

  const sendToCeri = async (userText) => {
    const response = await fetch('/api/concierge/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userText,
        history: historyRef.current,
        event: state.event,
        vendors: marketplaceVendors,
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Concierge request failed');
    return data.reply;
  };

  const handleSend = async (text) => {
    const messageText = (text || input).trim();
    if (!messageText || isTyping) return;

    setInput('');
    setHasInteracted(true);
    addMessage('user', messageText);
    setIsTyping(true);
    try {
      const reply = await sendToCeri(messageText);
      historyRef.current = [...historyRef.current, { role: 'user', text: messageText }, { role: 'model', text: reply }].slice(-10);
      addMessage('bot', reply);
    } catch {
      addMessage('bot', "I'm unable to connect right now. You can still prepare a quote request below, or try again shortly.");
    } finally {
      setIsTyping(false);
    }
  };

  const selectedVendor = vendors.find(vendor => vendor.id === draft.vendorId);
  const createPreview = (event) => {
    event.preventDefault();
    if (!selectedVendor || !draft.eventDate || !draft.guestCount) return;
    setPreview({ ...draft, vendor: selectedVendor });
  };

  const sendQuoteRequest = () => {
    if (!preview) return;
    const id = `req${Date.now().toString(36)}`;
    const request = {
      id,
      vendorId: preview.vendor.id,
      clientName: state.user.name,
      clientEmail: state.user.email,
      clientPhone: 'Not provided',
      eventType: state.event.type,
      eventDate: preview.eventDate,
      guestCount: String(preview.guestCount),
      selectedService: 'Quote to be agreed',
      specialRequests: preview.specialRequests,
      status: 'pending',
      createdAt: new Date().toISOString().slice(0, 10),
      aiAssisted: true,
    };
    dispatch({ type: 'ADD_INCOMING_REQUEST', payload: request });
    dispatch({ type: 'ADD_BOOKING', payload: {
      id: `b${Date.now().toString(36)}`,
      vendorId: preview.vendor.id,
      vendorName: preview.vendor.name,
      category: preview.vendor.category,
      eventType: state.event.type,
      eventDate: preview.eventDate,
      status: 'pending',
      totalPrice: 'Quote Pending',
      notes: preview.specialRequests || `${preview.guestCount} guests`,
      createdAt: new Date().toISOString().slice(0, 10),
    } });
    addMessage('bot', `Your quote request for **${preview.vendor.name}** has been sent. The vendor must review it before any booking is confirmed.`);
    setPreview(null);
    setDraftOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="chat-panel" role="dialog" aria-label="Ceremoni Concierge">
          <div className="chat-header">
            <div className="chat-header__avatar">💍</div>
            <div className="chat-header__info">
              <span className="chat-header__name">Ceri — Ceremoni Concierge</span>
              <span className="chat-header__status">Supervised assistance</span>
            </div>
            <button className="chat-header__close" onClick={() => setIsOpen(false)} aria-label="Close chat"><X size={15} /></button>
          </div>

          {!hasInteracted && <div className="chat-quick-replies">
            {QUICK_REPLIES.map(reply => <button key={reply} className="chat-qr-btn" onClick={() => handleSend(reply)}>{reply}</button>)}
          </div>}

          <div className="chat-messages">
            {messages.map(message => <div key={message.id} className={`chat-msg chat-msg--${message.role}`}>
              <div className="chat-msg__avatar">{message.role === 'bot' ? '💍' : '👤'}</div>
              <div><div className="chat-msg__bubble">{message.text.split(/\*\*(.*?)\*\*/g).map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</div><div className="chat-msg__time">{formatTime(message.time)}</div></div>
            </div>)}
            {isTyping && <div className="chat-typing"><div className="chat-typing__avatar">💍</div><div className="chat-typing__dots"><span /><span /><span /></div></div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-supervision-note"><ShieldCheck size={13} /> Ceri never confirms bookings or sends requests without your approval.</div>
          <button className="chat-draft-toggle" onClick={() => { setDraftOpen(value => !value); setPreview(null); }}><FileText size={14} /> Prepare a quote request</button>

          {draftOpen && <form className="chat-quote-form" onSubmit={createPreview}>
            <select value={draft.vendorId} onChange={event => setDraft({ ...draft, vendorId: event.target.value })} required aria-label="Select vendor">
              <option value="">Choose a vendor</option>
              {vendors.filter(vendor => vendor.eventTypes.includes(state.event.type)).map(vendor => <option key={vendor.id} value={vendor.id}>{vendor.name}</option>)}
            </select>
            <div className="chat-quote-form__row"><input type="date" value={draft.eventDate} onChange={event => setDraft({ ...draft, eventDate: event.target.value })} required /><input type="number" min="1" value={draft.guestCount} onChange={event => setDraft({ ...draft, guestCount: event.target.value })} placeholder="Guests" required /></div>
            <textarea value={draft.specialRequests} onChange={event => setDraft({ ...draft, specialRequests: event.target.value })} placeholder="Special requirements (optional)" rows="2" />
            <button className="btn btn-primary btn-sm" type="submit">Review request</button>
          </form>}

          {preview && <div className="chat-request-preview"><strong>Review before sending</strong><span>{preview.vendor.name} · {preview.eventDate} · {preview.guestCount} guests</span>{preview.specialRequests && <span>{preview.specialRequests}</span>}<div><button className="btn btn-outline btn-sm" onClick={() => setPreview(null)}>Edit</button><button className="btn btn-accent btn-sm" onClick={sendQuoteRequest}>Send request</button></div></div>}

          <div className="chat-input-area"><textarea ref={inputRef} className="chat-input" rows={1} placeholder="Ask Ceri about your event…" value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); handleSend(); } }} /><button className="chat-send-btn" onClick={() => handleSend()} disabled={!input.trim() || isTyping} aria-label="Send message"><Send size={16} /></button></div>
          <div className="chat-footer">AI guidance only · Ceremoni support can review exceptions</div>
        </div>
      )}
      <button className="chat-trigger" onClick={() => setIsOpen(open => !open)} aria-label="Open Ceremoni Concierge">{isOpen ? <X size={24} /> : <MessageCircle size={24} />}{!isOpen && <span className="chat-trigger__badge">1</span>}</button>
    </>
  );
}
