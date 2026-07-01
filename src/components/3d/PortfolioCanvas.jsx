import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import AvatarPanel from './AvatarPanel';
import FloatingObjects from './FloatingObjects';
import GridFloor from './GridFloor';
import ParticleField from './ParticleField';
import ProjectCoverflow from './ProjectCoverflow';
import * as THREE from 'three';

// CameraRig handles scroll linking and mouse parallax
function CameraRig({ scrollProgress, isMobile }) {
  useFrame((state) => {
    const p = scrollProgress;

    let targetX = 0;
    let targetY = 0;
    let targetZ = 5.5;

    // Scroll mapping sections:
    // 0.00 - 0.15: Hero Section (centered, reactive parallax)
    // 0.15 - 0.45: About & Skills (shift scene to right, zoom out slightly)
    // 0.45 - 0.75: Projects Coverflow (focus on y = -4.5 project meshes)
    // 0.75 - 1.00: Resume & Contact (shift scene to left, zoom back)

    if (p < 0.15) {
      // Hero
      const mouseX = state.pointer.x * 0.4;
      const mouseY = state.pointer.y * 0.4;
      targetX = mouseX;
      targetY = mouseY;
      targetZ = isMobile ? 6.5 : 5.0;
    } else if (p >= 0.15 && p < 0.45) {
      // About & Skills
      const t = (p - 0.15) / 0.3; // Normalized 0 to 1
      targetX = THREE.MathUtils.lerp(0, isMobile ? 0 : 2.2, t);
      targetY = THREE.MathUtils.lerp(0, -1.2, t);
      targetZ = THREE.MathUtils.lerp(isMobile ? 6.5 : 5.0, 5.8, t);
    } else if (p >= 0.45 && p < 0.75) {
      // Projects (located at y = -4.5)
      const t = (p - 0.45) / 0.3; // Normalized 0 to 1
      const startX = isMobile ? 0 : 2.2;
      targetX = THREE.MathUtils.lerp(startX, 0, t);
      targetY = THREE.MathUtils.lerp(-1.2, -4.5, t);
      targetZ = THREE.MathUtils.lerp(5.8, isMobile ? 5.2 : 4.4, t);
    } else {
      // Resume & Contact
      const t = (p - 0.75) / 0.25; // Normalized 0 to 1
      targetX = THREE.MathUtils.lerp(0, isMobile ? 0 : -2.2, t);
      targetY = THREE.MathUtils.lerp(-4.5, -8.0, t);
      targetZ = THREE.MathUtils.lerp(isMobile ? 5.2 : 4.4, 6.0, t);
    }

    // Interpolate camera coordinates for cinematic smoothness
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.08);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.08);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.08);

    // Look slightly towards the shifted scene center
    const lookTarget = new THREE.Vector3(targetX * 0.4, targetY, 0);
    state.camera.lookAt(lookTarget);
  });

  return null;
}

// LightRig drives lights subtly based on pointer movement
function LightRig() {
  const blueLightRef = useRef();
  const purpleLightRef = useRef();

  useFrame((state) => {
    if (blueLightRef.current && purpleLightRef.current) {
      // Shifting intensity dynamically using pointer position
      const pointerIntensity = (state.pointer.x + state.pointer.y) * 0.3;
      blueLightRef.current.intensity = 1.8 + pointerIntensity;
      purpleLightRef.current.intensity = 1.8 - pointerIntensity;
    }
  });

  return (
    <>
      <pointLight 
        ref={blueLightRef} 
        position={[6, 4, 3]} 
        color="#00E5FF" 
        intensity={2.0} 
      />
      <pointLight 
        ref={purpleLightRef} 
        position={[-6, -4, 3]} 
        color="#915EFF" 
        intensity={2.0} 
      />
    </>
  );
}

function ProgressReporter({ onProgress }) {
  const { progress } = useProgress();
  useEffect(() => {
    if (onProgress) onProgress(progress);
  }, [progress, onProgress]);
  return null;
}

export default function PortfolioCanvas({ scrollProgress, activeProjectIndex, setActiveProjectIndex, onProgress }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-0 w-full h-full pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        className="w-full h-full pointer-events-auto"
      >
        <ProgressReporter onProgress={onProgress} />
        <ambientLight intensity={0.5} />
        
        {/* Lights with interactive intensity adjustments */}
        <LightRig />
        <directionalLight position={[0, 8, 0]} intensity={0.4} />

        <Suspense fallback={null}>
          {/* Main Hero Elements (y = 0) */}
          <group position={[0, 0, 0]}>
            <AvatarPanel />
            <FloatingObjects />
            <ParticleField isMobile={isMobile} />
          </group>

          {/* Tron-style grid at the base */}
          <GridFloor />

          {/* Projects Coverflow (y = -4.5) */}
          <group position={[0, -4.5, 0]}>
            <ProjectCoverflow activeIndex={activeProjectIndex} setActiveIndex={setActiveProjectIndex} />
          </group>

          {/* Dynamic Camera rigging */}
          <CameraRig scrollProgress={scrollProgress} isMobile={isMobile} />
        </Suspense>

        {/* Postprocessing: disabled on mobile to conserve GPU resources */}
        {!isMobile && (
          <EffectComposer>
            <Bloom 
              intensity={0.65} 
              luminanceThreshold={0.15} 
              luminanceSmoothing={0.9} 
              height={300} 
            />
            <Vignette eskil={false} offset={0.15} darkness={1.05} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
