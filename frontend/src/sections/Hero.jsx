import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import { developerInfo } from '../data/portfolioData';
import profileImg from '../assets/profile.jpg';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

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
              className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-950/30 rounded-full"
            >
              Available for Opportunities
            </motion.span>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
            >
              Hi, I'm <span className="text-primary-500">{developerInfo.name}</span>
            </motion.h1>
            
            <motion.h2 
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-bold text-gray-600 dark:text-gray-400"
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
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium shadow-lg shadow-primary-500/20 transition-all hover:translate-y-[-2px]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium transition-all hover:translate-y-[-2px]"
              >
                <span>Contact Me</span>
              </a>
              <a
                href="#"
                download
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium transition-all hover:translate-y-[-2px]"
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center md:justify-start space-x-6 pt-4 text-gray-500 dark:text-gray-400"
            >
              <a 
                href={developerInfo.github} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-primary-500 dark:hover:text-primary-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href={developerInfo.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-primary-500 dark:hover:text-primary-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </motion.div>
          </div>

          {/* Visual Side Element */}
          <div className="flex-1 flex justify-center max-w-md w-full relative">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 50, delay: 0.3 }}
              className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border border-primary-500/30 flex items-center justify-center relative overflow-hidden bg-gradient-to-tr from-primary-500/10 to-transparent"
            >
              <div className="absolute inset-4 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center overflow-hidden bg-white dark:bg-darkBg">
                <img src={profileImg} alt={developerInfo.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute inset-0 rounded-full border border-dashed border-primary-500/20 animate-spin" style={{ animationDuration: '30s' }} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
