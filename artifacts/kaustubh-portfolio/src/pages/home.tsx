import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { CodingStats } from '@/components/sections/CodingStats';
import { Achievements } from '@/components/sections/Achievements';
import { Certifications } from '@/components/sections/Certifications';
import { Contact } from '@/components/sections/Contact';
import { Scene } from '@/components/3d/Scene';
import { Navbar } from '@/components/layout/Navbar';
import { SocialRail } from '@/components/layout/SocialRail';

export default function Home() {
  return (
    <main className="bg-[#020104] text-foreground overflow-hidden">
      <Navbar />
      <SocialRail />
      <Scene />
      
      {/* Sections overlaid on 3D canvas */}
      <div className="relative z-10 w-full pointer-events-none">
        <div className="pointer-events-auto"><Hero /></div>
        <div className="pointer-events-auto"><About /></div>
        <div className="pointer-events-auto"><Projects /></div>
        <div className="pointer-events-auto"><Experience /></div>
        <div className="pointer-events-auto"><Skills /></div>
        <div className="pointer-events-auto"><CodingStats /></div>
        <div className="pointer-events-auto"><Achievements /></div>
        <div className="pointer-events-auto"><Certifications /></div>
        <div className="pointer-events-auto"><Contact /></div>
      </div>
    </main>
  );
}
