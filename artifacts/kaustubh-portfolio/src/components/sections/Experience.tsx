import React from 'react';
import { motion } from 'framer-motion';

const EXP = [
  {
    role: "AI/ML Developer Intern",
    company: "Cerope",
    period: "Feb 2026 – Apr 2026 · Remote",
    desc: "Worked on backend features for AI-based applications including chatbot integration and analysis modules. Explored different approaches, understood existing models/APIs, and built working implementations based on project requirements.",
  },
  {
    role: "Open Source Contributor",
    company: "GirlScript Summer of Code, Open Source Connect India",
    period: "Jul 2025 – Nov 2025 · Remote",
    desc: "Contributed to an open-source project named aeroplane-simulator.",
  }
];

export function Experience() {
  return (
    <motion.section id="experience" className="min-h-[100dvh] py-24 relative flex items-center">
      <div className="container mx-auto px-6 lg:pl-24 relative z-10">
        <motion.h2
          className="text-4xl md:text-6xl font-bold font-sans mb-12 md:mb-16 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Built Through <span className="text-primary">Curiosity</span>
        </motion.h2>

        <div className="max-w-4xl relative">
          {/* Glowing Vertical Line */}
          <motion.div
            className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-purple-500/50 to-transparent shadow-[0_0_10px_rgba(168,85,247,0.5)] origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="flex flex-col gap-12 md:gap-16">
            {EXP.map((job, index) => (
              <motion.div
                key={index}
                className="relative pl-10 md:pl-16"
                initial={{ opacity: 0, x: -30, rotateX: 10 }}
                whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2, type: "spring", stiffness: 100 }}
                style={{ transformPerspective: 1000 }}
              >
                {/* Timeline Glow Node */}
                <motion.div
                  className="absolute left-[3px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_15px_rgba(168,85,247,1)]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.2, type: "spring" }}
                />
                <motion.div
                  className="absolute left-0 top-[3px] w-4 h-4 rounded-full border border-primary/50"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1.5, opacity: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.2, duration: 1, repeat: Infinity }}
                />

                <div className="glass-card p-6 md:p-8 rounded border border-white/5 bg-[#05020a]/60 backdrop-blur-md hover:border-primary/30 transition-colors group cursor-none" data-hover-text="VIEW" data-magnetic>
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 md:mb-6 gap-3 md:gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold font-sans text-white group-hover:text-primary transition-colors">{job.role}</h3>
                      <h4 className="text-sm font-mono text-gray-400 mt-1">{job.company}</h4>
                    </div>
                    <span className="text-xs font-mono text-primary px-3 py-1 bg-primary/10 border border-primary/20 rounded w-fit whitespace-nowrap self-start">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 font-mono leading-relaxed">
                    {job.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
