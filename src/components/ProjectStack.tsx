import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { ArrowRight, Award, Info, Github } from 'lucide-react';
import { InteractiveHeading } from './InteractiveHeading';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const ProjectStack: React.FC = () => {
  const { setCursor, setActiveProject, prefersReducedMotion } = usePortfolioStore();
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  // Check window width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP Pinned Card Stack for Desktop
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const cards = containerRef.current?.querySelectorAll('.project-card');
    if (!cards || cards.length === 0) return;

    // Set initial offsets for vertical depth stacking (first project on top)
    gsap.set(cards, {
      zIndex: (i) => cards.length - i, // First project sits at highest z-index
      y: (i) => i * 16, // Stagger downwards slightly
      scale: (i) => 1 - i * 0.04, // First project has scale 1.0, next cards scale down slightly
      transformOrigin: 'bottom center',
    });

    const totalScrollDist = window.innerHeight * (cards.length - 1);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: () => `+=${totalScrollDist}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onToggle: (self) => {
          if (self.isActive) {
            usePortfolioStore.setState({ activeSection: 'projects' });
          }
        },
      },
    });

    cards.forEach((card, index) => {
      if (index === cards.length - 1) return; // Last card stays pinned

      // Fly-up exit animation for current top card (vertical direction)
      tl.to(
        card,
        {
          yPercent: -135, // Slides UP and out of the viewport
          rotation: -2, // Subtle rotation for physics feel
          opacity: 0,
          scale: 0.9,
          ease: 'power2.inOut',
        },
        index // timeline trigger step
      );

      // Scale up and translate remaining cards in stack
      const nextIndex = index + 1;
      const nextCard = cards[nextIndex];
      if (nextCard) {
        tl.to(
          nextCard,
          {
            y: 0, // Slides to active center position
            scale: 1,
            ease: 'power2.inOut',
          },
          index // sync to active card's exit step
        );

        // Shift up and scale up any remaining cards further back
        for (let j = nextIndex + 1; j < cards.length; j++) {
          tl.to(
            cards[j],
            {
              y: (j - nextIndex) * 16,
              scale: 1 - (j - nextIndex) * 0.04,
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

  // 1. Standard Static Grid for Prefers Reduced Motion
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
              Click on a card to test the live deployment, or choose Info/Code below.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {portfolioData.projects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  if (project.live && project.live !== '#') {
                    window.open(project.live, '_blank');
                  } else {
                    setActiveProject(project);
                  }
                }}
                className="glass-panel glass-panel-hover group rounded-2xl p-6 cursor-pointer glow-card relative overflow-hidden"
              >
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-neutral-900 border border-white/5 relative">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const fb = parent.querySelector('.image-fallback');
                          if (fb) fb.classList.remove('hidden');
                        }
                      }}
                    />
                  )}
                  <div className="image-fallback absolute inset-0 bg-[#ffb44f]/5 flex items-center justify-center text-xs tracking-widest uppercase font-bold text-[#8a8a8f] opacity-80 transition-transform duration-[6000ms]">
                    {project.title} Preview Image
                  </div>

                  {/* Spinner overlay */}
                  <div className="absolute inset-0 bg-[#0b0b0d]/70 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="relative h-10 w-10 flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb44f] opacity-25"></span>
                      <div className="h-8 w-8 rounded-full border-2 border-white/5 border-t-[#ffb44f] animate-spin" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#ffb44f]">Launch Live App</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#ffb44f]">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mt-2 text-[#f2f1ed]">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#8a8a8f] mt-3 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Footer actions */}
                  <div className="border-t border-white/5 pt-4 flex items-center justify-between mt-6">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="rounded bg-white/5 px-2 py-0.5 text-xs font-bold text-[#8a8a8f]">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProject(project);
                        }}
                        className="flex items-center gap-1 rounded bg-[#141416]/50 border border-white/10 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-[#f2f1ed] hover:border-[#ffb44f] transition-all glow-btn-secondary"
                      >
                        <Info size={11} /> About
                      </button>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 rounded bg-[#141416]/50 border border-white/10 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-[#f2f1ed] hover:border-[#ffb44f] transition-all glow-btn-secondary"
                      >
                        <Github size={11} /> Code
                      </a>
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

  // 2. Mobile/Touch Swipe Layout (No hover spinner, clicks open live app, bottom buttons work)
  if (isMobile) {
    const activeProject = portfolioData.projects[mobileActiveIndex];
    return (
      <section id="projects" className="relative py-20 px-6 bg-[#0b0b0d]">
        <div className="mb-12">
          <span className="font-display text-xs font-black uppercase tracking-[0.2em] text-[#ffb44f]">
            03 / CREATIONS
          </span>
          <h2 className="font-display text-3xl font-black text-[#f2f1ed] mt-4">Selected Work</h2>
        </div>

        {/* Swipe Stack Deck */}
        <div className="relative flex flex-col items-center justify-center min-h-[440px]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={mobileActiveIndex}
              onClick={() => {
                if (activeProject.live && activeProject.live !== '#') {
                  window.open(activeProject.live, '_blank');
                } else {
                  setActiveProject(activeProject);
                }
              }}
              className="glass-panel glass-panel-hover w-full max-w-sm rounded-2xl p-6 relative z-10 cursor-pointer flex flex-col justify-between h-auto min-h-[400px]"
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
                <div className="aspect-video w-full rounded-xl bg-neutral-900 flex items-center justify-center border border-white/5 relative overflow-hidden">
                  {activeProject.image && (
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
                  )}
                  <div className="image-fallback absolute inset-0 bg-[#ffb44f]/5 flex items-center justify-center text-xs tracking-widest uppercase font-bold text-[#8a8a8f] opacity-80">
                    {activeProject.title} Preview Image
                  </div>
                </div>
                <div className="mt-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#ffb44f]">
                    {activeProject.category}
                  </span>
                  <h3 className="font-display text-2xl font-bold mt-2 text-[#f2f1ed]">
                    {activeProject.title}
                  </h3>
                  <p className="text-xs text-[#8a8a8f] mt-3 line-clamp-3 leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-white/5 pt-4">
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {activeProject.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="rounded bg-white/5 px-2 py-0.5 text-xs font-bold text-[#8a8a8f]">
                      {tech}
                    </span>
                  ))}
                </div>
                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveProject(activeProject);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-[#141416]/50 py-2 text-xs font-bold uppercase tracking-widest text-[#f2f1ed] hover:border-[#ffb44f] transition-all glow-btn-secondary"
                  >
                    <Info size={11} /> About
                  </button>
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-[#141416]/50 py-2 text-xs font-bold uppercase tracking-widest text-[#f2f1ed] hover:border-[#ffb44f] transition-all glow-btn-secondary"
                  >
                    <Github size={11} /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Depth Deck behind active card */}
          <div className="absolute top-4 w-full max-w-sm h-full scale-[0.96] rounded-2xl border border-white/5 bg-[#141416]/50 translate-y-3 z-0 pointer-events-none" />
        </div>

        {/* Swipe Control Info */}
        <div className="mt-8 flex justify-center items-center gap-4 text-xs font-bold text-[#8a8a8f]">
          <span>Swipe card left to cycle</span>
          <button onClick={handleSwipeReset} className="text-xs uppercase tracking-widest text-[#ffb44f] font-black underline">
            Reset Stack
          </button>
        </div>
      </section>
    );
  }

  // 3. Desktop Pinned Stack layout (GSAP ScrollTrigger - 2-Column Bento Cards)
  return (
    <div ref={triggerRef} className="relative w-full overflow-hidden bg-[#0b0b0d]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-center px-6 md:px-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 h-[80vh] min-h-[580px]">
          
          {/* Static Left Side (Title) */}
          <div className="lg:col-span-4 lg:py-16">
            <span className="font-display text-xs font-black uppercase tracking-[0.2em] text-[#ffb44f]">
              03 / CREATIONS
            </span>
            <InteractiveHeading text="Solving complex data puzzles." />
            <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-[#8a8a8f]">
              Click on the active card to launch its live deployment. Stretched layout provides tech badges, code repositories, and structural details easily.
            </p>
            <div className="mt-8 hidden lg:flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#8a8a8f]">
              <span>Scroll to navigate stack</span>
              <ArrowRight size={14} className="animate-bounce" />
            </div>
          </div>

          {/* Cards Stack Window */}
          <div
            ref={containerRef}
            className="relative lg:col-span-8 flex items-center justify-center h-full w-full min-h-[480px]"
          >
            {portfolioData.projects.map((project) => {
              return (
                <div
                  key={project.id}
                  onClick={() => {
                    if (project.live && project.live !== '#') {
                      window.open(project.live, '_blank');
                    } else {
                      setActiveProject(project);
                    }
                  }}
                  onMouseEnter={() => setCursor('view')}
                  onMouseLeave={() => setCursor('default')}
                  className="project-card absolute glass-panel cursor-pointer rounded-2xl p-6 md:p-8 flex flex-col justify-between w-full max-w-full lg:max-w-[900px] h-auto min-h-[400px] md:h-[400px] glow-card group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full items-stretch">
                    
                    {/* LEFT COLUMN: Image & Hover Spinner (5 cols on md+) */}
                    <div className="md:col-span-5 relative aspect-video md:aspect-auto w-full overflow-hidden rounded-xl bg-neutral-900 border border-white/5 group min-h-[160px] md:h-full">
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              const fb = parent.querySelector('.image-fallback');
                              if (fb) fb.classList.remove('hidden');
                            }
                          }}
                        />
                      )}
                      <div className="image-fallback absolute inset-0 bg-[#ffb44f]/5 flex items-center justify-center text-xs tracking-widest uppercase font-bold text-[#8a8a8f] opacity-80">
                        {project.title} Preview Image
                      </div>

                      {/* Rotating Spinner Overlay on Hover */}
                      <div className="absolute inset-0 bg-[#0b0b0d]/75 flex flex-col items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <div className="relative h-10 w-10 flex items-center justify-center">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb44f] opacity-20"></span>
                          <div className="h-8 w-8 rounded-full border-2 border-white/5 border-t-[#ffb44f] animate-spin" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#ffb44f]">Launch Live App</span>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Content details (7 cols on md+) */}
                    <div className="md:col-span-7 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-widest text-[#ffb44f]">
                            {project.category}
                          </span>
                          {project.featured && (
                            <span className="flex items-center gap-1 text-xs font-bold text-[#f2f1ed]/50">
                              <Award size={10} className="text-[#ffb44f]" /> Featured
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-2xl font-black mt-2 text-[#f2f1ed]">
                          {project.title}
                        </h3>
                        <p className="text-xs md:text-sm text-[#8a8a8f] mt-3 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Actions footer */}
                      <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                        <div className="flex flex-wrap gap-1">
                          {project.techStack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded bg-white/5 px-2 py-0.5 text-xs font-bold text-[#8a8a8f]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveProject(project);
                            }}
                            className="flex items-center gap-1 rounded bg-[#141416]/50 border border-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#f2f1ed] hover:border-[#ffb44f] transition-all glow-btn-secondary"
                          >
                            <Info size={11} /> About
                          </button>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 rounded bg-[#141416]/50 border border-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#f2f1ed] hover:border-[#ffb44f] transition-all glow-btn-secondary"
                          >
                            <Github size={11} /> Code
                          </a>
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
    </div>
  );
};
export default ProjectStack;
