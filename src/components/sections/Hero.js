'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Canvas from '@/components/three/Canvas';
import Scene from '@/components/three/Scene';
import { useMousePosition } from '@/hooks/useMousePosition';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { normalizedPosition } = useMousePosition();
  const containerRef = useRef(null);
  
  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: [0.165, 0.84, 0.44, 1],
      },
    }),
  };
  
  // Ensure component is mounted before rendering Three.js
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {mounted && (
        <Canvas>
          <Scene mousePosition={normalizedPosition} />
        </Canvas>
      )}
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center animate-bounce">
        <span className="text-sm mb-2">Scroll Down</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 12L12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-xl md:text-2xl text-sky-400 font-medium mb-4"
          >
            Hello, I&apos;m a
          </motion.h2>
          
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Creative Developer
          </motion.h1>
          
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-gray-300"
          >
            Building interactive and immersive web experiences with cutting-edge technologies.
          </motion.p>
          
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              View Projects
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent hover:bg-white/10 border border-white text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Contact Me
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}