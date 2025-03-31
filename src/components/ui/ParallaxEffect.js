'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ParallaxEffect({
  children,
  strength = 0.1,
  direction = 'y',
  reverse = false,
  className = '',
  springConfig = { stiffness: 400, damping: 90 }
}) {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  // Calculate the transform value based on scroll progress
  const transformValue = useTransform(
    scrollYProgress,
    [0, 1], 
    reverse ? [100 * strength, -100 * strength] : [-100 * strength, 100 * strength]
  );
  
  // Apply spring physics for smoother motion
  const smoothTransform = useSpring(transformValue, springConfig);
  
  // Create style object based on direction
  const style = direction === 'y' 
    ? { y: smoothTransform }
    : { x: smoothTransform };
  
  return (
    <div ref={ref} className={`${className} overflow-hidden`}>
      <motion.div
        style={style}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Specialized parallax components for common use cases
export function ParallaxText({ children, className = '', ...props }) {
  return (
    <ParallaxEffect 
      className={`inline-block ${className}`} 
      strength={0.05} 
      {...props}
    >
      {children}
    </ParallaxEffect>
  );
}

export function ParallaxImage({ src, alt, className = '', imgClassName = '', ...props }) {
  return (
    <ParallaxEffect 
      className={`relative overflow-hidden ${className}`} 
      strength={0.2} 
      {...props}
    >
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover ${imgClassName}`} 
      />
    </ParallaxEffect>
  );
}

export function ParallaxSection({ children, className = '', ...props }) {
  return (
    <ParallaxEffect 
      className={className} 
      strength={0.1} 
      {...props}
    >
      {children}
    </ParallaxEffect>
  );
}