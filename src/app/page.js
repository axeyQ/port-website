'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import CustomCursor from '@/components/ui/CustomCursor';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets 
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        // Loading screen
        <div className="fixed inset-0 bg-gray-950 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mb-4 mx-auto relative">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-sky-400 rounded-full opacity-30 animate-ping"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-t-sky-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-400 text-sm">Loading amazing stuff...</p>
          </div>
        </div>
      ) : (
        // Main content
        <>
          <CustomCursor />
          <Navbar />
          <main className="overflow-hidden cursor-none">
            <Hero />
            <About />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}