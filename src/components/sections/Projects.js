'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from '@/components/ui/ProjectCard';
import { ScrollTrigger } from '@/components/ui/ScrollTrigger';

export default function Projects() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured online shopping platform with real-time inventory management.",
      category: "web",
      tags: ["Next.js", "Tailwind CSS", "Stripe"],
      imageUrl: "/placeholder.jpg",
    },
    {
      id: 2,
      title: "3D Product Visualizer",
      description: "Interactive 3D product configurator for customizing products in real-time.",
      category: "3d",
      tags: ["Three.js", "React", "WebGL"],
      imageUrl: "/placeholder.jpg",
    },
    {
      id: 3,
      title: "Dashboard Analytics",
      description: "Data visualization dashboard with interactive charts and real-time updates.",
      category: "web",
      tags: ["React", "D3.js", "Firebase"],
      imageUrl: "/placeholder.jpg",
    },
    {
      id: 4,
      title: "Virtual Reality Experience",
      description: "Immersive VR experience showcasing architectural visualizations.",
      category: "3d",
      tags: ["WebXR", "Three.js", "GSAP"],
      imageUrl: "/placeholder.jpg",
    },
    {
      id: 5,
      title: "Mobile Fitness App",
      description: "Cross-platform fitness tracking application with social features.",
      category: "app",
      tags: ["React Native", "Firebase", "Redux"],
      imageUrl: "/placeholder.jpg",
    },
    {
      id: 6,
      title: "Interactive Portfolio",
      description: "Creative portfolio website with advanced animations and interactions.",
      category: "web",
      tags: ["Next.js", "Framer Motion", "GSAP"],
      imageUrl: "/placeholder.jpg",
    },
  ];
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web' },
    { id: '3d', label: '3D & WebGL' },
    { id: 'app', label: 'Mobile Apps' },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.165, 0.84, 0.44, 1],
      }
    },
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 right-0 h-1/2 w-full bg-gradient-to-b from-sky-900/5 to-transparent pointer-events-none" />
      <div className="absolute -left-20 top-40 w-60 h-60 rounded-full bg-sky-600/10 filter blur-3xl pointer-events-none" />
      <div className="absolute -right-20 bottom-40 w-60 h-60 rounded-full bg-sky-600/10 filter blur-3xl pointer-events-none" />
      
      <div ref={containerRef} className="container mx-auto px-4 relative z-10">
        <ScrollTrigger>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">My <span className="text-sky-400">Projects</span></h2>
            <p className="text-gray-300 text-lg">
              Explore my latest work showcasing creative solutions across web, 3D, and mobile platforms.
            </p>
          </div>
        </ScrollTrigger>
        
        {/* Filter Buttons */}
        <ScrollTrigger delay={0.2}>
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
                whileHover={{ y: -3 }}
                whileTap={{ y: 0 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </motion.div>
        </ScrollTrigger>
        
        {/* Projects Grid with Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="h-full"
              layout // Enable smooth layout animations when filtering
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Empty state for when no projects match the filter */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found matching this filter.</p>
            <motion.button
              onClick={() => setActiveFilter('all')}
              className="mt-4 px-6 py-2 bg-sky-600 text-white rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show all projects
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}