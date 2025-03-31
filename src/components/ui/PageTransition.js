'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageTransition({ children }) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  // Handle route changes
  useEffect(() => {
    let timeout;
    
    const handleRouteChangeStart = () => {
      setIsNavigating(true);
      
      // Delay setting new children until exit animation completes
      timeout = setTimeout(() => {
        setDisplayChildren(children);
      }, 600); // Match this with exit animation duration
    };
    
    const handleRouteChangeComplete = () => {
      setIsNavigating(false);
    };
    
    // Listen for route changes
    window.addEventListener('beforeunload', handleRouteChangeStart);
    
    // Set children when they change (new page content)
    setDisplayChildren(children);
    
    return () => {
      window.removeEventListener('beforeunload', handleRouteChangeStart);
      clearTimeout(timeout);
    };
  }, [children, router]);

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.asPath}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen"
      >
        {displayChildren}
        
        {/* Overlay that appears during navigation */}
        <AnimatePresence>
          {isNavigating && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 border-4 border-t-sky-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}