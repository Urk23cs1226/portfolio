import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function MagneticButton({ children, className = '', onClick, type = 'button', href, ...rest }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Calculate distance from center
      const x = clientX - centerX;
      const y = clientY - centerY;

      // Translate the button towards the cursor (pull strength multiplier)
      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      // Return to original position with elastic effect
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    button.addEventListener('mousemove', onMouseMove);
    button.addEventListener('mouseleave', onMouseLeave);

    return () => {
      button.removeEventListener('mousemove', onMouseMove);
      button.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const Component = href ? 'a' : 'button';
  const props = href 
    ? { href, target: href.startsWith('http') ? '_blank' : '_self', rel: href.startsWith('http') ? 'noopener noreferrer' : undefined, ...rest } 
    : { type, onClick, ...rest };

  return (
    <Component
      ref={buttonRef}
      className={`inline-block cursor-pointer select-none ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
