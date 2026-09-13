import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function HeroSculpture({ mouse }) {
  const groupRef = useRef();
  const icosaRef = useRef();
  const torusRef = useRef();
  const octaRef = useRef();
  const innerRef = useRef();

  // Materials
  const darkGreenMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0x1B2E24,
    metalness: 0.7,
    roughness: 0.2,
    clearcoat: 0.3,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.5,
  }), []);

  const chromeMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0x333333,
    metalness: 0.95,
    roughness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    envMapIntensity: 2,
  }), []);

  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0xD4B483,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.7,
    thickness: 0.5,
    transparent: true,
    opacity: 0.6,
    envMapIntensity: 1,
  }), []);

  const ochreMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0xD4B483,
    metalness: 0.8,
    roughness: 0.15,
    clearcoat: 0.5,
    emissive: 0xD4B483,
    emissiveIntensity: 0.08,
    envMapIntensity: 1.5,
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Subtle mouse-following rotation
      const targetX = (mouse.current?.y || 0) * 0.15;
      const targetY = (mouse.current?.x || 0) * 0.15;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.02;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.02;
    }

    if (icosaRef.current) {
      icosaRef.current.rotation.y = time * 0.08;
      icosaRef.current.rotation.z = Math.sin(time * 0.3) * 0.05;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.12;
      torusRef.current.rotation.z = time * 0.06;
    }

    if (octaRef.current) {
      octaRef.current.rotation.y = -time * 0.1;
      octaRef.current.rotation.x = Math.cos(time * 0.4) * 0.1;
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = time * 0.15;
      innerRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.03);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={[2, 0, 0]}>
        {/* Main icosahedron - dark green */}
        <mesh ref={icosaRef} material={darkGreenMat}>
          <icosahedronGeometry args={[1.4, 1]} />
        </mesh>

        {/* Orbiting torus - chrome */}
        <mesh ref={torusRef} material={chromeMat}>
          <torusGeometry args={[1.8, 0.04, 16, 64]} />
        </mesh>

        {/* Floating octahedron - ochre metallic */}
        <mesh ref={octaRef} position={[0, 0, 0]} material={ochreMat}>
          <octahedronGeometry args={[0.5, 0]} />
        </mesh>

        {/* Inner glass sphere */}
        <mesh ref={innerRef} material={glassMat}>
          <sphereGeometry args={[0.7, 32, 32]} />
        </mesh>

        {/* Small accent spheres */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 2.2;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 0.5,
                Math.sin(angle) * radius,
              ]}
              material={i % 2 === 0 ? ochreMat : chromeMat}
            >
              <sphereGeometry args={[0.05, 8, 8]} />
            </mesh>
          );
        })}

        {/* Thin orbital rings */}
        <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]} material={ochreMat}>
          <torusGeometry args={[2.5, 0.008, 8, 128]} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 5, 0]} material={chromeMat}>
          <torusGeometry args={[2.1, 0.008, 8, 128]} />
        </mesh>
      </group>
    </Float>
  );
}
