import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '../../utils/constants';
import { useCursor } from '../../contexts/CursorContext';
import SectionLabel from '../ui/SectionLabel';
import AnimatedText from '../ui/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeDo() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const { onMouseEnterLabeled, onMouseLeaveLabeled } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" id="services">
      <div className="container">
        <SectionLabel text="What We Do" />
        
        <AnimatedText as="h2" animation="fadeUp" style={{ marginBottom: '20px' }}>
          What We Do
        </AnimatedText>

        <AnimatedText as="p" animation="fadeUp" delay={0.1} style={{ marginBottom: '64px' }}>
          From visibility to digital experiences, we build the systems that help ambitious businesses move forward.
        </AnimatedText>

        <div className="services-list">
          {SERVICES.map((service, i) => (
            <div
              key={service.number}
              ref={(el) => (itemsRef.current[i] = el)}
              className="services-list__item"
              onMouseEnter={() => onMouseEnterLabeled('EXPLORE')}
              onMouseLeave={onMouseLeaveLabeled}
            >
              <span className="services-list__number">{service.number}</span>
              <span className="services-list__title">{service.title}</span>
              <span className="services-list__arrow">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
