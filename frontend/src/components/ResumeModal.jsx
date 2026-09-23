import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { developerInfo } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="relative w-full max-w-5xl h-[88vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 font-sans"
        >
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/80 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{developerInfo.name}</span>
                  <span className="text-xs font-mono-code px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-normal hidden sm:inline-block">
                    Resume / CV
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono-code">
                  Full-Stack MERN Developer
                </p>
              </div>
            </div>

            {/* Actions: Download, Open New Tab, Close */}
            <div className="flex items-center space-x-2 sm:space-x-3 font-mono-code text-xs">
              <a
                href={developerInfo.resume}
                download="Samir_Chhetri_MERN_Resume.pdf"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-md shadow-blue-600/20 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </a>

              <a
                href={developerInfo.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:border-blue-500/40 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden md:inline">Open Tab</span>
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus:outline-none transition-all"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PDF Frame Viewer */}
          <div className="flex-1 bg-slate-100 dark:bg-slate-950 relative overflow-hidden flex flex-col">
            <object
              data={developerInfo.resume}
              type="application/pdf"
              className="w-full h-full border-none"
            >
              {/* Fallback for browsers/devices that don't support inline PDF rendering */}
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <FileText className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  Resume Preview
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
                  Your browser does not support inline PDF preview. You can download or view the resume directly below.
                </p>
                <div className="flex items-center space-x-4 pt-2">
                  <a
                    href={developerInfo.resume}
                    download="Samir_Chhetri_MERN_Resume.pdf"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Resume</span>
                  </a>
                  <a
                    href={developerInfo.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-sm transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open PDF in New Tab</span>
                  </a>
                </div>
              </div>
            </object>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
