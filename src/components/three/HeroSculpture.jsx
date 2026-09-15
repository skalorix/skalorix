import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import logoData from './logoPaths.json';

export default function HeroSculpture({ mouse, position = [1.15, -0.05, -0.3], scale = 1.05, isMobile = false }) {
  const groupRef = useRef();
  const starRef = useRef();
  const { viewport, size } = useThree();

  // Pixel-perfect anchor on mobile: locks to 124px from top, 60px from right
  // Sits larger on the right side next to the headline while text stays safely on the left
  const responsivePosition = useMemo(() => {
    if (isMobile) {
      const y = (viewport.height / 2) - (124 / size.height) * viewport.height;
      const x = (viewport.width / 2) - (60 / size.width) * viewport.width;
      return [x, y, 0.1];
    }
    return position;
  }, [isMobile, position, viewport.height, viewport.width, size.height, size.width]);

  const responsiveScale = isMobile ? 0.36 : scale;
  // const ring1Ref = useRef();
  // const ring2Ref = useRef();

  // Load high-resolution logo texture and smooth normal map
  const [logoTexture, smoothNormal] = useTexture([
    '/assets/skalorix-s-logo.png',
    '/assets/skalorix-s-smooth-normal.png',
  ]);

  // Configure texture parameters
  useMemo(() => {
    if (logoTexture) {
      logoTexture.colorSpace = THREE.SRGBColorSpace;
      logoTexture.anisotropy = 8;
      logoTexture.needsUpdate = true;
    }
  }, [logoTexture]);

  // World dimensions for exact sub-pixel UV alignment
  const wWorld = logoData.img_width * logoData.scale;
  const hWorld = logoData.img_height * logoData.scale;

  const customUVGenerator = useMemo(() => ({
    generateTopUV: function (geometry, vertices, indexA, indexB, indexC) {
      return [
        new THREE.Vector2(vertices[indexA * 3] / wWorld + 0.5, vertices[indexA * 3 + 1] / hWorld + 0.5),
        new THREE.Vector2(vertices[indexB * 3] / wWorld + 0.5, vertices[indexB * 3 + 1] / hWorld + 0.5),
        new THREE.Vector2(vertices[indexC * 3] / wWorld + 0.5, vertices[indexC * 3 + 1] / hWorld + 0.5),
      ];
    },
    generateSideWallUV: function () {
      return [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1, 0),
        new THREE.Vector2(1, 1),
        new THREE.Vector2(0, 1),
      ];
    },
  }), [wWorld, hWorld]);

  // Helper to build extruded geometry with multi-material groups (front artwork, gold bevels/sides)
  const buildExtrusion = (contourPts, depth, bevelSize = 0.02) => {
    const shape = new THREE.Shape();
    contourPts.forEach((p, i) => {
      if (i === 0) shape.moveTo(p[0], p[1]);
      else shape.lineTo(p[0], p[1]);
    });
    shape.closePath();

    const geom = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize,
      bevelThickness: bevelSize,
      UVGenerator: customUVGenerator,
    });

    const capCount = geom.groups[0].count;
    const halfCap = capCount / 2;
    const total = geom.attributes.position.count;

    geom.clearGroups();
    geom.addGroup(halfCap, halfCap, 0); // Front face: full artwork texture & sheen
    geom.addGroup(0, halfCap, 1); // Back plate: luxury gold
    geom.addGroup(capCount, total - capCount, 1); // Extruded sides & bevels: luxury gold

    geom.computeVertexNormals();
    return geom;
  };

  // 1. Top Emerald Ribbon Geometry
  const topGeometry = useMemo(() => {
    return buildExtrusion(logoData.top_ribbon, 0.16, 0.022);
  }, []);

  // 2. Middle Sage Ribbon Geometry
  const midGeometry = useMemo(() => {
    return buildExtrusion(logoData.mid_ribbon, 0.14, 0.02);
  }, []);

  // 3. Lower Brushed Gold Wing Geometry
  const bottomGeometry = useMemo(() => {
    return buildExtrusion(logoData.bottom_wing, 0.16, 0.022);
  }, []);

  // 4. Floating 4-Point Celestial Star Geometry
  const starGeometry = useMemo(() => {
    return buildExtrusion(logoData.star, 0.09, 0.016);
  }, []);

  // Materials
  // A. Brushed / Polished Luxury Gold for extruded sides, bevels, and backplate
  const goldSideMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0xC89B3C,
    metalness: 0.88,
    roughness: 0.22,
    clearcoat: 0.6,
    clearcoatRoughness: 0.15,
    envMapIntensity: 1.0,
  }), []);

  // B. Silky PBR Front Material for Ribbon Faces — vibrant, rich saturation without white washout
  const frontMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: logoTexture,
    normalMap: smoothNormal,
    normalScale: new THREE.Vector2(0.12, 0.12),
    metalness: 0.12, // Keeps the rich emerald, sage, and gold hues saturated
    roughness: 0.32,
    clearcoat: 0.5,
    clearcoatRoughness: 0.18,
    envMapIntensity: 0.5,
  }), [logoTexture, smoothNormal]);

  // C. Front Radiant Star Material
  const starFrontMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: logoTexture,
    normalMap: smoothNormal,
    normalScale: new THREE.Vector2(0.15, 0.15),
    metalness: 0.45,
    roughness: 0.22,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.1,
    emissive: 0xD4A853,
    emissiveIntensity: 0.2,
  }), [logoTexture, smoothNormal]);

  // D. Emerald satin accent material
  const emeraldRingMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0x1B382B,
    metalness: 0.75,
    roughness: 0.22,
    clearcoat: 0.8,
    envMapIntensity: 1.2,
  }), []);

  // Dynamic interactive animations
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      if (isMobile) {
        // Minimal gentle floating tilt on mobile — always stays facing front, no 360 rotation
        groupRef.current.rotation.y = Math.sin(time * 0.7) * 0.2;
        groupRef.current.rotation.x = Math.cos(time * 0.5) * 0.08;
        groupRef.current.rotation.z = Math.sin(time * 0.4) * 0.03;
      } else {
        // Interactive mouse-following rotation with soft lerp damping
        const targetX = (mouse.current?.y || 0) * 0.2;
        const targetY = (mouse.current?.x || 0) * 0.24;
        groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.035;
        groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.035;
        groupRef.current.rotation.z = Math.sin(time * 0.35) * 0.02;
      }
    }

    // Independent floating bob and subtle shimmer on the 4-point celestial star
    if (starRef.current) {
      starRef.current.position.z = 0.12 + Math.sin(time * 1.8) * 0.025;
      starRef.current.rotation.z = Math.sin(time * 0.6) * 0.04;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.35}>
      <group ref={groupRef} position={responsivePosition} scale={responsiveScale}>
        {/* Middle Sage/Emerald Ribbon */}
        <mesh
          geometry={midGeometry}
          material={[frontMat, goldSideMat]}
          position={[0, 0, 0]}
        />

        {/* Top Emerald Ribbon (layered slightly forward in 3D) */}
        <mesh
          geometry={topGeometry}
          material={[frontMat, goldSideMat]}
          position={[0, 0, 0.03]}
        />

        {/* Lower Brushed Gold Wing (layered slightly forward in 3D) */}
        <mesh
          geometry={bottomGeometry}
          material={[frontMat, goldSideMat]}
          position={[0, 0, 0.025]}
        />

        {/* Floating 4-Point Celestial Star with Parallax Depth */}
        <group ref={starRef} position={[0, 0, 0.12]}>
          <mesh
            geometry={starGeometry}
            material={[starFrontMat, goldSideMat]}
          />
          {/* Warm celestial glow focused on the star */}
          <pointLight
            position={[0.7, 0.42, 0.25]}
            intensity={1.0}
            distance={3.5}
            color={0xFFEBB5}
          />
        </group>

        {/* Delicate floating metallic accent spheres */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = isMobile ? 1.45 : 2.2;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 2.5) * 0.35,
                Math.sin(angle) * radius * 0.6,
              ]}
              material={i % 2 === 0 ? goldSideMat : emeraldRingMat}
            >
              <sphereGeometry args={[isMobile ? 0.028 : 0.035, 12, 12]} />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

// Preload assets
useTexture.preload('/assets/skalorix-s-logo.png');
useTexture.preload('/assets/skalorix-s-smooth-normal.png');
