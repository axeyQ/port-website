'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Canvas from '@/components/three/Canvas';
import SkillsVisualization from '@/components/three/SkillsVisualization';
import { ScrollTrigger, ScrollTriggerGroup } from '@/components/ui/ScrollTrigger';
import { AnimatedText, HighlightWords } from '@/components/ui/TextAnimation';
import { PrimaryMagneticButton } from '@/components/ui/MagneticButton';
import { ParallaxSection } from '@/components/ui/ParallaxEffect';

export default function About() {
  const containerRef = useRef(null);
  const skillsRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  const skills = [
    { name: 'Next.js', level: 90 },
    { name: 'React', level: 95 },
    { name: 'JavaScript', level: 90 },
    { name: 'Three.js', level: 80 },
    { name: 'Tailwind CSS', level: 85 },
    { name: 'Node.js', level: 75 },
    { name: 'UI/UX Design', level: 70 },
    { name: 'GSAP', level: 75 },
  ];

  return (
    <section id="about" className="py-20 bg-gray-900 relative overflow-hidden">
      <div ref={containerRef} className="container mx-auto px-4">
        <ScrollTrigger threshold={0.1}>
          <AnimatedText
            text="About Me"
            type="words"
            animation="fadeUp"
            staggerChildren={0.1}
            className="text-4xl font-bold mb-16 text-center"
            highlightClassName="text-sky-400"
            highlights={["Me"]}
          />
        </ScrollTrigger>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ParallaxSection strength={0.05} className="space-y-6">
            <ScrollTrigger>
              <h3 className="text-2xl font-bold">Who I am</h3>
            </ScrollTrigger>
            
            <ScrollTriggerGroup threshold={0.2} staggerDelay={0.1}>
              <p className="text-gray-300">
                I&apos;m a <HighlightWords text="creative developer passionate about building immersive digital experiences" highlights={["creative", "immersive"]} highlightClassName="text-sky-400" /> 
                that blend design and technology.
              </p>
              <p className="text-gray-300">
                With expertise in modern web technologies like React, Three.js, and interactive animations, 
                I create websites that stand out from the crowd.
              </p>
              <p className="text-gray-300">
                My approach combines <HighlightWords text="clean code, innovative design, and cutting-edge technologies" highlights={["innovative", "cutting-edge"]} highlightClassName="text-sky-400" />
                to deliver unique user experiences.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <PrimaryMagneticButton
                  as="a"
                  href="#contact"
                  className="inline-block mt-8 bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Let&apos;s Work Together
                </PrimaryMagneticButton>
              </motion.div>
            </ScrollTriggerGroup>
          </ParallaxSection>
          
          <div ref={skillsRef} className="relative h-[500px]">
            <Canvas
              cameraPosition={[0, 0, 10]}
              enableOrbit={true}
              enableZoom={false}
              enablePan={false}
              className="rounded-lg"
            >
              <SkillsVisualization scrollRef={skillsRef} />
            </Canvas>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
              className="absolute bottom-0 left-0 right-0 text-center text-gray-400 text-sm bg-gray-800/50 backdrop-blur-sm py-2 rounded-b-lg"
            >
              Interact with the 3D visualization
            </motion.div>
          </div>
          
          {/* Traditional skill bars for mobile fallback */}
          <div className="md:hidden space-y-6 mt-8">
            <ScrollTrigger>
              <h3 className="text-2xl font-bold mb-6">My Skills</h3>
            </ScrollTrigger>
            
            <ScrollTriggerGroup threshold={0.1} staggerDelay={0.1}>
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div 
                      className="bg-sky-400 h-2 rounded-full"
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
        
        {/* Background accent elements */}
        <ParallaxSection 
          strength={0.15} 
          direction="x"
          className="absolute -bottom-40 -right-40 w-80 h-80 blur-3xl rounded-full bg-sky-600/10 pointer-events-none"
          reverse={true}
        />
        <ParallaxSection 
          strength={0.15} 
          direction="x"
          className="absolute -top-40 -left-40 w-80 h-80 blur-3xl rounded-full bg-sky-600/10 pointer-events-none" 
        />
      </div>
    </section>
  );
}