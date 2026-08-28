import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80
      }
    }
  };

  return (
    <section 
      id="experience" 
      className="py-24 bg-gray-50 dark:bg-gray-900/30 text-gray-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Professional Experience</h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full" />
        </div>

        {/* Timeline Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-4xl mx-auto relative border-l-2 border-gray-200 dark:border-gray-800 pl-6 sm:pl-8 space-y-12"
        >
          {experienceData.map((exp, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="relative"
            >
              {/* Timeline marker */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 p-1.5 bg-primary-500 rounded-full text-white shadow-md shadow-primary-500/20">
                <Briefcase className="w-4 h-4" />
              </div>

              {/* Card Container */}
              <div className="p-6 rounded-xl bg-white dark:bg-darkCard border border-gray-200/50 dark:border-gray-800/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-semibold">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1.5 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <Calendar className="w-4 h-4 text-primary-500" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                {/* List Bullet points */}
                <ul className="space-y-2.5 text-gray-600 dark:text-gray-300">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start">
                      <span className="text-primary-500 mr-2.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
