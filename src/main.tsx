import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@app/App';
import { ThemeRegistry } from '@common/ThemeRegistry';
import '@assets/css/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeRegistry>
      <App />
    </ThemeRegistry>
  </React.StrictMode>
);
