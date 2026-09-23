import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './sections/Navbar';
import Home from './pages/Home';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import ResumeModal from './components/ResumeModal';
import useDarkTheme from './hooks/useDarkTheme';

function App() {
  const [theme, toggleTheme] = useDarkTheme();
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleOpenResume = () => {
    setIsResumeOpen(true);
  };

  const handleCloseResume = () => {
    setIsResumeOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-[#080c14] text-slate-900 dark:text-slate-100">
        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Sticky Header Navbar */}
        <Navbar theme={theme} toggleTheme={toggleTheme} onOpenResume={handleOpenResume} />

        {/* Page Routing */}
        <main>
          <Routes>
            <Route path="/" element={<Home onOpenResume={handleOpenResume} />} />
          </Routes>
        </main>

        {/* Floating Back To Top Button */}
        <BackToTop />

        {/* Resume Preview & Download Modal */}
        <ResumeModal isOpen={isResumeOpen} onClose={handleCloseResume} />
      </div>
    </Router>
  );
}

export default App;
