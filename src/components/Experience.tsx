import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';
import type { Experience as ExpType } from '../data/portfolio';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { Calendar, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { InteractiveHeading } from './InteractiveHeading';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const { setCursor, prefersReducedMotion } = usePortfolioStore();
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(1); // Expand first card by default

  useEffect(() => {
    if (prefersReducedMotion) return;

    const line = lineRef.current;
    const timeline = timelineRef.current;
    if (!line || !timeline) return;

    // GSAP ScrollTrigger to scrub vertical progress line height
    gsap.fromTo(
      line,
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: true,
        },
      }
    );
  }, [prefersReducedMotion]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="relative w-full py-20 px-6 md:px-12 md:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Asymmetric Header */}
        <div className="mb-16 md:mb-24 md:max-w-2xl">
          <span className="font-display text-xs font-black uppercase tracking-[0.2em] text-[#ffb44f]">
            04 / CAREER PATH
          </span>
          <InteractiveHeading text="Translating theories into internships." />
        </div>

        {/* Timeline container */}
        <div ref={timelineRef} className="relative mt-12 pl-6 md:pl-32">
          {/* Vertical Track background line */}
          <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-white/5 md:left-[111px]" />

          {/* GSAP Scrubbed active line (only rendered if normal motion) */}
          {!prefersReducedMotion && (
            <div
              ref={lineRef}
              className="absolute left-[7px] top-4 w-[2px] bg-[#ffb44f] shadow-[0_0_8px_#ffb44f] origin-top md:left-[111px]"
              style={{ height: '0%' }}
            />
          )}

          {/* Timeline Items */}
          <div className="flex flex-col gap-12">
            {portfolioData.experience.map((exp: ExpType) => {
              const isExpanded = expandedId === exp.id;
              
              return (
                <div key={exp.id} className="relative group">
                  {/* Left Date Panel (Desktop only) */}
                  <div className="absolute left-[-220px] top-2 hidden w-40 text-right md:block">
                    <span className="font-display text-sm font-bold uppercase tracking-widest text-[#ffb44f]">
                      {exp.duration}
                    </span>
                    <p className="text-xs text-[#8a8a8f] mt-1 uppercase tracking-widest">
                      {exp.employmentType}
                    </p>
                  </div>

                  {/* Pulsing Timeline Dot node */}
                  <div className="absolute left-[-24px] top-3.5 z-10 h-3.5 w-3.5 rounded-full border border-[#0b0b0d] bg-[#141416] transition-colors group-hover:bg-[#ffb44f] md:left-[-25px]">
                    <div className="absolute inset-0.5 rounded-full bg-white/20 group-hover:bg-[#0b0b0d]" />
                  </div>

                  {/* Card Container */}
                  <motion.div
                    layout
                    onClick={() => toggleExpand(exp.id)}
                    onMouseEnter={() => setCursor('hover')}
                    onMouseLeave={() => setCursor('default')}
                    className={`glass-panel cursor-pointer rounded-2xl p-6 border transition-all duration-300 glow-card ${
                      isExpanded
                        ? 'border-[#ffb44f]/40 shadow-[0_0_35px_rgba(255,180,79,0.12)] bg-[#141416]/90'
                        : 'border-white/5'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div>
                        {/* Mobile date label */}
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#ffb44f] md:hidden mb-2">
                          <Calendar size={12} />
                          <span>{exp.duration}</span>
                        </div>

                        <span className="text-xs font-bold uppercase tracking-wider text-[#ffb44f]">
                          {exp.company}
                        </span>
                        <h3 className="font-display text-xl font-bold mt-1 text-[#f2f1ed]">
                          {exp.role}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="hidden rounded-full bg-white/5 px-3 py-1 text-[10px] font-semibold tracking-wider text-[#8a8a8f] uppercase sm:inline-block">
                          {exp.employmentType}
                        </span>
                        {isExpanded ? (
                          <ChevronUp size={16} className="text-[#ffb44f]" />
                        ) : (
                          <ChevronDown size={16} className="text-[#8a8a8f]" />
                        )}
                      </div>
                    </div>

                    {/* Expandable Highlight details */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-6 border-t border-white/5 pt-6"
                        >
                          <p className="font-body text-sm leading-relaxed text-[#8a8a8f]">
                            {exp.description}
                          </p>

                          {/* Bullet points */}
                          <div className="mt-6">
                            <span className="font-display text-xs font-bold uppercase tracking-widest text-[#f2f1ed]/50">
                              Core Highlights
                            </span>
                            <ul className="mt-3 flex flex-col gap-3">
                              {exp.highlights.map((highlight, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-[#8a8a8f]">
                                  <CheckCircle size={14} className="text-[#ffb44f] mt-0.5 shrink-0" />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies tags */}
                          <div className="mt-6">
                            <span className="font-display text-xs font-bold uppercase tracking-widest text-[#f2f1ed]/50">
                              Technologies Leveraged
                            </span>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {exp.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full bg-white/5 px-2.5 py-1 text-xs font-bold text-[#f2f1ed] border border-white/5"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
