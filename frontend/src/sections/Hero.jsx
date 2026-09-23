import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, Terminal, Layers, Database, Code2, Server, CheckCircle2 } from 'lucide-react';
import { Linkedin, Github } from '../components/Icons';
import { developerInfo } from '../data/portfolioData';
import profileImg from '../assets/profile.jpg';

export default function Hero({ onOpenResume }) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 15,
      },
    },
  };

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contact = document.querySelector('#contact');
    if (contact) {
      window.scrollTo({
        top: contact.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projects = document.querySelector('#projects');
    if (projects) {
      window.scrollTo({
        top: projects.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28 pb-16 bg-slate-50 dark:bg-[#080c14] text-slate-900 dark:text-slate-100 bg-grid-pattern transition-colors duration-300"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-100" />
      <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-100" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
        >
          {/* Left Column - Intro & Bio */}
          <div className="flex-1 space-y-6 text-center lg:text-left max-w-2xl">
            {/* Terminal Command Tag & Availability Pill */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="font-mono-code text-xs text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                In [1]: whoami
              </span>

              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {developerInfo.status}
              </span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white"
            >
              Hi, I'm <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-300 bg-clip-text text-transparent">{developerInfo.name}</span>
            </motion.h1>
            
            {/* Role Title */}
            <motion.h2 
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-bold text-slate-700 dark:text-slate-300 font-mono-code"
            >
              &gt; {developerInfo.role}
            </motion.h2>
            
            {/* Paragraph Bio */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {developerInfo.bio}
            </motion.p>

            {/* Quick Action CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="group relative inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl glass-panel glass-panel-hover text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-all"
              >
                <span>Contact Me</span>
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 hover:border-blue-500/40 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white font-medium text-sm transition-all font-mono-code cursor-pointer"
              >
                <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Resume</span>
              </button>
            </motion.div>

            {/* Social Links & Location Badge */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start space-x-4 pt-2 text-slate-600 dark:text-slate-400"
            >
              <a 
                href={developerInfo.github} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/40 transition-all hover:scale-105"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href={developerInfo.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/40 transition-all hover:scale-105"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <div className="h-4 w-px bg-slate-300 dark:bg-white/10 mx-1" />
              <span className="text-xs font-mono-code text-slate-600 dark:text-slate-400">
                📍 {developerInfo.location}
              </span>
            </motion.div>
          </div>

          {/* Right Column - Profile Image & Floating Cards */}
          <div className="flex-1 flex justify-center max-w-md w-full relative">
            <motion.div 
              initial={{ scale: shouldReduceMotion ? 1 : 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 60, delay: 0.2 }}
              className="w-72 sm:w-80 md:w-84 aspect-[3/4] max-h-[480px] rounded-3xl border border-blue-500/30 p-3 relative bg-gradient-to-b from-blue-500/10 via-slate-200/50 dark:via-slate-900/60 to-transparent shadow-xl dark:shadow-2xl shadow-blue-950/20 dark:shadow-blue-950/50"
            >
              <div className="w-full h-full rounded-2xl border border-slate-300 dark:border-white/10 overflow-hidden relative bg-slate-100 dark:bg-slate-950">
                <img 
                  src={profileImg} 
                  alt={developerInfo.name} 
                  fetchPriority="high" 
                  className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.02]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-200/40 dark:from-[#080c14]/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Decorative Subtle Orbit Outline */}
              <div className="absolute -inset-2 rounded-3xl border border-dashed border-blue-500/20 pointer-events-none" />
            </motion.div>

            {/* Floating Stack Chip 1: React & Frontend */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-3 -left-2 sm:bottom-4 sm:-left-4 px-3.5 py-2.5 rounded-2xl glass-panel shadow-xl flex items-center space-x-2.5 text-xs font-semibold"
            >
              <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-600 dark:text-blue-400">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-mono-code">Frontend</span>
                <span className="text-slate-900 dark:text-white font-medium">React.js & Tailwind</span>
              </div>
            </motion.div>

            {/* Floating Stack Chip 2: Node & Database */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-3 -right-2 sm:top-4 sm:-right-4 px-3.5 py-2.5 rounded-2xl glass-panel shadow-xl flex items-center space-x-2.5 text-xs font-semibold"
            >
              <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-mono-code">Backend</span>
                <span className="text-slate-900 dark:text-white font-medium">Node.js & Express</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
