'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/80 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center group">
          <span className="text-white">axey</span>
          <span className="text-sky-400 relative">
            Q
            <motion.span 
              className="absolute -top-1 -right-1 w-2 h-2 bg-sky-400 rounded-full"
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ 
                scale: [0.8, 1.2, 0.8], 
                opacity: [0.6, 1, 0.6] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </span>
          <motion.div 
            className="h-[3px] w-0 bg-sky-400 mt-1 rounded-full group-hover:w-full transition-all duration-300"
            initial={{ width: 0 }}
            animate={{ width: scrolled ? "100%" : 0 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          {['Home', 'About', 'Projects', 'Contact'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/#${item.toLowerCase()}`}
              className="animated-underline text-white hover:text-sky-400 transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between relative">
            <motion.span 
              className="w-full h-0.5 bg-white rounded-full block"
              animate={{ 
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 8 : 0
              }}
            ></motion.span>
            <motion.span 
              className="w-full h-0.5 bg-white rounded-full block"
              animate={{ opacity: menuOpen ? 0 : 1 }}
            ></motion.span>
            <motion.span 
              className="w-full h-0.5 bg-white rounded-full block"
              animate={{ 
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? -8 : 0
              }}
            ></motion.span>
          </div>
        </button>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-gray-900/90 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col py-4">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/#${item.toLowerCase()}`}
                  className="py-3 px-6 text-white hover:bg-sky-600/30 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}