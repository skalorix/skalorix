import { Suspense, useRef, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import HeroSculpture from './three/HeroSculpture';
import Particles from './three/Particles';
import { useIsMobile } from '../hooks/useMediaQuery';

export default function HeroScene() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const handleMouseMove = useCallback((e) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, isMobile]);

  return (
    <div className="canvas-wrapper" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          {/* Cinematic Lighting */}
          <ambientLight intensity={0.3} color={0xF8F4EA} />
          
          {/* Key light */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            color={0xF8F4EA}
          />
          
          {/* Soft Ochre rim light */}
          <pointLight
            position={[-4, 3, -3]}
            intensity={1.2}
            color={0xD4B483}
            distance={15}
          />
          
          {/* Cool fill light */}
          <pointLight
            position={[3, -2, 4]}
            intensity={0.4}
            color={0x8BA99C}
            distance={12}
          />

          {/* Bottom accent */}
          <pointLight
            position={[0, -4, 0]}
            intensity={0.3}
            color={0x1B2E24}
            distance={10}
          />

          <HeroSculpture mouse={mouseRef} />
          <Particles count={200} isMobile={isMobile} />
          
          <Environment preset="city" environmentIntensity={0.3} />

          {/* Subtle fog */}
          <fog attach="fog" args={['#F8F4EA', 8, 25]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
