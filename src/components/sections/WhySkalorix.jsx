import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeartHandshake, Layers, Eye, ShieldCheck, Infinity as InfinityIcon } from 'lucide-react';
import { WHY_POINTS } from '../../utils/constants';
import SectionLabel from '../ui/SectionLabel';
import { useCursor } from '../../contexts/CursorContext';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  'heart-handshake': HeartHandshake,
  'layers': Layers,
  'eye': Eye,
  'shield-check': ShieldCheck,
  'infinity': InfinityIcon,
};

export default function WhySkalorix() {
  const sectionRef = useRef(null);
  const { onMouseEnterInteractive, onMouseLeaveInteractive } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-left-reveal', {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.why-boxed-item', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="why-section-split" id="why">
      <div className="container why-split-grid">
        {/* Left Column: Headline & Live Status Badge */}
        <div className="why-left-content why-left-reveal">
          <SectionLabel text="Why Us" />
          <h2>
            Why Skalorix<br />
            Feels Different.
          </h2>
          <p>
            We blend editorial taste with engineering discipline. The result is technology that is intuitive to use,
            resilient under real-world traffic, and engineered to scale seamlessly.
          </p>

          <div className="status-badge-live">
            <span className="status-dot-pulse" />
            <span>Available for new projects</span>
          </div>
        </div>

        {/* Right Column: Boxed Pillars List */}
        <div className="why-boxed-list">
          {WHY_POINTS.map((item, idx) => {
            const IconComponent = ICON_MAP[item.icon] || HeartHandshake;
            return (
              <div
                key={idx}
                className="why-boxed-item"
                onMouseEnter={onMouseEnterInteractive}
                onMouseLeave={onMouseLeaveInteractive}
              >
                <div className="why-item-icon">
                  <IconComponent size={22} />
                </div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

