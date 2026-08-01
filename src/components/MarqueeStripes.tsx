import React from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const MarqueeStripes: React.FC = () => {
  const { setCursor } = usePortfolioStore();

  const textGroup1 = "DATA SCIENCE ✦ MACHINE LEARNING ✦ DEEP LEARNING  ✦ NATURAL LANGUAGE PROCESSING ✦ LARGE LANGUAGE MODELS ";
  const textGroup2 = "STATISTICAL ANALYSIS ✦ PYTHON ✦ SQL ✦ POWER BI ✦ NEURAL NETWORKS ✦ COMPUTER VISION";

  // Repeat text to ensure seamless infinite looping widths
  const content1 = Array(4).fill(textGroup1).join("");
  const content2 = Array(4).fill(textGroup2).join("");

  return (
    <div 
      className="relative w-full h-44 md:h-56 overflow-hidden bg-[#0b0b0d] my-12 select-none flex items-center"
      onMouseEnter={() => setCursor('hover')}
      onMouseLeave={() => setCursor('default')}
    >
      {/* Background radial accent flare */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,79,0.03)_0%,transparent_60%)] pointer-events-none" />

      {/* Stripe 1: Moving Left (Amber Gold background, black text, tilted at -2.5deg) */}
      <div 
        className="absolute w-[120%] left-[-10%] bg-[#ffb44f] py-3.5 md:py-4.5 shadow-[0_4px_30px_rgba(255,180,79,0.15)] overflow-hidden flex items-center"
        style={{ transform: 'rotate(-2.5deg)', zIndex: 10 }}
      >
        <div className="animate-marquee whitespace-nowrap flex text-[#0b0b0d] font-display text-xs md:text-sm font-black uppercase tracking-widest leading-none">
          <span>{content1}</span>
        </div>
      </div>

      {/* Stripe 2: Moving Right (Charcoal background, gold text, tilted at 1.5deg) */}
      <div 
        className="absolute w-[120%] left-[-10%] bg-[#141416] border-y border-[#ffb44f]/25 py-3 md:py-4 shadow-2xl overflow-hidden flex items-center"
        style={{ transform: 'rotate(1.5deg)', zIndex: 5 }}
      >
        <div className="animate-marquee-reverse whitespace-nowrap flex text-[#ffe2b3] font-display text-[10px] md:text-xs font-bold uppercase tracking-widest leading-none">
          <span>{content2}</span>
        </div>
      </div>
    </div>
  );
};
export default MarqueeStripes;
