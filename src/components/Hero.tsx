import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { TextScramble } from './TextScramble';
import { ArrowDown, Mail, Briefcase } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { HeroScene } from './HeroScene';

export const Hero: React.FC = () => {
  const { setCursor, activeSection } = usePortfolioStore();
  const [roleIndex, setRoleIndex] = useState(0);

  const showScene = activeSection === 'hero' || activeSection === 'about';

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % portfolioData.personal.roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nameLetters = portfolioData.personal.name.split('');

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col justify-between px-6 pt-32 pb-12 md:px-12 md:pb-20 overflow-hidden"
    >
      {showScene && <HeroScene />}
      <div className="z-10 mx-auto w-full max-w-7xl">
        {/* Availability Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#ffb44f]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffb44f] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ffb44f]"></span>
          </span>
          {portfolioData.personal.availability}
        </motion.div>

        {/* Hero Header */}
        <div className="mt-12 max-w-4xl">
          {/* Asymmetric Name Display */}
          <h1 className="h-fluid-hero flex flex-wrap text-left text-[#f2f1ed]">
            {nameLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + index * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block origin-bottom select-none"
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          {/* Cycling Scrambled Role Text */}
          <h2 className="mt-6 font-display text-2xl font-light text-[#8a8a8f] sm:text-3xl md:text-4xl">
            I am a <TextScramble text={portfolioData.personal.roles[roleIndex]} />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 max-w-lg font-body text-base leading-relaxed text-[#8a8a8f] md:text-lg"
          >
            {portfolioData.personal.tagline}
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-12 flex flex-wrap gap-6"
          >
            <Magnetic range={40}>
              <button
                onClick={() => handleScrollClick('projects')}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={() => setCursor('default')}
                className="flex items-center gap-3 rounded-full bg-[#ffb44f] px-8 py-4 font-display text-sm font-black uppercase tracking-wider text-[#0b0b0d] hover:bg-[#f2f1ed] transition-colors shadow-lg glow-btn"
              >
                <Briefcase size={16} />
                Explore Projects
              </button>
            </Magnetic>

            <Magnetic range={40}>
              <button
                onClick={() => handleScrollClick('contact')}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={() => setCursor('default')}
                className="flex items-center gap-3 rounded-full border border-white/15 bg-[#141416]/40 px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-[#f2f1ed] hover:bg-[#141416]/80 hover:border-white/30 transition-all glow-btn-secondary"
              >
                <Mail size={16} />
                Let's Connect
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Looping Scroll Indicator */}
      <div className="z-10 flex justify-center md:justify-start mx-auto w-full max-w-7xl mt-8">
        <motion.button
          onClick={() => handleScrollClick('about')}
          onMouseEnter={() => setCursor('hover')}
          onMouseLeave={() => setCursor('default')}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8a8a8f] hover:text-[#ffb44f] transition-colors"
        >
          <span>Scroll Down</span>
          <ArrowDown size={14} className="text-[#ffb44f]" />
        </motion.button>
      </div>
    </section>
  );
};
