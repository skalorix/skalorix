import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowUpRight } from 'lucide-react';
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
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                <div className="service-accordion-desc">
                  {/* Mobile visual image */}
                  <div className="service-mobile-image-wrap">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="service-mobile-image"
                      loading="lazy"
                    />
                  </div>
                  <p>{service.desc}</p>
                  <a href="#contact" className="explore-link">
                    Explore Service <span>→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Sticky Live Preview Visual */}
        <div className="service-visual-sticky">
          <div className="visual-number-watermark">{activeService.num}</div>

          <div className="visual-art-panel">
            {/* Themed Service Background Artwork */}
            <img
              key={activeService.num}
              src={activeService.image}
              alt={activeService.name}
              className="visual-art-image"
            />
            <div className="visual-art-overlay" />

            <div className="visual-art-inner">
              <div className="visual-top-bar">
                <div className="visual-badge-icon">
                  <Sparkles size={18} />
                </div>
                <span className="visual-badge-label">
                  Skalorix Lab • {activeService.num}
                </span>
              </div>

              <div className="visual-meta-content">
                <h4>{activeService.name}</h4>
                <p>{activeService.desc}</p>
                {activeService.tags && (
                  <div className="visual-tags">
                    {activeService.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="visual-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="visual-footer-bar">
            <span className="visual-footer-label">
              Selected Discipline
            </span>
            <span className="visual-footer-count">
              {activeService.num} / 0{SERVICES.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

