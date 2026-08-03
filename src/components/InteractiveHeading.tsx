import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveHeadingProps {
  text: string;
  className?: string;
}

export const InteractiveHeading: React.FC<InteractiveHeadingProps> = ({ 
  text, 
  className = "h-fluid-section text-[#f2f1ed] mt-4 font-black font-display" 
}) => {
  const letters = text.split('');

  return (
    <h2 className={`flex flex-wrap items-center ${className}`}>
      {letters.map((char, index) => (
        <motion.span
          key={index}
          whileHover={{
            scale: 1.18,
            color: '#ffb44f',
            y: -6,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 12 }}
          className="inline-block origin-center cursor-default select-none"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </h2>
  );
};

export default InteractiveHeading;
