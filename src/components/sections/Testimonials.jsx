import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../../utils/constants';
import SectionLabel from '../ui/SectionLabel';
import { useCursor } from '../../contexts/CursorContext';

export default function Testimonials() {
  const [curIdx, setCurIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { onMouseEnterInteractive, onMouseLeaveInteractive } = useCursor();

  const total = TESTIMONIALS.length;

  const nextSlide = () => setCurIdx((prev) => (prev + 1) % total);
  const prevSlide = () => setCurIdx((prev) => (prev - 1 + total) % total);

  // Auto-advance every 6 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  const current = TESTIMONIALS[curIdx];

  // Generate 2 initials for avatar
  const initials = current.author
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-head section-head--center">
          <SectionLabel text="Client Perspectives" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 300, color: 'var(--forest)' }}>
            Trusted by Builders & Visionaries.
          </h2>
        </div>

        <div
          className="testi-carousel-shell"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="testi-track-container">
            <div className="testi-slide-card">
              {/* Left Column: Quote & Author */}
              <div>
                <div className="quote-giant-mark">“</div>
                <div className="testi-quote-text">
                  {current.quote}
                </div>

                <div className="testi-author-meta">
                  <div className="testi-avatar-circle">{initials}</div>
                  <div className="testi-author-details">
                    <strong>{current.author}</strong>
                    <small>{current.role} • {current.tag}</small>
                  </div>
                </div>
              </div>

              {/* Right Column: Card with Rating and Highlight */}
              <div className="testi-side-badge">
                <div className="testi-stars-row">
                  {[...Array(current.rating || 5)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--gold)" color="var(--gold)" />
                  ))}
                </div>

                <p className="testi-highlight-p">
                  "{current.highlight}"
                </p>

                <div style={{ margin: '20px 0 16px', height: '1px', background: 'var(--border)' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-mute)', fontWeight: 600 }}>
                  <span>Verified Project</span>
                  <span>2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="testi-controls-row">
            <button
              className="testi-ctrl-arrow-btn"
              onClick={prevSlide}
              aria-label="Previous testimonial"
              onMouseEnter={onMouseEnterInteractive}
              onMouseLeave={onMouseLeaveInteractive}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              className="testi-ctrl-arrow-btn"
              onClick={nextSlide}
              aria-label="Next testimonial"
              onMouseEnter={onMouseEnterInteractive}
              onMouseLeave={onMouseLeaveInteractive}
            >
              <ArrowRight size={18} />
            </button>

            <div className="testi-dots-list">
              {TESTIMONIALS.map((_, i) => (
                <div
                  key={i}
                  className={`testi-dot-item ${i === curIdx ? 'active' : ''}`}
                  onClick={() => setCurIdx(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <span style={{ marginLeft: 'auto', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-mute)', fontWeight: 600 }}>
              {curIdx + 1} of {total} Perspectives
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
