import React from 'react';
import { Github, Linkedin, Twitter, Mail, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

export function SocialRail() {
  const socials = [
    { icon: <Github size={20} />, href: 'https://github.com/kstbh07', label: 'GitHub', external: true },
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/kaustubhsenwrks/', label: 'LinkedIn', external: true },
    { icon: <Instagram size={20} />, href: 'https://instagram.com/kstbh07', label: 'Instagram', external: true },
    { icon: <Mail size={20} />, href: 'mailto:kaustubhsen2707@gmail.com', label: 'Email', external: false },
  ];

  return (
    <motion.div 
      className="fixed left-6 bottom-0 z-40 hidden lg:flex flex-col items-center gap-6 pointer-events-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className="flex flex-col gap-6">
        {socials.map((social, i) => (
          <a
            key={i}
            href={social.href}
            target={social.external ? "_blank" : undefined}
            rel={social.external ? "noopener noreferrer" : undefined}
            data-magnetic
            className="text-gray-500 hover:text-primary transition-colors group relative flex items-center cursor-none"
          >
            {social.icon}
            <span className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 font-mono text-[10px] tracking-widest flex items-center before:content-[''] before:block before:w-4 before:h-[1px] before:bg-primary before:mr-2 text-primary whitespace-nowrap">
              {social.label}
            </span>
          </a>
        ))}
      </div>
      <div className="w-[1px] h-24 bg-gradient-to-b from-primary/50 to-transparent mt-2" />
    </motion.div>
  );
}
