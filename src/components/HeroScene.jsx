import { Suspense, useRef, useEffect, useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import HeroSculpture from './three/HeroSculpture';
import Particles from './three/Particles';
import { useIsMobile, useIsTablet } from '../hooks/useMediaQuery';

export default function HeroScene() {
  const wrapRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [frameloop, setFrameloop] = useState('always');

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setFrameloop(entry.isIntersecting ? 'always' : 'never'),
      { rootMargin: '80px', threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    };
  }, []);

  useEffect(() => {
    if (isMobile || isTablet) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, isMobile, isTablet]);

  const sculpturePosition = isMobile 
    ? [0.6, 1.4, 1] 
    : isTablet 
    ? [1.85, 0.05, -0.4] 
    : [2.90, -0.05, -0.4];

  const sculptureScale = isMobile ? 0.3 : isTablet ? 0.82 : 1.05;

  return (
    <div ref={wrapRef} className="canvas-wrapper" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.25)}
        frameloop={frameloop}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          {/* Cinematic Lighting */}
          <ambientLight intensity={0.75} color={0xFFFAF2} />
          
          {/* Key light */}
          <directionalLight
            position={[5, 6, 6]}
            intensity={1.2}
            color={0xFFFAF2}
          />
          
          {/* Soft Ochre rim light */}
          <pointLight
            position={[-4, 3, -2]}
            intensity={1.4}
            color={0xE8C07A}
            distance={15}
          />
          
          {/* Cool fill light */}
          <pointLight
            position={[3, -2, 4]}
            intensity={0.5}
            color={0x8BA99C}
            distance={12}
          />

          {/* Bottom accent */}
          {!isMobile && (
            <pointLight
              position={[0, -4, 0]}
              intensity={0.35}
              color={0x1B2E24}
              distance={10}
            />
          )}

          <HeroSculpture
            mouse={mouseRef}
            position={sculpturePosition}
            scale={sculptureScale}
            isMobile={isMobile}
          />
          <Particles count={isMobile ? 60 : isTablet ? 120 : 180} isMobile={isMobile} />
          
          <Environment preset="city" environmentIntensity={0.25} />

          {/* Distant fog */}
          <fog attach="fog" args={['#F8F4EA', 14, 40]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
