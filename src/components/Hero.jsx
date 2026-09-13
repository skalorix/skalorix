import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import HeroScene from './HeroScene';
import { useCursor } from '../contexts/CursorContext';

export default function Hero({ isLoaded = true }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctasRef = useRef(null);
  const statsRef = useRef(null);
  const sceneRef = useRef(null);
  const { onMouseEnterInteractive, onMouseLeaveInteractive } = useCursor();

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
      });

      tl.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.6');

      tl.from(ctasRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4');

      tl.from(statsRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.3');

      tl.from(sceneRef.current, {
        opacity: 0,
        scale: 0.92,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=1.0');
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section ref={sectionRef} className="hero" id="home">
      {/* Full Background 3D Sculpture & Cosmic Particles */}
      <div ref={sceneRef} className="hero__scene-background" aria-hidden="true">
        <div className="hero__radial-glow" />
        <HeroScene />
      </div>

      {/* Foreground Editorial Text Content */}
      <div className="container hero__foreground-container">
        <div className="hero__content-editorial">
          <h1 ref={titleRef} className="hero-title">
            Ideas<br />
            <em>Engineered</em><br />
            for a Brighter Tomorrow.
          </h1>

          <p ref={subtitleRef} className="hero-sub">
            We design, develop, and deliver digital solutions that help businesses scale beyond limits. 
            Premium craft, human-centered thinking, and technology that lasts.
          </p>

          <div ref={ctasRef} className="hero-actions">
            <a
              href="#contact"
              className="btn-pill btn-primary"
              style={{ height: '52px', padding: '0 32px' }}
              onMouseEnter={onMouseEnterInteractive}
              onMouseLeave={onMouseLeaveInteractive}
            >
              Start a Project <span>→</span>
            </a>
            <a
              href="#work"
              className="btn-pill btn-outline"
              style={{ height: '52px', padding: '0 28px' }}
              onMouseEnter={onMouseEnterInteractive}
              onMouseLeave={onMouseLeaveInteractive}
            >
              Explore Our Work
            </a>
          </div>

          {/* Quick Stats Strip */}
          <div ref={statsRef} className="hero-meta">
            <div className="meta-item">
              <small>Project Delivered</small>
              <strong>1 Official App</strong>
            </div>
            <div className="meta-item">
              <small>Core Disciplines</small>
              <strong>6 Services</strong>
            </div>
            <div className="meta-item">
              <small>Client Focus</small>
              <strong>100% Bespoke</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom scroll indicator */}
      <div className="hero__scroll-indicator">
        <span className="label" style={{ fontSize: '0.62rem', letterSpacing: '0.2em' }}>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}


