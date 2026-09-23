import React from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Atom, 
  Code, 
  FileCode, 
  Palette, 
  Layout, 
  Cpu, 
  Server, 
  Globe, 
  ShieldCheck, 
  Layers, 
  CreditCard, 
  Database, 
  FileSpreadsheet, 
  Table, 
  Filter, 
  GitBranch, 
  Zap, 
  Send, 
  CheckCircle, 
  CloudUpload 
} from 'lucide-react';
import { skillsCategories } from '../data/portfolioData';

const iconComponents = {
  Atom,
  Code,
  FileCode,
  Palette,
  Layout,
  Cpu,
  Server,
  Terminal,
  Globe,
  ShieldCheck,
  Layers,
  CreditCard,
  Database,
  FileSpreadsheet,
  Table,
  Filter,
  GitBranch,
  Zap,
  Send,
  CheckCircle,
  CloudUpload
};

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="skills" className="py-24 bg-slate-50 dark:bg-[#080c14] text-slate-900 dark:text-slate-100 relative overflow-hidden border-t border-slate-200 dark:border-white/5 bg-grid-pattern transition-colors duration-300">
      {/* Ambient background lighting */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none opacity-50 dark:opacity-100" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {/* Terminal Command Header */}
          <motion.div variants={itemVariants} className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 font-mono-code text-xs text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3.5 py-1.5 rounded-full">
              <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>In [3]: skills.groupby("category")</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Technical <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">Stack &amp; Skills</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
              Categorized technologies, frameworks, and developer tools used to build modern end-to-end full-stack applications.
            </p>
          </motion.div>

          {/* 4 Skill Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillsCategories.map((cat, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl space-y-6 relative"
              >
                {/* Category Card Header */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                    {cat.category}
                  </h3>
                  <span className="font-mono-code text-xs text-blue-600 dark:text-blue-400/80 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md">
                    {cat.command}
                  </span>
                </div>

                {/* Skill Badges List */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {cat.skills.map((skill, sIdx) => {
                    const IconComponent = iconComponents[skill.icon] || Code;
                    return (
                      <div 
                        key={sIdx}
                        className="p-3 rounded-xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all flex flex-col items-start justify-between space-y-2 group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                            {skill.name}
                          </div>
                          <div className="text-[10px] font-mono-code text-slate-500 dark:text-slate-400">
                            {skill.level}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
