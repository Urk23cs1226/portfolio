import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingObjects() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;
    
    groupRef.current.children.forEach((child, index) => {
      // Spin the object itself
      child.rotation.x += 0.01 * (index + 1);
      child.rotation.y += 0.015 * (index + 0.5);

      // Orbit around the center
      const speed = 0.25 + index * 0.08;
      const radius = 2.2 + index * 0.7;
      const offsetAngle = index * (Math.PI / 2);
      const angle = t * speed + offsetAngle;
      
      child.position.x = Math.cos(angle) * radius;
      child.position.y = Math.sin(t * 0.7 + index) * 0.3; // Floating wave
      child.position.z = Math.sin(angle) * radius;
    });
  });

  return (
    <group ref={groupRef}>
      {/* 1. Icosahedron (Representing React - Neon Blue) */}
      <mesh>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshPhysicalMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
        />
      </mesh>

      {/* 2. Torus Knot (Representing Python - Neon Purple) */}
      <mesh>
        <torusKnotGeometry args={[0.22, 0.07, 48, 8]} />
        <meshPhysicalMaterial
          color="#915EFF"
          emissive="#915EFF"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
        />
      </mesh>

      {/* 3. Cube (Representing Full Stack / Node - Neon Cyan/Green) */}
      <mesh>
        <boxGeometry args={[0.32, 0.32, 0.32]} />
        <meshPhysicalMaterial
          color="#00FF88"
          emissive="#00FF88"
          emissiveIntensity={1.0}
          roughness={0.15}
          metalness={0.8}
          clearcoat={1.0}
        />
      </mesh>

      {/* 4. Octahedron (Representing AI/IoT - Bright Pink) */}
      <mesh>
        <octahedronGeometry args={[0.28, 0]} />
        <meshPhysicalMaterial
          color="#FF007F"
          emissive="#FF007F"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
        />
      </mesh>
    </group>
  );
}
