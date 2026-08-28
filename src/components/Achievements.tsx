import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { Award, Code2, Globe, Sparkles } from 'lucide-react';
import { InteractiveHeading } from './InteractiveHeading';

export const Achievements: React.FC = () => {
  const { setCursor } = usePortfolioStore();

  // 
  const getIcon = (type: string) => {
    switch (type) {
      case 'Hackathon':
        return <Sparkles className="text-[#ffb44f]" size={20} />;
      case 'Coding':
        return <Code2 className="text-[#ffb44f]" size={20} />;
      case 'Academic':
        return <Award className="text-[#ffb44f]" size={20} />;
      default:
        return <Globe className="text-[#ffb44f]" size={20} />;
    }
  };

  return (
    <section id="achievements" className="relative w-full py-20 px-6 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Asymmetric Header */}
        <div className="mb-16 md:mb-24 md:max-w-2xl">
          <span className="font-display text-xs font-black uppercase tracking-[0.2em] text-[#ffb44f]">
            07 / RECOGNITION
          </span>
          <InteractiveHeading text="Hackathons, awards, and contributions." />
        </div>

        {/* Asymmetrical Grid of cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {portfolioData.achievements.map((ach, index) => {
            // Apply different visual weights to certain items
            const isFeatured = index === 0 || index === 1;
            
            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={() => setCursor('default')}
                className={`glass-panel glass-panel-hover rounded-2xl p-6 border flex flex-col justify-between ${
                  isFeatured
                    ? 'border-[#ffb44f]/25 bg-[#ffb44f]/[0.02] sm:col-span-2'
                    : 'border-white/5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/5">
                      {getIcon(ach.type)}
                    </span>
                    <span className="font-display text-xs font-bold uppercase tracking-widest text-[#8a8a8f]">
                      {ach.date}
                    </span>
                  </div>

                  <h3 className={`font-display font-bold mt-6 text-[#f2f1ed] ${
                    isFeatured ? 'text-2xl' : 'text-lg'
                  }`}>
                    {ach.title}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#ffb44f] mt-1 block">
                    {ach.organization}
                  </span>
                  <p className="mt-4 font-body text-sm leading-relaxed text-[#8a8a8f]">
                    {ach.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/5 pt-4 text-xs font-bold uppercase tracking-widest text-[#ffb44f]">
                  {ach.type} Achievement {ach.icon}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
