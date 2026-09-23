import React from 'react';
import { Terminal, ArrowUp } from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import { developerInfo } from '../data/portfolioData';


export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 dark:bg-[#05080e] text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-white/10 py-12 relative font-mono-code text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Logo & Tagline */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-slate-900 dark:text-slate-100 font-semibold text-base">
              <Terminal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Samir<span className="text-blue-600 dark:text-blue-500">.chhetri</span></span>
            </div>
            <p className="text-slate-500 text-xs max-w-sm">
              Full-Stack MERN Engineering • Crafting high-performance web applications &amp; REST APIs.
            </p>
          </div>

          {/* Quick Nav Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 dark:text-slate-400">
            <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">01.About</a>
            <a href="#skills" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">02.Skills</a>
            <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">03.Projects</a>
            <a href="#experience" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">04.Experience</a>
            <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">05.Contact</a>
          </div>

          {/* Socials & Back To Top */}
          <div className="flex items-center space-x-4">
            <a
              href={developerInfo.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-blue-500/40 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm dark:shadow-none"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={developerInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-blue-500/40 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm dark:shadow-none"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-all"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-slate-200 dark:border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>
            &copy; {new Date().getFullYear()} Samir Chhetri. All rights reserved.
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Built with React &amp; Node.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
