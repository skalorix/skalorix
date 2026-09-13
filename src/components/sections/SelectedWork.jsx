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
  const { onMouseEnterInteractive, onMouseLeaveInteractive } = useCursor();

  const project = PROJECTS[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.9,
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
    <section ref={sectionRef} className="section" id="work" style={{ background: 'var(--ivory)' }}>
      <div className="container">
        <div className="section-head section-head--center">
          <SectionLabel text="Selected Work" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, color: 'var(--forest)' }}>
            Real Projects. Real Impact.
          </h2>
          <p style={{ marginTop: '16px', color: 'var(--text-mute)', fontSize: '17px', lineHeight: 1.7, maxWidth: '640px', margin: '16px auto 0' }}>
            Featured official case study crafted to show how we think, engineer, and deliver — with clarity and premium attention to detail.
          </p>
        </div>

        {project && (
          <div
            ref={cardRef}
            className="work-card-editorial"
          >
            {/* Left Content Column */}
            <div className="work-content-editorial">
              <div className="work-category-eyebrow">
                {project.category}
              </div>

              <h3>{project.name}</h3>

              <div style={{ fontSize: '14px', color: 'var(--gold-deep)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '14px' }}>
                Client: {project.client}
              </div>

              <p>{project.description}</p>

              {/* Quick Stats Strip */}
              <div className="work-stats-strip">
                {project.metrics?.map((m, idx) => (
                  <div key={idx}>
                    <small>{m.label}</small>
                    <strong>{m.value}</strong>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {project.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '11px',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      background: 'var(--ivory-2)',
                      border: '1px solid var(--border)',
                      color: 'var(--forest)',
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a href="#contact" className="explore-link">
                Discuss A Similar Project
              </a>
            </div>

            {/* Right Media Preview Column: Realistic Flagship Android Smartphone Mockup */}
            <div className="work-media-preview">
              <div className="phone-showcase-aura" />

              {/* Floating App Feature Badges */}
              <div className="floating-app-badge floating-app-badge--top">
                <span className="badge-pulse" />
                <span>Native Android • Kotlin</span>
              </div>

              <div className="floating-app-badge floating-app-badge--bottom">
                <span style={{ color: 'var(--gold)' }}>★</span>
                <span>Campus ERP & Notices</span>
              </div>

              {/* Flagship Android Smartphone Chassis */}
              <div className="phone-device">
                {/* Physical Hardware Buttons */}
                <div className="phone-btn phone-btn--volume-up" />
                <div className="phone-btn phone-btn--volume-down" />
                <div className="phone-btn phone-btn--power" />

                {/* Speaker Earpiece Slit */}
                <div className="phone-speaker" />

                {/* OLED Display Screen */}
                <div className="phone-screen">
                  {/* Android Status Bar */}
                  <div className="android-status-bar">
                    <span className="status-time">09:41</span>

                    {/* Centered Punch-hole Selfie Camera */}
                    <div className="camera-punchhole">
                      <div className="camera-lens-glint" />
                    </div>

                    <div className="status-icons">
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
                        <rect x="0" y="7" width="2" height="3" rx="0.5" />
                        <rect x="3" y="5" width="2" height="5" rx="0.5" />
                        <rect x="6" y="3" width="2" height="7" rx="0.5" />
                        <rect x="9" y="0" width="2" height="10" rx="0.5" />
                      </svg>
                      <span className="network-type">5G</span>
                      <div className="battery-icon">
                        <div className="battery-level" />
                      </div>
                    </div>
                  </div>

                  {/* App Native Header */}
                  <div className="app-header">
                    <div className="app-brand-row">
                      <div className="app-college-crest">S</div>
                      <div className="app-college-info">
                        <div className="app-college-name">SNPIT & RC</div>
                        <div className="app-portal-sub">Student Campus App</div>
                      </div>
                      <div className="app-notification-btn">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        <span className="notification-dot" />
                      </div>
                    </div>

                    {/* Student Profile Greeting */}
                    <div className="student-profile-chip">
                      <div className="student-avatar-ring">🎓</div>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.2 }}>Aditya Vani</div>
                        <div style={{ fontSize: '9px', color: 'var(--gold-light)' }}>Computer Science • Sem VI</div>
                      </div>
                    </div>
                  </div>

                  {/* App Content Body */}
                  <div className="app-body-content">
                    {/* Live Circular Card */}
                    <div className="app-notice-card">
                      <div className="notice-card-tag">
                        <span className="notice-live-dot" />
                        OFFICIAL NOTICE
                      </div>
                      <div className="notice-card-headline">
                        Mid-Semester Examination Schedules & Room Allocations
                      </div>
                      <div className="notice-card-footer">
                        <span>Updated Today, 08:30 AM</span>
                        <span className="notice-link">View PDF →</span>
                      </div>
                    </div>

                    {/* 4 Core Quick Services Grid */}
                    <div className="app-modules-title">QUICK SERVICES</div>
                    <div className="app-modules-grid">
                      <div className="module-tile">
                        <div className="module-icon-wrap" style={{ background: 'rgba(197, 166, 122, 0.15)', color: 'var(--gold-light)' }}>
                          📅
                        </div>
                        <div className="module-info">
                          <strong>Timetable</strong>
                          <span>Daily Schedule</span>
                        </div>
                      </div>

                      <div className="module-tile">
                        <div className="module-icon-wrap" style={{ background: 'rgba(39, 201, 63, 0.15)', color: '#4ADE80' }}>
                          📊
                        </div>
                        <div className="module-info">
                          <strong>Attendance</strong>
                          <span>89.4% Safe</span>
                        </div>
                      </div>

                      <div className="module-tile">
                        <div className="module-icon-wrap" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' }}>
                          📚
                        </div>
                        <div className="module-info">
                          <strong>Syllabus</strong>
                          <span>Curriculum</span>
                        </div>
                      </div>

                      <div className="module-tile">
                        <div className="module-icon-wrap" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#C084FC' }}>
                          🎓
                        </div>
                        <div className="module-info">
                          <strong>Faculty</strong>
                          <span>Directory</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Native Android Bottom Tabs */}
                  <div className="app-bottom-nav">
                    <div className="nav-tab active">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      </svg>
                      <span>Home</span>
                    </div>
                    <div className="nav-tab">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      </svg>
                      <span>Notices</span>
                    </div>
                    <div className="nav-tab">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 20V10M12 20V4M6 20v-6" />
                      </svg>
                      <span>Grades</span>
                    </div>
                    <div className="nav-tab">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>Profile</span>
                    </div>
                  </div>

                  {/* Android Gesture Bar */}
                  <div className="android-home-gesture">
                    <div className="android-gesture-bar" />
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

