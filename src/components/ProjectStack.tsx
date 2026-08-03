import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { ArrowUpRight, Github } from 'lucide-react';
import { InteractiveHeading } from './InteractiveHeading';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const ProjectStack: React.FC = () => {
  const { setCursor, prefersReducedMotion } = usePortfolioStore();
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Check window width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP Immersive Pinned Full-Screen Stack for Desktop
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const panels = containerRef.current?.querySelectorAll('.project-panel');
    if (!panels || panels.length === 0) return;

    // Set initial properties for physical card stack layout peeking out from behind
    gsap.set(panels, {
      zIndex: (i) => panels.length - i,
      opacity: (i) => (i === 0 ? 1 : 0.8 - i * 0.15),
      y: (i) => i * 20, // Stagger downwards slightly to show depth
      scale: (i) => 1 - i * 0.04, // Stagger scale down
      transformOrigin: 'bottom center',
      pointerEvents: (i) => (i === 0 ? 'auto' : 'none'),
    });

    const totalScrollDist = window.innerHeight * (panels.length - 1);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: () => `+=${totalScrollDist}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (panels.length - 1));
          setActiveIndex(idx);
        },
        onToggle: (self) => {
          if (self.isActive) {
            usePortfolioStore.setState({ activeSection: 'projects' });
          }
        },
      },
    });

    panels.forEach((panel, index) => {
      if (index === panels.length - 1) return; // Last card stays pinned

      // Slide active panel UP and out of the viewport
      tl.to(
        panel,
        {
          yPercent: -120,
          opacity: 0,
          scale: 0.9,
          ease: 'power2.inOut',
        },
        index // Timeline step
      );

      // Scale up and shift remaining cards forward in the stack
      const nextIndex = index + 1;
      const nextPanel = panels[nextIndex];
      if (nextPanel) {
        tl.to(
          nextPanel,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: 'power2.inOut',
          },
          index
        );

        // Bring subsequent cards forward in depth stack
        for (let j = nextIndex + 1; j < panels.length; j++) {
          tl.to(
            panels[j],
            {
              y: (j - nextIndex) * 20,
              scale: 1 - (j - nextIndex) * 0.04,
              opacity: 0.8 - (j - nextIndex) * 0.15,
              ease: 'power2.inOut',
            },
            index
          );
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile, prefersReducedMotion]);

  const handleSwipeReset = () => {
    setMobileActiveIndex(0);
  };

  const handleNextMobile = () => {
    setMobileActiveIndex((prev) => (prev + 1) % portfolioData.projects.length);
  };

  // 1. Static List Grid for Prefers Reduced Motion
  if (prefersReducedMotion) {
    return (
      <section id="projects" className="relative py-20 px-6 md:px-12 md:py-32 bg-[#0b0b0d]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 md:max-w-2xl">
            <span className="font-display text-xs font-black uppercase tracking-[0.2em] text-[#ffb44f]">
              03 / CREATIONS
            </span>
            <InteractiveHeading text="Selected Work" />
            <p className="text-sm text-[#8a8a8f] mt-4">
              Explore my technical creations, algorithms, and analytical pipelines.
            </p>
          </div>

          <div className="flex flex-col gap-24">
            {portfolioData.projects.map((project, index) => (
              <div
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              >
                {/* Left side details */}
                <div className="lg:col-span-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-12 items-center justify-center rounded-full border border-[#ffb44f]/30 bg-[#ffb44f]/5 text-xs font-black uppercase tracking-widest text-[#ffb44f]">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#ffb44f]">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-display text-4xl font-black text-[#f2f1ed] mt-4">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-[#8a8a8f] mt-4 leading-relaxed font-body">
                    {project.description}
                  </p>

                  {/* Project Stats Dashboard */}
                  {project.stats && (
                    <div className="grid grid-cols-3 gap-4 mt-8">
                      {project.stats.map((stat, i) => (
                        <div key={i} className="glass-panel px-4 py-3 rounded-xl border border-white/5 bg-white/[0.01]">
                          <span className="font-display text-xl font-bold text-[#ffb44f]">
                            {stat.value}
                          </span>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-[#8a8a8f] mt-1 block">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mt-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-bold text-[#8a8a8f] border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-4 mt-8">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-[#f2f1ed] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#0b0b0d] hover:bg-[#ffb44f] transition-all"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight size={14} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-white/15 bg-[#141416]/50 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#f2f1ed] hover:border-white/30 transition-all"
                    >
                      <Github size={14} />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>

                {/* Right side Mockup */}
                <div className="lg:col-span-6 flex items-center justify-center">
                  <div className="relative w-full max-w-[540px] aspect-[16/10] rounded-xl border border-white/10 bg-[#141416] p-2 shadow-2xl overflow-hidden">
                    <div className="flex items-center gap-1.5 pb-2 px-2 border-b border-white/5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="relative w-full h-[calc(100%-18px)] rounded-lg overflow-hidden bg-neutral-900 mt-2">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const fb = parent.querySelector('.image-fallback');
                            if (fb) fb.classList.remove('hidden');
                          }
                        }}
                      />
                      <div className="image-fallback absolute inset-0 bg-[#ffb44f]/5 flex items-center justify-center text-xs tracking-widest uppercase font-bold text-[#8a8a8f] opacity-80">
                        {project.title} Preview
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 2. Mobile/Touch Swipe Layout (Replaces horizontal stack deck)
  if (isMobile) {
    const activeProject = portfolioData.projects[mobileActiveIndex];
    return (
      <section id="projects" className="relative py-20 px-6 bg-[#0b0b0d]">
        <div className="mb-12">
          <span className="font-display text-xs font-black uppercase tracking-[0.2em] text-[#ffb44f]">
            03 / CREATIONS
          </span>
          <InteractiveHeading text="Selected Work" className="font-display text-3xl font-black text-[#f2f1ed] mt-4" />
        </div>

        {/* Swipe Stack Card */}
        <div className="relative flex flex-col items-center justify-center min-h-[460px]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={mobileActiveIndex}
              className="glass-panel w-full max-w-md rounded-2xl p-6 relative z-10 flex flex-col justify-between min-h-[440px] bg-[#141416]/90 border border-white/5 glow-card"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -100) {
                  handleNextMobile();
                }
              }}
              onMouseEnter={() => setCursor('drag')}
              onMouseLeave={() => setCursor('default')}
            >
              <div>
                {/* Index & Tag */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-6 w-10 items-center justify-center rounded-full border border-[#ffb44f]/30 bg-[#ffb44f]/5 text-[10px] font-black uppercase tracking-widest text-[#ffb44f]">
                    0{mobileActiveIndex + 1}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffb44f]">
                    {activeProject.category}
                  </span>
                </div>

                {/* Mockup screen */}
                <div className="relative w-full aspect-[16/10] rounded-xl border border-white/10 bg-[#141416] p-1.5 shadow-xl overflow-hidden">
                  <div className="flex items-center gap-1 pb-1.5 px-1 border-b border-white/5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f56]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ffbd2e]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="relative w-full h-[calc(100%-12px)] rounded-lg overflow-hidden bg-neutral-900 mt-1.5">
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const fb = parent.querySelector('.image-fallback');
                          if (fb) fb.classList.remove('hidden');
                        }
                      }}
                    />
                    <div className="image-fallback absolute inset-0 bg-[#ffb44f]/5 flex items-center justify-center text-[10px] tracking-widest uppercase font-bold text-[#8a8a8f] opacity-80">
                      {activeProject.title} Preview
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-display text-2xl font-bold text-[#f2f1ed]">
                    {activeProject.title}
                  </h3>
                  <p className="text-xs text-[#8a8a8f] mt-2 line-clamp-3 leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>
              </div>

              {/* Action and tech footers */}
              <div className="mt-6 border-t border-white/5 pt-4">
                {activeProject.stats && (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {activeProject.stats.map((stat, i) => (
                      <div key={i} className="glass-panel px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/[0.01]">
                        <span className="text-[11px] font-bold text-[#ffb44f]">
                          {stat.value}
                        </span>
                        <p className="text-[7px] font-bold uppercase tracking-widest text-[#8a8a8f] mt-0.5 block">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <a
                    href={activeProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-[#f2f1ed] py-2 text-xs font-black uppercase text-[#0b0b0d]"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight size={12} />
                  </a>
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-[#141416]/50 py-2 text-xs font-bold uppercase text-[#f2f1ed]"
                  >
                    <Github size={12} />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Depth Deck behind active card */}
          <div className="absolute top-4 w-full max-w-sm h-full scale-[0.96] rounded-2xl border border-white/5 bg-[#141416]/50 translate-y-3 z-0 pointer-events-none" />
        </div>

        {/* Control info */}
        <div className="mt-8 flex justify-center items-center gap-4 text-xs font-bold text-[#8a8a8f]">
          <span>Swipe left to cycle projects</span>
          <button onClick={handleSwipeReset} className="text-xs uppercase tracking-widest text-[#ffb44f] font-black underline">
            Reset Stack
          </button>
        </div>
      </section>
    );
  }

  // 3. Desktop Immersive Pinned Full-Screen Stack layout (GSAP ScrollTrigger)
  return (
    <div ref={triggerRef} className="relative w-full overflow-hidden bg-[#0b0b0d]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-start pt-24 pb-12 px-6 md:px-16 relative">
        
        {/* Section Header in Normal Flow (Breathing Room) */}
        <div className="w-full mb-20 shrink-0">
          <span className="font-display text-xs font-black uppercase tracking-[0.25em] text-[#ffb44f]">
            03 / CREATIONS
          </span>
          <InteractiveHeading text="Featured Projects." />
          <div className="h-[1px] w-24 bg-[#ffb44f] mt-6" />
        </div>

        {/* Immersive Stack Panels Window */}
        <div
          ref={containerRef}
          className="relative w-full h-[60vh] min-h-[480px] grow"
        >
          {portfolioData.projects.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={project.id}
                className="project-panel absolute inset-0 w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center bg-[#0b0b0d]"
                style={{ 
                  zIndex: portfolioData.projects.length - index,
                  pointerEvents: isActive ? 'auto' : 'none'
                }}
              >
                
                {/* LEFT COLUMN: Data Details & Indicators (6 cols) */}
                <div className="lg:col-span-6 flex flex-col justify-center pr-4">
                  
                  {/* Category index and Tagging */}
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-12 items-center justify-center rounded-full border border-[#ffb44f]/30 bg-[#ffb44f]/5 text-xs font-black uppercase tracking-widest text-[#ffb44f]">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#ffb44f] tracking-[0.15em]">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-[#f2f1ed] mt-4 leading-none">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-[#8a8a8f] mt-4 leading-relaxed font-body">
                    {project.description}
                  </p>

                  {/* Technical Metrics Stats Panel */}
                  {project.stats && (
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      {project.stats.map((stat, i) => (
                        <div 
                          key={i} 
                          className="glass-panel px-4 py-3 rounded-xl border border-white/5 bg-white/[0.01] hover:border-[#ffb44f]/25 transition-all duration-300"
                        >
                          <span className="font-display text-xl md:text-2xl font-black text-[#ffb44f]">
                            {stat.value}
                          </span>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-[#8a8a8f] mt-1 block">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-bold text-[#8a8a8f] border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA Redirection Links */}
                  <div className="flex items-center gap-4 mt-6">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={() => setCursor('hover')}
                      onMouseLeave={() => setCursor('default')}
                      className="flex items-center gap-2 rounded-full bg-[#f2f1ed] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#0b0b0d] hover:bg-[#ffb44f] hover:text-[#0b0b0d] transition-all glow-btn"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight size={14} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={() => setCursor('hover')}
                      onMouseLeave={() => setCursor('default')}
                      className="flex items-center gap-2 rounded-full border border-white/15 bg-[#141416]/50 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#f2f1ed] hover:border-white/30 hover:text-[#ffb44f] transition-all glow-btn-secondary"
                    >
                      <Github size={14} />
                      <span>Source Code</span>
                    </a>
                  </div>

                </div>

                {/* RIGHT COLUMN: Browser Screenshot Viewer Mockup (6 cols) */}
                <div className="lg:col-span-6 flex items-center justify-center">
                  <div className="relative w-full max-w-[500px] aspect-[16/10] rounded-xl border border-white/10 bg-[#141416] p-2.5 shadow-2xl overflow-hidden group/browser">
                    
                    {/* Traffic Lights Header */}
                    <div className="flex items-center gap-1.5 pb-2 px-1.5 border-b border-white/5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                    </div>

                    {/* Viewport content */}
                    <div className="relative w-full h-[calc(100%-20px)] rounded-lg overflow-hidden bg-neutral-900 mt-2.5">
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
                      <div className="image-fallback absolute inset-0 bg-[#ffb44f]/5 flex items-center justify-center text-xs tracking-widest uppercase font-bold text-[#8a8a8f] opacity-80 transition-transform duration-[6000ms]">
                        {project.title} Preview
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
export default ProjectStack;
