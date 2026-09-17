import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const SERVICE_LABELS = ['Strategy', 'Creative', 'Social', 'SEO', 'Web', 'Software'];

export default function OrbitalEcosystem({ scrollProgressRef, isMobile = false }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const orbitsRef = useRef([]);
  const { size } = useThree();

  const isPortrait = size.height > size.width;
  const isCompact = isMobile || isPortrait || size.width <= 1024;

  const coreMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0xD4B483,
    emissive: 0xD4B483,
    emissiveIntensity: 0.3,
    metalness: 0.3,
    roughness: 0.4,
    clearcoat: 0.5,
  }), []);

  const orbitMats = useMemo(() => SERVICE_LABELS.map((_, i) => {
    const hue = 0.35 + i * 0.02; // Subtle green variations
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color().setHSL(hue, 0.3, 0.25),
      metalness: 0.6,
      roughness: 0.3,
      clearcoat: 0.3,
      emissive: new THREE.Color().setHSL(hue, 0.3, 0.1),
      emissiveIntensity: 0.1,
    });
  }), []);

  const ringMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: 0xD4B483,
    transparent: true,
    opacity: 0.15,
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.2;
      const pulse = 1 + Math.sin(time * 0.8) * 0.05;
      coreRef.current.scale.setScalar(pulse);
    }

    orbitsRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const angle = (time * 0.3 + (i / SERVICE_LABELS.length) * Math.PI * 2);
      const radius = isCompact ? (1.5 + i * 0.1) : (2.4 + i * 0.15);
      const yOffset = Math.sin(time * 0.5 + i) * (isCompact ? 0.18 : 0.28);
      
      // Animate into position based on scroll
      const progress = Math.min(1, (scrollProgressRef?.current ?? 0) * 2);
      const targetRadius = radius * progress;
      
      mesh.position.x = Math.cos(angle) * targetRadius;
      mesh.position.z = Math.sin(angle) * targetRadius;
      mesh.position.y = yOffset * progress;
      mesh.rotation.y = time * 0.5;
      mesh.scale.setScalar((0.3 + progress * 0.7) * (isCompact ? 0.75 : 1.0));
    });

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={isCompact ? [0, 0.95, 0] : [0, 0.42, 0]}>
      {/* Central sphere - Growth */}
      <mesh ref={coreRef} material={coreMat}>
        <sphereGeometry args={[isCompact ? 0.38 : 0.52, 32, 32]} />
      </mesh>

      {/* Glow ring around core */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={ringMat}>
        <torusGeometry args={[isCompact ? 0.78 : 1.1, isCompact ? 0.006 : 0.009, 8, 64]} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]} material={ringMat}>
        <torusGeometry args={[isCompact ? 1.15 : 1.65, isCompact ? 0.005 : 0.008, 8, 64]} />
      </mesh>

      {/* Orbiting service elements */}
      {SERVICE_LABELS.map((label, i) => {
        const geometries = [
          <boxGeometry key="box" args={[0.35, 0.35, 0.35]} />,
          <dodecahedronGeometry key="dodeca" args={[0.22, 0]} />,
          <tetrahedronGeometry key="tetra" args={[0.28, 0]} />,
          <octahedronGeometry key="octa" args={[0.25, 0]} />,
          <icosahedronGeometry key="icosa" args={[0.22, 0]} />,
          <cylinderGeometry key="cyl" args={[0.18, 0.18, 0.35, 6]} />,
        ];

        return (
          <mesh
            key={label}
            ref={(el) => (orbitsRef.current[i] = el)}
            material={orbitMats[i]}
          >
            {geometries[i]}
          </mesh>
        );
      })}

      {/* Ambient light for the ecosystem */}
      <pointLight position={[0, 0, 0]} intensity={0.5} color={0xD4B483} distance={5} />
    </group>
  );
}
