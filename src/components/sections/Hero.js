'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Canvas from '@/components/three/Canvas';
import UniverseScene from '@/components/three/UniverseScene';
import useMousePosition from '@/hooks/useMousePosition';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { PrimaryMagneticButton, SecondaryMagneticButton } from '@/components/ui/MagneticButton';
import { AnimatedText, Typewriter } from '@/components/ui/TextAnimation';
import { ParallaxSection } from '@/components/ui/ParallaxEffect';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { normalizedPosition } = useMousePosition();
  const containerRef = useRef(null);
  const { scrollY } = useScrollAnimation();
  
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
          <UniverseScene mousePosition={normalizedPosition} />
        </Canvas>
      )}
      
      {/* Parallax stars background */}
      <ParallaxSection
        className="absolute inset-0 overflow-hidden pointer-events-none"
        strength={0.1}
      >
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.005) 0%, rgba(255, 255, 255, 0) 8%)',
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0',
          }}
        />
      </ParallaxSection>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 flex flex-col items-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 12L12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        <span className="text-sm mt-2 text-gray-400">Scroll Down</span>
      </motion.div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="overflow-hidden mb-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typewriter
                text="Hello, I'm a"
                speed={80}
                delay={500}
                className="text-xl md:text-2xl text-sky-400 font-medium"
              />
            </motion.div>
          </div>
          
          <div className="mb-6">
            <AnimatedText
              text="Creative Developer"
              type="chars"
              animation="wave"
              staggerChildren={0.03}
              delayChildren={1.5}
              className="text-5xl md:text-7xl font-bold"
            />
          </div>
          
          <ParallaxSection
            strength={0.05}
            className="mb-12"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="text-xl md:text-2xl max-w-2xl mx-auto text-gray-300"
            >
              Building interactive and immersive web experiences with cutting-edge technologies.
            </motion.p>
          </ParallaxSection>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <PrimaryMagneticButton
              as="a"
              href="#projects"
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
              magneticStrength={0.4}
            >
              View Projects
            </PrimaryMagneticButton>
            
            <SecondaryMagneticButton
              as="a"
              href="#contact"
              className="bg-transparent hover:bg-white/10 border border-white text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
              magneticStrength={0.4}
            >
              Contact Me
            </SecondaryMagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}