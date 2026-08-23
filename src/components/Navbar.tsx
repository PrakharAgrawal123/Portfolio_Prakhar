import React, { useEffect, useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { Terminal, Menu, X } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { activeSection, setCommandPaletteOpen, setCursor } = usePortfolioStore();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Background blur trigger
      setScrolled(window.scrollY > 50);

      // Scroll progress computation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Education', id: 'education' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0b0b0d]/85 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent py-5'
        }`}
      >
        {/* Top scroll progress line */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#ffb44f] to-[#ffe2b3] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex items-center justify-between">
            {/* Logo / Initials */}
            <button
              onClick={() => handleNavClick('hero')}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={() => setCursor('default')}
              className="font-display text-xl font-black tracking-tighter text-[#f2f1ed] hover:text-[#ffb44f] transition-colors"
            >
              P.A<span className="text-[#ffb44f]">.</span>
            </button>

            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={() => setCursor('hover')}
                    onMouseLeave={() => setCursor('default')}
                    className={`font-body text-xs lg:text-sm font-bold uppercase tracking-widest transition-all duration-300 relative py-1 ${
                      isActive ? 'text-[#ffb44f]' : 'text-[#8a8a8f] hover:text-[#f2f1ed]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#ffb44f]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Actions & Mobile Menu Toggle */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Magnetic range={40} strength={0.3}>
                <button
                  onClick={() => setCommandPaletteOpen(true)}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={() => setCursor('default')}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 sm:px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#f2f1ed] hover:bg-[#ffb44f] hover:text-[#0b0b0d] hover:border-[#ffb44f] transition-all duration-300 shadow-inner glow-btn"
                >
                  <Terminal size={14} />
                  <span className="hidden sm:inline">Cmd+K</span>
                </button>
              </Magnetic>

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex md:hidden items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-[#141416] text-[#f2f1ed] hover:text-[#ffb44f] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[65px] z-40 bg-[#0e0e10]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between text-left py-2 font-display text-lg font-bold tracking-wider transition-colors ${
                      isActive ? 'text-[#ffb44f]' : 'text-[#f2f1ed] hover:text-[#ffb44f]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ffb44f]" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
