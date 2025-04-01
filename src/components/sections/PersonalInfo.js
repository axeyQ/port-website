'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber'; // Added useFrame import
import { Environment, useTexture } from '@react-three/drei';
import { ScrollTrigger, ScrollTriggerGroup } from '@/components/ui/ScrollTrigger';
import { AnimatedText } from '@/components/ui/TextAnimation';
import { ParallaxSection } from '@/components/ui/ParallaxEffect';
import { Vector3 } from 'three';

// Integrated 3D avatar directly in the PersonalInfo file
const Avatar3D = ({ mousePosition = { x: 0, y: 0 }, isMobile = false }) => {
  const group = useRef();
  const frontFace = useRef();
  const backPlate = useRef();
  
  // Load avatar texture
  const texture = useTexture('/avatar.png');
  
  // Interactive animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (group.current) {
      // Floating animation
      group.current.position.y = Math.sin(time * 0.5) * 0.1;
      
      // Rotation based on mouse position or time
      if (!isMobile) {
        group.current.rotation.y = mousePosition.x * 0.3;
        group.current.rotation.x = Math.max(-0.2, Math.min(0.2, mousePosition.y * 0.2));
      } else {
        group.current.rotation.y = Math.sin(time * 0.3) * 0.2;
      }
    }
    
    // Breathing animation for front face
    if (frontFace.current) {
      frontFace.current.scale.x = 1 + Math.sin(time * 0.8) * 0.01;
      frontFace.current.scale.y = 1 + Math.sin(time * 0.8) * 0.01;
    }
    
    // Color animation on backplate
    if (backPlate.current) {
      backPlate.current.material.color.r = 0.1 + Math.sin(time * 2) * 0.05;
      backPlate.current.material.color.g = 0.6 + Math.sin(time * 2) * 0.05;
      backPlate.current.material.color.b = 0.9 + Math.sin(time * 2) * 0.05;
    }
  });
  
  return (
    <group ref={group} position={[0, 0, 0]} scale={1.5}>
      {/* Background plate */}
      <mesh ref={backPlate} position={[0, 0, -0.05]} scale={[1.2, 1.3, 0.1]}>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial
          color="#0ea5e9"
          metalness={0.3}
          roughness={0.4}
          opacity={0.7}
          transparent
        />
      </mesh>
      
      {/* Shadow layer */}
      <mesh position={[0.03, -0.03, -0.02]} scale={[0.98, 0.98, 0.1]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="#000000" opacity={0.2} transparent />
      </mesh>
      
      {/* Main avatar image */}
      <mesh ref={frontFace} position={[0, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial 
          map={texture} 
          transparent={true}
          alphaTest={0.1}
          metalness={0.1}
          roughness={0.4}
        />
      </mesh>
      
      {/* Decorative elements */}
      <mesh position={[-0.45, -0.45, 0.1]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.1, 0.1, 0.03]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[0.45, 0.45, 0.1]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.1, 0.1, 0.03]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

export default function PersonalInfo() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    
    setMousePosition({ x, y });
  };
  
  return (
    <section id="personal-info" className="py-24 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-sky-900/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-sky-900/10 to-transparent" />
        <ParallaxSection
          strength={0.15}
          direction="x"
          className="absolute -bottom-40 -right-40 w-96 h-96 blur-3xl rounded-full bg-sky-600/10"
          reverse={true}
        />
        <ParallaxSection
          strength={0.15}
          direction="x"
          className="absolute -top-40 -left-40 w-96 h-96 blur-3xl rounded-full bg-sky-600/10"
        />
      </div>
      
      <div ref={containerRef} className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-block mb-3 px-4 py-1 bg-sky-900/20 rounded-full text-sky-400 text-sm font-medium"
          >
            ABOUT ME
          </motion.div>
          <AnimatedText
            text="Personal Info"
            type="words"
            animation="fadeUp"
            staggerChildren={0.1}
            className="text-5xl font-bold mb-6"
            textClassName=""
            highlights={["Personal"]}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            A little bit more about myself
          </motion.p>
        </div>
        
        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <ScrollTriggerGroup threshold={0.2} staggerDelay={0.1} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50"
            >
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                <span className="bg-sky-600/20 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                Personal Details
              </h3>
              
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-sky-600/20 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Name</h4>
                    <p className="text-gray-400">Rakshit Singh Thakur</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-sky-600/20 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Location</h4>
                    <p className="text-gray-400">Bhopal, India</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-sky-600/20 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Experience</h4>
                    <p className="text-gray-400">2+ years of professional experience</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-sky-600/20 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Education</h4>
                    <p className="text-gray-400">Bachelor of Engineering in Electronics and Communication Engineering</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <div 
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden h-full shadow-xl"
            >
              <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
                <color attach="background" args={['#15181f']} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-5, -5, 5]} intensity={0.5} color="#3aa2f7" />
                <Avatar3D mousePosition={mousePosition} isMobile={isMobile} />
                <Environment preset="city" />
              </Canvas>
            </div>
            
          </ScrollTriggerGroup>
          {/* Left side: 3D Avatar */}
          <ScrollTrigger threshold={0.2} delay={0.3} className=" relative">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50"
            >
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                <span className="bg-sky-600/20 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </span>
                Interests & Skills
              </h3>

              <h5 className="text-xl font-bold mb-6 text-white flex items-center">Frontend Technologies</h5>
              
              <div className="flex flex-wrap gap-3">
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">JavaScript (ES6+)</span>
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">HTML5</span>
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">CSS3</span>
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">SCSS</span>
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">ReactJS</span>
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">NextJS</span>
              </div>

              <h5 className="text-xl font-bold mb-6 text-white flex items-center mt-4">Frameworks & Libraries</h5>


              <div className="flex flex-wrap gap-3">
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">TailwindCSS</span>
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">Bootstrap</span>
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">MaterialUI</span>
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">GSAP</span>
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">Framer Motion</span>
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">Styled Components</span>
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">JQuery</span>
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">AceternityUI</span>
              </div>

              <h5 className="text-xl font-bold mb-6 text-white flex items-center mt-4">Backend & Database</h5>


              <div className="flex flex-wrap gap-3">
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">Basic NodeJS</span>
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">ExpressJS</span>
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">MongoDB</span>
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">Basic Convex</span>
                <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">RESTful APIs</span>
              </div>

              <h5 className="text-xl font-bold mb-6 text-white flex items-center mt-4">Authentication</h5>


<div className="flex flex-wrap gap-3">
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">OAuth</span>
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">JWT</span>
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">NextAuth</span>
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">Clerk</span>
</div>

<h5 className="text-xl font-bold mb-6 text-white flex items-center mt-4">Development Tools</h5>


<div className="flex flex-wrap gap-3">
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">Git</span>
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">GitHub</span>
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">VS Code</span>
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">Webpack</span>
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">Babel</span>
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">NPM</span>
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">Yarn</span>
</div>

<h5 className="text-xl font-bold mb-6 text-white flex items-center mt-4">Design</h5>


<div className="flex flex-wrap gap-3">
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">Figma</span>
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">Canva</span>
</div>

<h5 className="text-xl font-bold mb-6 text-white flex items-center mt-4">Testing & Performance</h5>


<div className="flex flex-wrap gap-3">
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">React Testing Library</span>
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">Chrome DevTools</span>
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">LightHouse</span>
</div>

<h5 className="text-xl font-bold mb-6 text-white flex items-center mt-4">SEO & Analytics</h5>


<div className="flex flex-wrap gap-3">
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">Google Search Console</span>
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">Google Analytics</span>
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">Google Tag Manager</span>
  <span className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm">Google Adsense</span>
</div>
            </motion.div>
            
          </ScrollTrigger>
          
          
          
        </div>
      </div>
    </section>
  );
}