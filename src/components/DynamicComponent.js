'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';

// Dynamically import components
export function DynamicImport({ component, fallback = null, ...props }) {
  const Component = React.lazy(() => import(`@/components/${component}`));
  
  return (
    <Suspense fallback={fallback || <LoadingFallback />}>
      <Component {...props} />
    </Suspense>
  );
}

// Loading fallback component
export function LoadingFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px]">
      <motion.div
        animate={{ 
          rotate: 360,
          transition: { 
            duration: 1.5, 
            repeat: Infinity,
            ease: "linear" 
          } 
        }}
        className="w-8 h-8 border-2 border-t-sky-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
      />
    </div>
  );
}

// Example usage for complex components that aren't needed immediately
export const DynamicProjectModal = (props) => (
  <DynamicImport component="ui/ProjectModal" {...props} />
);

export const DynamicSkillsVisualization = (props) => (
  <DynamicImport 
    component="three/SkillsVisualization" 
    fallback={
      <div className="h-[500px] bg-gray-800 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">Loading 3D visualization...</p>
      </div>
    }
    {...props} 
  />
);