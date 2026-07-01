import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GridFloor() {
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
      <planeGeometry args={[100, 100, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          void main() {
            // Scale and animate UV coords for lines
            vec2 gridUv = vUv * 60.0;
            gridUv.y -= uTime * 0.8; // Moving speed
            
            // Calculate grid lines
            vec2 grid = abs(fract(gridUv - 0.5) - 0.5) / 0.08;
            float line = min(grid.x, grid.y);
            float intensity = 1.0 - min(line, 1.0);
            
            // Horizon fading (grid fades as vUv.y approaches 1.0)
            float horizonFade = pow(1.0 - vUv.y, 3.5);
            
            // Horizontal edge fading (fades at the extreme left and right sides)
            float sideFade = sin(vUv.x * 3.14159);
            
            float alpha = intensity * horizonFade * sideFade * 0.6;
            vec3 neonBlue = vec3(0.0, 0.9, 1.0);
            
            gl_FragColor = vec4(neonBlue * intensity, alpha);
          }
        `}
      />
    </mesh>
  );
}
