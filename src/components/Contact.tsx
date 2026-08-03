import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { Linkedin, Github, Mail, ArrowUpRight, Check, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

// ==========================================
// GOOGLE FORM INTEGRATION CONFIGURATION
// ==========================================
// Replace this URL with your actual Google Form Action URL.
// To get this, open your Google Form in the browser, view the preview/live form,
// inspect the HTML <form> element and copy the "action" attribute value.
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfD_K_your_form_id_here/formResponse";

// Replace these entry IDs with the actual field entry names from your Google Form.
// To find these, inspect the source code of the live Google Form input fields
// and copy the "name" attribute values (typically look like "entry.123456789").
const GOOGLE_FORM_ENTRY_IDS = {
  name: "entry.123456789",    // Entry ID for Name input
  email: "entry.987654321",   // Entry ID for Email input
  message: "entry.111222333"  // Entry ID for Message textarea
};

// Official WhatsApp SVG Icon Component
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.503 4.91 1.505 5.548 0 10.065-4.515 10.068-10.066.002-2.69-1.043-5.216-2.943-7.118a9.925 9.925 0 0 0-7.126-2.937C5.952 1.538 1.436 6.054 1.434 11.603c-.001 1.696.486 3.35 1.411 4.795L1.813 21.9l5.63-1.474zM16.117 14.1c-.24-.12-1.424-.702-1.646-.782-.223-.08-.386-.12-.55.126-.163.245-.634.782-.777.945-.143.16-.286.18-.526.06-.24-.12-1.016-.374-1.936-1.194-.716-.639-1.2-1.427-1.34-1.667-.14-.24-.015-.37.106-.49.11-.107.242-.28.363-.42.12-.14.16-.24.24-.4.08-.162.04-.302-.02-.423-.06-.12-.55-1.32-.754-1.81-.2-.483-.4-.417-.55-.425l-.47-.01c-.162 0-.425.06-.647.3-.223.24-.85.83-.85 2.025 0 1.194.87 2.345.99 2.507.12.162 1.71 2.61 4.14 3.66.577.25 1.03.4 1.38.513.58.184 1.11.158 1.53.095.467-.07 1.424-.58 1.626-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/>
  </svg>
);

export const Contact: React.FC = () => {
  const { setCursor } = usePortfolioStore();

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // WhatsApp formatted link
  const cleanPhone = portfolioData.personal.phone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}`;

  // Form change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Google Form submission handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Build form payload mapped to Google Form entry IDs
      const payload = new FormData();
      payload.append(GOOGLE_FORM_ENTRY_IDS.name, formData.name);
      payload.append(GOOGLE_FORM_ENTRY_IDS.email, formData.email);
      payload.append(GOOGLE_FORM_ENTRY_IDS.message, formData.message);

      // Submit POST request using no-cors mode to bypass browser blocks
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        body: payload,
        mode: 'no-cors',
      });

      // Google Form submissions return opaque response in no-cors, we assume success
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Trigger celebration confetti
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.8 },
        colors: ['#ffb44f', '#25d366', '#f2f1ed', '#0b0b0d'],
      });

      // Reset success status after 4 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 4500);

    } catch (error) {
      console.error("Form submit error: ", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Socials Accordion data array
  const socials = [
    {
      name: 'LinkedIn',
      href: portfolioData.personal.socials.linkedin,
      icon: <Linkedin size={28} className="transition-transform duration-500 group-hover/card:scale-110" />,
      tag: 'Networking',
      action: 'Let\'s Connect',
      activeColor: '#0a66c2',
      bgClass: 'hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2] hover:shadow-[0_0_30px_rgba(10,102,194,0.4)] border-[#0a66c2]/20 text-[#0a66c2]'
    },
    {
      name: 'WhatsApp',
      href: whatsappUrl,
      icon: <WhatsAppIcon className="w-7 h-7 transition-transform duration-500 group-hover/card:scale-110" />,
      tag: 'Quick Chat',
      action: 'Ping Me',
      activeColor: '#25d366',
      bgClass: 'hover:bg-[#25d366] hover:text-white hover:border-[#25d366] hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] border-[#25d366]/20 text-[#25d366]'
    },
    {
      name: 'GitHub',
      href: portfolioData.personal.socials.github,
      icon: <Github size={28} className="transition-transform duration-500 group-hover/card:scale-110" />,
      tag: 'Repositories',
      action: 'View Code',
      activeColor: '#ffb44f',
      bgClass: 'hover:bg-[#ffb44f] hover:text-[#0b0b0d] hover:border-[#ffb44f] hover:shadow-[0_0_30px_rgba(255,180,79,0.4)] border-[#ffb44f]/20 text-[#ffb44f]'
    },
    {
      name: 'Email',
      href: `mailto:${portfolioData.personal.email}`,
      icon: <Mail size={28} className="transition-transform duration-500 group-hover/card:scale-110" />,
      tag: 'Professional',
      action: 'Send Mail',
      activeColor: '#ea4335',
      bgClass: 'hover:bg-[#ea4335] hover:text-white hover:border-[#ea4335] hover:shadow-[0_0_30px_rgba(234,67,53,0.4)] border-[#ea4335]/20 text-[#ea4335]'
    }
  ];

  return (
    <section id="contact" className="relative w-full py-20 px-6 md:px-12 md:py-32 bg-[#0b0b0d] border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] bg-[#ffb44f]/[0.015] rounded-full filter blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="font-display text-xs font-black uppercase tracking-[0.25em] text-[#ffb44f]">
            09 / COLLABORATION
          </span>
          <h2 className="h-fluid-section text-[#f2f1ed] mt-4 font-black font-display">
            Get in Touch
          </h2>
          <div className="h-[1px] w-20 bg-[#ffb44f] mt-6" />
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT SIDE: Dynamic Flex Social Accordion (7 cols) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-4 items-stretch group/accordion min-h-[360px]">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursor('view')}
                onMouseLeave={() => setCursor('default')}
                className={`group/card flex-1 flex flex-col justify-between p-6 rounded-2xl border bg-[#141416]/90 transition-all duration-500 ease-out hover:!flex-[2.5] group-hover/accordion:flex-[0.6] cursor-pointer relative overflow-hidden select-none ${social.bgClass}`}
              >
                {/* Custom active glow mesh */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover/card:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${social.activeColor} 0%, transparent 80%)`
                  }}
                />

                {/* Top: Icon Container (centered when collapsed, left-aligned on hover) */}
                <div className="flex w-full items-center justify-center group-hover/card:justify-start transition-all duration-500">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/5 transition-transform duration-500 group-hover/card:scale-105">
                    {social.icon}
                  </div>
                </div>

                {/* Bottom: Text Content (fades in on hover) */}
                <div className="opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-100 text-left w-full translate-y-4 group-hover/card:translate-y-0">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-inherit opacity-70">
                    {social.tag}
                  </span>
                  <h4 className="font-display text-lg font-black mt-1">
                    {social.action}
                  </h4>
                </div>
              </a>
            ))}
          </div>

          {/* RIGHT SIDE: Interactive Google Form Submission Card (5 cols) */}
          <div className="lg:col-span-5 flex items-stretch">
            <div className="glass-panel w-full rounded-2xl p-8 border border-white/5 bg-[#141416]/80 backdrop-blur-md relative flex flex-col justify-between overflow-hidden">
              
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  /* Success Screen Overlay */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center h-full py-12"
                  >
                    <div className="h-16 w-16 rounded-full bg-[#25d366]/10 border border-[#25d366]/20 flex items-center justify-center text-[#25d366] mb-6 shadow-[0_0_20px_rgba(37,211,102,0.1)]">
                      <Check size={32} className="animate-bounce" />
                    </div>
                    <span className="font-display text-xs font-black uppercase tracking-widest text-[#25d366]">
                      Message Received
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#f2f1ed] mt-2">
                      Inquiry Stored Successfully!
                    </h3>
                    <p className="mt-4 text-xs text-[#8a8a8f] max-w-xs leading-relaxed">
                      Thank you! Your query has been pushed directly to my Google Sheet database. I will review it and connect back shortly.
                    </p>
                  </motion.div>
                ) : (
                  /* Standard Input Form */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="flex flex-col gap-6 h-full justify-between"
                  >
                    <div className="flex flex-col gap-6">
                      <div>
                        <span className="font-display text-xs font-bold uppercase tracking-widest text-[#ffb44f]">
                          DIRECT INQUIRY
                        </span>
                        <p className="text-xs text-[#8a8a8f] mt-1 leading-relaxed">
                          Your query will be instantly synced to my spreadsheet. No intermediate backend is required.
                        </p>
                      </div>

                      {/* Name Input with Floating Border-Label */}
                      <div className="relative mt-2">
                        <label className="absolute -top-2 left-4 px-1.5 bg-[#141416] text-[9px] uppercase font-bold tracking-widest text-[#ffb44f] border-x border-[#ffb44f]/20">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-sm text-[#f2f1ed] focus:border-[#ffb44f] focus:ring-1 focus:ring-[#ffb44f]/20 outline-none transition-all duration-300"
                        />
                      </div>

                      {/* Email Input with Floating Border-Label */}
                      <div className="relative">
                        <label className="absolute -top-2 left-4 px-1.5 bg-[#141416] text-[9px] uppercase font-bold tracking-widest text-[#ffb44f] border-x border-[#ffb44f]/20">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-sm text-[#f2f1ed] focus:border-[#ffb44f] focus:ring-1 focus:ring-[#ffb44f]/20 outline-none transition-all duration-300"
                        />
                      </div>

                      {/* Message Input with Floating Border-Label */}
                      <div className="relative">
                        <label className="absolute -top-2 left-4 px-1.5 bg-[#141416] text-[9px] uppercase font-bold tracking-widest text-[#ffb44f] border-x border-[#ffb44f]/20">
                          Message
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Write your query or details..."
                          className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-sm text-[#f2f1ed] focus:border-[#ffb44f] focus:ring-1 focus:ring-[#ffb44f]/20 outline-none transition-all duration-300 resize-none"
                        />
                      </div>
                    </div>

                    {/* Actions and submit */}
                    <div className="border-t border-white/5 pt-6 flex items-center justify-between mt-4">
                      {submitStatus === 'error' && (
                        <span className="text-[10px] font-bold text-[#ea4335] uppercase tracking-wider">
                          Submit failed. Try again.
                        </span>
                      )}
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-3 rounded-full bg-[#141416]/80 border border-white/10 p-1.5 pr-6 hover:border-[#ffb44f] group/btn transition-all duration-300 disabled:opacity-50"
                      >
                        <div className="h-9 w-9 rounded-full bg-[#ffb44f] text-[#0b0b0d] flex items-center justify-center transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1">
                          {isSubmitting ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <ArrowUpRight size={16} />
                          )}
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-[#f2f1ed] group-hover/btn:text-[#ffb44f] transition-colors">
                          {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                        </span>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default Contact;
