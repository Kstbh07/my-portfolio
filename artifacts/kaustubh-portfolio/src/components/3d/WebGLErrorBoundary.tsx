import React from 'react';

interface State {
  hasError: boolean;
}

// Catches WebGL context creation failures (unsupported GPU/browser, sandboxed
// environments, etc.) so the whole page doesn't crash — falls back to a
// static CSS gradient/particle backdrop instead.
export class WebGLErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // no-op: fallback UI is rendered via render()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-[#020104]">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 70% 40%, rgba(168,85,247,0.18), transparent 55%), radial-gradient(circle at 20% 80%, rgba(192,132,252,0.1), transparent 60%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '3px 3px',
            }}
          />
        </div>
      );
    }
    return this.props.children;
  }
}
