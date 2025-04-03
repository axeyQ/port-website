'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Canvas from '@/components/three/Canvas';
import SkillsVisualization from '@/components/three/SkillsVisualization';
import { ScrollTrigger, ScrollTriggerGroup } from '@/components/ui/ScrollTrigger';
import { AnimatedText } from '@/components/ui/TextAnimation';
import { PrimaryMagneticButton } from '@/components/ui/MagneticButton';
import { ParallaxSection } from '@/components/ui/ParallaxEffect';

export default function About() {
  const containerRef = useRef(null);
  const skillsRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [activeSkill, setActiveSkill] = useState(null);
  
  // Updated with your actual skills from resume
  const skills = [
    { name: 'React.js', level: 95 },
    { name: 'Next.js', level: 90 },
    { name: 'JavaScript', level: 92 },
    { name: 'TailwindCSS', level: 88 },
    { name: 'GSAP', level: 85 },
    { name: 'Framer Motion', level: 82 },
    { name: 'MongoDB', level: 75 },
    { name: 'RESTful APIs', level: 80 },
  ];
  
  // Handler to update active skill from the SkillsVisualization
  const handleSkillHover = (index) => {
    setActiveSkill(index !== null ? skills[index] : null);
  };

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
      {/* Decorative background elements */}
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
        <div className="text-center mb-20">
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
            text="Who I Am"
            type="words"
            animation="fadeUp"
            staggerChildren={0.1}
            className="text-5xl font-bold mb-6"
            textClassName=""
            highlights={["I"]}
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Frontend Engineer specializing in creating engaging digital experiences with modern web technologies
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - About Text */}
          <div className="space-y-8">
            <ScrollTriggerGroup threshold={0.2} staggerDelay={0.1}>
              <div className="p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 mb-2">
                <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
                  <span className="bg-sky-600/20 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  Frontend Engineer
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  I&apos;m a <span className="text-sky-400 font-medium">Software Engineer</span> at Eazyposy Infotech Private Limited, passionate about building responsive and engaging web applications that deliver exceptional user experiences.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 mb-2">
                <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
                  <span className="bg-sky-600/20 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                      <line x1="6" y1="3" x2="6" y2="15"></line>
                      <circle cx="18" cy="6" r="3"></circle>
                      <circle cx="6" cy="18" r="3"></circle>
                      <path d="M18 9a9 9 0 0 1-9 9"></path>
                    </svg>
                  </span>
                  My Approach
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    With expertise in React.js, Next.js, and interactive animations with GSAP and Framer Motion, I create websites that stand out from the crowd.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    My approach combines <span className="text-sky-400 font-medium">clean code</span>, <span className="text-sky-400 font-medium">innovative design</span>, and <span className="text-sky-400 font-medium">performance optimization</span> to deliver seamless user experiences across all devices.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 mb-2">
                <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
                  <span className="bg-sky-600/20 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </span>
                  Professional Experience
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    At <span className="text-sky-400 font-medium">Eazyposy Infotech Private Limited</span>, I&apos;ve led frontend development for multiple projects, including the company website and restaurant management system, reducing load times by 40% and increasing user engagement.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    I collaborate closely with designers and backend developers to implement new features, integrate third-party APIs, and optimize application performance.
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <PrimaryMagneticButton
                  as="a"
                  href="#contact"
                  className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
                >
                  Let&apos;s Work Together
                </PrimaryMagneticButton>
              </motion.div>
            </ScrollTriggerGroup>
          </div>

          {/* Right Column - Skills Visualization */}
          <div ref={skillsRef} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 relative h-[550px]">
            <h3 className="text-2xl font-bold mb-4 text-white">My Skills</h3>
            
            {/* Canvas with 3D visualization */}
            <div className="absolute inset-0 mt-16">
              <Canvas
                cameraPosition={[0, 0, 10]}
                enableOrbit={true}
                enableZoom={false}
                enablePan={false}
                className="rounded-xl z-10"
              >
                <SkillsVisualization 
                  scrollRef={skillsRef} 
                  onSkillHover={handleSkillHover}
                />
              </Canvas>
            </div>

            {/* Skill info overlay */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute bottom-6 left-6 right-6 bg-gray-900/70 backdrop-blur-md p-4 rounded-lg border border-gray-700/50 z-10 flex items-center justify-between"
            >
              <div>
                <p className="text-gray-400 text-sm">
                  {activeSkill 
                    ? "Selected Skill:" 
                    : "Interact with the 3D visualization"}
                </p>
                {activeSkill && (
                  <p className="text-sky-400 font-medium text-lg">{activeSkill.name}</p>
                )}
              </div>

              {activeSkill && (
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-sky-500 rounded-full"
                      style={{ width: `${activeSkill.level}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-white font-medium">{activeSkill.level}%</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Mobile Skills Fallback */}
        <div className="lg:hidden mt-12 p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
          <h3 className="text-2xl font-bold mb-6">My Skills</h3>
          <ScrollTriggerGroup threshold={0.1} staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-white">{skill.name}</span>
                  <span className="text-sky-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-sky-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            ))}
          </ScrollTriggerGroup>
        </div>
      </div>
    </section>
  );
}