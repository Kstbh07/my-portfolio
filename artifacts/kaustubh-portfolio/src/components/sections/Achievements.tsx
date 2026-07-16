import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Award, BookOpen, Trophy } from 'lucide-react';

const ACHIEVEMENTS = [
  {
    label: "1ST RUNNER-UP",
    title: "Genethon - 24hrs National Level Hackathon",
    date: "1st semester",
    location: "GGITS Jabalpur",
    project: "AlgoVisualizer",
    desc: "Earned 1st Runner-up in my very first national-level hackathon during the first semester.",
    tags: ["Hackathon", "Algorithms", "Teamwork"],
    photo: "/attached_assets/hackathon1.png"
  },
  {
    label: "2ND RUNNER-UP",
    title: "FOSS Hack localhost:Jabalpur 2026",
    date: "2026",
    location: "Jabalpur",
    project: "Open Pulse",
    desc: "Placed 2nd Runner-up at a national-level open-source hackathon organized under India's largest FOSS hackathon initiative.",
    tags: ["Open Source", "FOSS", "National"],
    photo: "/attached_assets/hackathon2.jpg"
  },
  {
    label: "BEST UI AWARD",
    title: "Global Buildathon",
    date: "Recent",
    location: "Global / Remote",
    project: "Open Pulse",
    desc: "Won the Best UI Award at the Global Buildathon Hackathon for Open Pulse — recognised for its cinematic 3D interface, real-time dependency graph rendering, and premium design quality.",
    tags: ["Best UI", "Design", "Global", "Hackathon"],
    icon: <Trophy size={64} className="text-primary/60" />
  },
  {
    label: "TEAM ACHIEVEMENT",
    title: "Pears Global Hackathon",
    date: "Recent",
    location: "Global / Remote",
    project: "Various",
    desc: "Gained hands-on experience of teamwork and won exclusive prizes.",
    tags: ["Hackathon", "Teamwork", "Global"],
    icon: <Award size={64} className="text-primary/50" />
  },
  {
    label: "PUBLISHED AUTHOR",
    title: "The Archive of Unwritten Futures",
    date: "Published",
    location: "ISBN 979-8285537793",
    project: "Book",
    desc: "Published a speculative fiction novel — a sci-fi and philosophical thriller exploring alternate realities, identity, and free will.",
    tags: ["Published Author", "Fiction", "Writing"],
    photo: "/attached_assets/book_front.jpg"
  }
];

export function Achievements() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % ACHIEVEMENTS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + ACHIEVEMENTS.length) % ACHIEVEMENTS.length);

  return (
    <section id="achievements" className="min-h-[100dvh] py-24 relative flex items-center overflow-hidden">
      <div className="container mx-auto px-6 lg:pl-24 relative z-10 w-full">
        <motion.h2
          className="text-4xl md:text-6xl font-bold font-sans mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Beyond the <span className="text-primary">Code</span>
        </motion.h2>

        <div className="relative glass-card border border-white/10 rounded-lg overflow-hidden bg-black/40 backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="grid lg:grid-cols-2 min-h-[480px] md:min-h-[500px]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Left Side: Content */}
              <div className="p-8 md:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-[1px] bg-primary"></span>
                  <span className="text-primary font-mono text-xs font-bold tracking-widest">{ACHIEVEMENTS[currentIndex].label}</span>
                </div>

                <h3 className="text-2xl md:text-4xl font-bold font-sans text-white mb-6 leading-tight">
                  {ACHIEVEMENTS[currentIndex].title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm font-mono text-gray-400 mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-primary" />
                    {ACHIEVEMENTS[currentIndex].date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-primary" />
                    {ACHIEVEMENTS[currentIndex].location}
                  </div>
                </div>

                <div className="mb-4 text-white font-mono text-sm">
                  <span className="text-gray-500">Project: </span> {ACHIEVEMENTS[currentIndex].project}
                </div>

                <p className="text-gray-300 font-mono text-sm leading-relaxed mb-8">
                  {ACHIEVEMENTS[currentIndex].desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-8 md:mb-12">
                  {ACHIEVEMENTS[currentIndex].tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-3 py-1 bg-white/5 border border-white/10 rounded text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Controls */}
                <div className="flex gap-4 mt-auto">
                  <button onClick={prev} className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white/10 hover:text-primary transition-colors cursor-none" data-magnetic>
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={next} className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white/10 hover:text-primary transition-colors cursor-none" data-magnetic>
                    <ChevronRight size={20} />
                  </button>
                  <div className="ml-4 flex flex-col justify-center font-mono text-xs text-gray-500">
                    <span className="text-white">0{currentIndex + 1}</span>
                    <span className="w-8 h-[1px] bg-white/20 my-1" />
                    <span>0{ACHIEVEMENTS.length}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Visual */}
              <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px] p-4 lg:p-8 overflow-visible perspective-1000 w-full h-full">
                {/* Floating wrapper for the slow up/down animation */}
                <motion.div
                  className="w-full max-w-sm lg:max-w-md"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Hover wrapper for the fast 3D tilt animation */}
                  <motion.div
                    className="w-full aspect-[3/4] md:aspect-[4/5] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(168,85,247,0.15)] border border-white/10 relative group"
                    initial={{ rotateY: 0, rotateX: 0, scale: 1 }}
                    whileHover={{ rotateY: -10, rotateX: 10, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="absolute inset-0 bg-[#05020a]/80 backdrop-blur-sm z-0" />
                    
                    {ACHIEVEMENTS[currentIndex].photo ? (
                      <>
                        <img
                          src={ACHIEVEMENTS[currentIndex].photo}
                          alt={ACHIEVEMENTS[currentIndex].title}
                          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-300 z-10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020104] via-[#020104]/40 to-transparent z-20" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-gradient-to-br from-primary/10 to-transparent">
                        <div className="w-24 h-24 rounded-full border border-primary/30 flex items-center justify-center bg-primary/10 mb-4 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                          {ACHIEVEMENTS[currentIndex].icon}
                        </div>
                      </div>
                    )}

                    {/* Floating elements inside the 3D card */}
                    <div className="absolute top-4 right-4 z-30">
                      <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded border border-white/10 text-xs font-mono text-primary">
                        {ACHIEVEMENTS[currentIndex].date}
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 z-30 transform translate-z-10 text-center">
                       <p className="text-white font-sans text-lg md:text-xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">{ACHIEVEMENTS[currentIndex].title}</p>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Background ambient glow */}
                <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150 -z-10" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
