import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const Preloader: React.FC = () => {
  const { isLoaded, setIsLoaded, loaderPercent, setLoaderPercent } = usePortfolioStore();
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if user visited in this session
    const hasVisited = sessionStorage.getItem('portfolio-visited');
    if (hasVisited) {
      setLoaderPercent(100);
      setIsLoaded(true);
      setShouldRender(false);
      return;
    }

    let progress = 0;
    const interval = setInterval(() => {
      // Simulate real resource compilation increments
      const increment = Math.floor(Math.random() * 8) + 2;
      progress = Math.min(progress + increment, 100);
      setLoaderPercent(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
          sessionStorage.setItem('portfolio-visited', 'true');
          setTimeout(() => setShouldRender(false), 800); // Wait for exit animations
        }, 500);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [setIsLoaded, setLoaderPercent]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0b0b0d]"
        >
          {/* Logo / Initials draw */}
          <div className="relative mb-6 flex h-32 w-32 items-center justify-center">
            {/* SVG Geometric Frame - Diamond nodes representation */}
            <svg
              width="120"
              height="120"
              viewBox="0 0 100 100"
              className="absolute overflow-visible"
            >
              <motion.polygon
                points="50,5 95,50 50,95 5,50"
                fill="none"
                stroke="#ffb44f"
                strokeWidth="2"
                initial={{ strokeDasharray: '400', strokeDashoffset: '400' }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="6"
                fill="#ffb44f"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 1.5, duration: 0.5 }}
              />
            </svg>
            <span className="font-display text-4xl font-black tracking-widest text-[#f2f1ed]">
              PA
            </span>
          </div>

          {/* Name assembly & Percent */}
          <div className="text-center">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.25em] text-[#f2f1ed] opacity-80">
              Prakhar Agrawal
            </h2>
            <p className="mt-2 font-display text-2xl font-black text-[#ffb44f]">
              {loaderPercent}%
            </p>
          </div>

          {/* Horizontal loading progress bar */}
          <div className="absolute bottom-16 left-12 right-12 h-[1px] bg-white/10 md:left-24 md:right-24">
            <motion.div
              className="h-full bg-[#ffb44f]"
              initial={{ width: '0%' }}
              animate={{ width: `${loaderPercent}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
