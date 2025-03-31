'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Canvas from '@/components/three/Canvas';
import SkillsVisualization from '@/components/three/SkillsVisualization';
import { ScrollTrigger, ScrollTriggerGroup } from '@/components/ui/ScrollTrigger';

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
          <h2 className="text-4xl font-bold mb-16 text-center">
            About <span className="text-sky-400">Me</span>
          </h2>
        </ScrollTrigger>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ScrollTriggerGroup threshold={0.2} staggerDelay={0.1} className="space-y-6">
            <h3 className="text-2xl font-bold">Who I am</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                I&apos;m a creative developer passionate about building immersive digital experiences 
                that blend design and technology.
              </p>
              <p>
                With expertise in modern web technologies like React, Three.js, and interactive animations, 
                I create websites that stand out from the crowd.
              </p>
              <p>
                My approach combines clean code, innovative design, and cutting-edge technologies
                to deliver unique user experiences.
              </p>
            </div>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-8 bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Let&apos;s Work Together
            </motion.a>
          </ScrollTriggerGroup>
          
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
            
            <div className="absolute bottom-0 left-0 right-0 text-center text-gray-400 text-sm">
              Interact with the 3D visualization
            </div>
          </div>
          
          {/* Traditional skill bars for mobile fallback */}
          <div className="md:hidden space-y-4 mt-8">
            <h3 className="text-2xl font-bold mb-6">My Skills</h3>
            
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
                      animate={{ width: isInView ? `${skill.level}%` : 0 }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </ScrollTriggerGroup>
          </div>
        </div>
        
        {/* Background accent */}
        <div className="absolute -bottom-40 -right-40 w-80 h-80 blur-3xl rounded-full bg-sky-600/10 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-80 h-80 blur-3xl rounded-full bg-sky-600/10 pointer-events-none" />
      </div>
    </section>
  );
}