'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { ScrollTrigger, ScrollTriggerGroup } from '@/components/ui/ScrollTrigger';
import { AnimatedText } from '@/components/ui/TextAnimation';
import { ParallaxSection } from '@/components/ui/ParallaxEffect';
import DecorativeAstronaut from '@/components/three/DecorativeAstronaut'; // The astronaut component
import PersonalInfoScene from '@/components/three/PersonalInfoScene';
// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

// Define skill categories
const skillCategories = [
  // Always visible categories
  {
    title: "Frontend Technologies",
    skills: ["JavaScript (ES6+)", "HTML5", "CSS3", "SCSS", "ReactJS", "NextJS"],
    alwaysVisible: true
  },
  {
    title: "Frameworks & Libraries",
    skills: ["TailwindCSS", "Bootstrap", "MaterialUI", "GSAP", "Framer Motion", "Styled Components", "JQuery", "AceternityUI"],
    alwaysVisible: true
  },
 
  // Hidden categories (shown after clicking "Show More")
  {
    title: "Backend & Database",
    skills: ["Basic NodeJS", "ExpressJS", "MongoDB", "Basic Convex", "RESTful APIs"],
  },
  {
    title: "Authentication",
    skills: ["OAuth", "JWT", "NextAuth", "Clerk"],
  },
  {
    title: "Development Tools",
    skills: ["Git", "GitHub", "VS Code", "Webpack", "Babel", "NPM", "Yarn"]
  },
  {
    title: "Design",
    skills: ["Figma", "Canva"]
  },
  {
    title: "Testing & Performance",
    skills: ["React Testing Library", "Chrome DevTools", "LightHouse"]
  },
  {
    title: "SEO & Analytics",
    skills: ["Google Search Console", "Google Analytics", "Google Tag Manager", "Google Adsense"]
  }
];

// Skill Category Component
const SkillCategory = ({ title, skills }) => {
  return (
    <motion.div 
      className="mb-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <motion.h5 
        className="text-xl font-bold text-white flex items-center mb-4"
        variants={itemVariants}
        whileHover={{ x: 5, transition: { duration: 0.2 } }}
      >
        {title}
      </motion.h5>
      
      <motion.div
        variants={containerVariants}
        className="flex flex-wrap gap-3"
      >
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            className="bg-gray-700/70 text-sky-300 rounded-full px-4 py-2 text-sm relative overflow-hidden group"
            variants={itemVariants}
            custom={index}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "rgba(56, 189, 248, 0.2)", 
              transition: { duration: 0.2 }
            }}
          >
            {/* Background glow on hover */}
            <motion.span 
              className="absolute inset-0 bg-sky-500/10 rounded-full z-0"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
            
            {/* Skill text */}
            <span className="relative z-10">{skill}</span>
            
            {/* Bottom border animation */}
            <motion.span 
              className="absolute bottom-0 left-0 h-0.5 bg-sky-400 w-0"
              initial={{ width: "0%" }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

// Scene component to manage the 3D scene
function Scene({ mousePosition }) {
  return (
    <>
      {/* Add some stars in the background */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5
          ]}
        >
          <sphereGeometry args={[0.03 + Math.random() * 0.05, 10, 10]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      ))}
      
      {/* Astronaut floating on the right side */}
      <DecorativeAstronaut 
        position={[3, -0.5, 0]} 
        scale={0.4} 
        rotation={[0, -Math.PI / 4, 0]} 
        mousePosition={mousePosition}
      />
      
      {/* Add lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#0ea5e9" />
    </>
  );
}

export default function PersonalInfo() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showAllCategories, setShowAllCategories] = useState(false);
  const skillsContainerRef = useRef(null);
  const moreButtonRef = useRef(null);
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Handle mouse movement for astronaut interaction
  const handleMouseMove = (e) => {
    // Get normalized mouse position for the entire window
    // This ensures the astronaut reacts even when the mouse is not over the canvas
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  };
  
  // Toggle showing all categories
  const toggleAllCategories = () => {
    setShowAllCategories(!showAllCategories);
    
    // If expanding, scroll to make sure the new content is visible
    if (!showAllCategories) {
      setTimeout(() => {
        moreButtonRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  };

  // Visible categories (always visible or based on showAllCategories state)
  const visibleCategories = skillCategories.filter(
    category => category.alwaysVisible || showAllCategories
  );
  
  // Count hidden categories for the "Show More" button text
  const hiddenCategoriesCount = skillCategories.filter(
    category => !category.alwaysVisible
  ).length;

  return (
    <section 
      id="personal-info" 
      className="py-24 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
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
      
      {/* 3D Background with Astronaut - positioned absolutely to overlay the entire section */}
      <div className="absolute inset-0 pointer-events-none">
  <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
    <PersonalInfoScene mousePosition={mousePosition} />
    <Environment preset="night" />
  </Canvas>
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
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
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
                </motion.div>
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
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
                </motion.div>
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
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
                </motion.div>
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
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
                </motion.div>
              </div>
            </motion.div>
          </ScrollTriggerGroup>
          
          {/* Skills section */}
          <ScrollTrigger threshold={0.2} delay={0.3} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50"
              ref={skillsContainerRef}
            >
              {/* Skills header */}
              <h3 className="text-2xl font-bold mb-8 text-white flex items-center">
                <span className="bg-sky-600/20 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </span>
                Interests & Skills
              </h3>
              
              {/* Always visible categories and conditionally visible categories */}
              <div className="space-y-2">
                {/* Render visible categories */}
                {visibleCategories.map((category, index) => (
                  <SkillCategory 
                    key={category.title}
                    title={category.title}
                    skills={category.skills}
                  />
                ))}
                
                {/* "Show More" button after all visible categories */}
                {!showAllCategories && hiddenCategoriesCount > 0 && (
                  <motion.div 
                    ref={moreButtonRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex justify-center mt-8"
                  >
                    <motion.button
                      onClick={toggleAllCategories}
                      className="text-sky-400 hover:text-sky-300 bg-sky-600/10 hover:bg-sky-600/20 px-4 py-3 rounded-lg flex items-center gap-2 transition-colors"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Show {hiddenCategoriesCount} More Skill Categories</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </motion.button>
                  </motion.div>
                )}
                
                {/* "Show Less" button when showing all categories */}
                {showAllCategories && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mt-8"
                  >
                    <motion.button
                      onClick={toggleAllCategories}
                      className="text-sky-400 hover:text-sky-300 bg-sky-600/10 hover:bg-sky-600/20 px-4 py-3 rounded-lg flex items-center gap-2 transition-colors"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Show Less</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="transform rotate-180"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </ScrollTrigger>
        </div>
      </div>
    </section>
  );
}