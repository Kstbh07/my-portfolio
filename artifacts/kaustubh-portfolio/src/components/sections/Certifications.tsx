import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ExternalLink, X } from 'lucide-react';
import { SiUdacity, SiCisco, SiHackerrank, SiRedhat } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { GrOracle } from 'react-icons/gr';

const CERTS = [
  { 
    name: "Oracle Cloud Infrastructure 2025 AI Foundations Associate", 
    issuer: "Oracle",
    icon: <GrOracle size={16} />,
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=DEED932810E28E63BDB95B48B30B3D54180A2953C48AAAA3B7CD8C5D52C05977" 
  },
  { 
    name: "AWS Educate Machine Learning Foundations", 
    issuer: "AWS",
    icon: <FaAws size={16} />,
    url: "https://www.credly.com/badges/a2c39fac-86bc-4122-a4a0-ea39f6518463/linked_in_profile"
  },
  { 
    name: "Introducing Generative AI with AWS", 
    issuer: "Udacity",
    icon: <SiUdacity size={16} />,
    url: "https://www.udacity.com/certificate/e/6527b5c4-50b6-11f0-ba44-a38ee96d7e70"
  },
  { 
    name: "C, C++, Python (Advanced)", 
    issuer: "Cisco",
    icon: <SiCisco size={16} />,
    subCerts: [
      { name: "C (Advanced)", url: "https://www.credly.com/badges/26b0a208-4cd9-4798-8e28-b66654e5b87b/linked_in_profile" },
      { name: "C++ (Advanced)", url: "https://www.credly.com/badges/da0e998c-e1f1-463a-9905-681ff60aba14/public_url" },
      { name: "Python Essentials 2", url: "/python_certificate.png" }
    ]
  },
  { 
    name: "SQL (Advanced)", 
    issuer: "HackerRank",
    icon: <SiHackerrank size={16} />,
    url: "https://www.hackerrank.com/certificates/796a1b235605"
  },
  { 
    name: "Introduction to Red Hat OpenShift Applications", 
    issuer: "Red Hat",
    icon: <SiRedhat size={16} />,
    url: "https://www.credly.com/badges/f0b9eb47-fe86-43bf-ae63-58d850b89df2/linked_in_profile"
  }
];

export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<typeof CERTS[0] | null>(null);

  return (
    <section id="certifications" className="py-24 relative flex items-center min-h-[70dvh]">
      <div className="container mx-auto px-6 lg:pl-24 relative z-10">
        <motion.h2
          className="text-4xl md:text-6xl font-bold font-sans mb-12 md:mb-16 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary">Certifications</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 perspective-1000">
          {CERTS.map((cert, i) => (
            <motion.div
              key={i}
              className="glass-card p-5 md:p-6 rounded border border-white/10 bg-[#05020a]/40 backdrop-blur-md relative overflow-hidden group cursor-none flex flex-col justify-between h-full"
              data-hover-text="VERIFIED"
              data-magnetic
              initial={{ opacity: 0, rotateX: 30, y: 30 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              whileHover={{ rotateX: -5, scale: 1.02, borderColor: 'rgba(168,85,247,0.5)', boxShadow: '0 10px 30px rgba(168,85,247,0.1)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/70 group-hover:text-primary transition-colors shadow-inner">
                    {(cert as any).icon || <ShieldCheck size={20} />}
                  </div>
                  <ShieldCheck size={18} className="text-primary/30 group-hover:text-primary/80 transition-colors" />
                </div>
                <h3 className="text-base md:text-lg font-bold font-sans text-white mb-2 leading-tight">{cert.name}</h3>
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-6">ISSUER: {cert.issuer}</p>
              </div>

              <div>
                {cert.subCerts ? (
                  <button 
                    onClick={() => setSelectedCert(cert)}
                    className="inline-flex items-center gap-2 text-xs font-mono text-primary/80 hover:text-primary hover:underline transition-all"
                  >
                    VIEW CREDENTIALS <ExternalLink size={14} />
                  </button>
                ) : (
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-2 text-xs font-mono text-primary/80 hover:text-primary hover:underline transition-all"
                  >
                    VIEW CREDENTIAL <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for Multiple Certs */}
      <AnimatePresence>
        {selectedCert && selectedCert.subCerts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card p-8 rounded border border-primary/30 w-full max-w-md relative bg-[#05020a]"
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-xl font-bold text-white mb-6 pr-6">{selectedCert.name}</h3>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                  {selectedCert.icon}
                </div>
                <span className="text-primary font-mono text-sm">{selectedCert.issuer}</span>
              </div>
              
              <div className="flex flex-col gap-3">
                {selectedCert.subCerts.map((sub) => (
                  <a 
                    key={sub.name} 
                    href={sub.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-4 border border-white/10 rounded flex items-center justify-between hover:bg-white/5 hover:border-primary/50 transition-all text-sm font-mono text-gray-300 group cursor-none"
                    data-hover-text="OPEN"
                  >
                    <span>{sub.name}</span>
                    <ExternalLink size={16} className="text-primary/50 group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
