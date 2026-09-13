import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '../../utils/constants';
import SectionLabel from '../ui/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export default function OurApproach() {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progress line animation
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        });
      }

      // Step animations
      const steps = sectionRef.current?.querySelectorAll('.process__step');
      steps?.forEach((step, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        tl.from(step.querySelector('.process__step-number'), {
          opacity: 0,
          y: -10,
          duration: 0.4,
          ease: 'power3.out',
        });

        tl.from(step.querySelector('.process__step-title'), {
          opacity: 0,
          x: -30,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.2');

        tl.from(step.querySelector('.process__step-desc'), {
          opacity: 0,
          y: 15,
          duration: 0.5,
          ease: 'power3.out',
        }, '-=0.3');
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" id="process">
      <div className="container">
        <SectionLabel text="Our Approach" />

        <h2 style={{ marginBottom: '16px' }}>
          From Idea To <span className="text-ochre text-italic">Impact.</span>
        </h2>
        <p style={{ marginBottom: '64px' }}>
          A structured process designed to turn vision into measurable outcomes.
        </p>

        <div style={{ position: 'relative' }}>
          <div ref={progressRef} className="process__progress" />
          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className="process__step">
              <span className="process__step-number">{step.number}</span>
              <h3 className="process__step-title">{step.title}</h3>
              <p className="process__step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
