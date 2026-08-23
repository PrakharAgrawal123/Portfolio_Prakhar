import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData, type Project } from '../data/portfolio';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { ArrowUpRight, Github, ExternalLink, Sparkles, Layers } from 'lucide-react';
import { InteractiveHeading } from './InteractiveHeading';

export const ProjectStack: React.FC = () => {
  const { setCursor, setActiveProject } = usePortfolioStore();

  return (
    <section
      id="projects"
      className="relative w-full py-20 px-4 sm:px-6 md:px-12 md:py-32 bg-[#0b0b0d] border-t border-white/5 overflow-visible"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ffb44f]/[0.02] rounded-full filter blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ffb44f]/20 bg-[#ffb44f]/5 px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-[#ffb44f] mb-4">
            <Layers size={13} className="text-[#ffb44f]" />
            <span>03 / SELECTED WORKS</span>
          </div>
          <InteractiveHeading text="Featured Projects." />
          <p className="text-sm md:text-base text-[#8a8a8f] mt-4 max-w-2xl leading-relaxed">
            A curated showcase of end-to-end data analytics, machine learning systems, and AI-driven platforms built to solve real-world problems.
          </p>
          <div className="h-[1px] w-24 bg-gradient-to-r from-[#ffb44f] to-transparent mt-6" />
        </div>

        {/* Stacking Cards Deck (Sticky Scroll Deck) */}
        <div className="relative flex flex-col gap-10 md:gap-16 pb-12">
          {portfolioData.projects.map((project: Project, index: number) => {
            return (
              <div
                key={project.id}
                className="sticky w-full rounded-3xl transition-all duration-300"
                style={{
                  top: `calc(90px + ${index * 16}px)`,
                  zIndex: 10 + index,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="w-full rounded-3xl bg-[#141416]/95 border border-white/10 p-6 sm:p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl hover:border-[#ffb44f]/30 transition-all duration-500 relative overflow-hidden group"
                >
                  {/* Subtle card top gradient accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffb44f]/30 to-transparent group-hover:via-[#ffb44f]/70 transition-all duration-500" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* LEFT COLUMN: Project Details & Actions (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        {/* Index & Category Badge */}
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="flex h-7 px-3 items-center justify-center rounded-full border border-[#ffb44f]/30 bg-[#ffb44f]/10 text-xs font-black uppercase tracking-widest text-[#ffb44f]">
                            0{index + 1}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffb44f]">
                            {project.category}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-[#8a8a8f]" />
                          <span className="text-xs text-[#8a8a8f] font-mono">
                            Project #{project.id}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#f2f1ed] mt-4 leading-tight group-hover:text-white transition-colors">
                          {project.title}
                        </h3>

                        {/* Full Detailed Description (No truncation) */}
                        <p className="text-sm md:text-base text-[#a0a0a5] mt-4 leading-relaxed font-body">
                          {project.description}
                        </p>

                        {/* Key Performance Stats Grid */}
                        {project.stats && project.stats.length > 0 && (
                          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
                            {project.stats.map((stat, i) => (
                              <div
                                key={i}
                                className="glass-panel px-3.5 py-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[#ffb44f]/30 hover:bg-[#ffb44f]/[0.03] transition-all duration-300"
                              >
                                <span className="font-display text-lg sm:text-xl lg:text-2xl font-black text-[#ffb44f] block">
                                  {stat.value}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a8a8f] mt-1 block">
                                  {stat.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tech Stack Badges */}
                        <div className="flex flex-wrap gap-2 mt-6">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-[#8a8a8f] border border-white/5 hover:text-[#f2f1ed] hover:border-white/20 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons Row */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/5">
                        {/* Live Demo Button */}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setCursor('hover')}
                            onMouseLeave={() => setCursor('default')}
                            className="flex items-center gap-2 rounded-full bg-[#ffb44f] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#0b0b0d] hover:bg-[#f2f1ed] transition-all duration-300 shadow-lg glow-btn"
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight size={14} className="stroke-[2.5]" />
                          </a>
                        )}

                        {/* Source Code Button */}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setCursor('hover')}
                            onMouseLeave={() => setCursor('default')}
                            className="flex items-center gap-2 rounded-full border border-white/15 bg-[#141416]/80 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#f2f1ed] hover:border-[#ffb44f] hover:text-[#ffb44f] transition-all duration-300 glow-btn-secondary"
                          >
                            <Github size={14} />
                            <span>Source Code</span>
                          </a>
                        )}

                        {/* Details Modal Trigger */}
                        <button
                          onClick={() => setActiveProject(project)}
                          onMouseEnter={() => setCursor('hover')}
                          onMouseLeave={() => setCursor('default')}
                          className="flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-[#8a8a8f] hover:text-[#f2f1ed] hover:border-white/30 transition-all duration-300 ml-auto"
                        >
                          <Sparkles size={13} className="text-[#ffb44f]" />
                          <span>Case Study</span>
                        </button>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Browser Screen Mockup (5 cols) */}
                    <div className="lg:col-span-5 flex items-center justify-center">
                      <div className="relative w-full aspect-[16/11] rounded-2xl border border-white/10 bg-[#0e0e10] p-2.5 sm:p-3 shadow-2xl overflow-hidden group/browser hover:border-[#ffb44f]/30 transition-all duration-500">
                        {/* Traffic Lights Header Bar */}
                        <div className="flex items-center justify-between pb-2.5 px-2 border-b border-white/5">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-[#8a8a8f]/60 font-mono">
                            <ExternalLink size={10} />
                            <span className="truncate max-w-[140px]">
                              {project.title.toLowerCase().replace(/\s+/g, '-')}.app
                            </span>
                          </div>
                        </div>

                        {/* Viewport content */}
                        <div className="relative w-full h-[calc(100%-24px)] rounded-xl overflow-hidden bg-[#141416] mt-2 flex items-center justify-center">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover/browser:scale-105"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  const fb = parent.querySelector('.image-fallback');
                                  if (fb) fb.classList.remove('hidden');
                                }
                              }}
                            />
                          ) : null}
                          <div className="image-fallback absolute inset-0 bg-gradient-to-br from-[#141416] via-[#1a1a1e] to-[#0e0e10] p-6 flex flex-col items-center justify-center text-center">
                            <div className="h-12 w-12 rounded-2xl bg-[#ffb44f]/10 border border-[#ffb44f]/20 flex items-center justify-center text-[#ffb44f] mb-3">
                              <Sparkles size={20} />
                            </div>
                            <span className="font-display text-sm font-bold text-[#f2f1ed]">
                              {project.title}
                            </span>
                            <span className="text-[10px] font-semibold text-[#8a8a8f] uppercase tracking-widest mt-1">
                              {project.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectStack;
