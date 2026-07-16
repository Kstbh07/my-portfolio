import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const FEATURED_PROJECTS = [
  {
    title: "Votex",
    subtitle: "Decentralised Voting System",
    description: "A tamper-proof, transparent on-chain voting platform built with Solidity smart contracts and a React frontend. Every vote is an immutable blockchain transaction — no central authority, no manipulation. Supports multiple concurrent proposals, real-time vote tallying, and wallet-based identity verification.",
    tags: ["Solidity", "Ethereum", "React", "Web3.js", "Hardhat"],
    link: "/projects"
  },
  {
    title: "Open Pulse",
    subtitle: "AI-Powered GitHub Dependency Explorer",
    description: "An interactive AI 3D dependency-graph explorer for any public GitHub repository — enter a repo as owner/name and a FastAPI backend fetches its package.json, rendering every package as a fully navigable 3D scene in the browser via react-three-fiber. Handles 50+ node graphs at a smooth 60fps via level-of-detail culling. Deployed end-to-end on Render + Vercel.",
    tags: ["Next.js/React", "FastAPI", "Three.js", "React Three Fiber"],
    link: "/projects"
  }
];

export function Projects() {
  return (
    <motion.section id="projects" className="min-h-[100dvh] py-24 relative flex items-center">
      <div className="container mx-auto px-6 lg:pl-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left: Headers */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.h2
              className="text-5xl md:text-7xl font-bold font-sans tracking-tight"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Ideas.<br/>
              <span className="text-primary">Code.</span><br/>
              Impact.
            </motion.h2>
            <motion.p
              className="text-gray-400 font-mono text-sm leading-relaxed max-w-sm mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Building systems that bridge the gap between complex backend architecture and seamless user experiences.
            </motion.p>
          </div>

          {/* Right: Holographic Project Cards */}
          <div className="lg:col-span-7 flex flex-col gap-8 perspective-1000">
            {FEATURED_PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                className="glass-card rounded border border-white/10 p-6 md:p-8 relative overflow-hidden group cursor-none backdrop-blur-md bg-black/40"
                data-hover-text="VIEW"
                data-magnetic
                initial={{ opacity: 0, rotateX: 20, z: -50 }}
                whileInView={{ opacity: 1, rotateX: 0, z: 0 }}
                whileHover={{ scale: 1.02, rotateX: -2, z: 20, borderColor: 'rgba(168,85,247,0.5)', boxShadow: '0 0 30px rgba(168,85,247,0.15)' }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Holographic scanning line */}
                <div className="absolute inset-0 w-full h-[2px] bg-primary/40 opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none" />

                <div className="absolute top-0 right-0 text-7xl font-sans font-bold text-white/[0.02] -mt-6 -mr-4 pointer-events-none group-hover:text-primary/[0.05] transition-colors">
                  0{index + 1}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold font-sans text-white mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <h4 className="text-xs font-mono text-primary/80 mb-4 tracking-widest uppercase">{project.subtitle}</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-mono">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-primary/10 border border-primary/20 text-white rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.div
              className="mt-4 flex justify-end"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/projects" className="group flex items-center gap-3 px-6 md:px-8 py-4 border border-white/20 text-white font-mono text-sm tracking-widest font-bold hover:border-primary hover:text-primary transition-all cursor-none" data-magnetic>
                VIEW ALL PROJECTS
                <span>→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
