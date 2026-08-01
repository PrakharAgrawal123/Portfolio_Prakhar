import React, { useEffect } from 'react';
import { usePortfolioStore } from './store/usePortfolioStore';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';

// Common global components
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { CommandPalette } from './components/CommandPalette';
import { ProjectDetail } from './components/ProjectDetail';



// Content Sections
import { Hero } from './components/Hero';
import { MarqueeStripes } from './components/MarqueeStripes';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { ProjectStack } from './components/ProjectStack';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Achievements } from './components/Achievements';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const { setPrefersReducedMotion, activeProject } = usePortfolioStore();

  // 1. Listen to user prefers-reduced-motion accessibility flag
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, [setPrefersReducedMotion]);

  // 2. Initialize Lenis Inertial Smooth Scrolling & sync with GSAP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // 3. Intersection observer to automatically update navbar highlights
  useEffect(() => {
    const sections = [
      'hero',
      'about',
      'skills',
      'projects',
      'experience',
      'education',
      'achievements',
      'testimonials',
      'contact',
    ];

    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            usePortfolioStore.setState({ activeSection: id });
          }
        },
        {
          rootMargin: '-30% 0px -30% 0px', // Trigger when section occupies core viewport
          threshold: 0.1,
        }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  // 4. Easter Egg Devtools ascii greeting
  useEffect(() => {
    console.log(
      `%c
 _____           _   _               
|  __ \\         | | | |              
| |__) | __ __ _| |_| |__   __ _ _ __ 
|  ___/ '__/ _\` | __| '_ \\ / _\` | '__|
| |   | | | (_| | |_| | | | (_| | |   
|_|   |_|  \\__,_|\\__|_| |_|\\__,_|_|   
                                      
Recruiter Terminal. Hello there! 🚀
Email: agrawalprakhar931@gmail.com
Phone: +91 6390142114
      `,
      'color: #ffb44f; font-weight: bold;'
    );
  }, []);

  return (
    <>
      {/* Dynamic Cursor */}
      <CustomCursor />

      {/* Command Palette Menu overlay */}
      <CommandPalette />

      {/* Initial load curtain preloader */}
      <Preloader />

      {/* Manual Global Grain/Noise Overlay Filter */}
      <div className="pointer-events-none fixed inset-0 z-[9999] h-full w-full overflow-hidden">
        <svg className="h-full w-full opacity-[0.05] mix-blend-overlay">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.15 0"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Navigation Headers */}
      <Navbar />



      {/* Document page nodes */}
      <div className="relative z-10 w-full overflow-hidden">
        <Hero />
        <MarqueeStripes />
        <About />
        <Skills />
        <ProjectStack />
        <Experience />
        <Education />
        <Achievements />
        <Testimonials />
        <Contact />
        <Footer />
      </div>

      {/* Project Case Study Details Dialog Panel */}
      <AnimatePresence>
        {activeProject && <ProjectDetail />}
      </AnimatePresence>
    </>
  );
};

export default App;
