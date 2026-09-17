import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import logoData from './logoPaths.json';

export default function HeroSculpture({ mouse, position = [1.15, -0.05, -0.3], scale = 1.05, isMobile = false }) {
  const groupRef = useRef();
  const starRef = useRef();
  const starLightRef = useRef();
  const { viewport, size } = useThree();

  // Responsive anchor for all screen sizes:
  // - Mobile: compact size (138px), shifted inward to left (102px from right), vertically aligned (~155px)
  // - Tablet / iPad / Desktop / Mobile in Desktop Mode:
  //   Dynamically insets from right screen edge so it is NEVER cut off under any aspect ratio or tilt
  const isPortrait = size.height > size.width;

  const responsiveScale = useMemo(() => {
    if (isMobile) {
      const targetHeightPx = 138;
      return (targetHeightPx / size.height) * (viewport.height / 2.609);
    }
    if (size.width <= 1024) {
      if (isPortrait) {
        // Mobile in Desktop Mode / Tablet Portrait: comfortable proportion
        return Math.min(0.68, Math.max(0.55, (size.width / 1024) * 0.68));
      }
      return Math.min(0.72, Math.max(0.60, (size.width / 1024) * 0.72));
    }
    return Math.min(1.05, Math.max(0.85, (size.width / 1440) * 1.05));
  }, [isMobile, isPortrait, size.width, size.height, viewport.height]);

  const responsivePosition = useMemo(() => {
    if (isMobile) {
      const topCenterPx = 155;
      // Shifted inward to the left (102px from right edge)
      const rightCenterPx = 102;
      const y = (viewport.height / 2) - (topCenterPx / size.height) * viewport.height;
      const x = (viewport.width / 2) - (rightCenterPx / size.width) * viewport.width;
      return [x, y, 0.1];
    }

    // Non-mobile (Tablet / iPad Air / iPad Pro / Desktop / Mobile in Desktop Mode):
    // Calculate visible width at z = -0.4 (distance from camera at z=7 is 7.4)
    const zDepth = -0.4;
    const dist = 7 - zDepth;
    const vwAtDepth = viewport.width * (dist / 7);

    // Full rightward extent accounting for star, bevels, and floating tilt rotation
    const rightExtent = 1.35 * responsiveScale;

    // Generous right margin so the star and wing tips NEVER clip against the screen edge
    const rightMargin = size.width <= 1024 ? 0.52 : 0.68;
    const targetRightX = (vwAtDepth / 2) - rightExtent - rightMargin;

    // Strict safety clamp: absolute maximum X boundary ensuring full visibility
    const maxSafeX = (vwAtDepth / 2) - rightExtent - 0.28;
    const x = Math.max(0.35, Math.min(Math.min(2.80, targetRightX), maxSafeX));

    // When viewport is tall/portrait (e.g. mobile desktop mode), lift model up to align with hero headline
    const y = isPortrait ? 0.38 : (size.width <= 1024 ? 0.08 : -0.05);

    return [x, y, zDepth];
  }, [isMobile, isPortrait, responsiveScale, viewport.width, viewport.height, size.width, size.height]);

  // Load high-resolution logo texture and smooth normal map
  const [logoTexture, smoothNormal] = useTexture([
    '/assets/skalorix-s-logo.png',
    '/assets/skalorix-s-smooth-normal.png',
  ]);

  // Configure texture parameters
  useMemo(() => {
    if (logoTexture) {
      logoTexture.colorSpace = THREE.SRGBColorSpace;
      logoTexture.anisotropy = 16;
      logoTexture.generateMipmaps = true;
      logoTexture.minFilter = THREE.LinearMipmapLinearFilter;
      logoTexture.magFilter = THREE.LinearFilter;
      logoTexture.needsUpdate = true;
    }
    if (smoothNormal) {
      smoothNormal.anisotropy = 16;
      smoothNormal.generateMipmaps = true;
      smoothNormal.minFilter = THREE.LinearMipmapLinearFilter;
      smoothNormal.magFilter = THREE.LinearFilter;
      smoothNormal.needsUpdate = true;
    }
  }, [logoTexture, smoothNormal]);

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

  // Helper to build extruded geometry with high-resolution sculpted bevels (6 segments, 2 steps)
  const buildExtrusion = (contourPts, depth, bevelSize = 0.024, bevelSegments = 6) => {
    const shape = new THREE.Shape();
    contourPts.forEach((p, i) => {
      if (i === 0) shape.moveTo(p[0], p[1]);
      else shape.lineTo(p[0], p[1]);
    });
    shape.closePath();

    const geom = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelSegments,
      steps: 2,
      bevelSize,
      bevelThickness: bevelSize,
      UVGenerator: customUVGenerator,
    });

    const capCount = geom.groups[0].count;
    const halfCap = capCount / 2;
    const total = geom.attributes.position.count;

    geom.clearGroups();
    geom.addGroup(halfCap, halfCap, 0); // Front face: full artwork texture & velvety sheen
    geom.addGroup(0, halfCap, 1); // Back plate: luxury gold
    geom.addGroup(capCount, total - capCount, 1); // Extruded sides & sculpted bevels: luxury gold

    geom.computeVertexNormals();
    return geom;
  };

  // 1. Top Emerald Ribbon Geometry (Smooth sculpted bevels)
  const topGeometry = useMemo(() => {
    return buildExtrusion(logoData.top_ribbon, 0.18, 0.026, 6);
  }, []);

  // 2. Middle Sage Ribbon Geometry
  const midGeometry = useMemo(() => {
    return buildExtrusion(logoData.mid_ribbon, 0.15, 0.023, 6);
  }, []);

  // 3. Lower Brushed Gold Wing Geometry
  const bottomGeometry = useMemo(() => {
    return buildExtrusion(logoData.bottom_wing, 0.18, 0.026, 6);
  }, []);

  // 4. Floating 4-Point Celestial Star Geometry (Prominent sculpted diamond bevels)
  const starGeometry = useMemo(() => {
    return buildExtrusion(logoData.star, 0.12, 0.034, 6);
  }, []);

  // Materials:
  // A. Brushed / Polished Luxury 24K Gold for extruded sides, bevels, and backplate
  const goldSideMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0xD6A847,
    metalness: 0.92,
    roughness: 0.18,
    clearcoat: 0.85,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.8,
  }), []);

  // B. Silky PBR Front Material for Ribbon Faces — deep, rich emerald, sage and gold saturation without white washout
  const frontMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: logoTexture,
    normalMap: smoothNormal,
    normalScale: new THREE.Vector2(isMobile ? 0.05 : 0.12, isMobile ? 0.05 : 0.12),
    metalness: 0.08, // Very low metalness preserves maximum color saturation of emerald & gold
    roughness: 0.35, // Soft satin finish prevents harsh white glare
    clearcoat: 0.35, // Subtle luxury glaze
    clearcoatRoughness: 0.20,
    envMapIntensity: 0.5,
  }), [logoTexture, smoothNormal, isMobile]);

  // C. Celestial Star Jewelry Gold Material — radiant mirror gold finish with warm starlight glow
  const starGoldMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0xFEE180,
    metalness: 0.96,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    reflectivity: 1.0,
    envMapIntensity: 2.8,
    emissive: 0xDBA834,
    emissiveIntensity: 0.38,
  }), []);

  // D. Celestial Center Diamond Jewel Material
  const starDiamondMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0xFFFFFF,
    metalness: 0.15,
    roughness: 0.03,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    reflectivity: 1.0,
    envMapIntensity: 3.2,
    emissive: 0xFFF3D0,
    emissiveIntensity: 0.7,
  }), []);

  // E. Emerald satin accent material for floating spheres
  const emeraldRingMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0x1B382B,
    metalness: 0.78,
    roughness: 0.20,
    clearcoat: 0.9,
    envMapIntensity: 1.4,
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
        const targetX = (mouse.current?.y || 0) * 0.18;
        const targetY = (mouse.current?.x || 0) * 0.22;
        groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.035;
        groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.035;
        groupRef.current.rotation.z = Math.sin(time * 0.35) * 0.02;
      }
    }

    // Independent floating bob and subtle shimmer on the 4-point celestial star
    if (starRef.current) {
      starRef.current.position.z = 0.13 + Math.sin(time * 1.8) * 0.025;
      starRef.current.rotation.z = Math.sin(time * 0.6) * 0.04;
    }

    // Celestial pulsing twinkle on the star center light
    if (starLightRef.current) {
      starLightRef.current.intensity = 2.0 + Math.sin(time * 3.2) * 0.6;
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

        {/* Floating 4-Point Celestial Star with Parallax Depth & Gem Facet */}
        <group ref={starRef} position={[0, 0, 0.13]}>
          <mesh
            geometry={starGeometry}
            material={[starGoldMat, goldSideMat]}
          />

          {/* Central faceted celestial diamond star jewel */}
          <mesh
            position={[0.681, 0.422, 0.14]}
            rotation={[0, 0, Math.PI / 4]}
            material={starDiamondMat}
          >
            <octahedronGeometry args={[0.065, 0]} />
          </mesh>

          {/* Concentrated starlight celestial glow */}
          <pointLight
            ref={starLightRef}
            position={[0.681, 0.422, 0.22]}
            intensity={2.2}
            distance={3.2}
            color={0xFFE8A3}
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
              <sphereGeometry args={[isMobile ? 0.028 : 0.035, 16, 16]} />
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
