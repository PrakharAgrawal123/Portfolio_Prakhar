import { create } from 'zustand';
import type { Project } from '../data/portfolio';

export type CursorType = 'default' | 'hover' | 'drag' | 'view' | 'magnetic';

interface PortfolioState {
  cursorType: CursorType;
  cursorText: string;
  setCursor: (type: CursorType, text?: string) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  loaderPercent: number;
  setLoaderPercent: (percent: number) => void;
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  prefersReducedMotion: boolean;
  setPrefersReducedMotion: (prefers: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  cursorType: 'default',
  cursorText: '',
  setCursor: (type, text = '') => set({ cursorType: type, cursorText: text }),
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  loaderPercent: 0,
  setLoaderPercent: (percent) => set({ loaderPercent: percent }),
  isLoaded: false,
  setIsLoaded: (isLoaded) => set({ isLoaded }),
  activeProject: null,
  setActiveProject: (project) => set({ activeProject: project }),
  commandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  prefersReducedMotion: false,
  setPrefersReducedMotion: (prefers) => set({ prefersReducedMotion: prefers }),
}));
