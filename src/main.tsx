// Safe global fetch getter/setter shim for sandboxed environments
try {
  if (typeof window !== 'undefined') {
    const originalFetch = window.fetch ? window.fetch.bind(window) : undefined;
    let currentFetch = originalFetch;
    try {
      Object.defineProperty(window, 'fetch', {
        get: () => currentFetch,
        set: (newFetch) => {
          currentFetch = newFetch;
        },
        configurable: true,
        enumerable: true,
      });
    } catch {
      // Safe no-op
    }
  }
} catch {
  // Safe no-op
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
