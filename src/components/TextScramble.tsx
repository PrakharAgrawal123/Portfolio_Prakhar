import React, { useEffect, useState } from 'react';

interface TextScrambleProps {
  text: string;
  duration?: number;
}

const chars = '!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const TextScramble: React.FC<TextScrambleProps> = ({ text, duration = 30 }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let frame = 0;
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
    const oldText = displayText || '';
    const length = Math.max(oldText.length, text.length);

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = text[i] || '';
      const start = Math.floor(Math.random() * 15);
      const end = start + Math.floor(Math.random() * duration);
      queue.push({ from, to, start, end });
    }

    let cancelId: number;

    const update = () => {
      let output = '';
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        let char = queue[i].char;

        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          output += `<span class="text-[#ffb44f] scramble-char">${char}</span>`;
        } else {
          output += from;
        }
      }

      setDisplayText(output);

      if (complete < queue.length) {
        frame++;
        cancelId = requestAnimationFrame(update);
      }
    };

    cancelId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(cancelId);
  }, [text, duration]);

  return <span dangerouslySetInnerHTML={{ __html: displayText }} />;
};
