import { useState } from 'react';
import {
  Building2, FileText, Image, ShieldCheck, CheckCircle2,
  ArrowRight, ArrowLeft, Upload, Plus, Trash2, Check
} from 'lucide-react';
import categories from '../data/categories';
import './VendorRegisterPage.css';

const steps = [
  { icon: Building2, label: 'Business Info' },
  { icon: FileText, label: 'Services' },
  { icon: Image, label: 'Portfolio' },
  { icon: ShieldCheck, label: 'Verification' },
  { icon: CheckCircle2, label: 'Review' },
];

const initialForm = {
  businessName: '',
  category: '',
  location: '',
  description: '',
  phone: '',
  email: '',
  eventTypes: [],
  services: [{ name: '', price: '' }],
  portfolioCount: 0,
  verificationDoc: '',
  agreeTerms: false,
};

export default function VendorRegisterPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleEventType = (type) => {
    setForm(prev => ({
      ...prev,
      eventTypes: prev.eventTypes.includes(type)
        ? prev.eventTypes.filter(t => t !== type)
        : [...prev.eventTypes, type],
    }));
  };

  const addService = () => {
    setForm(prev => ({
      ...prev,
      services: [...prev.services, { name: '', price: '' }],
    }));
  };

  const removeService = (index) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const updateService = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      ),
    }));
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 0) {
      if (!form.businessName.trim()) newErrors.businessName = 'Business name is required';
      if (!form.category) newErrors.category = 'Please select a category';
      if (!form.location.trim()) newErrors.location = 'Location is required';
      if (!form.description.trim()) newErrors.description = 'Description is required';
      if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!form.email.trim()) newErrors.email = 'Email is required';
      if (form.eventTypes.length === 0) newErrors.eventTypes = 'Select at least one event type';
    }

    if (currentStep === 1) {
      const validServices = form.services.filter(s => s.name.trim() && s.price.trim());
      if (validServices.length === 0) newErrors.services = 'Add at least one service with name and price';
    }

    if (currentStep === 3) {
      if (!form.verificationDoc) newErrors.verificationDoc = 'Please select a document type';
    }

    if (currentStep === 4) {
      if (!form.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep === 4) {
        setSubmitted(true);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  if (submitted) {
    return (
      <div className="vrp-success" id="registration-success">
        <div className="vrp-success__card animate-scale-in">
          <div className="vrp-success__checkmark">
            <svg viewBox="0 0 52 52" className="vrp-success__svg">
              <circle className="vrp-success__circle" cx="26" cy="26" r="25" fill="none" />
              <path className="vrp-success__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <h2>Application Submitted!</h2>
          <p>
            Thank you, <strong>{form.businessName}</strong>! Your vendor application has been
            received. Our team will review your details and get back to you within 2-3 business days.
          </p>
          <div className="vrp-success__ref">
            Reference: <strong>CM-{Date.now().toString(36).toUpperCase()}</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vendor-register-page">
      <section className="vrp-header" id="register-header">
        <div className="container">
          <h1 className="vrp-header__title animate-fade-in-up">Join CereMoni as a Vendor</h1>
          <p className="vrp-header__subtitle animate-fade-in-up animate-delay-1">
            Reach thousands of clients planning weddings and ceremonies
          </p>
        </div>
      </section>

      <div className="container vrp-body">
        {/* ── Step Indicator ── */}
        <div className="vrp-steps" id="step-indicator">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`vrp-step ${i === currentStep ? 'vrp-step--active' : ''} ${i < currentStep ? 'vrp-step--done' : ''}`}
            >
              <div className="vrp-step__icon">
                {i < currentStep ? <Check size={18} /> : <step.icon size={18} />}
              </div>
              <span className="vrp-step__label">{step.label}</span>
              {i < steps.length - 1 && <div className="vrp-step__connector" />}
            </div>
          ))}
        </div>

        {/* ── Form Content ── */}
        <div className="vrp-form-card animate-fade-in-up" id="registration-form">
          {/* Step 0: Business Info */}
          {currentStep === 0 && (
            <div className="vrp-form-step">
              <h2>Business Information</h2>
              <p className="vrp-form-step__desc">Tell us about your business</p>

              <div className="vrp-form-grid">
                <div className="form-group">
                  <label className="form-label">Business Name *</label>
                  <input
                    type="text"
                    className={`form-input ${errors.businessName ? 'form-input--error' : ''}`}
                    value={form.businessName}
                    onChange={(e) => updateForm('businessName', e.target.value)}
                    placeholder="e.g. Royal Events Studio"
                    id="input-business-name"
                  />
                  {errors.businessName && <span className="form-error">{errors.businessName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className={`form-select ${errors.category ? 'form-input--error' : ''}`}
                    value={form.category}
                    onChange={(e) => updateForm('category', e.target.value)}
                    id="input-category"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  {errors.category && <span className="form-error">{errors.category}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Location *</label>
                  <input
                    type="text"
                    className={`form-input ${errors.location ? 'form-input--error' : ''}`}
                    value={form.location}
                    onChange={(e) => updateForm('location', e.target.value)}
                    placeholder="e.g. Lagos, Nigeria"
                    id="input-location"
                  />
                  {errors.location && <span className="form-error">{errors.location}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input
                    type="tel"
                    className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                    value={form.phone}
                    onChange={(e) => updateForm('phone', e.target.value)}
                    placeholder="+234 800 000 0000"
                    id="input-phone"
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                    value={form.email}
                    onChange={(e) => updateForm('email', e.target.value)}
                    placeholder="you@business.com"
                    id="input-email"
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group vrp-full-width">
                  <label className="form-label">Event Types *</label>
                  <div className="vlp-filter-chips">
                    <button
                      type="button"
                      className={`vlp-chip ${form.eventTypes.includes('wedding') ? 'vlp-chip--active' : ''}`}
                      onClick={() => toggleEventType('wedding')}
                    >💍 Wedding</button>
                    <button
                      type="button"
                      className={`vlp-chip ${form.eventTypes.includes('burial') ? 'vlp-chip--active' : ''}`}
                      onClick={() => toggleEventType('burial')}
                    >🕊️ Burial</button>
                  </div>
                  {errors.eventTypes && <span className="form-error">{errors.eventTypes}</span>}
                </div>

                <div className="form-group vrp-full-width">
                  <label className="form-label">Business Description *</label>
                  <textarea
                    className={`form-textarea ${errors.description ? 'form-input--error' : ''}`}
                    value={form.description}
                    onChange={(e) => updateForm('description', e.target.value)}
                    placeholder="Describe your services, experience, and what makes you unique..."
                    id="input-description"
                  />
                  {errors.description && <span className="form-error">{errors.description}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Services & Pricing */}
          {currentStep === 1 && (
            <div className="vrp-form-step">
              <h2>Services & Pricing</h2>
              <p className="vrp-form-step__desc">List your services and their prices</p>

              <div className="vrp-services-list">
                {form.services.map((svc, i) => (
                  <div key={i} className="vrp-service-row">
                    <input
                      type="text"
                      className="form-input"
                      value={svc.name}
                      onChange={(e) => updateService(i, 'name', e.target.value)}
                      placeholder="Service name"
                    />
                    <input
                      type="text"
                      className="form-input vrp-service-price"
                      value={svc.price}
                      onChange={(e) => updateService(i, 'price', e.target.value)}
                      placeholder="₦ Price"
                    />
                    {form.services.length > 1 && (
                      <button
                        type="button"
                        className="vrp-service-remove"
                        onClick={() => removeService(i)}
                        aria-label="Remove service"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {errors.services && <span className="form-error">{errors.services}</span>}
              <button type="button" className="btn btn-ghost vrp-add-service" onClick={addService}>
                <Plus size={16} />
                Add Another Service
              </button>
            </div>
          )}

          {/* Step 2: Portfolio */}
          {currentStep === 2 && (
            <div className="vrp-form-step">
              <h2>Portfolio</h2>
              <p className="vrp-form-step__desc">Showcase your best work (simulated upload)</p>

              <div className="vrp-upload-zone" id="portfolio-upload">
                <Upload size={40} />
                <h3>Drag & Drop Photos Here</h3>
                <p>or click to browse</p>
                <span className="vrp-upload-note">PNG, JPG up to 10MB • Max 20 photos</span>
                <button
                  type="button"
                  className="btn btn-outline vrp-upload-btn"
                  onClick={() => updateForm('portfolioCount', form.portfolioCount + 3)}
                >
                  Simulate Upload (3 Photos)
                </button>
              </div>

              {form.portfolioCount > 0 && (
                <div className="vrp-upload-preview">
                  {Array.from({ length: form.portfolioCount }, (_, i) => (
                    <div key={i} className="vrp-upload-thumb">
                      <div className="vrp-upload-thumb__placeholder" />
                      <Check size={14} />
                    </div>
                  ))}
                </div>
              )}
              <p className="vrp-upload-status">
                {form.portfolioCount > 0
                  ? `${form.portfolioCount} photo${form.portfolioCount > 1 ? 's' : ''} uploaded`
                  : 'No photos uploaded yet (optional)'}
              </p>
            </div>
          )}

          {/* Step 3: Verification */}
          {currentStep === 3 && (
            <div className="vrp-form-step">
              <h2>Verification Documents</h2>
              <p className="vrp-form-step__desc">Help us verify your business identity</p>

              <div className="form-group">
                <label className="form-label">Document Type *</label>
                <select
                  className={`form-select ${errors.verificationDoc ? 'form-input--error' : ''}`}
                  value={form.verificationDoc}
                  onChange={(e) => updateForm('verificationDoc', e.target.value)}
                  id="input-verification-doc"
                >
                  <option value="">Select document type</option>
                  <option value="cac">CAC Registration Certificate</option>
                  <option value="tax">Tax Identification Number (TIN)</option>
                  <option value="id">National ID / Passport</option>
                  <option value="license">Business License</option>
                </select>
                {errors.verificationDoc && <span className="form-error">{errors.verificationDoc}</span>}
              </div>

              <div className="vrp-upload-zone vrp-upload-zone--small">
                <Upload size={24} />
                <p>Upload your document (simulated)</p>
                <button type="button" className="btn btn-outline btn-sm">
                  Choose File
                </button>
              </div>

              <div className="vrp-verify-note">
                <ShieldCheck size={16} />
                <span>Your documents are encrypted and stored securely. Verification typically takes 1-2 business days.</span>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="vrp-form-step">
              <h2>Review & Submit</h2>
              <p className="vrp-form-step__desc">Please review your application details</p>

              <div className="vrp-review-section">
                <h3>Business Info</h3>
                <div className="vrp-review-grid">
                  <div className="vrp-review-item">
                    <span className="vrp-review-label">Business Name</span>
                    <span className="vrp-review-value">{form.businessName || '—'}</span>
                  </div>
                  <div className="vrp-review-item">
                    <span className="vrp-review-label">Category</span>
                    <span className="vrp-review-value">
                      {categories.find(c => c.id === form.category)?.name || '—'}
                    </span>
                  </div>
                  <div className="vrp-review-item">
                    <span className="vrp-review-label">Location</span>
                    <span className="vrp-review-value">{form.location || '—'}</span>
                  </div>
                  <div className="vrp-review-item">
                    <span className="vrp-review-label">Phone</span>
                    <span className="vrp-review-value">{form.phone || '—'}</span>
                  </div>
                  <div className="vrp-review-item">
                    <span className="vrp-review-label">Email</span>
                    <span className="vrp-review-value">{form.email || '—'}</span>
                  </div>
                  <div className="vrp-review-item">
                    <span className="vrp-review-label">Event Types</span>
                    <span className="vrp-review-value">
                      {form.eventTypes.map(t => t === 'wedding' ? '💍 Wedding' : '🕊️ Burial').join(', ') || '—'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="vrp-review-section">
                <h3>Services ({form.services.filter(s => s.name).length})</h3>
                {form.services.filter(s => s.name).map((svc, i) => (
                  <div key={i} className="vrp-review-service">
                    <span>{svc.name}</span>
                    <span>{svc.price}</span>
                  </div>
                ))}
              </div>

              <div className="vrp-review-section">
                <h3>Portfolio</h3>
                <p>{form.portfolioCount} photos uploaded</p>
              </div>

              <div className="vrp-review-section">
                <h3>Verification</h3>
                <p>{form.verificationDoc ? `Document type: ${form.verificationDoc.toUpperCase()}` : 'No document selected'}</p>
              </div>

              <label className="vrp-terms-check" id="terms-checkbox">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => updateForm('agreeTerms', e.target.checked)}
                />
                <span>
                  I agree to the CereMoni <a href="#">Terms of Service</a> and <a href="#">Vendor Agreement</a>
                </span>
              </label>
              {errors.agreeTerms && <span className="form-error">{errors.agreeTerms}</span>}
            </div>
          )}

          {/* ── Navigation ── */}
          <div className="vrp-form-nav">
            {currentStep > 0 && (
              <button type="button" className="btn btn-outline" onClick={handleBack} id="btn-back">
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            <button
              type="button"
              className="btn btn-accent btn-lg"
              onClick={handleNext}
              id="btn-next"
            >
              {currentStep === 4 ? 'Submit Application' : 'Continue'}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
