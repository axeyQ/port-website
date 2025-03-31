'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PrimaryMagneticButton, SecondaryMagneticButton } from './MagneticButton';

export default function ProjectModal({ 
  isOpen, 
  onClose, 
  project,
  className = '' 
}) {
  const [activeImage, setActiveImage] = useState(0);
  const modalRef = useRef(null);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  // Close on escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  if (!project) return null;
  
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };
  
  // Sample project images (replace with actual project images)
  const projectImages = [
    { id: 1, src: '/placeholder.jpg', alt: `${project.title} screenshot 1` },
    { id: 2, src: '/placeholder.jpg', alt: `${project.title} screenshot 2` },
    { id: 3, src: '/placeholder.jpg', alt: `${project.title} screenshot 3` },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            ref={modalRef}
            className={`bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto ${className}`}
          >
            {/* Modal header with close button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Modal content */}
            <div className="p-6">
              {/* Image gallery */}
              <div className="mb-8">
                {/* Main image */}
                <div className="relative aspect-video bg-gray-700 rounded-lg overflow-hidden mb-4">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage}
                      src={projectImages[activeImage].src}
                      alt={projectImages[activeImage].alt}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                </div>
                
                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {projectImages.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setActiveImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden transition-all ${
                        activeImage === index ? 'ring-2 ring-sky-500' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={image.src} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Project details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h4 className="text-xl font-semibold mb-4">Overview</h4>
                  <p className="text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <p className="text-gray-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget
                    ultricies tincidunt, nisl nisl aliquam nisl, eget aliquet nisl nisl sit amet nisl.
                    Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl.
                  </p>
                  
                  <h4 className="text-xl font-semibold mt-8 mb-4">Key Features</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Responsive design for all device sizes</li>
                    <li>Interactive user interface with smooth animations</li>
                    <li>Real-time data updates and notifications</li>
                    <li>Secure authentication and authorization</li>
                    <li>High performance and accessibility standards</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4">Project Info</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm text-gray-400 mb-1">Category</h5>
                      <p className="text-white">{project.category === 'web' ? 'Web Development' : project.category === '3d' ? '3D & WebGL' : 'Mobile App'}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-sm text-gray-400 mb-1">Technologies</h5>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="bg-gray-700 text-sky-300 text-xs rounded-full px-3 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm text-gray-400 mb-1">Client</h5>
                      <p className="text-white">Sample Client</p>
                    </div>
                    
                    <div>
                      <h5 className="text-sm text-gray-400 mb-1">Date</h5>
                      <p className="text-white">March 2023</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-8">
                    <PrimaryMagneticButton as="a" href="#" target="_blank" rel="noopener noreferrer">
                      <span className="flex items-center gap-2">
                        <span>Live Preview</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </span>
                    </PrimaryMagneticButton>
                    
                    <SecondaryMagneticButton as="a" href="#" target="_blank" rel="noopener noreferrer">
                      <span className="flex items-center gap-2">
                        <span>Source Code</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </span>
                    </SecondaryMagneticButton>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}