import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { GraduationCap, Award, ExternalLink, Calendar, ChevronRight } from 'lucide-react';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  link: string;
  icon: string;
}

export const Education: React.FC = () => {
  const { setCursor } = usePortfolioStore();
  const [certIndex, setCertIndex] = useState(0);

  const certifications: Certification[] = [
    {
      id: 1,
      title: "Data Science Professional Certificate",
      issuer: "IBM SkillsBuild",
      date: "Jul 2026",
      link: "https://www.credly.com",
      icon: "📊"
    },
    {
      id: 2,
      title: "Google Data Analytics Certificate",
      issuer: "Google / Coursera",
      date: "Nov 2025",
      link: "https://www.credly.com",
      icon: "🔍"
    },
    {
      id: 3,
      title: "Machine Learning Foundations",
      issuer: "DeepLearning.AI",
      date: "Mar 2026",
      link: "https://www.credly.com",
      icon: "🧠"
    },
    {
      id: 4,
      title: "Power BI Data Analyst Associate",
      issuer: "Microsoft",
      date: "Sep 2025",
      link: "https://learn.microsoft.com",
      icon: "📈"
    },
    {
      id: 5,
      title: "Generative AI Fundamentals",
      issuer: "Google Cloud",
      date: "Jan 2026",
      link: "https://www.cloudskillsboost.google",
      icon: "🤖"
    }
  ];

  const handleNextCert = () => {
    setCertIndex((prev) => (prev + 1) % certifications.length);
  };

  return (
    <section id="education" className="relative w-full py-20 px-6 md:px-12 md:py-32 bg-[#0b0b0d]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
          
          {/* Left Column: Academic Credentials */}
          <div className="lg:col-span-3">
            <div className="mb-12">
              <span className="font-display text-xs font-black uppercase tracking-[0.2em] text-[#ffb44f]">
                05 / KNOWLEDGE
              </span>
              <h2 className="h-fluid-section text-[#f2f1ed] mt-4">Academic Background</h2>
            </div>

            <div className="flex flex-col gap-6">
              {portfolioData.education.map((edu) => (
                <div
                  key={edu.id}
                  className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/5 flex flex-col justify-between md:flex-row md:items-start gap-4"
                >
                  <div className="flex gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffb44f]/5 text-[#ffb44f] border border-[#ffb44f]/10">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#ffb44f]">
                        {edu.institution}
                      </span>
                      <h4 className="font-display text-lg font-bold text-[#f2f1ed] mt-1">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-[#8a8a8f] mt-1">{edu.location}</p>
                      <p className="mt-3 text-xs leading-relaxed text-[#8a8a8f]">
                        {edu.description}
                      </p>
                      {edu.coursework && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {edu.coursework.map((course) => (
                            <span
                              key={course}
                              className="rounded bg-white/5 px-2 py-0.5 text-[9px] font-semibold text-[#8a8a8f]"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end justify-between gap-2 border-t border-white/5 pt-4 md:border-t-0 md:pt-0 shrink-0 text-left md:text-right">
                    <span className="inline-flex items-center gap-1 rounded bg-[#ffb44f]/10 border border-[#ffb44f]/20 px-2 py-1 text-[10px] font-bold text-[#ffb44f]">
                      {edu.grade}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#8a8a8f]">
                      <Calendar size={10} /> {edu.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Mini Stack Certification Badges */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="mb-8">
              <span className="font-display text-xs font-black uppercase tracking-[0.2em] text-[#ffb44f]">
                06 / VERIFIED SKILLS
              </span>
              <h2 className="font-display text-2xl font-black text-[#f2f1ed] mt-4">Certifications</h2>
              <p className="text-xs text-[#8a8a8f] mt-2">
                Click the active badge below to cycle through my official technical certifications.
              </p>
            </div>

            {/* Certification Card Stack */}
            <div className="relative flex flex-col items-center justify-center min-h-[300px] w-full">
              <AnimatePresence mode="popLayout">
                {certifications.map((cert, idx) => {
                  if (idx !== certIndex) return null;
                  
                  return (
                    <motion.div
                      key={cert.id}
                      onClick={handleNextCert}
                      onMouseEnter={() => setCursor('hover')}
                      onMouseLeave={() => setCursor('default')}
                      initial={{ scale: 0.9, opacity: 0, y: 15 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: -15 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      className="glass-panel glass-panel-hover absolute cursor-pointer rounded-2xl p-6 w-full max-w-[340px] flex flex-col justify-between h-[220px]"
                    >
                      <div className="flex items-start justify-between">
                        <div className="text-4xl">{cert.icon}</div>
                        <Award size={18} className="text-[#ffb44f]" />
                      </div>

                      <div className="mt-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#ffb44f]">
                          {cert.issuer}
                        </span>
                        <h4 className="font-display text-base font-bold text-[#f2f1ed] mt-1 line-clamp-2">
                          {cert.title}
                        </h4>
                      </div>

                      <div className="border-t border-white/5 pt-3 flex items-center justify-between mt-4">
                        <span className="text-[10px] font-bold text-[#8a8a8f]">
                          Issued {cert.date}
                        </span>
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-bold uppercase tracking-wider text-[#ffb44f] flex items-center gap-1 hover:underline"
                          onClick={(e) => e.stopPropagation()} // Stop trigger slide swap
                        >
                          Verify <ExternalLink size={10} />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Background Deck peeking offset for stack depth visual */}
              <div className="absolute top-2 scale-[0.96] rounded-2xl border border-white/5 bg-[#141416]/40 w-full max-w-[340px] h-[220px] translate-y-2.5 z-0 pointer-events-none" />
              <div className="absolute top-0 scale-[0.92] rounded-2xl border border-white/5 bg-[#141416]/20 w-full max-w-[340px] h-[220px] translate-y-5 z-[-1] pointer-events-none" />
            </div>

            {/* Cycle Control button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleNextCert}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={() => setCursor('default')}
                className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#ffb44f] hover:text-[#f2f1ed] transition-colors"
              >
                Next Badge <ChevronRight size={12} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
