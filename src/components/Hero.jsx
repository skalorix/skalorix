import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Button from './ui/Button';
import HeroScene from './HeroScene';

export default function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const labelRef = useRef(null);
  const ctasRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.2 }); // After loading screen

      tl.from(labelRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
      });

      tl.from(titleRef.current?.children || [], {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out',
      }, '-=0.4');

      tl.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6');

      tl.from(ctasRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.4');

      tl.from(statsRef.current?.children || [], {
        opacity: 0,
        y: 15,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
      }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero" id="home">
      {/* 3D Scene — positioned right side on desktop, full background on mobile */}
      <div className="hero__scene-wrapper">
        <HeroScene />
      </div>
      
      {/* Text content — left side */}
      <div className="container hero__content">
        <div className="hero__text-col">
          <div ref={labelRef} className="hero__label">
            <span className="hero__label-line" />
            <span className="label">Marketing × Design × Technology</span>
          </div>

          <h1 ref={titleRef} className="hero__title">
            <span className="hero__title-line">Ideas</span>
            <span className="hero__title-line">Into</span>
            <span className="hero__title-line text-ochre text-italic">Impact.</span>
          </h1>

          <p ref={subtitleRef} className="hero__subtitle">
            We combine creativity, strategy and technology to build 
            digital experiences that grow businesses — not just their feeds.
          </p>

          <div ref={ctasRef} className="hero__ctas">
            <Button variant="primary" href="#contact" arrow>
              Start a Project
            </Button>
            <Button variant="secondary" href="#services">
              Explore Services
            </Button>
          </div>

          {/* Quick stats strip */}
          <div ref={statsRef} className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">1</span>
              <span className="hero__stat-label">Project Delivered</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">6</span>
              <span className="hero__stat-label">Core Services</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">100%</span>
              <span className="hero__stat-label">Results-Driven</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span className="label" style={{ fontSize: '0.6rem' }}>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
