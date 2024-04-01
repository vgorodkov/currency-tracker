import './global.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@/App';
import { ThemeProvider } from '@/context/ThemeContext';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('rootElement not found');
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
