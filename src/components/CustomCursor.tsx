import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const CustomCursor: React.FC = () => {
  const { cursorType, prefersReducedMotion } = usePortfolioStore();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  // Determine ring size and style based on cursorType
  const getVariants = () => {
    switch (cursorType) {
      case 'hover':
        return {
          width: 60,
          height: 60,
          backgroundColor: 'rgba(255, 180, 79, 0.1)',
          borderColor: '#ffb44f',
          borderWidth: 2,
        };
      case 'drag':
        return {
          width: 80,
          height: 80,
          backgroundColor: '#ffb44f',
          borderColor: '#ffb44f',
          borderWidth: 1,
        };
      case 'view':
        return {
          width: 90,
          height: 90,
          backgroundColor: '#f2f1ed',
          borderColor: '#f2f1ed',
          borderWidth: 1,
        };
      case 'magnetic':
        return {
          width: 50,
          height: 50,
          backgroundColor: 'rgba(255, 180, 79, 0.15)',
          borderColor: '#ffb44f',
          borderWidth: 2,
        };
      default:
        return {
          width: 32,
          height: 32,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 180, 79, 0.5)',
          borderWidth: 1,
        };
    }
  };

  const ringStyle = getVariants();

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] hidden md:block">
      {/* Lagging Ring */}
      <motion.div
        className="custom-cursor flex items-center justify-center rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: ringStyle.width,
          height: ringStyle.height,
          backgroundColor: ringStyle.backgroundColor,
          borderColor: ringStyle.borderColor,
          borderWidth: ringStyle.borderWidth,
        }}
        animate={{
          scale: 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        {cursorType === 'drag' && (
          <span className="font-display text-xs font-black tracking-widest text-[#0b0b0d]">DRAG</span>
        )}
        {cursorType === 'view' && (
          <span className="font-display text-xs font-black tracking-widest text-[#0b0b0d]">VIEW</span>
        )}
      </motion.div>

      {/* Center Dot */}
      <motion.div
        className="custom-cursor h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffb44f]"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: cursorType !== 'default' ? 0.5 : 1,
        }}
      />
    </div>
  );
};
