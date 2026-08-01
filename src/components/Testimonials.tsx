import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { Quote, Star, ChevronLeft, ChevronRight, Linkedin } from 'lucide-react';
import { Magnetic } from './Magnetic';

export const Testimonials: React.FC = () => {
  const { setCursor } = usePortfolioStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % portfolioData.testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + portfolioData.testimonials.length) % portfolioData.testimonials.length);
  };



  return (
    <section id="testimonials" className="relative w-full py-20 px-6 md:px-12 md:py-32 bg-[#0b0b0d]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
          
          {/* Left Side: Header & Controls */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div className="mb-12">
              <span className="font-display text-xs font-black uppercase tracking-[0.2em] text-[#ffb44f]">
                08 / ENDORSEMENTS
              </span>
              <h2 className="h-fluid-section text-[#f2f1ed] mt-4 font-black">
                What mentors & teammates say.
              </h2>
              <p className="mt-6 text-sm text-[#8a8a8f] leading-relaxed max-w-sm">
                Feedback from technical guides, hackathon partners, and academic supervisors who have collaborated directly with me.
              </p>
            </div>

            {/* Carousel Control Buttons */}
            <div className="flex gap-4">
              <Magnetic range={20}>
                <button
                  onClick={handlePrev}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={() => setCursor('default')}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#141416] text-[#f2f1ed] hover:border-[#ffb44f] hover:text-[#ffb44f] transition-all glow-btn-secondary"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
              </Magnetic>

              <Magnetic range={20}>
                <button
                  onClick={handleNext}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={() => setCursor('default')}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#141416] text-[#f2f1ed] hover:border-[#ffb44f] hover:text-[#ffb44f] transition-all glow-btn-secondary"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </Magnetic>
            </div>
          </div>

          {/* Right Side: Draggable / Swipeable Card Stack Deck */}
          <div className="lg:col-span-3 flex items-center justify-center relative min-h-[350px] w-full">
            <AnimatePresence mode="popLayout">
              {portfolioData.testimonials.map((test, idx) => {
                if (idx !== activeIndex) return null;

                return (
                  <motion.div
                    key={test.id}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -80) {
                        handleNext();
                      } else if (info.offset.x > 80) {
                        handlePrev();
                      }
                    }}
                    onMouseEnter={() => setCursor('drag')}
                    onMouseLeave={() => setCursor('default')}
                    initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.9, opacity: 0, rotate: 2, x: 100 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                    className="glass-panel glass-panel-hover absolute cursor-grab active:cursor-grabbing rounded-2xl p-8 w-full max-w-[500px] flex flex-col justify-between min-h-[280px]"
                  >
                    <div>
                      {/* Quote Mark & Rating */}
                      <div className="flex items-center justify-between">
                        <Quote size={24} className="text-[#ffb44f] opacity-40" />
                        <div className="flex gap-0.5">
                          {Array.from({ length: test.rating }).map((_, i) => (
                            <Star key={i} size={12} className="fill-[#ffb44f] text-[#ffb44f]" />
                          ))}
                        </div>
                      </div>

                      {/* Actual Quote */}
                      <p className="mt-6 font-body text-sm italic leading-relaxed text-[#f2f1ed]/90">
                        "{test.quote}"
                      </p>
                    </div>

                    {/* Endorser Meta */}
                    <div className="border-t border-white/5 pt-6 flex items-center justify-between mt-6">
                      <div className="flex items-center gap-4">
                        {/* Avatar initials fallback to bypass loading external files */}
                        <div className="h-10 w-10 rounded-full bg-[#ffb44f]/10 border border-[#ffb44f]/25 flex items-center justify-center font-display text-xs font-black text-[#ffb44f]">
                          {test.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-display text-sm font-bold text-[#f2f1ed]">
                            {test.name}
                          </h4>
                          <p className="text-[10px] text-[#8a8a8f] uppercase tracking-wider mt-0.5">
                            {test.designation} at <span className="text-[#ffb44f]">{test.company}</span>
                          </p>
                        </div>
                      </div>

                      {/* LinkedIn link icon */}
                      <Magnetic range={20}>
                        <a
                          href={test.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          onMouseEnter={() => setCursor('hover')}
                          onMouseLeave={() => setCursor('default')}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-white/5 text-[#8a8a8f] hover:border-[#ffb44f] hover:text-[#ffb44f] transition-colors"
                          onClick={(e) => e.stopPropagation()} // Avoid scroll click swaps
                          aria-label="View Endorsee LinkedIn Profile"
                        >
                          <Linkedin size={14} />
                        </a>
                      </Magnetic>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Peeking Depth Deck backdrop cards */}
            <div className="absolute top-2 scale-[0.96] rounded-2xl border border-white/5 bg-[#141416]/50 w-full max-w-[500px] h-[280px] translate-y-3 z-0 pointer-events-none translate-x-2" />
            <div className="absolute top-0 scale-[0.92] rounded-2xl border border-white/5 bg-[#141416]/20 w-full max-w-[500px] h-[280px] translate-y-6 z-[-1] pointer-events-none translate-x-4" />
          </div>

        </div>
      </div>
    </section>
  );
};
