import { createRoot } from 'react-dom/client';

import App from './App';

import './index.css';

// Suppress WebGL context errors from Three.js — these are expected in
// sandboxed / headless environments (no GPU). The WebGLErrorBoundary in each
// 3D component handles the graceful fallback; we suppress both console.error
// and window.onerror so the Vite runtime-error overlay doesn't surface them.
const _origConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  const msg = typeof args[0] === 'string' ? args[0] : '';
  if (msg.includes('WebGL') || msg.includes('WebGLRenderer')) return;
  _origConsoleError(...args);
};

window.addEventListener(
  'error',
  (event) => {
    const msg = event.message ?? '';
    if (msg.includes('WebGL') || msg.includes('WebGLRenderer')) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  },
  true, // capture phase — runs before Vite's overlay listener
);

createRoot(document.getElementById('root')!).render(<App />);
