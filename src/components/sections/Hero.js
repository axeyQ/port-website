'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Canvas from '@/components/three/Canvas';
import Scene from '@/components/three/Scene';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering Three.js
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {mounted && (
        <Canvas>
          <Scene />
        </Canvas>
      )}
      
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Creative Developer
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
            Building interactive and immersive web experiences.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Explore Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}