import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Use springs for smooth delayed movement of the outer ring
  const ringX = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });
  const ringY = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });

  useEffect(() => {
    let magneticElements = document.querySelectorAll('[data-magnetic]');

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      // Magnetic pull logic
      magneticElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const maxDistance = 50;

        if (Math.abs(distanceX) < maxDistance && Math.abs(distanceY) < maxDistance) {
          const pullX = distanceX * 0.3;
          const pullY = distanceY * 0.3;
          (el as HTMLElement).style.transform = `translate(${pullX}px, ${pullY}px)`;
        } else {
          (el as HTMLElement).style.transform = 'translate(0px, 0px)';
        }
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest('a, button, [data-hover-text], [data-magnetic]');
      setIsHovering(!!hoverable);
    };

    // Re-query magnetic elements occasionally in case of dynamic renders
    const interval = setInterval(() => {
      magneticElements = document.querySelectorAll('[data-magnetic]');
    }, 1000);

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', () => {
      setIsHovering(false);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      clearInterval(interval);
      magneticElements.forEach((el) => {
        (el as HTMLElement).style.transform = 'translate(0px, 0px)';
      });
    };
  }, [ringX, ringY]);

  return (
    <>
      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0 }}
      />
      {/* Trailing Ring — always a thin circle, never text/box */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary/60 pointer-events-none z-[99]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 30 : 24,
          height: isHovering ? 30 : 24,
          backgroundColor: isHovering ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(168, 85, 247, 0.9)' : 'rgba(168, 85, 247, 0.6)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  );
}
