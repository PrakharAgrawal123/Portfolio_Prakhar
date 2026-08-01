import React, { useEffect, useState } from 'react';
import { portfolioData } from '../data/portfolio';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { Magnetic } from './Magnetic';
import { Github, Linkedin, ArrowUp, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [localTime, setLocalTime] = useState('');
  const { setCursor } = usePortfolioStore();

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setLocalTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#0b0b0d] py-12 text-[#8a8a8f]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-center">
          
          {/* Left Column: Location & Live Time */}
          <div className="flex flex-col gap-2">
            <span className="font-body text-xs font-semibold uppercase tracking-widest text-[#f2f1ed]">
              LOCAL TIME (IST)
            </span>
            <span className="font-display text-lg font-medium text-[#ffb44f]">
              {localTime || 'Calculating...'}
            </span>
            <span className="text-xs">{portfolioData.personal.location}</span>
          </div>

          {/* Middle Column: Socials with Magnetic pull */}
          <div className="flex justify-start md:justify-center items-center gap-6">
            <Magnetic range={30}>
              <a
                href={portfolioData.personal.socials.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={() => setCursor('default')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f2f1ed] hover:border-[#ffb44f] hover:text-[#ffb44f] transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
            </Magnetic>

            <Magnetic range={30}>
              <a
                href={portfolioData.personal.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={() => setCursor('default')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f2f1ed] hover:border-[#ffb44f] hover:text-[#ffb44f] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
            </Magnetic>

            <Magnetic range={30}>
              <a
                href={portfolioData.personal.socials.leetcode}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={() => setCursor('default')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f2f1ed] hover:border-[#ffb44f] hover:text-[#ffb44f] transition-colors"
                aria-label="LeetCode Profile"
              >
                <Code2 size={18} />
              </a>
            </Magnetic>
          </div>

          {/* Right Column: Scroll to Top */}
          <div className="flex justify-between md:justify-end items-center gap-4">
            <span className="text-xs">
              © {new Date().getFullYear()} Prakhar Agrawal. All rights reserved.
            </span>
            <Magnetic range={30}>
              <button
                onClick={scrollToTop}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={() => setCursor('default')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f2f1ed] hover:border-[#ffb44f] hover:text-[#ffb44f] transition-colors"
                aria-label="Scroll to Top"
              >
                <ArrowUp size={18} />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Small craft credits */}
        <div className="mt-8 border-t border-white/5 pt-6 text-center text-[10px] tracking-widest uppercase">
          Handcrafted with passion • Built using React & Three.js
        </div>
      </div>
    </footer>
  );
};
