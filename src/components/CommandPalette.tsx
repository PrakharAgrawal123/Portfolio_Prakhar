import React, { useEffect } from 'react';
import { Command } from 'cmdk';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { Home, User, Settings, Briefcase, Mail, FileText } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen } = usePortfolioStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const navigateTo = (id: string) => {
    setCommandPaletteOpen(false);
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const downloadResume = () => {
    setCommandPaletteOpen(false);
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Prakhar_Agrawal_Resume.pdf';
    link.click();
  };

  return (
    <Command.Dialog
      open={commandPaletteOpen}
      onOpenChange={setCommandPaletteOpen}
      label="Command Menu"
      container={document.body}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div className="glass-panel w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-[#141416]/95 shadow-2xl transition-all duration-300">
        <Command.Input
          placeholder="Type a command or search sections..."
          className="w-full border-b border-white/5 bg-transparent px-5 py-4 font-body text-sm font-medium text-[#f2f1ed] placeholder-[#8a8a8f] outline-none"
        />

        <Command.List className="no-scrollbar max-h-72 overflow-y-auto p-2">
          <Command.Empty className="px-4 py-6 text-center font-body text-xs font-semibold uppercase tracking-wider text-[#8a8a8f]">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation" className="px-2 py-1.5 font-display text-[10px] font-bold uppercase tracking-widest text-[#8a8a8f]">
            <Command.Item
              onSelect={() => navigateTo('hero')}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#f2f1ed] hover:bg-[#ffb44f] hover:text-[#0b0b0d] aria-selected:bg-[#ffb44f] aria-selected:text-[#0b0b0d] transition-colors"
            >
              <Home size={16} />
              <span>Home / Hero Scene</span>
            </Command.Item>

            <Command.Item
              onSelect={() => navigateTo('about')}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#f2f1ed] hover:bg-[#ffb44f] hover:text-[#0b0b0d] aria-selected:bg-[#ffb44f] aria-selected:text-[#0b0b0d] transition-colors"
            >
              <User size={16} />
              <span>About & Statistics</span>
            </Command.Item>

            <Command.Item
              onSelect={() => navigateTo('skills')}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#f2f1ed] hover:bg-[#ffb44f] hover:text-[#0b0b0d] aria-selected:bg-[#ffb44f] aria-selected:text-[#0b0b0d] transition-colors"
            >
              <Settings size={16} />
              <span>Skills & Technologies</span>
            </Command.Item>

            <Command.Item
              onSelect={() => navigateTo('projects')}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#f2f1ed] hover:bg-[#ffb44f] hover:text-[#0b0b0d] aria-selected:bg-[#ffb44f] aria-selected:text-[#0b0b0d] transition-colors"
            >
              <Briefcase size={16} />
              <span>Projects Stack Deck</span>
            </Command.Item>

            <Command.Item
              onSelect={() => navigateTo('experience')}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#f2f1ed] hover:bg-[#ffb44f] hover:text-[#0b0b0d] aria-selected:bg-[#ffb44f] aria-selected:text-[#0b0b0d] transition-colors"
            >
              <Briefcase size={16} />
              <span>Experience Timeline</span>
            </Command.Item>

            <Command.Item
              onSelect={() => navigateTo('contact')}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#f2f1ed] hover:bg-[#ffb44f] hover:text-[#0b0b0d] aria-selected:bg-[#ffb44f] aria-selected:text-[#0b0b0d] transition-colors"
            >
              <Mail size={16} />
              <span>Contact & CTA</span>
            </Command.Item>
          </Command.Group>

          <Command.Separator className="my-2 h-[1px] bg-white/5" />

          <Command.Group heading="Actions" className="px-2 py-1.5 font-display text-[10px] font-bold uppercase tracking-widest text-[#8a8a8f]">
            <Command.Item
              onSelect={downloadResume}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#f2f1ed] hover:bg-[#ffb44f] hover:text-[#0b0b0d] aria-selected:bg-[#ffb44f] aria-selected:text-[#0b0b0d] transition-colors"
            >
              <FileText size={16} />
              <span>Download Resume PDF</span>
            </Command.Item>
          </Command.Group>
        </Command.List>

        <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.02] px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-[#8a8a8f]">
          <span>Use arrows to navigate</span>
          <span>Esc to close</span>
        </div>
      </div>
    </Command.Dialog>
  );
};
