import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="min-h-[100dvh] pt-24 relative flex flex-col justify-between">
      <div className="container mx-auto px-6 lg:pl-24 relative z-10 flex-grow flex flex-col justify-center">

        <div className="mb-10 md:mb-12">
          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-mono text-primary font-bold tracking-widest mb-4">
            CONTACT
          </div>
          <h2 className="text-5xl md:text-7xl font-bold font-sans tracking-tight">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Touch</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm mt-4 max-w-md">
            Have a project in mind or just want to chat? Send me a message and let's build something together.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-16">
          {/* Left: Contact Methods */}
          <div className="lg:col-span-4 flex flex-col gap-3 md:gap-4">
            {[
              { label: "Email",    value: "kaustubhsen2707@gmail.com", icon: <Mail size={16}/>,     link: "mailto:kaustubhsen2707@gmail.com" },
              { label: "LinkedIn", value: "View Profile",              icon: <Linkedin size={16}/>, link: "https://www.linkedin.com/in/kaustubhsenwrks/" },
              { label: "GitHub",   value: "View Repositories",         icon: <Github size={16}/>,   link: "https://github.com/kstbh07" }
            ].map((method, i) => (
              <motion.a
                key={method.label}
                href={method.link}
                target={method.link.startsWith('http') ? "_blank" : undefined}
                rel={method.link.startsWith('http') ? "noopener noreferrer" : undefined}
                className="glass-card p-4 rounded border border-white/5 flex items-center gap-4 group cursor-none hover:border-primary/30 transition-colors"
                data-hover-text="LINK"
                data-magnetic
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors flex-shrink-0">
                  {method.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white">{method.label}</h4>
                  <p className="text-xs font-mono text-gray-500 truncate">{method.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Social Buttons */}
            <motion.div
              className="flex flex-wrap gap-2 mt-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {[
                { label: 'Email', href: 'mailto:kaustubhsen2707@gmail.com', color: '#EA4335', icon: <Mail size={14} /> },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kaustubh-sen-091380328/', color: '#0077B5', icon: <Linkedin size={14} /> },
                { label: 'GitHub', href: 'https://github.com/Kstbh07', color: '#181717', icon: <Github size={14} /> },
                { label: 'LeetCode', href: 'https://leetcode.com/u/kstbh07/', color: '#FFA116', icon: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l.842.691c.63.516 1.543.439 2.059-.19a1.379 1.379 0 0 0-.19-2.06l-.842-.69a5.323 5.323 0 0 0-2.035-1.076 5.26 5.26 0 0 0-1.18-.276 4.928 4.928 0 0 0-.733.009 1.37 1.37 0 0 0 .002-1.244l1.145-1.18A1.374 1.374 0 0 0 13.483 0z"/></svg> },
                { label: 'Twitter', href: 'https://x.com/Kaustubhsenwrks', color: '#000000', icon: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { label: 'Instagram', href: 'https://www.instagram.com/kstbh07', color: '#E4405F', icon: <Instagram size={14} /> },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={social.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/8 bg-white/[0.03] text-gray-400 text-[11px] font-mono transition-all duration-200 hover:border-primary/30 hover:text-white hover:bg-white/[0.06] hover:scale-105"
                >
                  {social.icon}
                  {social.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: Holographic Terminal Form */}
          <motion.div
            className="lg:col-span-8 glass-card border border-primary/20 rounded-lg overflow-hidden bg-[#020104]/80 backdrop-blur-xl relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Grid background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            {/* Terminal title bar */}
            <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="text-[10px] font-mono text-gray-500">transmission_protocol.sh</div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 grid md:grid-cols-2 gap-6 md:gap-8 relative z-10">
              <div className="space-y-5 md:space-y-6">
                {[
                  { label: 'Name',    key: 'name',    type: 'text',  placeholder: 'Enter your name'  },
                  { label: 'Email',   key: 'email',   type: 'email', placeholder: 'Enter your email' },
                  { label: 'Subject', key: 'subject', type: 'text',  placeholder: 'Project inquiry'  },
                ].map((field) => (
                  <div key={field.key} className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-primary uppercase tracking-widest">{field.label}</label>
                    <input
                      type={field.type}
                      required
                      disabled={status !== 'idle'}
                      value={(formData as any)[field.key]}
                      onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="bg-transparent border-b border-white/20 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col h-full">
                <label className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Message</label>
                <textarea
                  required
                  disabled={status !== 'idle'}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded p-4 text-sm text-white h-full min-h-[120px] md:min-h-[150px] resize-none focus:outline-none focus:border-primary transition-colors font-mono"
                  placeholder="Hello..."
                />
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 mt-2 border-t border-white/10">
                <div className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-2 text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-1 rounded">
                    <MapPin size={10} className="text-primary" /> Open to Remote
                  </span>
                  <span className="flex items-center gap-2 text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Open to Opportunities
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  className="group relative px-6 md:px-8 py-3 bg-primary text-white font-mono text-xs font-bold tracking-widest overflow-hidden cursor-none w-full sm:w-auto"
                  data-hover-text="EXEC"
                  data-magnetic
                >
                  <span className="relative z-10">
                    {status === 'idle' ? 'SEND MESSAGE' : status === 'sending' ? 'TRANSMITTING...' : '✓ SUCCESS'}
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
