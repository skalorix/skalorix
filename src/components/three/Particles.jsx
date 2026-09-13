import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Particles({ count = 200, isMobile = false }) {
  const meshRef = useRef();
  const particleCount = isMobile ? Math.floor(count / 4) : count;

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const siz = new Float32Array(particleCount);

    const ochreColor = new THREE.Color(0xD4B483);
    const parchmentColor = new THREE.Color(0xF8F4EA);
    const stoneColor = new THREE.Color(0xA69E93);

    for (let i = 0; i < particleCount; i++) {
      // Spread particles in a large volume
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      // Randomly assign color
      const rand = Math.random();
      const color = rand < 0.3 ? ochreColor : rand < 0.6 ? parchmentColor : stoneColor;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      siz[i] = Math.random() * 0.03 + 0.01;
    }

    return [pos, col, siz];
  }, [particleCount]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      const posArray = meshRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Gentle floating movement
        posArray[i3 + 1] += Math.sin(time * 0.2 + i * 0.1) * 0.0005;
        posArray[i3] += Math.cos(time * 0.15 + i * 0.05) * 0.0003;
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef} key={particleCount}>
      <bufferGeometry key={particleCount}>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
