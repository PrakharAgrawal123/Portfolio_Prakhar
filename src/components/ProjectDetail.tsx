import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { X, Github, ExternalLink, Activity, Cpu, ShieldAlert } from 'lucide-react';
import { Magnetic } from './Magnetic';

export const ProjectDetail: React.FC = () => {
  const { activeProject, setActiveProject, setCursor } = usePortfolioStore();

  if (!activeProject) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-end bg-black/80 p-4 md:p-6 backdrop-blur-md overflow-y-auto"
    >
      {/* Outer Close Trigger */}
      <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveProject(null)} />

      {/* Case Study Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative z-10 w-full max-w-4xl rounded-2xl border border-white/10 bg-[#141416] p-6 shadow-2xl md:p-10 no-scrollbar overflow-y-auto h-full max-h-[92vh] flex flex-col justify-between"
      >
        {/* Header Options */}
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#ffb44f]">
              {activeProject.category}
            </span>
            <h2 className="font-display text-3xl font-black text-[#f2f1ed] mt-2 md:text-4xl">
              {activeProject.title}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Close Button */}
            <Magnetic range={30}>
              <button
                onClick={() => setActiveProject(null)}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={() => setCursor('default')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f2f1ed] hover:border-[#ffb44f] hover:text-[#ffb44f] transition-all"
                aria-label="Close Case Study"
              >
                <X size={18} />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-8">
          
          {/* Main Case Details (Problem & Process) */}
          <div className="md:col-span-2 flex flex-col gap-8">
            {/* The Problem */}
            <div>
              <h4 className="flex items-center gap-2 font-display text-xs font-black uppercase tracking-widest text-[#ffb44f]">
                <ShieldAlert size={14} /> The Problem
              </h4>
              <p className="mt-4 font-body text-sm leading-relaxed text-[#8a8a8f] md:text-base">
                {activeProject.problem}
              </p>
            </div>

            {/* Implementation Process */}
            <div>
              <h4 className="flex items-center gap-2 font-display text-xs font-black uppercase tracking-widest text-[#ffb44f]">
                <Cpu size={14} /> Development Process
              </h4>
              <p className="mt-4 font-body text-sm leading-relaxed text-[#8a8a8f] md:text-base">
                {activeProject.process}
              </p>
            </div>

            {/* Large Description */}
            <div>
              <h4 className="font-display text-xs font-black uppercase tracking-widest text-[#8a8a8f]">
                Project Overview
              </h4>
              <p className="mt-4 font-body text-sm leading-relaxed text-[#8a8a8f]">
                {activeProject.longDescription}
              </p>
            </div>
          </div>

          {/* Sidebar (Role, Outcomes, Features, Tech Stack) */}
          <div className="flex flex-col gap-8 border-t border-white/5 pt-8 md:border-t-0 md:pt-0 md:border-l md:border-white/5 md:pl-8">
            {/* My Role */}
            <div>
              <span className="font-display text-[10px] font-black uppercase tracking-widest text-[#8a8a8f]">
                My Role
              </span>
              <p className="mt-2 font-body text-xs leading-relaxed text-[#f2f1ed]">
                {activeProject.role}
              </p>
            </div>

            {/* Impact Metric Outcomes */}
            <div className="rounded-xl bg-[#ffb44f]/[0.02] border border-[#ffb44f]/10 p-4">
              <h5 className="flex items-center gap-1.5 font-display text-[10px] font-black uppercase tracking-widest text-[#ffb44f]">
                <Activity size={12} /> Key Outcome
              </h5>
              <p className="mt-2 font-body text-xs leading-relaxed text-[#f2f1ed]">
                {activeProject.outcomes}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <span className="font-display text-[10px] font-black uppercase tracking-widest text-[#8a8a8f]">
                Features
              </span>
              <ul className="mt-3 flex flex-col gap-2">
                {activeProject.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-[#8a8a8f]">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffb44f]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <span className="font-display text-[10px] font-black uppercase tracking-widest text-[#8a8a8f]">
                Technologies Used
              </span>
              <div className="flex flex-wrap gap-2 mt-3">
                {activeProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold text-[#f2f1ed] border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 border-t border-white/5 pt-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <Magnetic range={30}>
              <a
                href={activeProject.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={() => setCursor('default')}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-[#141416] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#f2f1ed] hover:border-[#ffb44f] hover:text-[#ffb44f] transition-all"
              >
                <Github size={14} /> Repository
              </a>
            </Magnetic>

            {activeProject.live !== '#' && (
              <Magnetic range={30}>
                <a
                  href={activeProject.live}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={() => setCursor('default')}
                  className="flex items-center gap-2 rounded-full bg-[#ffb44f] px-6 py-3 text-xs font-black uppercase tracking-wider text-[#0b0b0d] hover:bg-[#f2f1ed] transition-colors"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              </Magnetic>
            )}
          </div>

          <button
            onClick={() => setActiveProject(null)}
            className="text-[10px] font-black uppercase tracking-widest text-[#8a8a8f] hover:text-[#ffb44f] transition-colors"
          >
            Back to Stack
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
