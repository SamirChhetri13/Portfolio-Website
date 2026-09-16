import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Calendar, User, Download } from 'lucide-react';
import { developerInfo } from '../data/portfolioData';
import profileImg from '../assets/profile.jpg';

export default function About() {
  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.2,
        duration: 0.8
      }
    }
  };

  return (
    <section 
      id="about" 
      className="py-24 bg-gray-50 dark:bg-gray-900/30 text-gray-900 dark:text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">About Me</h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full" />
        </div>

        {/* Content Layout */}
        <motion.div 
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
          variants={cardVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Visual card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
                <img src={profileImg} alt={developerInfo.name} loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent flex flex-col justify-end p-6 text-white text-left">
                  <h3 className="text-xl font-bold">{developerInfo.name}</h3>
                  <p className="text-xs text-gray-300 mt-1">{developerInfo.role}</p>
                  <p className="text-[10px] text-primary-400 font-semibold mt-2 px-2.5 py-0.5 bg-primary-950/40 border border-primary-500/30 rounded-full w-max">
                    Basundhara, Kathmandu
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Core info list */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Mission & Approach
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I am a dedicated MERN Stack Developer and MERN Stack enthusiast focused on writing clean, optimized, and maintainable code. My core specialization allows me to construct responsive React interfaces while designing efficient databases and robust API routes on the backend.
            </p>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Whether building full-stack web platforms or focusing on server architecture, database management with MongoDB, and authentication pipelines, I prioritize performance, accessibility, and high quality software engineering standards.
            </p>

            {/* Grid details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <User className="w-5 h-5 text-primary-500" />
                <div>
                  <span className="block text-xs text-gray-400">Name</span>
                  <span className="text-sm font-semibold">{developerInfo.name}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <MapPin className="w-5 h-5 text-primary-500" />
                <div>
                  <span className="block text-xs text-gray-400">Location</span>
                  <span className="text-sm font-semibold">{developerInfo.location}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Mail className="w-5 h-5 text-primary-500" />
                <div>
                  <span className="block text-xs text-gray-400">Email</span>
                  <a href={`mailto:${developerInfo.email}`} className="text-sm font-semibold hover:text-primary-500 transition-colors">
                    {developerInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Calendar className="w-5 h-5 text-primary-500" />
                <div>
                  <span className="block text-xs text-gray-400">Availability</span>
                  <span className="text-sm font-semibold">Full-Time / Freelance</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={developerInfo.resume}
                target="_blank"
                rel="noreferrer"
                download="Samir_Chhetri_MERN_Resume.pdf"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium text-sm transition-all shadow-md shadow-primary-500/10"
              >
                <Download className="w-4 h-4" />
                <span>View / Download Resume</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
