'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

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
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <div ref={containerRef} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">My <span className="text-sky-400">Projects</span></h2>
          <p className="text-gray-300 text-lg">
            Explore my latest work showcasing creative solutions across web, 3D, and mobile platforms.
          </p>
        </motion.div>
        
        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeFilter === filter.id
                  ? 'bg-sky-600 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>
        
        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, variants }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      variants={variants}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gray-700"></div>
        
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Placeholder for image */}
          {/* <Image src={project.imageUrl} alt={project.title} fill /> */}
        </motion.div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, index) => (
            <span key={index} className="bg-gray-700 text-sky-300 text-xs rounded-full px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <a
            href="#"
            className="text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1 transition-colors"
          >
            View Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
          
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Live Demo"
          >
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
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}