import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

export default function ParticleField({ isMobile = false }) {
  const ref = useRef();
  
  const count = isMobile ? 300 : 1200;
  
  // Generate random coordinates clustered closer to the center
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Denser clustering near the center via exponential power
      const radius = Math.pow(Math.random(), 3) * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) + 0.5; // Slight offset upwards
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      // Slow rotation drift
      ref.current.rotation.x += delta * 0.02;
      ref.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00E5FF"
          size={isMobile ? 0.04 : 0.03}
          sizeAttenuation={true}
          depthWrite={false}
          alphaWrite={false}
        />
      </Points>
    </group>
  );
}
