import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import { Github } from '../components/Icons';
import { fetchProjects } from '../services/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProjectsData = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to load projects:', err.message);
        setError('Failed to fetch latest projects. Showing cached items.');
      } finally {
        setLoading(false);
      }
    };
    getProjectsData();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
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

  return (
    <section 
      id="projects" 
      className="py-24 bg-white dark:bg-darkBg text-gray-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Projects Portfolio</h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            A selection of full-stack MERN applications built to solve real-world problems.
          </p>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-gray-100 dark:bg-darkCard h-[450px] border border-gray-200/50 dark:border-gray-800/80" />
            ))}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            {projects.map((project) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-gray-50 dark:bg-darkCard border border-gray-200/50 dark:border-gray-800/80 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <img
                    src={project.image || 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80'}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-semibold text-white/90">Created with MERN Stack</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 text-[10px] font-semibold tracking-wider rounded bg-primary-100 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 border border-primary-500/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features list */}
                    {project.features && project.features.length > 0 && (
                      <div className="pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center mb-2">
                          <Sparkles className="w-3.5 h-3.5 text-primary-500 mr-1.5" />
                          Key Features
                        </span>
                        <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                          {project.features.slice(0, 3).map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start">
                              <span className="text-primary-500 mr-2">•</span>
                              <span className="line-clamp-1">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Actions / Links */}
                  <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-gray-200 dark:border-gray-800">
                    <a
                      href={project.githubLink || 'https://github.com/samirchhetri13'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
