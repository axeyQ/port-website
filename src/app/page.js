'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import CustomCursor from '@/components/ui/CustomCursor';
import PageTransition from '@/components/ui/PageTransition';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Detect if device is mobile
    const detectMobile = () => {
      // Use multiple detection methods
      const mediaQuery = window.matchMedia('(max-width: 768px), (pointer: coarse)');
      const hasTouch = 'ontouchstart' in window || 
                       navigator.maxTouchPoints > 0 || 
                       navigator.msMaxTouchPoints > 0;
      setIsMobile(mediaQuery.matches || hasTouch);
      
      // Update body class for global styling
      if (mediaQuery.matches || hasTouch) {
        document.body.classList.add('is-mobile');
        document.body.classList.remove('cursor-none');
      } else {
        document.body.classList.remove('is-mobile');
      }
    };
    
    detectMobile();
    window.addEventListener('resize', detectMobile);
    
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', detectMobile);
    };
  }, []);
  
  return (
    <PageTransition>
      <AnimatePresence mode="wait">
        {isLoading ? (
          // Loading screen
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-950 z-50 flex items-center justify-center"
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 mb-4 mx-auto relative">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-sky-400 rounded-full opacity-30 animate-ping"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-t-sky-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </div>
              <motion.p
                className="text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Loading amazing stuff...
              </motion.p>
            </motion.div>
          </motion.div>
        ) : (
          // Main content
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Only render CustomCursor on non-mobile devices */}
            {!isMobile && <CustomCursor />}
            <Navbar />
            <main className={!isMobile ? "overflow-hidden cursor-none" : "overflow-hidden"}>
              <Hero />
              <About />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}