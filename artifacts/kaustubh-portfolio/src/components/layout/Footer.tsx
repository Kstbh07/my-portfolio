import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { useLocation } from 'wouter';

const QUICK_LINKS = [
  { name: 'About', href: '/about', isRoute: true },
  { name: 'Projects', href: '#projects', isRoute: false },
  { name: 'Skills', href: '#skills', isRoute: false },
  { name: 'Contact', href: '#contact', isRoute: false },
];

const RESOURCE_LINKS = [
  { name: 'Resume', href: '/resume.pdf', isRoute: false, isExternal: true },
  { name: 'Experience', href: '#experience', isRoute: false },
  { name: 'Achievements', href: '#achievements', isRoute: false },
];

export function Footer() {
  const [location, setLocation] = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string; isRoute: boolean; isExternal?: boolean }) => {
    if (link.isExternal) return;
    if (link.isRoute) {
      e.preventDefault();
      setLocation(link.href);
      window.scrollTo(0, 0);
      return;
    }
    if (link.href === '#') return;

    if (location !== '/') {
      e.preventDefault();
      setLocation('/');
      setTimeout(() => {
        const target = document.querySelector(link.href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    e.preventDefault();
    const target = document.querySelector(link.href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="mt-24 border-t border-white/10 bg-[#020104]/80 backdrop-blur-md relative z-10">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Brand col — shifted right on lg to clear the fixed sidebar rail */}
        <div className="md:col-span-2 lg:pl-16">
          <h3 className="text-xl font-bold font-sans text-white mb-4">Kaustubh Sen</h3>
          <p className="text-sm text-gray-400 font-mono leading-relaxed max-w-sm mb-6">
            I'm a Full-Stack Developer passionate about building scalable backend systems and integrating AI to create smarter web experiences.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-mono font-bold text-primary tracking-widest mb-6">QUICK LINKS</h4>
          <ul className="space-y-3 text-sm font-mono text-gray-400 mb-6">
            {QUICK_LINKS.map((link) => (
              <li key={link.name}>
                <a href={link.href} onClick={(e) => handleClick(e, link)} className="hover:text-white transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-4 text-gray-500">
            <a href="https://github.com/kstbh07" target="_blank" rel="noreferrer noopener" className="hover:text-primary transition-colors"><Github size={18}/></a>
            <a href="https://www.linkedin.com/in/kaustubhsenwrks/" target="_blank" rel="noreferrer noopener" className="hover:text-primary transition-colors"><Linkedin size={18}/></a>
            <a href="https://instagram.com/kstbh07" target="_blank" rel="noreferrer noopener" className="hover:text-primary transition-colors"><Instagram size={18}/></a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-mono font-bold text-primary tracking-widest mb-6">RESOURCES</h4>
          <ul className="space-y-3 text-sm font-mono text-gray-400">
            {RESOURCE_LINKS.map((link) => (
              <li key={link.name}>
                <a href={link.href} target={link.isExternal ? "_blank" : undefined} rel={link.isExternal ? "noopener noreferrer" : undefined} onClick={(e) => handleClick(e, link)} className="hover:text-white transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 lg:pl-22 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <p>© 2026 Kaustubh Sen. All rights reserved.</p>
          <p className="text-center md:text-right">Made with ⚡, caffeine & late night commits & somewhere between bugs and dreams.</p>
        </div>
      </div>
    </footer>
  );
}
