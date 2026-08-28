import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './sections/Navbar';
import Home from './pages/Home';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import useDarkTheme from './hooks/useDarkTheme';

function App() {
  const [theme, toggleTheme] = useDarkTheme();

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-darkBg text-gray-900 dark:text-white">
        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Sticky Header Navbar */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {/* Page Routing */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        {/* Floating Back To Top Button */}
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
