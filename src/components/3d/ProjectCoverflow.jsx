import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const PROJECTS = [
  { name: 'Farmer to Consumer Marketplace', color: '#00E5FF', type: 'Web App' },
  { name: 'HealthGuard AI Symptom Intelligence System', color: '#915EFF', type: 'AI / Machine Learning' },
  { name: 'Blood Bank Management System', color: '#FF007F', type: 'Database / Web' },
  { name: 'Gas Detection System', color: '#00FF88', type: 'IoT / Hardware' },
  { name: 'Waste Management System', color: '#FFD700', type: 'IoT & Web' },
];

export default function ProjectCoverflow({ activeIndex, setActiveIndex }) {
  return (
    <group position={[0, 0.2, -1.5]}>
      {PROJECTS.map((proj, idx) => (
        <ProjectCard
          key={proj.name}
          project={proj}
          index={idx}
          activeIndex={activeIndex}
          onClick={() => setActiveIndex(idx)}
        />
      ))}
    </group>
  );
}

function ProjectCard({ project, index, activeIndex, onClick }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const diff = index - activeIndex;

    // Coverflow math calculations
    let targetX = diff * 2.0;
    let targetZ = -Math.abs(diff) * 1.2;
    let targetRotY = -diff * 0.45;
    let targetScale = index === activeIndex ? 1.05 : 0.72;

    // Soft-offset for far cards
    if (Math.abs(diff) > 1) {
      targetX = Math.sign(diff) * (2.0 + (Math.abs(diff) - 1) * 0.9);
    }

    // Smooth lerp positions and scales
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.1);
    
    const curScale = meshRef.current.scale.x;
    const nextScale = THREE.MathUtils.lerp(curScale, targetScale, 0.1);
    meshRef.current.scale.set(nextScale, nextScale, nextScale);
  });

  const isActive = index === activeIndex;

  return (
    <group ref={meshRef} onClick={onClick}>
      {/* 3D Glass panel card body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.0, 1.4, 0.05]} />
        <meshPhysicalMaterial
          color={project.color}
          roughness={0.15}
          metalness={0.2}
          transmission={0.7}
          thickness={0.1}
          transparent
          opacity={isActive ? 0.6 : 0.2}
          clearcoat={1.0}
        />
      </mesh>

      {/* High-tech neon wireframe overlay */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.04, 1.44, 0.06]} />
        <meshBasicMaterial 
          color={project.color} 
          wireframe 
          transparent 
          opacity={isActive ? 0.7 : 0.2} 
        />
      </mesh>

      {/* Content Text: Category */}
      <Text
        position={[0, 0.35, 0.04]}
        fontSize={0.07}
        color={project.color}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        opacity={isActive ? 0.9 : 0.4}
      >
        {project.type.toUpperCase()}
      </Text>

      {/* Content Text: Project Name */}
      <Text
        position={[0, -0.05, 0.04]}
        fontSize={0.11}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.7}
        textAlign="center"
        fontWeight="bold"
        opacity={isActive ? 1.0 : 0.5}
      >
        {project.name}
      </Text>

      {/* Interaction prompt text */}
      {isActive && (
        <Text
          position={[0, -0.45, 0.04]}
          fontSize={0.06}
          color="#00E5FF"
          anchorX="center"
          anchorY="middle"
          opacity={0.8}
        >
          ACTIVE FOCUS
        </Text>
      )}
    </group>
  );
}
