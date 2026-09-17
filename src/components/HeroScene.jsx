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
        dpr={[1, 2]}
        frameloop={frameloop}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = 4; // THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.2;
        }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          {/* Studio Cinematic Lighting */}
          <ambientLight intensity={0.65} color={0xFFFAF2} />
          
          {/* Key sunlight */}
          <directionalLight
            position={[5, 6, 6]}
            intensity={1.6}
            color={0xFFFAF2}
          />
          
          {/* Rich warm gold rim light */}
          <pointLight
            position={[-4, 3, -2]}
            intensity={2.0}
            color={0xF5D77F}
            distance={18}
          />
          
          {/* Emerald & sage fill light */}
          <pointLight
            position={[3, -2, 4]}
            intensity={0.85}
            color={0x9BC8B4}
            distance={14}
          />

          {/* Bottom subtle grounding accent */}
          <pointLight
            position={[0, -4, 0]}
            intensity={0.4}
            color={0x153024}
            distance={10}
          />

          <HeroSculpture
            mouse={mouseRef}
            position={sculpturePosition}
            scale={sculptureScale}
            isMobile={isMobile}
          />
          <Particles count={isMobile ? 60 : isTablet ? 120 : 180} isMobile={isMobile} />
          
          <Environment preset="city" environmentIntensity={0.85} />

          {/* Distant fog */}
          <fog attach="fog" args={['#F8F4EA', 14, 40]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
