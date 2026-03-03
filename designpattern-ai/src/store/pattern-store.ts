import { create } from "zustand";

export type PatternCategory = "creational" | "structural" | "behavioral";

export interface PatternMeta {
  slug: string;
  title: string;
  category: PatternCategory;
  complexity: 1 | 2 | 3;
  description: string;
  icon: string;
}

interface PatternState {
  activePattern: string | null;
  sidebarOpen: boolean;
  chatOpen: boolean;
  setActivePattern: (slug: string | null) => void;
  toggleSidebar: () => void;
  toggleChat: () => void;
  setSidebarOpen: (open: boolean) => void;
  setChatOpen: (open: boolean) => void;
}

export const usePatternStore = create<PatternState>((set) => ({
  activePattern: null,
  sidebarOpen: true,
  chatOpen: false,
  setActivePattern: (slug) => set({ activePattern: slug }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleChat: () => set((state) => ({ chatOpen: !state.chatOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setChatOpen: (open) => set({ chatOpen: open }),
}));
