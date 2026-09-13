import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OrbitalEcosystem from '../three/OrbitalEcosystem';
import SectionLabel from '../ui/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export default function DigitalExperience() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.digital-experience__title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.digital-experience__subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
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
    <section ref={sectionRef} className="section section--dark digital-experience">
      <div className="canvas-wrapper" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 1, 6], fov: 50 }}
          dpr={Math.min(window.devicePixelRatio, 1.5)}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[3, 5, 3]} intensity={0.5} color={0xF8F4EA} />
            <pointLight position={[-3, 2, -2]} intensity={0.8} color={0xD4B483} distance={10} />
            
            <OrbitalEcosystem scrollProgress={scrollProgress} />
            
            <Environment preset="night" environmentIntensity={0.2} />
            <fog attach="fog" args={['#1B2E24', 6, 18]} />
          </Suspense>
        </Canvas>
      </div>

      <div className="digital-experience__content">
        <SectionLabel text="Digital Ecosystem" dark />
        <h2 className="digital-experience__title">
          Built For A Digital{' '}
          <span className="text-ochre text-italic">Tomorrow.</span>
        </h2>
        <p className="digital-experience__subtitle">
          Everything works together — strategy, creativity and technology unified into a single digital ecosystem.
        </p>
      </div>
    </section>
  );
}
