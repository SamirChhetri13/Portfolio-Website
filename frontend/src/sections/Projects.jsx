import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ExternalLink, LayoutGrid, List, CheckCircle2, Sparkles } from 'lucide-react';
import { Github } from '../components/Icons';
import { fallbackProjects } from '../data/projects';
import axios from 'axios';


export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/projects');
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setProjects(res.data);
        }
      } catch (err) {
        // Fallback to static projects array if API fails or backend is offline
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90 } }
  };

  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-[#080c14] text-slate-900 dark:text-slate-100 relative overflow-hidden border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none opacity-50 dark:opacity-100" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-10"
        >
          {/* Header & View Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="inline-flex items-center space-x-2 font-mono-code text-xs text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3.5 py-1.5 rounded-full">
                <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>In [4]: projects.sort_values("impact", ascending=False)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Featured <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">Projects &amp; Systems</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl">
                Shipped full-stack web applications featuring interactive frontends, secure APIs, and database persistence.
              </p>
            </motion.div>

            {/* View Mode Toggle Controls */}
            <motion.div variants={itemVariants} className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-white/10 font-mono-code text-xs shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>List</span>
              </button>
            </motion.div>
          </div>

          {/* Projects Display Container */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : 'space-y-6'}>
            {projects.map((project, idx) => (
              <motion.div
                key={project._id || idx}
                variants={itemVariants}
                className={`glass-panel rounded-3xl overflow-hidden group hover:border-blue-500/40 transition-all duration-300 flex flex-col ${
                  viewMode === 'list' ? 'lg:flex-row' : ''
                }`}
              >
                {/* Image Container */}
                <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-950 ${
                  viewMode === 'list' ? 'lg:w-2/5 min-h-[220px]' : 'h-56 sm:h-64'
                }`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-100 dark:from-[#080c14] via-transparent to-transparent opacity-80" />
                  
                  {project.featured && (
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold font-mono-code bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/40 backdrop-blur-md">
                      <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      <span>Featured</span>
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features Checklist */}
                    {project.features && (
                      <ul className="space-y-1.5 pt-1 text-xs text-slate-600 dark:text-slate-400 font-mono-code">
                        {project.features.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-3">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono-code bg-slate-100 dark:bg-slate-900/90 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Buttons */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-slate-200 dark:border-white/10 font-mono-code text-xs">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-blue-500/40 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all"
                      >
                        <Github className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-md shadow-blue-600/20"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
