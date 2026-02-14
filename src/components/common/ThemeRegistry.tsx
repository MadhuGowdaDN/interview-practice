import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useMemo } from 'react';
import { useThemeStore } from '@features/themeSlice';

export const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  const mode = useThemeStore((state) => state.mode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#6366f1' },
          secondary: { main: '#14b8a6' },
          background: {
            default: mode === 'dark' ? '#0B1120' : '#f8fafc',
            paper: mode === 'dark' ? '#111827' : '#ffffff'
          }
        },
        shape: { borderRadius: 12 },
        typography: { fontFamily: 'Inter, Roboto, sans-serif' }
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
