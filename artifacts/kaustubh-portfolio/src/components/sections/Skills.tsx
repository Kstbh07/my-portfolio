import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { SolarSystem } from '../3d/SkillPlanets';
import { WebGLErrorBoundary } from '../3d/WebGLErrorBoundary';

// Mobile fallback — plain skill grid
const ALL_SKILLS = [
  'Python', 'React', 'TypeScript', 'Node.js',
  'Next.js', 'Django', 'PostgreSQL', 'MongoDB',
  'AWS', 'Express', 'JavaScript', 'MySQL'
];

export function Skills() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLDivElement>(null);
  const isInView    = useInView(sectionRef, { amount: 0.1, once: false });
  const canvasInView = useInView(canvasRef, { amount: 0.1, once: false });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-transparent min-h-screen flex flex-col justify-center"
    >
      <div className="container mx-auto px-6 relative z-10">
        
        {/* CENTERED HEADER */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold font-sans tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-300">
            SKILLS
          </h2>
          <p className="mt-4 text-gray-400 text-sm md:text-base font-mono uppercase tracking-widest">
            Technologies I use to build scalable products.
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          ref={canvasRef}
          className="w-full h-[600px] md:h-[750px] relative rounded-sm overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          {/* Transparent canvas bg to match page */}
          <div className="absolute inset-0 bg-transparent rounded-sm" />

          {/* Canvas — only mount when in view for perf */}
          {canvasInView && (
            <WebGLErrorBoundary>
              <Canvas
                shadows
                camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
                gl={{ antialias: false, alpha: true, stencil: false, depth: false }}
                onCreated={(state) => {
                  state.gl.toneMappingExposure = 1.5;
                  state.gl.setClearColor(0x000000, 0);
                  state.scene.background = null;
                }}
                style={{ width: '100%', height: '100%', touchAction: 'none' }}
              >
                <SolarSystem />
              </Canvas>
            </WebGLErrorBoundary>
          )}

          {/* Mobile fallback (only shown if WebGL fails entirely) */}
          <div className="md:hidden absolute inset-0 z-20 flex flex-wrap gap-3 items-center justify-center p-8 bg-black/80 backdrop-blur-sm pointer-events-none opacity-0">
            {ALL_SKILLS.map((s) => (
              <span
                key={s}
                className="px-4 py-2 text-xs font-mono text-gray-300 border border-primary/30 rounded glass-card"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
