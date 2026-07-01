import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Set initial position out of view
    gsap.set([cursor, dot], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const onMouseMove = (e) => {
      // Smooth tracking for the outer cursor ring
      gsap.to(cursor, { 
        x: e.clientX, 
        y: e.clientY, 
        duration: 0.3, 
        ease: 'power2.out' 
      });
      // Tight tracking for the inner dot
      gsap.to(dot, { 
        x: e.clientX, 
        y: e.clientY, 
        duration: 0.05 
      });
    };

    const handleHoverStart = () => {
      cursor.classList.add('custom-cursor-hover');
    };

    const handleHoverEnd = () => {
      cursor.classList.remove('custom-cursor-hover');
    };

    window.addEventListener('mousemove', onMouseMove);

    // Attach listeners to interactive elements
    const attachHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .interactive-3d');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    // Initial attachment
    attachHoverListeners();

    // Use MutationObserver to attach to dynamically rendered/changed items (like lazy pages or filters)
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .interactive-3d');
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={dotRef} className="custom-cursor-dot hidden md:block" />
    </>
  );
}
