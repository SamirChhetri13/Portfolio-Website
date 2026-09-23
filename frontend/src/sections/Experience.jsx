import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90 } }
  };

  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-[#080c14] text-slate-900 dark:text-slate-100 relative overflow-hidden border-t border-slate-200 dark:border-white/5 bg-grid-pattern transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none opacity-50 dark:opacity-100" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 font-mono-code text-xs text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3.5 py-1.5 rounded-full">
              <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>In [5]: experience.timeline()</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Work &amp; <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">Internship Experience</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl">
              Professional history building production features and developing full-stack web applications.
            </p>
          </motion.div>

          {/* Timeline Node List */}
          <div className="relative pl-6 sm:pl-8 border-l border-blue-500/30 space-y-10">
            {experienceData.map((exp, idx) => (
              <motion.div key={idx} variants={itemVariants} className="relative group">
                {/* Glowing Node Marker */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-50 dark:bg-[#080c14] border-2 border-blue-500 group-hover:bg-blue-400 group-hover:scale-125 transition-all shadow-md shadow-blue-500/50 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 group-hover:bg-white" />
                </div>

                {/* Timeline Card */}
                <div className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        {exp.role}
                      </h3>
                      <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center space-x-2 pt-1">
                        <span>{exp.company}</span>
                        {exp.location && (
                          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono-code">
                            • <MapPin className="w-3 h-3 text-slate-500 dark:text-slate-400" /> {exp.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono-code bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 w-fit">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>{exp.duration}</span>
                    </span>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 pt-2 text-sm text-slate-700 dark:text-slate-300">
                    {exp.description.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start space-x-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
