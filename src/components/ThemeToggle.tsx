
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // On mount, check if the user has a preference
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
                  (!localStorage.getItem('theme') && 
                   window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setDarkMode(!darkMode);
    
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Toggle
        pressed={darkMode}
        onPressedChange={toggleTheme}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`p-3 rounded-full glass-card border border-lightest-navy hover:border-teal transition-all duration-500 ${
          isTransitioning ? 'animate-pulse' : ''
        }`}
      >
        <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {darkMode ? (
              <motion.div
                key="sun"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Sun size={20} className="text-teal" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Moon size={20} className="text-teal" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Toggle>
      
      {/* Theme transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            className="fixed inset-0 pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {darkMode ? (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-navy/50 to-light-navy/50"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            ) : (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-teal/5 to-light-slate/5"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ThemeToggle;
