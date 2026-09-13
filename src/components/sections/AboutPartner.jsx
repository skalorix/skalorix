import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Lightbulb, BadgeCheck, Handshake } from 'lucide-react';
import SectionLabel from '../ui/SectionLabel';
import { useCursor } from '../../contexts/CursorContext';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPartner() {
  const sectionRef = useRef(null);
  const { onMouseEnterInteractive, onMouseLeaveInteractive } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-left-reveal', {
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.about-point-card', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-partner-section" id="about">
      {/* Background Gold Wave Curves */}
      <div className="about-bg-curves">
        <svg viewBox="0 0 1200 800" preserveAspectRatio="none" fill="none">
          <path d="M0 400 Q 300 100 600 400 T 1200 400" stroke="#C5A67A" strokeWidth="1" opacity="0.4" />
          <path d="M0 500 Q 400 200 800 500 T 1200 300" stroke="#C5A67A" strokeWidth="1" opacity="0.25" />
          <circle cx="200" cy="180" r="120" stroke="#C5A67A" strokeWidth="0.6" opacity="0.35" />
          <circle cx="1000" cy="620" r="180" stroke="#C5A67A" strokeWidth="0.6" opacity="0.25" />
        </svg>
      </div>

      <div className="container about-grid-layout">
        {/* Left Column: Editorial Philosophy */}
        <div className="about-left-reveal">
          <SectionLabel text="About Skalorix" dark />

          <h2 className="about-title-editorial">
            More Than<br />
            Technology.<br />
            <em>A True Partner.</em>
          </h2>

          <p className="about-copy-text">
            We don't just build digital products. We build trust, momentum, and lasting business value. 
            Every line of code and every pixel is an intentional investment in your long-term expansion.
          </p>

          <div className="about-manifesto-box">
            <p>“Scale Beyond Limits isn’t just a tagline — it’s how we think, engineer, and deliver.”</p>
          </div>
        </div>

        {/* Right Column: 4 Pillar Cards */}
        <div className="about-points-grid">
          <div
            className="about-point-card"
            onMouseEnter={onMouseEnterInteractive}
            onMouseLeave={onMouseLeaveInteractive}
          >
            <div className="about-point-icon">
              <Users size={20} />
            </div>
            <h5>Client-Centric Approach</h5>
            <p>We start with listening. Deep discovery, transparent communication, and shared ownership from day one.</p>
          </div>

          <div
            className="about-point-card"
            onMouseEnter={onMouseEnterInteractive}
            onMouseLeave={onMouseLeaveInteractive}
          >
            <div className="about-point-icon">
              <Lightbulb size={20} />
            </div>
            <h5>Innovative Solutions</h5>
            <p>Elegant architecture, modern tech stacks, and creative problem-solving that turn constraints into unfair advantages.</p>
          </div>

          <div
            className="about-point-card"
            onMouseEnter={onMouseEnterInteractive}
            onMouseLeave={onMouseLeaveInteractive}
          >
            <div className="about-point-icon">
              <BadgeCheck size={20} />
            </div>
            <h5>Experienced Team</h5>
            <p>Senior designers and engineers who craft with meticulous care, architectural foresight, and production reliability.</p>
          </div>

          <div
            className="about-point-card"
            onMouseEnter={onMouseEnterInteractive}
            onMouseLeave={onMouseLeaveInteractive}
          >
            <div className="about-point-icon">
              <Handshake size={20} />
            </div>
            <h5>Long-Term Partnership</h5>
            <p>Launch is just the beginning. We stay, optimize, and scale with you through every stage of growth.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
