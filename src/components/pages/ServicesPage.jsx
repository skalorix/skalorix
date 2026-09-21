import { useState, useEffect, useMemo } from 'react';
import { Sparkles, Check, ArrowRight, ArrowLeft, ShieldCheck, Clock, Award, Calendar, FileText, Plus } from 'lucide-react';
import { SERVICES, CONTACT_INFO, CREATIVE_INDIVIDUAL_PRICING } from '../../utils/constants';
import SectionLabel from '../ui/SectionLabel';
import { useCursor } from '../../contexts/CursorContext';

const WHATSAPP_NUMBER = CONTACT_INFO.whatsappNumber || '919409410260';

// Crisp inline WhatsApp SVG vector
const WhatsAppIcon = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const openWhatsApp = (message) => {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

export default function ServicesPage({ onNavigate }) {
  const [selectedSlug, setSelectedSlug] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const { onMouseEnterInteractive, onMouseLeaveInteractive } = useCursor();

  // Read URL query param on mount e.g. ?service=web-development
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    if (serviceParam && SERVICES.some((s) => s.slug === serviceParam)) {
      setSelectedSlug(serviceParam);
      setTimeout(() => {
        const el = document.getElementById(serviceParam);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleFilterClick = (slug) => {
    setSelectedSlug(slug);
    const newUrl = slug === 'all' ? '/services' : `/services?service=${slug}`;
    window.history.replaceState(null, '', newUrl);

    if (slug !== 'all') {
      setTimeout(() => {
        const target = document.getElementById(slug);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const filteredServices = useMemo(() => {
    if (selectedSlug === 'all') return SERVICES;
    return SERVICES.filter((s) => s.slug === selectedSlug);
  }, [selectedSlug]);

  const handlePackageInquiry = (serviceName, pkg) => {
    const message = `Hello Skalorix Team,\n\nI am interested in the *${pkg.name}* package under *${serviceName}*.\n• Investment: ${pkg.price} ${pkg.period}\n• Estimated Timeline: ${pkg.timeline}\n\nI would like to discuss our project scope and onboarding steps.\n\nThank you!`;
    openWhatsApp(message);
  };

  const handleIndividualCreativeInquiry = (item) => {
    const message = `Hello Skalorix Team,\n\nI need an individual creative service: *${item.name}* (${item.desc} - ${item.price}).\n\nCould you please share the design turnaround and onboarding steps?\n\nThank you!`;
    openWhatsApp(message);
  };

  const handleBespokeProposal = () => {
    const message = `Hello Skalorix Team,\n\nI would like to request a *Bespoke Custom Proposal* for our business.\n\nHere is an overview of our project requirements:\n- Discipline: [Custom Software / Web Platform / SEO / Branding / Marketing]\n- Target Launch Timeline: \n- Key Goals & Scope: \n\nPlease let me know when we can connect.\n\nThank you!`;
    openWhatsApp(message);
  };

  const handleFreeConsultation = () => {
    window.open(CONTACT_INFO.calBookingUrl, '_blank', 'noopener,noreferrer');
  };


  const FAQS = [
    {
      q: 'How can I schedule a discovery call or consultation?',
      a: 'You can instantly book a 30-minute discovery consultation on our calendar via cal.com/skalorix/30min, or reach out to our team directly on WhatsApp (+91 94094 10260).',
    },
    {
      q: 'How do project payments and milestones work?',
      a: 'We operate on transparent, milestone-based payments. Standard projects follow a 50% kickoff advance and 50% upon final deployment and client sign-off. For enterprise software or retainer packages, we establish modular phase-based sprints.',
    },
    {
      q: 'Can packages be customized for bespoke business requirements?',
      a: 'Absolutely. These packages represent our most proven, market-tested scopes for businesses in Surat, Gujarat, and nationwide. If your project demands custom integrations or unique features, we create a bespoke scope with line-item transparency.',
    },
    {
      q: 'Who retains ownership of the code, designs, and intellectual property?',
      a: 'You retain 100% full intellectual property ownership. Upon final sign-off, all Git repositories, Figma design tokens, vector assets, and production credentials are transferred directly to your organization.',
    },
    {
      q: 'What is the typical delivery timeline?',
      a: 'Starter web platforms launch in 5–7 days; Professional Web platforms in 10–14 days; and custom business software in 20–60 days. Creative retainer designs deliver within 1–3 working days. We commit to strict sprint deadlines with milestone updates.',
    },
    {
      q: 'Is post-launch maintenance and technical support included?',
      a: 'Yes. Every project includes complimentary post-launch support (ranging from 30 days to ongoing assistance depending on tier), covering security updates, bug fixes, performance monitoring, and team training.',
    },
  ];

  return (
    <div className="services-page">
      {/* Header Banner */}
      <section className="services-page__hero">
        <div className="container">
          <div className="services-page__breadcrumb">
            <button
              onClick={() => onNavigate('/')}
              className="services-page__back-btn"
              onMouseEnter={onMouseEnterInteractive}
              onMouseLeave={onMouseLeaveInteractive}
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </button>
            <span className="services-page__breadcrumb-separator">/</span>
            <span className="services-page__breadcrumb-current">Services & Packages</span>
          </div>

          <div className="services-page__hero-content">
            <SectionLabel text="Transparent Value • 2026 Standards" />
            <h1 className="services-page__title">
              Engineered Solutions.{' '}
              <span className="text-italic" style={{ color: 'var(--soft-ochre)' }}>
                Transparent Packages.
              </span>
            </h1>
            <p className="services-page__subtitle">
              Clear deliverables, fixed pricing, and uncompromising craftsmanship built for forward-thinking businesses in Surat, Gujarat, and across India.
            </p>

            {/* Value Highlights Strip */}
            <div className="services-page__trust-strip">
              <div className="trust-pill">
                <ShieldCheck size={16} className="text-ochre" />
                <span>100% Code & Asset Ownership</span>
              </div>
              <div className="trust-pill">
                <Clock size={16} className="text-ochre" />
                <span>Guaranteed Sprint Timelines</span>
              </div>
              <div className="trust-pill">
                <Award size={16} className="text-ochre" />
                <span>No Hidden Agency Markup</span>
              </div>
            </div>
          </div>

          {/* Interactive Discipline Filter Tabs */}
          <div className="services-page__filter-bar">
            <button
              className={`services-filter-pill ${selectedSlug === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterClick('all')}
              onMouseEnter={onMouseEnterInteractive}
              onMouseLeave={onMouseLeaveInteractive}
            >
              All Disciplines ({SERVICES.length})
            </button>
            {SERVICES.map((s) => (
              <button
                key={s.slug}
                className={`services-filter-pill ${selectedSlug === s.slug ? 'active' : ''}`}
                onClick={() => handleFilterClick(s.slug)}
                onMouseEnter={onMouseEnterInteractive}
                onMouseLeave={onMouseLeaveInteractive}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services & Packages List */}
      <main className="services-page__main container">
        {filteredServices.map((service) => (
          <section key={service.slug} id={service.slug} className="service-category-block">
            {/* Category Header */}
            <div className="service-category-head">
              <div className="service-category-meta">
                <span className="service-category-num">DISCIPLINE {service.num}</span>
                <span className="service-category-divider">•</span>
                <span className="service-category-starting">Starting from {service.startingPrice}</span>
              </div>
              <h2 className="service-category-title">{service.name}</h2>
              <p className="service-category-tagline text-italic">{service.tagline}</p>
              <p className="service-category-desc">{service.desc}</p>

              {/* Capabilities checklist pills */}
              <div className="service-category-tags">
                {service.capabilities.map((cap, cIdx) => (
                  <span key={cIdx} className="service-category-tag">
                    <Check size={13} className="text-ochre" />
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* 3-Tier Packages Grid */}
            <div className="packages-grid">
              {service.packages?.map((pkg, pIdx) => {
                const isPopular = pkg.popular;
                return (
                  <div
                    key={pIdx}
                    className={`package-card ${isPopular ? 'package-card--popular' : ''}`}
                  >
                    {isPopular && (
                      <div className="package-popular-badge">
                        <Sparkles size={13} />
                        <span>Most Popular</span>
                      </div>
                    )}

                    <div className="package-card__header">
                      <div className="package-card__top-meta">
                        <span className="package-index">0{pIdx + 1}</span>
                        <span className="package-badge-tag">{pkg.badge}</span>
                      </div>
                      <h3 className="package-name">{pkg.name}</h3>
                      <p className="package-ideal-for">{pkg.idealFor}</p>
                      {pkg.tagline && <div className="package-category-tag">{pkg.tagline}</div>}
                      <div className="package-price-wrap">
                        <span className="package-price">{pkg.price}</span>
                        <span className="package-period">{pkg.period}</span>
                      </div>
                      <div className="package-delivery-time">
                        <Clock size={13} className="package-clock-icon" />
                        <span>Timeline: {pkg.timeline}</span>
                      </div>
                    </div>

                    <div className="package-card__divider" />

                    {/* Feature Inclusions List */}
                    <ul className="package-features-list">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="package-feature-item">
                          <span className="package-check-icon">
                            <Check size={14} />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action CTA with WhatsApp API */}
                    <div className="package-card__footer">
                      <button
                        onClick={() => handlePackageInquiry(service.name, pkg)}
                        className={`btn-pill ${isPopular ? 'btn-primary' : 'btn-outline'} package-cta-btn`}
                        onMouseEnter={onMouseEnterInteractive}
                        onMouseLeave={onMouseLeaveInteractive}
                        title={`Inquire about ${pkg.name} on WhatsApp (+91 94094 10260)`}
                      >
                        <WhatsAppIcon size={16} />
                        <span>Choose {pkg.name}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Popular Creative Individual Pricing Grid (If Creative Services) */}
            {service.slug === 'creative-services' && (
              <div className="creative-individual-section">
                <div className="creative-individual-header">
                  <div className="creative-individual-title-wrap">
                    <span className="creative-individual-pill">POPULAR CREATIVE SERVICES • INDIVIDUAL PRICING</span>
                    <h3 className="creative-individual-title">Need Just One Design? We've Got You Covered.</h3>
                  </div>
                  <p className="creative-individual-subtitle">
                    Fast turnaround, direct designer communication & transparent per-asset pricing.
                  </p>
                </div>
                <div className="creative-individual-grid">
                  {CREATIVE_INDIVIDUAL_PRICING.map((item, idx) => (
                    <div
                      key={idx}
                      className="creative-item-card"
                      onClick={() => handleIndividualCreativeInquiry(item)}
                      onMouseEnter={onMouseEnterInteractive}
                      onMouseLeave={onMouseLeaveInteractive}
                      role="button"
                      tabIndex={0}
                      title={`Order ${item.name} (${item.price}) via WhatsApp`}
                    >
                      <div className="creative-item-info">
                        <div className="creative-item-name">{item.name}</div>
                        <div className="creative-item-desc">{item.desc}</div>
                      </div>
                      <div className="creative-item-price-wrap">
                        <span className="creative-item-price">{item.price}</span>
                        <span className="creative-item-arrow">→</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Bespoke Quote Banner */}
        <div className="bespoke-quote-banner">
          <div className="bespoke-quote-banner__content">
            <span className="bespoke-quote-badge">Custom Tailored Engagements</span>
            <h3>Need a completely customized scope or dedicated monthly development sprint?</h3>
            <p>
              We frequently build bespoke software architectures, hybrid mobile apps, and dedicated multi-discipline teams tailored around exact business workflows in Gujarat and across India.
            </p>
          </div>
          <div className="bespoke-quote-banner__action">
            <div className="bespoke-quote-banner__actions-group">
              <button
                onClick={handleBespokeProposal}
                className="btn-pill btn-primary"
                onMouseEnter={onMouseEnterInteractive}
                onMouseLeave={onMouseLeaveInteractive}
                title="Request Bespoke Proposal via WhatsApp (+91 94094 10260)"
              >
                <WhatsAppIcon size={16} />
                <span>Request Bespoke Proposal</span>
              </button>
              <button
                onClick={handleFreeConsultation}
                className="btn-pill btn-outline bespoke-secondary-btn"
                onMouseEnter={onMouseEnterInteractive}
                onMouseLeave={onMouseLeaveInteractive}
                title="Book 30-Min Discovery Consultation on Cal.com (cal.com/skalorix/30min)"
              >
                <Calendar size={15} />
                <span>Book 30-Min Call</span>
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <section className="services-faq-section">
          <div className="services-faq-header text-center">
            <SectionLabel text="Transparency & Questions" />
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about our collaboration model, delivery standards, and terms.</p>
          </div>

          <div className="services-faq-accordion">
            {FAQS.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className={`faq-item ${isOpen ? 'open' : ''}`}
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                >
                  <div className="faq-question">
                    <h4>{faq.q}</h4>
                    <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                  </div>
                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer Return CTA Strip */}
      <div className="services-page__bottom-bar container">
        <button
          onClick={() => onNavigate('/')}
          className="services-page__back-btn"
          onMouseEnter={onMouseEnterInteractive}
          onMouseLeave={onMouseLeaveInteractive}
        >
          <ArrowLeft size={16} />
          <span>Return to Homepage</span>
        </button>
        <div className="services-page__bottom-actions">
          <button
            onClick={handleFreeConsultation}
            className="btn-pill btn-primary"
            onMouseEnter={onMouseEnterInteractive}
            onMouseLeave={onMouseLeaveInteractive}
            title="Schedule 30-Min Discovery Session on Cal.com (cal.com/skalorix/30min)"
          >
            <Calendar size={16} />
            <span>Schedule Free Consultation</span>
          </button>
          <button
            onClick={() => onNavigate('/#contact')}
            className="btn-pill btn-outline services-contact-direct-btn"
            onMouseEnter={onMouseEnterInteractive}
            onMouseLeave={onMouseLeaveInteractive}
            title="Direct Contact Form"
          >
            <span>Direct Inquiry</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
