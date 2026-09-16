import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, Code2, Layers, Database } from 'lucide-react';
import { Linkedin, Github } from '../components/Icons';
import { developerInfo } from '../data/portfolioData';
import profileImg from '../assets/profile.jpg';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-white dark:bg-darkBg text-gray-900 dark:text-white"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12"
        >
          {/* Main Info */}
          <div className="flex-1 space-y-6 max-w-2xl">
            <motion.span 
              variants={itemVariants}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-950/40 border border-primary-500/20 rounded-full"
            >
              <Code2 className="w-3.5 h-3.5 text-primary-500" />
              MERN Stack Developer & Enthusiast
            </motion.span>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
            >
              Hi, I'm <span className="text-primary-500">{developerInfo.name}</span>
            </motion.h1>
            
            <motion.h2 
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-bold text-gray-700 dark:text-gray-300"
            >
              {developerInfo.role}
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              {developerInfo.bio}
            </motion.p>

            {/* Call to Actions */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4"
            >
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium shadow-lg shadow-primary-500/20 transition-all hover:translate-y-[-2px]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium transition-all hover:translate-y-[-2px]"
              >
                <span>Contact Me</span>
              </a>
              <a
                href={developerInfo.resume}
                target="_blank"
                rel="noreferrer"
                download="Samir_Chhetri_MERN_Resume.pdf"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium transition-all hover:translate-y-[-2px]"
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center md:justify-start space-x-4 pt-2 text-gray-500 dark:text-gray-400"
            >
              <a 
                href={developerInfo.github} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900 hover:text-primary-500 dark:hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href={developerInfo.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900 hover:text-primary-500 dark:hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Visual Side Element with MERN Floating Cards */}
          <div className="flex-1 flex justify-center max-w-md w-full relative">
            <motion.div 
              initial={{ scale: shouldReduceMotion ? 1 : 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
              className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border border-primary-500/30 flex items-center justify-center relative overflow-hidden bg-gradient-to-tr from-primary-500/10 via-purple-500/5 to-transparent"
            >
              <div className="absolute inset-4 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center overflow-hidden bg-white dark:bg-darkBg">
                <img src={profileImg} alt={developerInfo.name} fetchPriority="high" className="w-full h-full object-cover object-top" />
              </div>

              {!shouldReduceMotion && (
                <div className="absolute inset-0 rounded-full border border-dashed border-primary-500/20 animate-spin" style={{ animationDuration: '40s' }} />
              )}
            </motion.div>

            {/* Floating MERN Badges */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-0 px-3 py-2 rounded-xl bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 shadow-lg backdrop-blur-md flex items-center space-x-2 text-xs font-semibold"
            >
              <div className="p-1.5 rounded-lg bg-primary-500/10 text-primary-500">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-gray-400 font-medium">Stack</span>
                <span className="text-gray-900 dark:text-white">React & Node.js</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -top-2 -right-2 sm:top-4 sm:right-0 px-3 py-2 rounded-xl bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 shadow-lg backdrop-blur-md flex items-center space-x-2 text-xs font-semibold"
            >
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-gray-400 font-medium">Database</span>
                <span className="text-gray-900 dark:text-white">MongoDB & Express</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
