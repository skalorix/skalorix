import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ChevronDown, Check, Clock, ArrowRight } from 'lucide-react';
import { SERVICES } from '../../utils/constants';
import { useCursor } from '../../contexts/CursorContext';
import SectionLabel from '../ui/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeDo() {
  const sectionRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const { onMouseEnterInteractive, onMouseLeaveInteractive } = useCursor();

  const activeService = SERVICES[activeIdx] || SERVICES[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-header-reveal', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="services-section-editorial" id="services">
      <div className="container" style={{ marginTop: '30px' }}>
        <div className="section-head section-head--center services-header-reveal">
          <SectionLabel text="What We Do" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, color: 'var(--forest)' }}>
            Technology That Moves You Forward.
          </h2>
          <p style={{ marginTop: '18px', color: 'var(--text-mute)', fontSize: '17px', lineHeight: 1.7, maxWidth: '680px', margin: '18px auto 0' }}>
            From strategy to execution, we turn complex challenges into meaningful digital solutions. No templates — only purposeful, premium craft.
          </p>
        </div>
      </div>

      <div className="services-shell">
        {/* Left Interactive Accordion List */}
        <div className="services-accordion-list">
          {SERVICES.map((service, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={service.num}
                className={`service-accordion-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => {
                  if (typeof window !== 'undefined' && window.innerWidth > 1024) {
                    setActiveIdx(idx);
                  }
                  onMouseEnterInteractive();
                }}
                onMouseLeave={onMouseLeaveInteractive}
              >
                <div className="service-accordion-top">
                  <span className="service-accordion-num">{service.num}</span>
                  <h3 className="service-accordion-name">{service.name}</h3>
                  <span className="service-accordion-icon">
                    <ChevronDown size={18} strokeWidth={2.2} />
                  </span>
                </div>

                <div className="service-accordion-desc">
                  <p>{service.desc}</p>
                  <a
                    href={`/services?service=${service.slug}`}
                    className="explore-link"
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('navigate', { detail: `/services?service=${service.slug}` }));
                    }}
                  >
                    Explore Service <span>→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Sticky Expanded Details Card (Clean luxury editorial, no mockup image) */}
        <div className="service-visual-sticky service-details-card">
          <div className="visual-number-watermark">{activeService.num}</div>

          <div className="service-details-card__inner">
            {/* Top Bar */}
            <div className="service-details-card__top">
              <div className="visual-top-bar">
                <div className="visual-badge-icon">
                  <Sparkles size={16} />
                </div>
                <span className="visual-badge-label">
                  Discipline • {activeService.num} / 0{SERVICES.length}
                </span>
              </div>
              <span className="service-details-card__price-badge">
                From {activeService.startingPrice}
              </span>
            </div>

            {/* Title & Editorial Description */}
            <div className="service-details-card__header">
              <h3 className="service-details-card__title">{activeService.name}</h3>
              <p className="service-details-card__tagline text-italic">{activeService.tagline}</p>
              <p className="service-details-card__desc">{activeService.desc}</p>
            </div>

            {/* Core Deliverables Matrix */}
            <div className="service-details-card__deliverables">
              <span className="service-details-card__section-label">Core Capabilities & Deliverables</span>
              <ul className="service-details-card__list">
                {activeService.coreDeliverables?.map((item, dIdx) => (
                  <li key={dIdx} className="service-details-card__list-item">
                    <span className="service-check-bullet">
                      <Check size={13} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Value & Delivery Metric Strip */}
            <div className="service-details-card__metrics-strip">
              <div className="metric-cell">
                <Clock size={14} className="text-ochre" />
                <span>{activeService.timeline}</span>
              </div>
              <div className="metric-cell">
                <Sparkles size={14} className="text-ochre" />
                <span>{activeService.metricsHighlight}</span>
              </div>
            </div>

            {/* Technology & Standards Stack */}
            {activeService.tags && (
              <div className="service-details-card__tags">
                {activeService.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="visual-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action CTA to View All Packages */}
            <div className="service-details-card__action">
              <a
                href={`/services?service=${activeService.slug}`}
                className="btn-pill btn-primary service-card-main-cta"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('navigate', { detail: `/services?service=${activeService.slug}` }));
                }}
                onMouseEnter={onMouseEnterInteractive}
                onMouseLeave={onMouseLeaveInteractive}
              >
                <span>Explore Packages & Pricing</span>
                <ArrowRight size={15} />
              </a>
              <span className="service-card-cta-hint">
                3 Structured Tiers • Full Source Code & Asset Ownership
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

