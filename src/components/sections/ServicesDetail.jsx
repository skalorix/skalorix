import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '../../utils/constants';
import SectionLabel from '../ui/SectionLabel';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

function ServiceDetailItem({ service, index }) {
  const itemRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = itemRef.current?.querySelectorAll('.service-detail__number, .service-detail__tagline, .service-detail__desc, .service-detail__capabilities, .btn');
      
      if (elements) {
        gsap.from(elements, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Animate the visual placeholder
      const visual = itemRef.current?.querySelector('.service-detail__visual');
      if (visual) {
        gsap.from(visual, {
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: visual,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, itemRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={itemRef} className="service-detail">
      <div>
        <div className="service-detail__number">
          {service.number} — {service.shortTitle}
        </div>
        <h3 className="service-detail__tagline">{service.tagline}</h3>
        <p className="service-detail__desc">{service.description}</p>
        <ul className="service-detail__capabilities">
          {service.capabilities.map((cap) => (
            <li key={cap} className="service-detail__capability">{cap}</li>
          ))}
        </ul>
        <Button variant="secondary" arrow>
          Learn More
        </Button>
      </div>
      <div className="service-detail__visual">
        {/* Abstract gradient visual */}
        <div style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, #1B2E24 0%, ${service.number === '01' ? '#2a4233' : service.number === '02' ? '#3d2e1a' : service.number === '03' ? '#1a2e2e' : service.number === '04' ? '#2e2a1a' : service.number === '05' ? '#1a2622' : '#222e1a'} 50%, rgba(212,180,131,0.2) 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 700,
            color: 'rgba(212,180,131,0.12)',
            letterSpacing: '-0.02em',
          }}>
            {service.shortTitle}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ServicesDetail() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="section" id="services-detail">
      <div className="container">
        <SectionLabel text="Services In Detail" />
        
        <h2 style={{ marginBottom: '64px' }}>
          What We <span className="text-ochre text-italic">Build.</span>
        </h2>

        {SERVICES.map((service, i) => (
          <ServiceDetailItem key={service.number} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
