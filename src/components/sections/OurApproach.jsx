import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '../../utils/constants';
import SectionLabel from '../ui/SectionLabel';
import { useCursor } from '../../contexts/CursorContext';

gsap.registerPlugin(ScrollTrigger);

export default function OurApproach() {
  const sectionRef = useRef(null);
  const { onMouseEnterInteractive, onMouseLeaveInteractive } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.process-step-node', {
        opacity: 0,
        y: 35,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="process-section" id="process">
      <div className="container">
        <div className="process-header-row">
          <div>
            <SectionLabel text="Our Process" />
            <h2>From Idea<br />to Impact.</h2>
          </div>
          <p style={{ maxWidth: '380px', color: 'var(--text-mute)', fontSize: '15.5px', lineHeight: 1.7 }}>
            A clear, collaborative process that keeps you in control — without slowing down execution or compromising craft.
          </p>
        </div>

        <div className="process-line-track">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className="process-step-node"
              onMouseEnter={onMouseEnterInteractive}
              onMouseLeave={onMouseLeaveInteractive}
            >
              <div className="step-circle-badge">{step.num}</div>
              <div>
                <h3 className="step-title-text">{step.title}</h3>
                <p className="step-desc-text">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

