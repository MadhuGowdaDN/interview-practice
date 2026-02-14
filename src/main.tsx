import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import App from './app/App';
import { useThemeMode } from './store/themeStore';

const Root = () => {
  const theme = useThemeMode((s) => s.theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          }
        }}
      />
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster position="top-right" />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
