import React, { useEffect, useRef, useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const AureliaWatch: React.FC<{ isInView?: boolean }> = ({ isInView = true }) => {
  const { prefersReducedMotion } = usePortfolioStore();
  const watchRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  
  const [dateStr, setDateStr] = useState('--');

  // 1. Tick animation loop using requestAnimationFrame for super smooth sweep second hand
  useEffect(() => {
    if (!isInView) return;
    let animId: number;

    const updateClock = () => {
      const now = new Date();
      const ms = now.getMilliseconds();
      const s = now.getSeconds() + ms / 1000;
      const m = now.getMinutes() + s / 60;
      const h = (now.getHours() % 12) + m / 60;

      if (secondRef.current) {
        secondRef.current.style.transform = `rotate(${s * 6}deg)`;
      }
      if (minuteRef.current) {
        minuteRef.current.style.transform = `rotate(${m * 6}deg)`;
      }
      if (hourRef.current) {
        hourRef.current.style.transform = `rotate(${h * 30}deg)`;
      }

      setDateStr(String(now.getDate()).padStart(2, '0'));
      animId = requestAnimationFrame(updateClock);
    };

    updateClock();
    return () => cancelAnimationFrame(animId);
  }, []);

  // 2. Interactive mouse-driven parallax tilt and reflection glare
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !watchRef.current || !glareRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Apply tilt matrix transform
    watchRef.current.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`;

    // Adjust reflection gradient positioning
    glareRef.current.style.setProperty('--glare-x', `${x * 90}px`);
    glareRef.current.style.background = `linear-gradient(115deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.18) ${
      50 + x * 40
    }%, rgba(255,255,255,0) 62%)`;
  };

  const handleMouseLeave = () => {
    if (!watchRef.current || !glareRef.current) return;
    watchRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    glareRef.current.style.background = `linear-gradient(115deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0) 62%)`;
  };

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden w-full h-full cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1400px' }}
    >
      {/* Scoped CSS styling to encapsulate watch design and variables */}
      <style>{`
        :root {
          --w-case-1: #3a3d44;
          --w-case-2: #1c1d21;
          --w-case-3: #575b64;
          --w-dial-deep: #0b0b0d;
          --w-dial-mid: #141416;
          --w-dial-hi: #1e1e22;
          --w-rose: #ffb44f;
          --w-rose-light: #ffe2b3;
          --w-rose-dark: #b37a22;
          --w-ivory: #f2f1ed;
          --w-ivory-dim: #8a8a8f;
        }

        .watch-stage {
          position: relative;
          width: 260px;
          height: 260px;
          display: flex;
          justify-content: center;
          align-items: center;
          transform-style: preserve-3d;
        }

        .watch-shadow {
          position: absolute;
          width: 200px;
          height: 30px;
          bottom: 10px;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 72%);
          filter: blur(4px);
          z-index: 0;
          pointer-events: none;
        }

        .watch-glow {
          position: absolute;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 180, 79, 0.08) 0%, rgba(0,0,0,0) 68%);
          filter: blur(10px);
          pointer-events: none;
        }

        .watch-container {
          position: relative;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          transform-style: preserve-3d;
          transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .watch-fluted {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: repeating-conic-gradient(
            from 0deg,
            #4b4f57 0deg 2.2deg,
            #232529 2.2deg 4.4deg
          );
          box-shadow:
            0 12px 30px rgba(0,0,0,0.65),
            inset 0 0 0 1.5px rgba(0,0,0,0.4);
        }

        .watch-case {
          position: absolute;
          inset: 7px;
          border-radius: 50%;
          background: linear-gradient(150deg, var(--w-case-1), var(--w-case-2) 60%, var(--w-case-3));
          box-shadow:
            inset 2px 2px 4px rgba(255,255,255,0.1),
            inset -4px -5px 10px rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .watch-bezel {
          position: absolute;
          inset: 10px;
          border-radius: 50%;
          background: linear-gradient(160deg, var(--w-rose-light), var(--w-rose) 35%, var(--w-rose-dark) 70%, var(--w-rose) 100%);
          box-shadow:
            inset 0 0 0 1px rgba(0,0,0,0.35),
            0 1px 1px rgba(255,255,255,0.2);
        }

        .watch-crystal {
          position: absolute;
          inset: 15px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 28%, var(--w-dial-hi), var(--w-dial-mid) 45%, var(--w-dial-deep) 100%);
          overflow: hidden;
          box-shadow:
            inset 0 0 15px rgba(0,0,0,0.9),
            inset 0 0 2px rgba(255,255,255,0.15);
        }

        .watch-guilloche {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: repeating-radial-gradient(
            circle at 50% 50%,
            rgba(255,255,255,0.02) 0px,
            rgba(255,255,255,0.02) 1px,
            transparent 1px,
            transparent 3px
          );
          mix-blend-mode: overlay;
          opacity: 0.6;
        }

        .watch-glare {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(
            115deg,
            rgba(255,255,255,0) 30%,
            rgba(255,255,255,0.14) calc(50% + var(--glare-x, 0px)),
            rgba(255,255,255,0) 62%
          );
          pointer-events: none;
          transition: background-position 0.1s linear;
        }

        .watch-vignette {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.6) 100%);
          pointer-events: none;
        }

        .watch-brand {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .watch-brand text {
          fill: var(--w-rose);
          font-family: 'Jost', sans-serif;
          font-size: 8.5px;
          letter-spacing: 3px;
          font-weight: 500;
        }
        .watch-brand .sub {
          fill: var(--w-ivory-dim);
          font-size: 5px;
          letter-spacing: 2px;
        }

        .watch-center-word {
          position: absolute;
          top: 36%;
          width: 100%;
          text-align: center;
          color: var(--w-rose-light);
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 500;
          font-size: 16px;
          letter-spacing: 0.5px;
          text-shadow: 0 0 6px rgba(255, 180, 79, 0.35);
        }

        .watch-center-sub {
          position: absolute;
          top: 59%;
          width: 100%;
          text-align: center;
          color: var(--w-ivory-dim);
          font-size: 5.5px;
          letter-spacing: 1.5px;
          font-weight: 300;
          text-transform: uppercase;
        }

        .watch-numeral {
          position: absolute;
          top: 8%;
          width: 100%;
          text-align: center;
          color: var(--w-rose-light);
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 600;
          font-size: 15px;
          text-shadow: 0 0 4px rgba(255, 180, 79, 0.3);
        }

        .watch-date {
          position: absolute;
          top: 50%;
          right: 10%;
          transform: translateY(-50%);
          width: 18px;
          height: 14px;
          background: linear-gradient(180deg, #efe6d4, #d9cdb3);
          border-radius: 1.5px;
          box-shadow:
            inset 0 0 0 0.8px rgba(0,0,0,0.35),
            0 1px 1px rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .watch-date span {
          font-family: 'Jost', sans-serif;
          font-size: 7.5px;
          font-weight: 500;
          color: #2a2117;
        }

        .watch-cap {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle at 35% 30%, var(--w-rose-light), var(--w-rose-dark));
          border: 1px solid #17181b;
          border-radius: 50%;
          z-index: 25;
          box-shadow: 0 0 4px rgba(255, 180, 79, 0.6);
        }

        .watch-hand {
          position: absolute;
          bottom: 50%;
          left: 50%;
          transform-origin: 50% 100%;
          z-index: 15;
          filter: drop-shadow(0 1.5px 2px rgba(0,0,0,0.6));
        }

        .watch-hour-hand {
          width: 6px;
          height: 48px;
          margin-left: -3px;
          background: linear-gradient(180deg, var(--w-rose-light), var(--w-rose) 55%, var(--w-rose-dark));
          clip-path: polygon(50% 0%, 100% 30%, 68% 100%, 32% 100%, 0% 30%);
        }

        .watch-minute-hand {
          width: 4.5px;
          height: 72px;
          margin-left: -2.25px;
          background: linear-gradient(180deg, var(--w-rose-light), var(--w-rose) 55%, var(--w-rose-dark));
          clip-path: polygon(50% 0%, 100% 22%, 64% 100%, 36% 100%, 0% 22%);
        }

        .watch-second-hand {
          width: 1px;
          height: 80px;
          margin-left: -0.5px;
          background: linear-gradient(180deg, var(--w-ivory) 78%, var(--w-rose) 78%);
          z-index: 18;
        }
        .watch-second-hand::before {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -12px;
          width: 4px;
          height: 12px;
          transform: translateX(-50%);
          background: var(--w-ivory);
          border-radius: 0.5px;
          opacity: 0.85;
        }
        .watch-second-hand::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          width: 3.5px;
          height: 3.5px;
          transform: translateX(-50%);
          background: #ffb44f;
          border-radius: 50%;
          box-shadow: 0 0 3px rgba(255, 180, 79, 0.8);
        }

        .watch-baton {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1.5px;
          height: 9px;
          background: linear-gradient(var(--w-rose-light), var(--w-rose-dark));
          transform-origin: 50% 0%;
          border-radius: 0.5px;
          opacity: 0.85;
        }

        .watch-tick {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0.8px;
          height: 3.5px;
          background: rgba(242, 233, 216, 0.35);
          transform-origin: 50% 0%;
        }
      `}</style>

      {/* Stage Wrapper */}
      <div className="watch-stage">
        <div className="watch-glow"></div>
        <div className="watch-shadow"></div>

        {/* The Watch case itself */}
        <div ref={watchRef} className="watch-container">
          <div className="watch-fluted"></div>
          <div className="watch-case">
            <div className="watch-bezel"></div>
            <div className="watch-crystal">
              <div className="watch-guilloche"></div>

              {/* Brand Paths */}
              <svg className="watch-brand" viewBox="0 0 200 200">
                <path id="arcTop" d="M 40,100 A 60,60 0 0 1 160,100" fill="none" />
                <path id="arcBottom" d="M 62,148 A 60,60 0 0 0 138,148" fill="none" />
                <text>
                  <textPath href="#arcTop" startOffset="50%" textAnchor="middle">
                    AURELIA
                  </textPath>
                </text>
                <text className="sub">
                  <textPath href="#arcBottom" startOffset="50%" textAnchor="middle">
                    GENÈVE · SUISSE
                  </textPath>
                </text>
              </svg>

              {/* Dial text details */}
              <div className="watch-numeral">XII</div>
              <div className="watch-center-word">Cordial</div>
              <div className="watch-center-sub">Automatic &nbsp;·&nbsp; 28,800 vph</div>
              <div className="watch-date">
                <span>{dateStr}</span>
              </div>

              {/* Ticks & Hour Batons */}
              <div className="absolute inset-0">
                {/* 12 Hour markers (skipping 12, 3, 6, 9) */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const hour = i + 1;
                  if (hour % 3 === 0) return null;
                  const deg = hour * 30;
                  return (
                    <div
                      key={`baton-${hour}`}
                      className="watch-baton"
                      style={{
                        transform: `translate(-50%, 0) rotate(${deg}deg) translateY(-84px)`,
                      }}
                    />
                  );
                })}

                {/* Minute Ticks */}
                {Array.from({ length: 60 }).map((_, i) => {
                  if (i % 5 === 0) return null;
                  const deg = i * 6;
                  return (
                    <div
                      key={`tick-${i}`}
                      className="watch-tick"
                      style={{
                        transform: `translate(-50%, 0) rotate(${deg}deg) translateY(-87px)`,
                      }}
                    />
                  );
                })}
              </div>

              {/* Clock Hands */}
              <div ref={hourRef} className="watch-hand watch-hour-hand" />
              <div ref={minuteRef} className="watch-hand watch-minute-hand" />
              <div ref={secondRef} className="watch-hand watch-second-hand" />
              
              {/* Cap cover */}
              <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] watch-cap" />

              <div className="watch-vignette" />
              <div ref={glareRef} className="watch-glare" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AureliaWatch;
