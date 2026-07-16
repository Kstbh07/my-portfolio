import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  const [codeIndex, setCodeIndex] = useState(0);

  const codeSnippets = [
    `async function analyzeData() {\n  const context = await parse();\n  return generateInsights(context);\n}`,
    `def process_pipeline(batch):\n    features = extract(batch)\n    return model.predict(features)`,
    `SELECT u.id, m.score\nFROM metrics m\nJOIN users u ON u.id = m.user_id\nWHERE m.confidence > 0.95;`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCodeIndex((prev) => (prev + 1) % codeSnippets.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section id="home" className="min-h-[100dvh] relative flex items-center pt-20">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column */}
        <div className="flex flex-col gap-6 lg:pl-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="font-mono text-primary mb-2 text-sm md:text-base">Hello, I'm</p>
            <h1 className="text-5xl md:text-7xl font-bold font-sans tracking-tight mb-2 flex flex-wrap overflow-hidden">
              <div className="flex overflow-hidden">
                {"KAUSTUBH".split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    className="text-white inline-block"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.05, ease: [0.33, 1, 0.68, 1] }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-300 ml-4 pb-2 relative group cursor-none magnetic-text" data-hover-text="SEN" data-magnetic>
                SEN
              </span>
            </h1>
            <h2 className="text-sm md:text-md font-mono text-gray-400 tracking-widest border-b border-white/10 pb-4 mb-4 inline-block mt-2">
              AI & ML ENGINEER · BACKEND DEVELOPER
            </h2>
            <p className="text-gray-400 max-w-lg leading-relaxed text-sm md:text-base">
              I build intelligent systems, scalable backend solutions, and slightly unreasonable ideas. Turning curiosity into impact through code.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-4 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <a href="#projects" data-magnetic data-hover-text="EXPLORE" className="relative overflow-hidden group px-6 py-3 bg-black/40 backdrop-blur-sm border border-primary text-white font-mono text-sm tracking-wider font-semibold cursor-none transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <span className="absolute inset-0 w-0 bg-primary/20 transition-all duration-300 ease-out group-hover:w-full" />
              <span className="relative flex items-center gap-2">
                EXPLORE MY WORK
                <motion.span className="inline-block" group-hover={{ x: 5 }}>→</motion.span>
              </span>
            </a>
            <a href="#about" data-magnetic data-hover-text="ABOUT" className="px-6 py-3 border border-white/20 bg-black/20 backdrop-blur-sm text-gray-300 font-mono text-sm tracking-wider font-semibold hover:bg-white/5 hover:text-white transition-colors cursor-none">
              VIEW MORE
            </a>
          </motion.div>

          <motion.div 
            className="flex gap-8 mt-8 pt-8 border-t border-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div data-magnetic className="cursor-none">
              <motion.h3 className="text-3xl font-bold text-white font-mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>1.5+</motion.h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Years Coding</p>
            </div>
            <div data-magnetic className="cursor-none">
              <h3 className="text-3xl font-bold text-white font-mono">10+</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Projects</p>
            </div>
            <div data-magnetic className="cursor-none">
              <h3 className="text-3xl font-bold text-white font-mono">5+</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Hackathons</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column (Floating Elements over 3D Globe) */}
        <div className="relative h-[600px] hidden lg:block perspective-1000">
          
          {/* Tech Stack Glass Panel */}
          <motion.div 
            className="absolute top-1/4 right-0 glass-card p-5 rounded border border-primary/20 w-56 z-20 backdrop-blur-md bg-[#05020a]/60 shadow-2xl"
            initial={{ opacity: 0, x: 50, rotateY: -20 }}
            animate={{ opacity: 1, x: 0, rotateY: -10, y: [0, -15, 0] }}
            transition={{ opacity: { duration: 0.8, delay: 1 }, rotateY: { duration: 0.8 }, y: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
            data-magnetic
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 rounded" />
            <h4 className="text-xs font-mono text-primary mb-3 uppercase tracking-widest border-b border-primary/20 pb-2">Tech Stack</h4>
            <div className="flex flex-wrap gap-1.5 relative z-10">
              {['Python', 'Django', 'Next.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS'].map((tech) => (
                <span key={tech} className="text-[10px] px-2 py-1 rounded bg-black/40 border border-white/10 text-gray-300 font-mono tracking-wide">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Code Snippet Glass Panel */}
          <motion.div 
            className="absolute bottom-1/3 left-0 glass-card p-5 rounded border border-white/10 w-72 z-20 font-mono text-xs text-primary/80 backdrop-blur-md bg-[#05020a]/80 shadow-2xl"
            initial={{ opacity: 0, x: -50, rotateY: 20 }}
            animate={{ opacity: 1, x: 0, rotateY: 15, y: [0, 15, 0] }}
            transition={{ opacity: { duration: 0.8, delay: 1.2 }, rotateY: { duration: 0.8 }, y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 } }}
            data-magnetic
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-30 rounded" />
            <div className="flex gap-1.5 mb-3 relative z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <pre className="whitespace-pre-wrap leading-loose relative z-10">
              {codeSnippets[codeIndex]}
            </pre>
            <motion.div 
              className="w-2 h-4 bg-primary inline-block mt-1 align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
          </motion.div>

          {/* Floating Quote */}
          <motion.div 
            className="absolute bottom-12 right-12 glass-card p-5 rounded border border-white/5 max-w-[220px] z-20 backdrop-blur-sm bg-black/40"
            initial={{ opacity: 0, y: 30, rotateZ: -5 }}
            animate={{ opacity: 1, y: [0, -10, 0], rotateZ: -2 }}
            transition={{ opacity: { duration: 0.8, delay: 1.4 }, rotateZ: { duration: 0.8, delay: 1.4 }, y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 } }}
            data-magnetic
          >
            <p className="text-sm font-serif italic text-gray-300 leading-relaxed">
              "Some things fail silently. Good systems don't."
            </p>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hidden md:flex"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </motion.section>
  );
}
