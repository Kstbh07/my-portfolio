import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { X, Menu } from 'lucide-react';

const NAV_LINKS = [
  { name: 'HOME',           href: '#home',            isRoute: false },
  { name: 'ABOUT',          href: '/about',            isRoute: true  },
  { name: 'PROJECTS',       href: '#projects',         isRoute: false },
  { name: 'EXPERIENCE',     href: '#experience',       isRoute: false },
  { name: 'SKILLS',         href: '#skills',           isRoute: false },
  { name: 'CONTACT',        href: '#contact',          isRoute: false },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [location, setLocation]           = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (location !== '/') return;
      const sections = NAV_LINKS.filter(l => !l.isRoute).map(l => l.name.toLowerCase());
      let active = 'home';
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          active = sections[i];
          break;
        }
      }
      setActiveSection(active);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof NAV_LINKS[0]) => {
    setMobileOpen(false);
    if (link.isRoute) {
      e.preventDefault();
      setLocation(link.href);
      window.scrollTo(0, 0);
      return;
    }
    if (location !== '/') {
      e.preventDefault();
      setLocation('/');
      setTimeout(() => {
        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    if (link.href.startsWith('#')) {
      e.preventDefault();
      setActiveSection(link.name.toLowerCase());
      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'bg-[#05020a]/90 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-mono font-bold text-lg cursor-none" data-hover-text="HOME" data-magnetic>
            <span className="text-primary">{'<'}</span>
            <span className="text-white tracking-widest">KS</span>
            <span className="text-primary">{'>'}</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-widest font-semibold">
            {NAV_LINKS.map((link) => {
              const isActive = link.isRoute
                ? location === link.href
                : activeSection === link.name.toLowerCase() && location === '/';
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link)}
                  data-hover-text={link.name}
                  data-magnetic
                  className={`transition-colors cursor-none ${
                    isActive ? 'text-primary' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-gray-400 hover:text-white transition-colors p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-40 pt-20 pb-8 px-6 bg-[#05020a]/95 backdrop-blur-xl border-b border-white/10 lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => {
                const isActive = link.isRoute
                  ? location === link.href
                  : activeSection === link.name.toLowerCase() && location === '/';
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleClick(e, link)}
                    className={`font-mono text-sm tracking-widest py-2 border-b border-white/5 transition-colors ${
                      isActive ? 'text-primary' : 'text-gray-400'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
