'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, AccumulativeShadows, RandomizedLight, Center } from '@react-three/drei';
import Avatar3D from '../three/Avatar3D';

export default function AvatarShowcase() {
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Handle mouse movement for avatar interaction
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    
    setMousePosition({ x, y });
  };
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-950 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-block mb-3 px-4 py-1 bg-sky-900/20 rounded-full text-sky-400 text-sm font-medium"
          >
            3D AVATAR
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">
            Interactive <span className="text-sky-400">Avatar</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            This 3D representation is created using Three.js and React Three Fiber.
            {!isMobile && " Try interacting with it using your mouse!"}
          </p>
        </div>
        
        <div 
          ref={containerRef}
          className="relative max-w-2xl mx-auto h-[500px] rounded-xl overflow-hidden bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 shadow-xl"
          onMouseMove={handleMouseMove}
        >
          <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
            <color attach="background" args={['#15181f']} />
            
            {/* Main Avatar */}
            <Center>
              <Avatar3D 
                position={[0, 0.2, 0]} 
                mousePosition={mousePosition}
                isMobile={isMobile}
              />
            </Center>
            
            {/* Environment and Lighting */}
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <spotLight position={[-10, -10, -5]} intensity={0.5} color="#3aa2f7" />
            
            {/* Subtle shadows */}
            <AccumulativeShadows temporal frames={100} color="#3aa2f7" colorBlend={2} opacity={0.2} scale={10} position={[0, -0.5, 0]}>
              <RandomizedLight amount={8} radius={10} ambient={0.5} position={[5, 5, 10]} bias={0.001} />
            </AccumulativeShadows>
            
            {/* Environment reflection */}
            <Environment preset="city" />
            
            {/* Interactive controls - enabled only on desktop */}
            {!isMobile && (
              <OrbitControls 
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 2 - 0.5}
                maxPolarAngle={Math.PI / 2 + 0.5}
              />
            )}
          </Canvas>
          
          {/* UI overlay for instructions */}
          {!isMobile && (
            <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-400 bg-gray-900/50 backdrop-blur-sm py-2 mx-4 rounded-lg">
              Drag to rotate • Hover to highlight
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
            >
              <div className="bg-sky-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8v4l2 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Animation</h3>
              <p className="text-gray-400">Animated with subtle breathing effect and responsive to user interaction.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
            >
              <div className="bg-sky-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">3D Depth</h3>
              <p className="text-gray-400">Multi-layered composition with dynamic lighting for realistic depth.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
            >
              <div className="bg-sky-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9 14.35 12 13 13 12"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Effects</h3>
              <p className="text-gray-400">Hover and drag interactions with dynamic material changes.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}