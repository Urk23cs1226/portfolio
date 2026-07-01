import { useEffect, useRef } from 'react';

export function useMouseParallax(damping = 0.05) {
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to range [-1, 1]
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getLerpedMouse = () => {
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * damping;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * damping;
    return { x: mouse.current.x, y: mouse.current.y };
  };

  return { mouse, getLerpedMouse };
}
