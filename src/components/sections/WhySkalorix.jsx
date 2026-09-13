import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRINCIPLES } from '../../utils/constants';
import SectionLabel from '../ui/SectionLabel';
import SkalorixLogo from '../ui/SkalorixLogo';

gsap.registerPlugin(ScrollTrigger);

export default function WhySkalorix() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.principles__item');
      
      items?.forEach((item, i) => {
        const title = item.querySelector('.principles__title');
        const desc = item.querySelector('.principles__desc');
        const number = item.querySelector('.principles__number');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        tl.from(number, {
          opacity: 0,
          x: -20,
          duration: 0.6,
          ease: 'power3.out',
        });

        tl.from(title, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.3');

        tl.from(desc, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.4');
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section section--dark" id="about">
      <div className="container">
        <SectionLabel dark>
          Why <SkalorixLogo size="sm" color="var(--soft-ochre)" />
        </SectionLabel>

        <h2 style={{ marginBottom: '16px' }}>
          More Than Marketing.
        </h2>
        <p style={{ marginBottom: '64px', color: 'rgba(248,244,234,0.6)' }}>
          Strategy, creativity and technology working together.
        </p>

        <div className="principles">
          {PRINCIPLES.map((principle) => (
            <div key={principle.number} className="principles__item">
              <span className="principles__number">{principle.number}</span>
              <div>
                <h3 className="principles__title">{principle.title}</h3>
                <p className="principles__desc">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
