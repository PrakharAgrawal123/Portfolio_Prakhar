import React from 'react';
import { portfolioData } from '../data/portfolio';
import { GraduationCap, Calendar } from 'lucide-react';
import { InteractiveHeading } from './InteractiveHeading';

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative w-full py-20 px-6 md:px-12 md:py-32 bg-[#0b0b0d] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] bg-[#ffb44f]/[0.01] rounded-full filter blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center md:max-w-2xl md:mx-auto">
          <span className="font-display text-xs font-black uppercase tracking-[0.25em] text-[#ffb44f]">
            05 / KNOWLEDGE TRACK
          </span>
          <InteractiveHeading text="Academic Background" />
          <div className="h-[1px] w-20 bg-[#ffb44f] mt-6 mx-auto" />
        </div>

        {/* Alternating Vertical Timeline */}
        <div className="relative mt-16 max-w-4xl mx-auto pl-4 md:pl-0">
          
          {/* Vertical central timeline line */}
          <div className="absolute left-[24px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-white/5" />

          {/* Timeline Items */}
          <div className="flex flex-col gap-2">
            {portfolioData.education.map((edu, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div 
                  key={edu.id} 
                  className={`relative flex flex-col md:flex-row items-stretch justify-between w-full mb-12 last:mb-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  
                  {/* Card Container (Left on even index, Right on odd index) */}
                  <div className="w-full md:w-[calc(50%-36px)] pl-12 md:pl-0">
                    <div className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/5 w-full glow-card relative flex flex-col justify-between h-full bg-[#141416]/10">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ffb44f]/5 text-[#ffb44f] border border-[#ffb44f]/10">
                            <GraduationCap size={16} />
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-[#ffb44f]">
                              {edu.institution}
                            </span>
                            <h4 className="font-display text-base font-bold text-[#f2f1ed] mt-0.5">
                              {edu.degree}
                            </h4>
                          </div>
                        </div>

                        {/* Details */}
                        <p className="text-xs text-[#8a8a8f] mt-1.5 font-bold">
                          {edu.location} {edu.board ? `· ${edu.board}` : ''} {edu.stream ? `· ${edu.stream}` : ''}
                        </p>
                        <p className="mt-3 text-xs leading-relaxed text-[#8a8a8f]">
                          {edu.description}
                        </p>

                        {edu.coursework && (
                          <div className="flex flex-wrap gap-1 mt-4">
                            {edu.coursework.map((course) => (
                              <span
                                key={course}
                                className="rounded bg-white/5 px-2 py-0.5 text-xs font-bold text-[#8a8a8f]"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Card Footer details */}
                      <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 rounded bg-[#ffb44f]/10 border border-[#ffb44f]/20 px-2 py-0.5 text-xs font-bold text-[#ffb44f]">
                          {edu.grade}
                        </span>
                        <span className="md:hidden flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#8a8a8f]">
                          <Calendar size={10} /> {edu.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Central Node Dot on timeline line */}
                  <div className="absolute left-[24px] md:left-1/2 md:-translate-x-1/2 top-8 z-20 h-4 w-4 rounded-full border-4 border-[#0b0b0d] bg-[#ffb44f] shadow-[0_0_10px_#ffb44f]" />

                  {/* Opposite Date/Status Label (Desktop only) */}
                  <div className={`hidden md:flex md:w-[calc(50%-36px)] flex-col justify-center ${
                    isLeft ? 'items-start pl-10 text-left' : 'items-end pr-10 text-right'
                  }`}>
                    <span className="font-display text-sm font-black uppercase tracking-[0.15em] text-[#ffb44f]">
                      {edu.duration}
                    </span>
                    <span className="text-xs text-[#8a8a8f] uppercase tracking-widest mt-2 font-bold border border-white/5 rounded px-2 py-0.5 bg-[#141416]/50">
                      {edu.status}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
export default Education;
