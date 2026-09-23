import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-md text-amber-500 dark:text-yellow-400 hover:text-amber-600 dark:hover:text-yellow-300 hover:border-blue-500/40 focus:outline-none transition-all duration-300 shadow-sm"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-spin-slow" />
      ) : (
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
      )}
    </motion.button>
  );
}
