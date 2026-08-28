import React from 'react';
import { Code2 } from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import { developerInfo } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-white dark:bg-darkBg border-t border-gray-150 dark:border-gray-900/50 py-12 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, '#home')}
            className="flex items-center space-x-2 text-lg font-bold tracking-tight"
          >
            <Code2 className="w-5 h-5 text-primary-500" />
            <span>Samir<span className="text-primary-500">.</span></span>
          </a>

          {/* Copyright description */}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {currentYear} Samir Chhetri. All rights reserved.
          </p>

          {/* Social connections */}
          <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
            <a 
              href={developerInfo.github} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-primary-500 dark:hover:text-primary-500 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href={developerInfo.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-primary-500 dark:hover:text-primary-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
