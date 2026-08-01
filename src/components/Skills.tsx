import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { Cpu, Database, Layout, Eye, Wrench, GraduationCap, ChevronRight, Terminal } from 'lucide-react';

type SkillCategories = 'languages' | 'dataScience' | 'visualization' | 'database' | 'web' | 'tools' | 'currentlyLearning';

interface CategoryConfig {
  key: SkillCategories;
  label: string;
  desc: string;
  icon: React.ReactNode;
}

export const Skills: React.FC = () => {
  const { setCursor } = usePortfolioStore();
  const [activeCategory, setActiveCategory] = useState<SkillCategories>('dataScience');

  const categories: CategoryConfig[] = [
    { 
      key: 'dataScience', 
      label: 'Data Science & ML', 
      desc: 'Statistical analysis, modeling & visualization libraries',
      icon: <Cpu className="w-4 h-4" /> 
    },
    { 
      key: 'languages', 
      label: 'Core Languages', 
      desc: 'Programming syntax & scripting bases',
      icon: <Terminal className="w-4 h-4" /> 
    },
    { 
      key: 'database', 
      label: 'Databases', 
      desc: 'Relational & document data models',
      icon: <Database className="w-4 h-4" /> 
    },
    { 
      key: 'web', 
      label: 'Web Technologies', 
      desc: 'Full-stack development, server APIs & frameworks',
      icon: <Layout className="w-4 h-4" /> 
    },
    { 
      key: 'visualization', 
      label: 'Data Visualization', 
      desc: 'Reporting suites and interactive layouts',
      icon: <Eye className="w-4 h-4" /> 
    },
    { 
      key: 'tools', 
      label: 'Developer Tools', 
      desc: 'Version controls, sandboxes & workflows',
      icon: <Wrench className="w-4 h-4" /> 
    },
    { 
      key: 'currentlyLearning', 
      label: 'Currently Learning', 
      desc: 'Advanced architectures and pipelines under study',
      icon: <GraduationCap className="w-4 h-4" /> 
    },
  ];

  // Map detailed metric labels
  const getSkillDetails = (skill: string) => {
    const data: Record<string, { level: number; label: string; exp: string }> = {
      Python: { level: 5, label: 'Expert', exp: '2+ Years' },
      SQL: { level: 5, label: 'Expert', exp: '2+ Years' },
      Java: { level: 4, label: 'Advanced', exp: '1+ Year' },
      JavaScript: { level: 4, label: 'Advanced', exp: '1.5+ Years' },
      C: { level: 3, label: 'Intermediate', exp: '1+ Year' },
      
      Pandas: { level: 5, label: 'Expert', exp: 'Analytics' },
      NumPy: { level: 5, label: 'Expert', exp: 'Computation' },
      Matplotlib: { level: 5, label: 'Expert', exp: 'Plots' },
      Seaborn: { level: 4, label: 'Advanced', exp: 'Plots' },
      'Scikit-Learn': { level: 5, label: 'Expert', exp: 'ML Models' },
      'Machine Learning': { level: 5, label: 'Expert', exp: 'Algorithms' },
      Statistics: { level: 4, label: 'Advanced', exp: 'Probability' },
      
      'Power BI': { level: 5, label: 'Expert', exp: 'Dashboards' },
      Excel: { level: 4, label: 'Advanced', exp: 'Reporting' },
      MySQL: { level: 5, label: 'Expert', exp: 'Queries' },
      MongoDB: { level: 4, label: 'Advanced', exp: 'NoSQL' },
      
      HTML: { level: 5, label: 'Expert', exp: 'Structure' },
      CSS: { level: 4, label: 'Advanced', exp: 'Styling' },
      React: { level: 4, label: 'Advanced', exp: 'UI Library' },
      'Node.js': { level: 4, label: 'Advanced', exp: 'Runtime' },
      Express: { level: 4, label: 'Advanced', exp: 'Server REST' },
      Flask: { level: 5, label: 'Expert', exp: 'ML APIs' },
      
      Git: { level: 5, label: 'Expert', exp: 'vcs' },
      GitHub: { level: 5, label: 'Expert', exp: 'Repo' },
      'VS Code': { level: 5, label: 'Expert', exp: 'IDE' },
      'Jupyter Notebook': { level: 5, label: 'Expert', exp: 'Analytics' },
      'Google Colab': { level: 5, label: 'Expert', exp: 'GPU Runtimes' },
      Firebase: { level: 4, label: 'Advanced', exp: 'DB / Auth' },
      Vercel: { level: 4, label: 'Advanced', exp: 'Deployment' },
      
      'Deep Learning': { level: 3, label: 'Learning', exp: 'Neural Nets' },
      LangChain: { level: 3, label: 'Learning', exp: 'LLM Agents' },
      'Generative AI': { level: 3, label: 'Learning', exp: 'Gemini/GPT' },
      'Apache Spark': { level: 2, label: 'Learning', exp: 'Big Data' },
    };
    return data[skill] || { level: 4, label: 'Advanced', exp: 'Core tool' };
  };

  const getCategorySkills = (cat: SkillCategories): string[] => {
    return portfolioData.skills[cat];
  };

  return (
    <section id="skills" className="relative w-full py-20 px-6 md:px-12 md:py-32 bg-[#0b0b0d] overflow-hidden">
      {/* Decorative cybernetic ambient glow */}
      <div className="absolute top-[10%] left-[-10%] w-[450px] h-[450px] bg-[#ffb44f]/[0.015] rounded-full filter blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <span className="font-display text-xs font-black uppercase tracking-[0.25em] text-[#ffb44f]">
            02 / CORE ENGINE
          </span>
          <h2 className="h-fluid-section text-[#f2f1ed] mt-4 font-black">
            Technical Toolkit
          </h2>
          <div className="h-[1px] w-20 bg-[#ffb44f] mt-6" />
        </div>

        {/* Bento Two-Column Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* LEFT SIDEBAR: Vertical Tab Selectors + Tech Radar Visualization */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-28">
            
            {/* Cybernetic Tech Radar Dashboard Display */}
            <div className="glass-panel rounded-2xl p-6 border border-white/5 bg-[#141416]/30 overflow-hidden relative h-56 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,79,0.03)_0%,transparent_60%)]" />
              
              {/* Dynamic SVG Neural Matrix mapping coordinates based on activeCategory */}
              <svg width="180" height="180" viewBox="0 0 100 100" className="overflow-visible opacity-70">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255, 180, 79, 0.08)" strokeWidth="1" strokeDasharray="3,3" />
                <circle cx="50" cy="50" r="25" fill="none" stroke="rgba(255, 180, 79, 0.05)" strokeWidth="1" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="rgba(255, 180, 79, 0.03)" strokeWidth="1" />
                
                {/* Crosshairs */}
                <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255, 180, 79, 0.04)" strokeWidth="0.5" />
                <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255, 180, 79, 0.04)" strokeWidth="0.5" />

                {/* Pulsing nodes */}
                <g className="origin-center animate-spin" style={{ animationDuration: '40s' }}>
                  <circle cx="30" cy="20" r="1.5" fill="#ffb44f" className="animate-pulse" />
                  <circle cx="70" cy="30" r="1" fill="#8a8a8f" />
                  <circle cx="20" cy="65" r="1.5" fill="#ffb44f" />
                  <circle cx="65" cy="80" r="2" fill="#ffe2b3" />
                </g>

                {/* Animated active category vector shape */}
                <polygon
                  points={
                    activeCategory === 'dataScience' ? "50,22 72,42 58,74 32,58" :
                    activeCategory === 'languages' ? "50,15 80,50 50,85 20,50" :
                    activeCategory === 'database' ? "40,30 75,35 60,70 30,60" :
                    activeCategory === 'web' ? "50,25 65,45 55,65 35,55" :
                    activeCategory === 'visualization' ? "48,32 68,48 52,68 38,52" :
                    activeCategory === 'tools' ? "52,28 72,52 48,72 28,48" :
                    "50,30 68,50 50,70 32,50"
                  }
                  fill="rgba(255, 180, 79, 0.06)"
                  stroke="#ffb44f"
                  strokeWidth="1.5"
                  className="transition-all duration-700"
                />

                <circle cx="50" cy="50" r="4" fill="#0b0b0d" stroke="#ffb44f" strokeWidth="2" />
              </svg>

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-white/5 pt-4 text-[9px] font-black uppercase tracking-widest text-[#8a8a8f]">
                <span>Status: Optimal</span>
                <span className="text-[#ffb44f] animate-pulse">Scanning Grid...</span>
              </div>
            </div>

            {/* Vertical Custom Tabs */}
            <div className="flex flex-col gap-2.5">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    onMouseEnter={() => setCursor('hover')}
                    onMouseLeave={() => setCursor('default')}
                    className={`group relative flex items-center justify-between rounded-xl px-5 py-4 border text-left transition-all duration-300 ${
                      isActive 
                        ? 'border-[#ffb44f]/30 bg-[#ffb44f]/[0.02] shadow-[0_8px_20px_-10px_rgba(255,180,79,0.15)]'
                        : 'border-white/5 bg-[#141416]/20 hover:border-white/10 hover:bg-[#141416]/50'
                    }`}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      {/* Active Indicator Slide dot */}
                      <div className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-[#ffb44f] scale-120 shadow-[0_0_8px_#ffb44f]' : 'bg-white/15'
                      }`} />
                      
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-[#8a8a8f] group-hover:text-[#ffb44f] group-hover:border-[#ffb44f]/20 transition-colors">
                        {cat.icon}
                      </div>
                      <div>
                        <h4 className={`font-display text-sm font-bold tracking-wide transition-colors ${
                          isActive ? 'text-[#ffb44f]' : 'text-[#f2f1ed]'
                        }`}>
                          {cat.label}
                        </h4>
                        <p className="text-[10px] text-[#8a8a8f] mt-0.5 line-clamp-1">
                          {cat.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={14} className={`text-[#8a8a8f] group-hover:text-[#ffb44f] transition-transform ${
                      isActive ? 'translate-x-1 text-[#ffb44f]' : ''
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT GRID: Dynamic Skill Bento Cards */}
          <div className="lg:col-span-7">
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {getCategorySkills(activeCategory).map((skill, index) => {
                  const details = getSkillDetails(skill);
                  return (
                    <motion.div
                      key={skill}
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -15 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 200, delay: index * 0.04 }}
                      onMouseEnter={() => setCursor('hover')}
                      onMouseLeave={() => setCursor('default')}
                      className="group glass-panel rounded-2xl p-6 border border-white/5 hover:border-[#ffb44f]/30 transition-all duration-300 flex flex-col justify-between min-h-[150px] relative overflow-hidden bg-[#141416]/10 glow-card"
                    >
                      {/* Subtle Ambient Backlight on Hover */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,79,0.08)_0%,transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Header details */}
                      <div className="flex items-start justify-between relative z-10">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#8a8a8f]">
                            {details.exp}
                          </span>
                          <h3 className="font-display text-xl font-bold mt-1 text-[#f2f1ed]">
                            {skill}
                          </h3>
                        </div>

                        {/* Custom Proficiency Badge */}
                        <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest border transition-colors ${
                          details.label === 'Expert' 
                            ? 'bg-[#ffb44f]/10 text-[#ffb44f] border-[#ffb44f]/20 shadow-[0_0_10px_rgba(255,180,79,0.05)]'
                            : details.label === 'Advanced'
                            ? 'bg-[#f2f1ed]/5 text-[#f2f1ed] border-white/10'
                            : 'bg-white/5 text-[#8a8a8f] border-white/5'
                        }`}>
                          {details.label}
                        </span>
                      </div>

                      {/* Dynamic Skill Level Progress Bar */}
                      <div className="mt-8 relative z-10 flex flex-col gap-2">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-[#8a8a8f]">
                          <span>Strength</span>
                          <span className="text-[#ffb44f]">{details.level * 20}%</span>
                        </div>
                        
                        {/* Track bar */}
                        <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden relative">
                          {/* Active level progress fill on hover */}
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${details.level * 20}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut', delay: index * 0.05 }}
                            className="h-full bg-gradient-to-r from-[#b37a22] to-[#ffb44f] rounded-full group-hover:shadow-[0_0_8px_#ffb44f] transition-all"
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default Skills;
