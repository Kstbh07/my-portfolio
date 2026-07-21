import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Layout, Database, Wrench } from 'lucide-react';

const categories = [
  {
    title: 'Languages',
    icon: Code2,
    icons: 'https://skillicons.dev/icons?i=python,cpp,java,javascript,typescript',
    skills: 'Python • C++ • Java • JavaScript • TypeScript',
    description: 'Strong foundation in problem solving and application development.',
  },
  {
    title: 'Backend',
    icon: Server,
    icons: 'https://skillicons.dev/icons?i=django,flask,fastapi,nodejs,express',
    skills: 'Django • Flask • FastAPI • Node.js • Express',
    description: 'Building robust APIs and scalable server-side architectures.',
  },
  {
    title: 'Frontend',
    icon: Layout,
    icons: 'https://skillicons.dev/icons?i=react,nextjs,tailwind,html,css',
    skills: 'React • Next.js • Tailwind • HTML • CSS',
    description: 'Crafting responsive, accessible, and performant user interfaces.',
  },
  {
    title: 'Database',
    icon: Database,
    icons: 'https://skillicons.dev/icons?i=mysql,postgres,mongodb',
    skills: 'MySQL • PostgreSQL • MongoDB',
    description: 'Designing efficient schemas and optimizing query performance.',
  },
  {
    title: 'Tools',
    icon: Wrench,
    icons: 'https://skillicons.dev/icons?i=git,github,docker,linux,postman,vscode,vercel',
    skills: 'Git • GitHub • Docker • Linux • Postman • VS Code • Vercel',
    description: 'Streamlined workflows with modern developer tooling.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.08 * i, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export function Skills() {
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-[1200px]">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-sans tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-300">
            SKILLS
          </h2>
          <p className="mt-3 text-gray-400 text-xs md:text-sm font-mono uppercase tracking-widest">
            Technologies I use to build scalable products.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                className="group relative rounded-[18px] border border-purple-500/15 bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-250 hover:scale-[1.03] hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.08)]"
              >
                {/* Glow accent */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-purple-500/5 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                </div>

                {/* Skill icons */}
                <div className="mb-3 overflow-hidden">
                  <img
                    src={cat.icons}
                    alt={`${cat.title} icons`}
                    loading="lazy"
                    className="h-10 w-auto object-contain"
                  />
                </div>

                {/* Skill names */}
                <p className="text-xs font-mono text-gray-400 mb-2 leading-relaxed">
                  {cat.skills}
                </p>

                {/* Description */}
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  {cat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
