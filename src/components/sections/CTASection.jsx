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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission and transition to success state
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
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
  };

  // Pre-formatted mailto draft link for direct email
  const mailtoSubject = encodeURIComponent(`Project Inquiry: ${formData.services.join(', ') || 'General'}`);
  const mailtoBody = encodeURIComponent(
    `Hi Skalorix Team,\n\nName: ${formData.name}\nCompany: ${formData.company}\nPhone: ${formData.phone}\nServices: ${formData.services.join(', ')}\n\nMessage:\n${formData.message}\n`
  );
  const directMailtoHref = `mailto:skalorix.work@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <section ref={sectionRef} className="section section--dark cta-section" id="contact">
      {/* Subtle background pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.03,
          backgroundImage: `radial-gradient(circle at 30% 50%, rgba(212,180,131,0.3) 0%, transparent 50%),
                            radial-gradient(circle at 70% 50%, rgba(212,180,131,0.2) 0%, transparent 40%)`,
        }}
      />

      <div className="cta-section__content">
        <h2 className="cta-section__title">
          Let's Turn Your<br />
          Ideas Into <span className="text-ochre text-italic">Impact.</span>
        </h2>

        <p className="cta-section__subtitle">
          Have an idea, a business or a digital challenge?<br />
          Let's build something meaningful.
        </p>

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
                    placeholder="e.g. Alex Morgan"
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
                    placeholder="e.g. alex@company.com"
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
                    placeholder="e.g. +91 94094 24528"
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
                    placeholder="e.g. Studio Vertex"
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
                    <>Sending Inquiry...</>
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
    </section>
  );
}
