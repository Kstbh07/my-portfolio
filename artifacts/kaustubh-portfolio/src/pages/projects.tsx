import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Scene } from '@/components/3d/Scene';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

const ALL_PROJECTS = [
  {
    title: "Votex",
    subtitle: "Decentralised Voting System",
    description: "A tamper-proof, transparent on-chain voting platform built with Solidity smart contracts and a React frontend. Every vote is an immutable blockchain transaction — no central authority, no manipulation.",
    tags: ["Solidity", "Ethereum", "React", "Web3.js", "Hardhat"],
    link: "/projects"
  },
  {
    title: "Open Pulse",
    subtitle: "AI-Powered GitHub Dependency Explorer",
    description: "An interactive AI 3D dependency-graph explorer for any public GitHub repository — enter a repo as owner/name and a FastAPI backend fetches its package.json, rendering every package as a fully navigable 3D scene in the browser via react-three-fiber. Handles 50+ node graphs at a smooth 60fps via level-of-detail culling. Deployed end-to-end on Render + Vercel.",
    tags: ["Next.js/React", "FastAPI", "Three.js", "React Three Fiber"],
    link: "#"
  },
  {
    title: "Civic Chain",
    subtitle: "Transparent Blockchain Governance",
    description: "A blockchain-based transparent governance and voting platform to ensure secure and auditable local community elections. Employs smart contracts to securely log community feedback and voting data.",
    tags: ["Solidity", "React", "Web3", "Ethereum"],
    link: "#"
  },
  {
    title: "Smart Calculator",
    subtitle: "Advanced Scientific Equation Solver",
    description: "An advanced scientific calculator with an intuitive UI and equation parsing capabilities for seamless complex math solving and interactive visualizations.",
    tags: ["React", "TypeScript", "Math.js"],
    link: "#"
  },
  {
    title: "AlgoVisualizer",
    subtitle: "Algorithm Visualization Tool",
    description: "A web-based algorithm visualizer demonstrating sorting and pathfinding algorithms with interactive controls and real-time execution visualization.",
    tags: ["HTML", "CSS", "JavaScript", "Django", "MySQL"],
    link: "#"
  }
];

export default function ProjectsPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <main className="bg-[#020104] min-h-screen text-foreground overflow-hidden" ref={containerRef}>
      <Navbar />
      <Scene />
      
      <div className="relative z-10 container mx-auto px-6 py-32 pointer-events-auto">
        
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-primary transition-colors cursor-none mb-8" data-magnetic data-hover-text="BACK">
            <ArrowLeft size={16} /> BACK TO HOME
          </Link>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold font-sans tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            All <span className="text-primary">Projects</span>
          </motion.h1>
          <motion.p 
            className="text-gray-400 font-mono max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            A complete archive of things I've built, exploring different technologies, solving distinct problems, and constantly learning.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 perspective-1000 pb-32">
          {ALL_PROJECTS.map((project, i) => {
            return (
              <motion.div
                key={i}
                className="glass-card p-8 rounded border border-white/10 bg-[#05020a]/60 backdrop-blur-xl relative group cursor-none overflow-hidden"
                data-hover-text="VIEW"
                data-magnetic
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ rotateX: -2, rotateY: 2, scale: 1.02, borderColor: 'rgba(168,85,247,0.4)', boxShadow: '0 10px 40px rgba(168,85,247,0.1)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 transform translate-z-[30px]">
                  <h3 className="text-2xl font-bold font-sans text-white mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <h4 className="text-xs font-mono text-primary/80 mb-4 tracking-widest uppercase">{project.subtitle}</h4>
                  <p className="text-sm font-mono text-gray-300 leading-relaxed mb-8">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 text-gray-300 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a href={project.link} className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-white hover:text-primary transition-colors">
                    VIEW REPOSITORY <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
