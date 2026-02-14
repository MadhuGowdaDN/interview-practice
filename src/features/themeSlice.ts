import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Mode = 'light' | 'dark';

interface ThemeState {
  mode: Mode;
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'dark',
      toggleMode: () => set({ mode: get().mode === 'dark' ? 'light' : 'dark' })
    }),
    { name: 'theme-mode' }
  )
);
