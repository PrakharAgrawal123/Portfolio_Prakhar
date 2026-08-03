import React, { useState } from 'react';
import { portfolioData } from '../data/portfolio';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { Magnetic } from './Magnetic';
import { Mail, Download, Check, ClipboardCopy, Phone, MapPin } from 'lucide-react';
import { InteractiveHeading } from './InteractiveHeading';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const { setCursor } = usePortfolioStore();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    
    // Spark clean celebration confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ffb44f', '#f2f1ed', '#141416'],
    });

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };



  return (
    <section
      id="contact"
      className="relative w-full py-20 px-6 md:px-12 md:py-32 bg-[#0b0b0d] border-t border-white/5"
    >
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 right-[10%] w-[350px] h-[350px] bg-[#ffb44f]/3 rounded-full filter blur-[90px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          
          {/* Left Columns: Kinetic Header & Copy Trigger */}
          <div className="lg:col-span-3">
            <span className="font-display text-xs font-black uppercase tracking-[0.2em] text-[#ffb44f]">
              09 / COLLABORATION
            </span>

            {/* Kinetic springy text header */}
            <InteractiveHeading text="LET'S WORK TOGETHER" />

            <p className="mt-8 max-w-md font-body text-base leading-relaxed text-[#8a8a8f]">
              I am currently looking for full-time opportunities and internships where I can apply machine learning pipelines, visualization layouts, and analytical model building.
            </p>

            {/* Direct Details Grid */}
            <div className="mt-12 flex flex-col gap-6 text-sm text-[#8a8a8f]">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#ffb44f]" />
                <span>{portfolioData.personal.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#ffb44f]" />
                <span>{portfolioData.personal.phone}</span>
              </div>
            </div>

            {/* Interactive Actions */}
            <div className="mt-12 flex flex-wrap gap-6">
              {/* Copy Email Button */}
              <Magnetic range={30}>
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={() => setCursor('default')}
                  className="flex items-center gap-3 rounded-full bg-[#ffb44f] px-8 py-4 font-display text-sm font-black uppercase tracking-wider text-[#0b0b0d] hover:bg-[#f2f1ed] transition-colors shadow-lg glow-btn"
                >
                  {copied ? (
                    <>
                      <Check size={16} /> Copied!
                    </>
                  ) : (
                    <>
                      <ClipboardCopy size={16} /> Copy Email Address
                    </>
                  )}
                </button>
              </Magnetic>

              {/* Download Resume Button */}
              <Magnetic range={30}>
                <a
                  href={portfolioData.personal.resumeLink}
                  download="Prakhar_Agrawal_Resume.pdf"
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={() => setCursor('default')}
                  className="flex items-center gap-3 rounded-full border border-white/15 bg-[#141416]/40 px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-[#f2f1ed] hover:bg-[#141416]/80 hover:border-white/30 transition-all glow-btn-secondary"
                >
                  <Download size={16} /> Download Resume PDF
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right Columns: Fast Message Card info */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="glass-panel glass-panel-hover rounded-2xl p-8">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-[#ffb44f] block">
                DIRECT CHANNEL
              </span>
              <h3 className="font-display text-xl font-bold text-[#f2f1ed] mt-2">
                Let's start a conversation
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-[#8a8a8f]">
                Need assistance with statistical insights, predictive modelling configurations, or data analytics reporting dashboards? I am available to answer calls, reply to emails, and chat on LinkedIn.
              </p>
              
              <div className="mt-8 border-t border-white/5 pt-6 flex flex-col gap-4">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={() => setCursor('default')}
                  className="flex items-center justify-between text-sm text-[#f2f1ed] hover:text-[#ffb44f] transition-colors"
                >
                  <span>Send direct mail</span>
                  <Mail size={14} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
