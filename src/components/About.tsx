import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Clock, Code, ShieldCheck } from 'lucide-react';
import { AureliaWatch } from './AureliaWatch';
import { InteractiveHeading } from './InteractiveHeading';

/// Count-up helper component for stats card// 
const Counter: React.FC<{ value: number; label: string; suffix?: string }> = ({ value, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const duration = 2.0; // Seconds
      const totalFrames = Math.round(duration * 60);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        // Ease out quad
        const currentCount = Math.round(end * (progress * (2 - progress)));
        setCount(currentCount);

        if (frame >= totalFrames) {
          setCount(end);
          clearInterval(counter);
        }
      }, 1000 / 60);

      return () => clearInterval(counter);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col border-l-2 border-white/5 pl-4 py-2 hover:border-[#ffb44f] transition-colors duration-300">
      <span className="font-display text-3xl font-black text-[#ffb44f] md:text-4xl">
        {count}
        {suffix}
      </span>
      <span className="font-body text-sm font-bold uppercase tracking-wider text-[#8a8a8f] mt-1">
        {label}
      </span>
    </div>
  );
};

// Custom interactive WebGL-like vector/fluid neural grid canvas
const InteractiveVectorCanvas: React.FC<{ isInView: boolean }> = ({ isInView }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    if (!isInView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Grid coordinates//
    const rows = 12;
    const cols = 12;
    const points: { x: number; y: number; ox: number; oy: number }[] = [];

    const xSpacing = width / (cols - 1);
    const ySpacing = height / (rows - 1);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * xSpacing;
        const y = r * ySpacing;
        points.push({ x, y, ox: x, oy: y });
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.tx = e.clientX - rect.left;
      mouseRef.current.ty = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.1;

      // Draw background network lattice
      ctx.strokeStyle = 'rgba(255, 180, 79, 0.05)';
      ctx.lineWidth = 1;

      // Update positions with interactive liquid waves
      points.forEach((p) => {
        const dx = mouseRef.current.x - p.ox;
        const dy = mouseRef.current.y - p.oy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120 && isHovered) {
          // Liquid warp calculation
          const force = (120 - distance) / 120;
          const angle = Math.atan2(dy, dx);
          const warpDistance = force * 30; // Push strength

          p.x = p.ox - Math.cos(angle) * warpDistance;
          p.y = p.oy - Math.sin(angle) * warpDistance;
        } else {
          // Spring back
          p.x += (p.ox - p.x) * 0.1;
          p.y += (p.oy - p.y) * 0.1;
        }
      });

      // Render lattice lines
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const p = points[idx];

          // Connect to right neighbor
          if (c < cols - 1) {
            const nextP = points[idx + 1];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(nextP.x, nextP.y);
            ctx.stroke();
          }

          // Connect to bottom neighbor
          if (r < rows - 1) {
            const nextP = points[idx + cols];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(nextP.x, nextP.y);
            ctx.stroke();
          }
        }
      }

      // Render interactive nodes
      points.forEach((p, idx) => {
        const dx = mouseRef.current.x - p.ox;
        const dy = mouseRef.current.y - p.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120 && isHovered) {
          ctx.fillStyle = '#ffb44f';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (idx % 5 === 0) {
          ctx.fillStyle = 'rgba(242, 241, 237, 0.2)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw stylized neural overlay avatar details in center
      ctx.fillStyle = 'rgba(255, 180, 79, 0.03)';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Holographic glowing center node
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ffb44f';
      ctx.fillStyle = '#ffb44f';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, [isHovered]);

  return (
    <div
      className="relative h-full w-full bg-[#0b0b0d]/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-[#0b0b0d] via-transparent to-transparent pointer-events-none">
        <span className="font-display text-xs font-black uppercase tracking-widest text-[#ffb44f]">
          NEURAL INTERACTION
        </span>
        <h4 className="font-display text-lg font-bold text-[#f2f1ed] mt-1">
          AI/ML Space Representation
        </h4>
        <p className="text-sm text-[#8a8a8f] mt-1">Hover cursor over the lattice to distort grid vectors.</p>
      </div>
    </div>
  );
};

export const About: React.FC = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const watchContainerRef = useRef<HTMLDivElement>(null);
  const isCanvasInView = useInView(canvasContainerRef, { once: false, amount: 0.1 });
  const isWatchInView = useInView(watchContainerRef, { once: false, amount: 0.1 });

  return (
    <section id="about" className="relative w-full py-20 px-6 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Asymmetric Header */}
        <div className="mb-16 md:mb-24 md:max-w-2xl">
          <span className="font-display text-xs font-black uppercase tracking-[0.2em] text-[#ffb44f]">
            01 / IDENTITY
          </span>
          <InteractiveHeading text="Engineering data to decode insights." />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          
          {/* Card 1: Biography */}
          <div className="glass-panel glass-panel-hover flex flex-col justify-between rounded-2xl p-8 md:col-span-2">
            <div>
              <span className="font-display text-xs font-black uppercase tracking-widest text-[#ffb44f]">
                BIO
              </span>
              <p className="mt-6 font-body text-base leading-relaxed text-[#f2f1ed]/90 md:text-lg">
                {portfolioData.about.bio}
              </p>
            </div>
            <div className="mt-8 border-t border-white/5 pt-6 flex flex-wrap gap-4 text-sm text-[#8a8a8f]">
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#ffb44f]" /> United University Scholar</span>
              <span className="flex items-center gap-1.5"><Code size={14} className="text-[#ffb44f]" /> Full Stack Integration capability</span>
            </div>
          </div>

          {/* Card 2: WebGL Liquid Distortion Vector Net */}
          <div ref={canvasContainerRef} className="glass-panel overflow-hidden rounded-2xl h-80 md:h-auto">
            <InteractiveVectorCanvas isInView={isCanvasInView} />
          </div>

          {/* Card 3: Clock Watch */}
          <div ref={watchContainerRef} className="glass-panel glass-panel-hover flex flex-col justify-between rounded-2xl p-6 h-[360px] relative overflow-hidden">
            <div className="flex items-center justify-between z-10">
              <span className="font-display text-xs font-black uppercase tracking-widest text-[#ffb44f]">
                IST TIMEPIECE
              </span>
              <Clock size={16} className="text-[#ffb44f]" />
            </div>
            <div className="flex-1 flex items-center justify-center scale-90">
              <AureliaWatch isInView={isWatchInView} />
            </div>
            <div className="text-center z-10">
              <p className="text-xs text-[#8a8a8f] uppercase tracking-widest">
                Prayagraj, Uttar Pradesh, India
              </p>
            </div>
          </div>

          {/* Card 4: Stats */}
          <div className="glass-panel glass-panel-hover flex flex-col justify-between rounded-2xl p-8 h-[360px]">
            <span className="font-display text-xs font-black uppercase tracking-widest text-[#ffb44f] mb-4">
              METRICS
            </span>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 my-auto">
              <Counter value={10} label="Major Projects" suffix="+" />
              <Counter value={5} label="Hackathons" suffix="+" />
              <Counter value={10} label="Certificates" suffix="+" />
              <Counter value={20} label="Technologies" suffix="+" />
            </div>
          </div>

          {/* Card 5: Focus / Fun Fact */}
          <div className="glass-panel glass-panel-hover flex flex-col justify-between rounded-2xl p-8 h-[360px]">
            <div>
              <span className="font-display text-xs font-black uppercase tracking-widest text-[#ffb44f]">
                CURRENT FOCUS
              </span>
              <p className="mt-4 font-body text-sm leading-relaxed text-[#f2f1ed]">
                {portfolioData.about.currentFocus}
              </p>
            </div>
            <div className="mt-6 border-t border-white/5 pt-4">
              <span className="font-display text-xs font-black uppercase tracking-wider text-[#8a8a8f] block">
                PERSONALITY BIT
              </span>
              <p className="text-sm text-[#8a8a8f] mt-1">{portfolioData.personal.funFact}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
