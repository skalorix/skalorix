import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '../../contexts/CursorContext';

gsap.registerPlugin(ScrollTrigger);

const SERVICES_LIST = [
  'Website Development',
  'Software Development',
  'SEO',
  'Creative Services',
  'Social Media Marketing',
  'Social Media Management',
];

export default function CTASection() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const { onMouseEnterInteractive, onMouseLeaveInteractive } = useCursor();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    services: [],
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.from('.cta-section__title', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
      });

      tl.from('.cta-section__subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4');

      tl.from(formRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
      }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleService = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult('Sending....');

    try {
      const data = new FormData(e.target);

      // Web3Forms access key
      data.set('access_key', '56b874db-83ff-4656-97b5-23473abc545b');

      // Controlled state values
      data.set('name', formData.name);
      data.set('email', formData.email);
      data.set('phone', formData.phone || 'Not provided');
      data.set('company', formData.company || 'Not provided');
      data.set('services', formData.services.length > 0 ? formData.services.join(', ') : 'General Inquiry');
      data.set('message', formData.message);

      // Email routing & branding
      data.set('subject', `New Project Inquiry from ${formData.name || 'Client'} - ${formData.services.join(', ') || 'General'}`);
      data.set('from_name', 'Skalorix Website Inquiries');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });

      const resData = await response.json();

      if (resData.success) {
        setIsSubmitted(true);
        setResult('Form Submitted Successfully');
      } else {
        setResult(resData.message || 'Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Web3Forms error:', error);
      setResult('Something went wrong. Please check your connection or email us directly at skalorix.work@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      services: [],
      message: '',
    });
    setIsSubmitted(false);
    setResult('');
  };

  // Pre-formatted mailto draft link for direct email
  const mailtoSubject = encodeURIComponent(`Project Inquiry: ${formData.services.join(', ') || 'General'}`);
  const mailtoBody = encodeURIComponent(
    `Hi Skalorix Team,\n\nName: ${formData.name}\nCompany: ${formData.company}\nPhone: ${formData.phone}\nServices: ${formData.services.join(', ')}\n\nMessage:\n${formData.message}\n`
  );
  const directMailtoHref = `mailto:skalorix.work@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <section ref={sectionRef} className="cta-section-editorial" id="contact">
      <div className="container">
        {/* Subtle background luxury glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.05,
            pointerEvents: 'none',
            backgroundImage: `radial-gradient(circle at 25% 40%, rgba(197,166,122,0.4) 0%, transparent 60%),
                              radial-gradient(circle at 80% 60%, rgba(197,166,122,0.3) 0%, transparent 50%)`,
          }}
        />

        <div className="cta-section__content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-head--center" style={{ marginBottom: 0 }}>
          <h2 className="cta-section__title" style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 1.05, color: 'var(--ivory)' }}>
            Ready to Build<br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>What's Next?</em>
          </h2>

          <p className="cta-section__subtitle" style={{ fontSize: '17px', lineHeight: 1.7, color: 'rgba(253,251,246,0.72)', maxWidth: '540px', margin: '20px auto 32px' }}>
            Have a project in mind, a business to scale, or a digital challenge? Let's build something meaningful together.
          </p>
          </div>

          {/* Response Badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '13px', color: 'rgba(253,251,246,0.7)', marginBottom: '40px', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--gold-light)' }} />
              Response in 24h
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--gold-light)' }} />
              Global • Remote-friendly
            </span>
          </div>

        <div ref={formRef} className="cta-form">
          {isSubmitted ? (
            <div className="cta-form__success">
              <div className="cta-form__success-icon">✓</div>
              <h3 className="cta-form__success-title">Message Received!</h3>
              <p className="cta-form__success-text">
                Thank you, <strong style={{ color: 'var(--soft-ochre)' }}>{formData.name || 'there'}</strong>! We have received your project details. A Skalorix strategist will review your inquiry and reach out at{' '}
                <strong style={{ color: 'var(--soft-ochre)' }}>{formData.email || 'your email'}</strong> within 24 hours.
              </p>
              {formData.services.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '8px' }}>
                  {formData.services.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: '0.75rem',
                        padding: '4px 12px',
                        background: 'rgba(212,180,131,0.15)',
                        border: '1px solid var(--soft-ochre)',
                        borderRadius: '12px',
                        color: 'var(--soft-ochre)',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              <button
                type="button"
                className="cta-form__reset-btn"
                onClick={handleReset}
                onMouseEnter={onMouseEnterInteractive}
                onMouseLeave={onMouseLeaveInteractive}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate={false}>
              {/* Web3Forms Hidden Configuration Fields */}
              <input type="hidden" name="access_key" value="56b874db-83ff-4656-97b5-23473abc545b" />
              <input type="hidden" name="subject" value={`New Project Inquiry from ${formData.name || 'Client'} - ${formData.services.join(', ') || 'General'}`} />
              <input type="hidden" name="from_name" value="Skalorix Website Inquiries" />
              <input type="hidden" name="services" value={formData.services.join(', ')} />
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              {/* Row 1: Name & Email */}
              <div className="cta-form__grid">
                <div className="cta-form__group">
                  <label htmlFor="cta-name" className="cta-form__label">
                    Your Name *
                  </label>
                  <input
                    id="cta-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Firstname Lastname"
                    value={formData.name}
                    onChange={handleChange}
                    className="cta-form__input"
                    onMouseEnter={onMouseEnterInteractive}
                    onMouseLeave={onMouseLeaveInteractive}
                  />
                </div>

                <div className="cta-form__group">
                  <label htmlFor="cta-email" className="cta-form__label">
                    Email Address *
                  </label>
                  <input
                    id="cta-email"
                    name="email"
                    type="email"
                    required
                    placeholder="e.g. xyz@abc.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="cta-form__input"
                    onMouseEnter={onMouseEnterInteractive}
                    onMouseLeave={onMouseLeaveInteractive}
                  />
                </div>
              </div>

              {/* Row 2: Phone & Company */}
              <div className="cta-form__grid">
                <div className="cta-form__group">
                  <label htmlFor="cta-phone" className="cta-form__label">
                    Phone Number
                  </label>
                  <input
                    id="cta-phone"
                    name="phone"
                    type="tel"
                    placeholder="e.g. +91 1234567890"
                    value={formData.phone}
                    onChange={handleChange}
                    className="cta-form__input"
                    onMouseEnter={onMouseEnterInteractive}
                    onMouseLeave={onMouseLeaveInteractive}
                  />
                </div>

                <div className="cta-form__group">
                  <label htmlFor="cta-company" className="cta-form__label">
                    Company / Organization
                  </label>
                  <input
                    id="cta-company"
                    name="company"
                    type="text"
                    placeholder="e.g. Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    className="cta-form__input"
                    onMouseEnter={onMouseEnterInteractive}
                    onMouseLeave={onMouseLeaveInteractive}
                  />
                </div>
              </div>

              {/* Services Selector Chips */}
              <div className="cta-form__services">
                <span className="cta-form__services-label">I'm interested in:</span>
                <div className="cta-form__chips">
                  {SERVICES_LIST.map((service) => {
                    const isSelected = formData.services.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        className={`cta-form__chip ${isSelected ? 'cta-form__chip--active' : ''}`}
                        onClick={() => toggleService(service)}
                        onMouseEnter={onMouseEnterInteractive}
                        onMouseLeave={onMouseLeaveInteractive}
                        aria-pressed={isSelected}
                      >
                        <span>{isSelected ? '✓ ' : '+ '}</span>
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div className="cta-form__group">
                <label htmlFor="cta-message" className="cta-form__label">
                  Project Details / Vision *
                </label>
                <textarea
                  id="cta-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your challenges, goals, timeline, or scope..."
                  value={formData.message}
                  onChange={handleChange}
                  className="cta-form__textarea"
                  onMouseEnter={onMouseEnterInteractive}
                  onMouseLeave={onMouseLeaveInteractive}
                />
              </div>

              {/* Error Alert Display */}
              {result && !isSubmitted && result !== 'Sending....' && (
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.35)',
                    color: '#FCA5A5',
                    fontSize: '13.5px',
                    lineHeight: 1.45,
                    marginBottom: '20px',
                    textAlign: 'center',
                  }}
                >
                  {result}
                </div>
              )}

              {/* Submit Row */}
              <div className="cta-form__submit-row">
                <div className="cta-form__direct-link">
                  <span>Direct contact:</span>
                  <a
                    href={directMailtoHref}
                    onMouseEnter={onMouseEnterInteractive}
                    onMouseLeave={onMouseLeaveInteractive}
                  >
                    skalorix.work@gmail.com
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cta-form__submit-btn"
                  onMouseEnter={onMouseEnterInteractive}
                  onMouseLeave={onMouseLeaveInteractive}
                >
                  {isSubmitting ? (
                    <>Sending Message...</>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span style={{ fontSize: '1.15em' }}>→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  </section>
);
}
