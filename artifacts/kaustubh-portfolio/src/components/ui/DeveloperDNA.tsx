import React from 'react';
import { motion } from 'framer-motion';

const DNA_STATS = [
  { label: 'Backend', value: 92 },
  { label: 'AI/ML', value: 96 },
  { label: 'DSA', value: 81 },
  { label: 'Open Source', value: 64 },
  { label: 'Hackathons', value: 78 },
];

export function DeveloperDNA() {
  return (
    <div className="w-full mt-24">
      <motion.div 
        className="flex flex-col items-center mb-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl md:text-3xl font-bold font-sans text-center">
          Developer <span className="text-primary">DNA</span>
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
        {DNA_STATS.map((stat, idx) => (
          <div key={stat.label} className="w-full group">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-semibold text-white/90 font-mono uppercase tracking-wider">{stat.label}</span>
              <span className="text-xs font-mono text-primary font-bold">{stat.value}%</span>
            </div>
            <div className="h-2 w-full bg-[#0d1117] rounded-full overflow-hidden relative border border-white/5">
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary rounded-full relative overflow-hidden"
                style={{ 
                  boxShadow: '0 0 12px rgba(139, 92, 246, 0.6), 0 0 24px rgba(139, 92, 246, 0.4)' 
                }}
                initial={{ width: 0 }}
                whileInView={{ width: `${stat.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.1 * idx, ease: "easeOut" }}
              >
                {/* Subtle shine effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
