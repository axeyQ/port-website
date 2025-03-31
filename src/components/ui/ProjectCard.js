'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate position within card (0 to 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Convert to rotation values (-10 to 10 degrees)
    const rotY = 10 * (0.5 - x);
    const rotX = 10 * (y - 0.5);
    
    setRotation({ x: rotX, y: rotY });
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };
  
  return (
    <motion.div 
      ref={cardRef}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-xl h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ z: 10 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
        },
      }}
    >
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gray-700"></div>
        
        {/* Project image */}
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Placeholder for image */}
          {/* <Image src={project.imageUrl} alt={project.title} fill /> */}
        </motion.div>
        
        {/* Overlay with project tags */}
        <div 
          className={`absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 flex items-end justify-start p-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-800/80 backdrop-blur-sm text-sky-300 text-xs rounded-full px-3 py-1"
                style={{
                  transform: 'translateZ(20px)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2" style={{ transform: 'translateZ(10px)' }}>
          {project.title}
        </h3>
        
        <p className="text-gray-400 mb-6 flex-grow" style={{ transform: 'translateZ(5px)' }}>
          {project.description}
        </p>
        
        <div className="flex items-center justify-between" style={{ transform: 'translateZ(15px)' }}>
          <motion.a
            href="#"
            className="text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1 transition-colors"
            whileHover={{ x: 5 }}
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
          </motion.a>
          
          <motion.a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Live Demo"
            whileHover={{ y: -3 }}
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
          </motion.a>
        </div>
      </div>
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-sky-500 rounded-xl opacity-0 pointer-events-none"
        animate={{ opacity: isHovered ? 0.05 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}