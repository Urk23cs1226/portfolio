import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import profileImg from '../../assets/ragunath.jpg';

export default function AvatarPanel() {
  const groupRef = useRef();
  
  // Load texture using Drei useTexture hook
  const texture = useTexture(profileImg);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Slow float sine wave
    groupRef.current.position.y = Math.sin(t * 0.65) * 0.15;
    
    // Smooth lerping of mouse coords to trigger rotation tilt
    const targetY = state.pointer.x * 0.3;
    const targetX = -state.pointer.y * 0.3;
    
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.07;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.07;
  });

  return (
    <group ref={groupRef}>
      {/* 3D Glass panel card */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.6, 3.2, 0.08]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.05}
          transmission={0.8}
          thickness={0.15}
          ior={1.45}
          transparent
          opacity={0.4}
          clearcoat={1.0}
        />
      </mesh>

      {/* Picture plane layered slightly in front */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[2.4, 3.0]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>

      {/* High-tech glow wireframe wrapper */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.66, 3.26, 0.1]} />
        <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Corner indicators */}
      {/* Top Left */}
      <mesh position={[-1.3, 1.6, 0.06]}>
        <boxGeometry args={[0.25, 0.03, 0.01]} />
        <meshBasicMaterial color="#915EFF" />
      </mesh>
      <mesh position={[-1.41, 1.48, 0.06]}>
        <boxGeometry args={[0.03, 0.25, 0.01]} />
        <meshBasicMaterial color="#915EFF" />
      </mesh>

      {/* Bottom Right */}
      <mesh position={[1.3, -1.6, 0.06]}>
        <boxGeometry args={[0.25, 0.03, 0.01]} />
        <meshBasicMaterial color="#00E5FF" />
      </mesh>
      <mesh position={[1.41, -1.48, 0.06]}>
        <boxGeometry args={[0.03, 0.25, 0.01]} />
        <meshBasicMaterial color="#00E5FF" />
      </mesh>
    </group>
  );
}
