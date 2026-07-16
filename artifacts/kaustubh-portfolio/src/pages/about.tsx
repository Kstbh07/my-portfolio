import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Navbar } from '@/components/layout/Navbar';
import { SocialRail } from '@/components/layout/SocialRail';
import { Footer } from '@/components/layout/Footer';
import { WebGLErrorBoundary } from '@/components/3d/WebGLErrorBoundary';

const EDUCATION = [
  { year: "2022", title: "Secondary School X", desc: "Maharishi Vidya Mandir", score: "70.6%" },
  { year: "2024", title: "Senior School XII", desc: "Maharishi Vidya Mandir", score: "80%" },
  { year: "2028", title: "B.Tech in CS (AI/ML)", desc: "Gyan Ganga Institute of Technology & Sciences (RGPV)", score: "CGPA 7.82" },
];

const FRAGMENTS = ["CURIOUS", "BUILDER", "HACKATHONS", "AI", "BACKEND", "COMMUNITIES", "AUTHOR", "LATE NIGHT IDEAS"];

function HolographicBook() {
  const groupRef = useRef<THREE.Group>(null);
  const [frontTex, backTex] = useTexture([
    '/attached_assets/book_front.jpg',
    '/attached_assets/book_back.jpg',
  ]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const width = 1.9;
  const height = 2.8;
  const spine = 0.32;

  // BoxGeometry material order: [+x, -x, +y, -y, +z (front), -z (back)]
  const spineMaterial = new THREE.MeshStandardMaterial({ color: '#0a0110', roughness: 0.6 });
  const edgeMaterial = new THREE.MeshStandardMaterial({ color: '#e5e5e0', roughness: 0.9 });

  return (
    <group ref={groupRef}>
      {/* Book cover volume — real front & back cover art, authored spine/edges */}
      <mesh position={[0, 0, 0]} material={[spineMaterial, spineMaterial, edgeMaterial, edgeMaterial, undefined as any, undefined as any]}>
        <boxGeometry args={[width, height, spine]} />
        <meshStandardMaterial attach="material-4" map={frontTex} roughness={0.35} />
        <meshStandardMaterial attach="material-5" map={backTex} roughness={0.35} />
      </mesh>
      {/* Subtle glow rim to match the site's holographic aesthetic */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width + 0.04, height + 0.04, spine + 0.04]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function Scene3D() {
  return (
    <WebGLErrorBoundary>
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[3, 4, 5]} intensity={1.2} />
          <pointLight position={[-3, -2, 4]} intensity={0.8} color="#c084fc" />
          <React.Suspense fallback={null}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <HolographicBook />
            </Float>
          </React.Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}

function EducationJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="relative py-24 max-w-3xl mx-auto">
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-primary/20 transform md:-translate-x-1/2 z-0">
        <motion.div className="w-full bg-primary origin-top" style={{ scaleY, height: '100%' }} />
      </div>
      
      <div className="space-y-32 relative z-10">
        {EDUCATION.map((ed, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="hidden md:block w-1/2" />
            <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary transform -translate-x-1/2 shadow-[0_0_15px_#a855f7] z-20" />
            <div className="w-full md:w-1/2 pl-16 md:pl-0">
              <div className={`p-6 glass-card border-primary/20 relative ${i % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                <div className="text-primary font-mono mb-2">{ed.year}</div>
                <h3 className="text-xl font-bold text-white mb-1">{ed.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{ed.desc}</p>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary border border-primary/30 font-mono text-xs rounded-full">
                  {ed.score}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProfileFrame() {
  const [imgError, setImgError] = useState(false);
  
  return (
    <motion.div 
      className="relative w-96 h-[500px] mx-auto glass-card border border-primary/30 p-3 shadow-[0_0_40px_rgba(168,85,247,0.15)] overflow-hidden"
      initial={{ opacity: 0, rotateY: -15, z: -100 }}
      animate={{ opacity: 1, rotateY: 0, z: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      style={{ transformPerspective: 1000 }}
      whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 mix-blend-overlay pointer-events-none" />
      <div className="w-full h-full relative overflow-hidden bg-background/50 flex items-center justify-center">
        {!imgError ? (
          <img 
            src="/profile.jpg" 
            alt="Kaustubh Sen" 
            className="w-full h-full object-cover rounded shadow-lg" 
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-primary font-sans font-bold text-6xl opacity-50 bg-primary/5">
            <span>KS</span>
          </div>
        )}
        <div className="absolute inset-0 border border-primary/20 pointer-events-none" />
      </div>
      
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary pointer-events-none" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary pointer-events-none" />
    </motion.div>
  );
}

export default function AboutPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#020104] text-foreground min-h-screen overflow-x-hidden selection:bg-primary/30">
      <Navbar />
      <SocialRail />

      <section className="min-h-[90vh] pt-32 pb-16 relative flex items-center">
        <div className="container mx-auto px-6 lg:pl-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold font-sans tracking-tight leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-primary block mb-2">I build.</span>
                <span className="text-white block mb-2">I break.</span>
                <span className="text-gray-400 block mb-2">I learn.</span>
                <span className="text-primary block">I repeat.</span>
              </motion.h1>

              <motion.div 
                className="space-y-6 text-gray-300 font-mono text-sm leading-relaxed max-w-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p>
                  I'm Kaustubh Sen, a B.Tech student specializing in Artificial Intelligence & Machine Learning.
                </p>
                <p>
                  I'm deeply into coding, AI, backend development, and ethical hacking — but I enjoy building things more than just learning about them. Hackathons, tech communities, and slightly unreasonable ideas are usually where you'll find me. 
                </p>
                <p className="text-primary font-bold tracking-wider pt-2">
                  Always curious. Usually building.
                </p>
                <div className="flex items-center gap-4 text-xs tracking-widest uppercase border-t border-white/10 pt-6 mt-6">
                  <span className="text-gray-500">Location:</span>
                  <span className="text-white">Jabalpur, India</span>
                </div>
                <div className="flex items-center gap-4 text-xs tracking-widest uppercase">
                  <span className="text-gray-500">Status:</span>
                  <span className="text-primary">1.5+ Years Coding Journey</span>
                </div>
              </motion.div>
            </div>

            <div className="relative">
              <ProfileFrame />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6 lg:pl-32 relative z-10 text-center">
          <div className="relative h-48 flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {FRAGMENTS.map((frag, i) => (
              <motion.span
                key={i}
                className="text-gray-500 font-mono text-lg md:text-2xl tracking-widest cursor-default select-none hover:text-primary transition-colors mix-blend-screen"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  opacity: { duration: 1 },
                  y: { repeat: Infinity, duration: 4 + (i % 3), delay: i * 0.2, ease: "easeInOut" }
                }}
                whileHover={{ opacity: 1, scale: 1.1 }}
              >
                {frag}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative">
        <div className="container mx-auto px-6 lg:pl-32 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold font-sans text-white mb-2">Education</h2>
            <p className="text-primary font-mono text-sm tracking-widest uppercase">The Academic Path</p>
          </motion.div>
          
          <EducationJourney />
        </div>
      </section>

      <section className="py-32 relative min-h-[70vh] flex items-center border-t border-white/5 bg-[#030106]">
        <div className="absolute inset-0 z-0">
          <Scene3D />
        </div>
        
        <div className="container mx-auto px-6 lg:pl-32 relative z-10">
          <div className="max-w-2xl mx-auto text-center glass-card p-12 relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0,transparent_70%)] pointer-events-none" />
             
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative z-10"
             >
               <h2 className="text-3xl font-bold font-sans text-white mb-2">Beyond the Code</h2>
               <p className="text-gray-400 font-mono text-sm leading-relaxed mb-8 mt-6">
                 I'm also the author of <span className="text-primary">"The Archive of Unwritten Futures"</span> — a sci-fi and philosophical thriller exploring alternate realities, identity, and free will.
               </p>
               <p className="text-xl font-serif italic text-white/80">
                 "Some ideas become code. Others become stories."
               </p>
             </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 relative border-t border-white/5 bg-black">
        <div className="container mx-auto px-6 lg:pl-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6"
          >
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-8 py-4 glass-card text-white hover:text-primary hover:border-primary/50 transition-colors font-mono text-sm tracking-widest cursor-none">
              RESUME
            </a>
            <a href="https://github.com/Kaustubh-Sen" target="_blank" rel="noreferrer" className="px-8 py-4 glass-card text-white hover:text-primary hover:border-primary/50 transition-colors font-mono text-sm tracking-widest cursor-none">
              GITHUB
            </a>
            <a href="https://www.linkedin.com/in/kaustubh-sen-1ba15525a" target="_blank" rel="noreferrer" className="px-8 py-4 glass-card text-white hover:text-primary hover:border-primary/50 transition-colors font-mono text-sm tracking-widest cursor-none">
              LINKEDIN
            </a>
            <a href="mailto:kaustubhsen18@gmail.com" className="px-8 py-4 glass-card text-white hover:text-primary hover:border-primary/50 transition-colors font-mono text-sm tracking-widest cursor-none">
              EMAIL
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
