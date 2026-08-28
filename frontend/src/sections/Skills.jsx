import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../data/portfolioData';

export default function Skills() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80
      }
    }
  };

  const categories = [
    { title: 'Frontend Development', skills: skillsData.frontend, color: 'from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
    { title: 'Backend Development', skills: skillsData.backend, color: 'from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400 border-green-500/20' },
    { title: 'Database Systems', skills: skillsData.database, color: 'from-yellow-500/10 to-amber-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20' },
    { title: 'Tools & DevOps', skills: skillsData.tools, color: 'from-purple-500/10 to-violet-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' },
    { title: 'Other Knowledge', skills: skillsData.other, color: 'from-pink-500/10 to-rose-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20' },
  ];

  return (
    <section 
      id="skills" 
      className="py-24 bg-white dark:bg-darkBg text-gray-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Skills & Technologies</h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            A comprehensive overview of my current technical stack, backend competencies, database systems, and development tools.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl bg-gray-50 dark:bg-darkCard border border-gray-100 dark:border-gray-900/50 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md border bg-gradient-to-r ${cat.color}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
