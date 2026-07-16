import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export function About() {
  const words = ["I build.", "I break.", "I learn.", "I repeat."];

  return (
    <motion.section id="about" className="min-h-[100dvh] py-24 relative flex items-center z-20">
      <div className="container mx-auto px-6 lg:pl-24 relative z-30">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column: Content */}
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl md:text-5xl font-bold font-sans tracking-tight flex flex-wrap gap-3">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className={i === 0 ? "text-primary" : "text-white"}
                  initial={{ opacity: 0, z: -50, rotateX: 20 }}
                  whileInView={{ opacity: 1, z: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  style={{ transformPerspective: 1000 }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <div className="space-y-6 text-gray-300 font-mono text-sm leading-relaxed max-w-lg">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                I'm Kaustubh Sen, a B.Tech student specializing in Artificial Intelligence & Machine Learning.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                I'm deeply into coding, AI, backend development, and ethical hacking — but I enjoy building things more than just learning about them. Hackathons, tech communities, and slightly unreasonable ideas are usually where you'll find me.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Beyond code, I'm also the published author of "The Archive of Unwritten Futures", a sci-fi and philosophical thriller exploring alternate realities, identity, and free will.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-primary font-bold tracking-wider"
              >
                Always curious. Usually building.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="pt-4"
              >
                <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary border border-primary/50 hover:bg-primary/20 transition-colors font-mono text-sm tracking-widest cursor-none">
                  KNOW MORE ABOUT ME <span className="text-lg">→</span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right Column: 3D Floating Identity Card */}
          <div className="relative h-[440px] md:h-[500px] flex items-center justify-center perspective-1000">
            <motion.div
              className="glass-card w-full max-w-sm rounded border border-white/10 p-6 md:p-8 backdrop-blur-xl bg-[#05020a]/40 shadow-2xl relative overflow-hidden"
              data-magnetic
              initial={{ opacity: 0, rotateY: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, rotateY: -5, scale: 1 }}
              whileHover={{ rotateY: 0, scale: 1.02 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              {/* Moving glass reflection */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 w-[200%] h-[200%] -top-1/2 -left-1/2 pointer-events-none"
                animate={{ x: ['0%', '50%', '0%'], y: ['0%', '50%', '0%'] }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              />
              <div className="absolute inset-0 border border-primary/30 rounded shadow-[inset_0_0_20px_rgba(168,85,247,0.1)] pointer-events-none" />

              <div className="relative z-10 space-y-4 font-mono text-xs">
                <div className="border-b border-white/10 pb-4 mb-4">
                  <span className="text-gray-500 uppercase tracking-widest block mb-1">Name</span>
                  <span className="text-white text-lg font-bold">Kaustubh Sen</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase tracking-widest block mb-1">Location</span>
                  <span className="text-gray-300">Jabalpur, India</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase tracking-widest block mb-1">Education</span>
                  <span className="text-gray-300">B.Tech — AI & ML (Gyan Ganga Institute of Technology & Sciences)</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase tracking-widest block mb-1">Focus</span>
                  <span className="text-primary font-bold">AI • Backend • Building Ideas</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase tracking-widest block mb-1">Status</span>
                  <span className="text-green-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Always Curious
                  </span>
                </div>
                <div className="pt-4 mt-4 border-t border-white/10">
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="block w-full py-3 text-center border border-primary/50 text-primary hover:bg-primary/10 transition-colors cursor-none tracking-widest font-bold">
                    DOWNLOAD RESUME
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.p
              className="absolute -bottom-8 right-0 text-[10px] font-serif italic text-gray-500 max-w-[200px] text-right"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
            >
              "Somewhere between curiosity and chaos, I usually end up building something."
            </motion.p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
