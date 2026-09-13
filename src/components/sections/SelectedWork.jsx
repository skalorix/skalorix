import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../../utils/constants';
import { useCursor } from '../../contexts/CursorContext';
import SectionLabel from '../ui/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWork() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const { onMouseEnterLabeled, onMouseLeaveLabeled } = useCursor();

  const project = PROJECTS[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" id="work">
      <div className="container">
        <SectionLabel text="Selected Work" />

        <h2 style={{ marginBottom: '16px' }}>
          Selected <span className="text-ochre text-italic">Work.</span>
        </h2>
        <p style={{ marginBottom: '56px', maxWidth: '640px' }}>
          Real-world engineering delivered with precision, performance and purposeful mobile design.
        </p>

        {project && (
          <div
            ref={cardRef}
            className="work-featured"
            onMouseEnter={() => onMouseEnterLabeled('SNPIT APP')}
            onMouseLeave={onMouseLeaveLabeled}
          >
            {/* Left Content Column */}
            <div className="work-featured__info">
              <div className="work-featured__badge">
                <span className="work-featured__badge-dot" />
                <span>Featured Project • {project.year}</span>
              </div>

              <h3 className="work-featured__title">{project.name}</h3>

              <div className="work-featured__client">
                {project.client}
              </div>

              <p className="work-featured__desc">
                {project.description}
              </p>

              <div className="work-featured__tags">
                {project.tags?.map((tag, idx) => (
                  <span key={idx} className="work-featured__tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="work-featured__metrics">
                {project.metrics?.map((m, idx) => (
                  <div key={idx} className="work-featured__metric">
                    <span className="work-featured__metric-val">{m.value}</span>
                    <span className="work-featured__metric-lbl">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Column — Interactive Phone Mockup */}
            <div className="work-featured__visual">
              <div className="work-featured__glow" />
              
              <div className="work-mockup-phone">
                {/* Phone Notch */}
                <div className="phone-notch" />

                <div className="phone-screen">
                  {/* Status Bar */}
                  <div className="phone-statusbar">
                    <span>09:41</span>
                    <div className="phone-status-icons">
                      <span>●●●</span>
                      <span>5G</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="phone-header">
                    <div>
                      <div className="phone-badge">CAMPUS PORTAL</div>
                      <div className="phone-title">SNPIT RC</div>
                    </div>
                    <div className="phone-avatar">S</div>
                  </div>

                  {/* Featured Announcement Card */}
                  <div className="phone-card phone-card--hero">
                    <div className="phone-card-lbl">Official Notice</div>
                    <div className="phone-card-txt">
                      Mid-Semester Academic Schedule & Circulars Live
                    </div>
                    <div className="phone-card-footer">
                      <span>Updated 2h ago</span>
                      <span className="phone-card-pill">View PDF</span>
                    </div>
                  </div>

                  {/* Quick Modules Grid */}
                  <div className="phone-grid">
                    <div className="phone-tile">
                      <div className="phone-tile-icon">📅</div>
                      <div className="phone-tile-txt">Timetable</div>
                    </div>
                    <div className="phone-tile">
                      <div className="phone-tile-icon">📊</div>
                      <div className="phone-tile-txt">Attendance</div>
                    </div>
                    <div className="phone-tile">
                      <div className="phone-tile-icon">📚</div>
                      <div className="phone-tile-txt">Syllabus</div>
                    </div>
                    <div className="phone-tile">
                      <div className="phone-tile-icon">🎓</div>
                      <div className="phone-tile-txt">Faculty</div>
                    </div>
                  </div>

                  {/* Campus Feed Item */}
                  <div className="phone-card">
                    <div className="phone-card-lbl">Department Desk</div>
                    <div className="phone-card-sub">
                      Computer Engineering & Institute Resources
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
