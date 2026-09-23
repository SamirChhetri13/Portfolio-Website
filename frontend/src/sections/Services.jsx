import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Layers, Cpu, Database, ShieldCheck, Code2 } from 'lucide-react';
import { servicesData } from '../data/portfolioData';

const iconMap = {
  Layers,
  Cpu,
  Database,
  ShieldCheck
};

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const cardVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 90 }
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-[#080c14] text-slate-900 dark:text-slate-100 relative overflow-hidden border-t border-slate-200 dark:border-white/5 bg-grid-pattern transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 font-mono-code text-xs text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3.5 py-1.5 rounded-full">
              <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>In [5.5]: services.list()</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Services &amp; <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">Capabilities</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl">
              Professional software development solutions engineered for speed, scalability, and security.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service, idx) => {
              const IconComponent = iconMap[service.icon] || Code2;

              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
