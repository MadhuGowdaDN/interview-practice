import { createTheme } from '@mui/material';
import { create } from 'zustand';

interface ThemeState {
  darkMode: boolean;
  toggleMode: () => void;
  theme: ReturnType<typeof createTheme>;
}

const buildTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#1976d2' },
      secondary: { main: '#7c4dff' }
    },
    shape: { borderRadius: 12 }
  });

export const useThemeMode = create<ThemeState>((set, get) => ({
  darkMode: true,
  toggleMode: () => set((s) => ({ darkMode: !s.darkMode, theme: buildTheme(!s.darkMode) })),
  theme: buildTheme(true)
}));
