import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code2, Server, Database, ShieldCheck, Cpu, CheckCircle2 } from 'lucide-react';
import { developerInfo, aboutHighlights } from '../data/portfolioData';

export default function About() {
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

  const iconMap = {
    '01.frontend': Code2,
    '02.backend': Server,
    '03.database': Database,
    '04.devops': ShieldCheck
  };

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-[#080c14] text-slate-900 dark:text-slate-100 relative overflow-hidden border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none opacity-50 dark:opacity-100" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {/* Terminal Command Section Header */}
          <motion.div variants={itemVariants} className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 font-mono-code text-xs text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3.5 py-1.5 rounded-full">
              <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>In [2]: about.describe()</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              About &amp; <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">Technical Overview</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
              Building full-stack MERN web applications with focus on code structure, scalability, secure APIs, and responsive user experiences.
            </p>
          </motion.div>

          {/* Core Content Grid: Bio & Mock Code Terminal Window */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Bio Card */}
            <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 relative">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-mono-code">
                  <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Full-Stack MERN Engineering
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  I specialize in crafting web applications end-to-end. From designing responsive client-side interfaces in React and Tailwind CSS, to building secure Node.js/Express REST APIs backed by MongoDB database architecture.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  Having completed an intensive internship at <span className="text-blue-600 dark:text-blue-400 font-semibold">CodeIT Nepal</span>, I have hands-on experience building production features, implementing JWT &amp; Role-Based Access Control (RBAC), and writing clean modular code.
                </p>

                <div className="pt-2 grid grid-cols-2 gap-3 font-mono-code text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>RESTful API Design</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>JWT &amp; Cookie Auth</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Mongoose Aggregations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Postman API Testing</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Terminal Window Code Representation */}
            <motion.div variants={itemVariants} className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-300 dark:border-white/10 bg-slate-900 dark:bg-slate-950/90 shadow-2xl overflow-hidden font-mono-code text-xs">
                {/* Terminal Window Header Bar */}
                <div className="bg-slate-800/80 dark:bg-slate-900/80 px-4 py-3 border-b border-slate-700 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-slate-400 text-[11px]">developer_profile.json</span>
                </div>

                {/* Terminal Content */}
                <div className="p-4 space-y-2 text-slate-300 overflow-x-auto">
                  <p><span className="text-blue-400">const</span> developer = &#123;</p>
                  <p className="pl-4"><span className="text-cyan-300">name</span>: <span className="text-emerald-400">"{developerInfo.name}"</span>,</p>
                  <p className="pl-4"><span className="text-cyan-300">role</span>: <span className="text-emerald-400">"{developerInfo.role}"</span>,</p>
                  <p className="pl-4"><span className="text-cyan-300">location</span>: <span className="text-emerald-400">"{developerInfo.location}"</span>,</p>
                  <p className="pl-4"><span className="text-cyan-300">internship</span>: <span className="text-emerald-400">"CodeIT Nepal"</span>,</p>
                  <p className="pl-4"><span className="text-cyan-300">stack</span>: [</p>
                  <p className="pl-8 text-yellow-300">"MongoDB", "Express.js", "React.js", "Node.js", "Tailwind"</p>
                  <p className="pl-4">],</p>
                  <p className="pl-4"><span className="text-cyan-300">passionateAbout</span>: <span className="text-emerald-400">"Clean Architecture &amp; User Experience"</span></p>
                  <p>&#125;;</p>
                  <p className="pt-2 text-blue-400 font-semibold">&gt; developer.getStatus()</p>
                  <p className="text-emerald-400">&lt; "{developerInfo.status}"</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 4 Feature Highlights Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {aboutHighlights.map((item, idx) => {
              const IconComp = iconMap[item.command] || Code2;
              return (
                <div 
                  key={idx}
                  className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3 relative group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:border-blue-400 transition-all">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="font-mono-code text-[11px] text-blue-600 dark:text-blue-400">{item.command}</div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
