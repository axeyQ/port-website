'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import React from 'react';

// Export both components as named exports
export function ScrollTrigger({
  children,
  threshold = 0.2,
  delay = 0,
  duration = 0.5,
  initialY = 50,
  triggerOnce = true,
  className = '',
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: triggerOnce,
    amount: threshold 
  });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.215, 0.61, 0.355, 1]
        },
      });
    }
  }, [isInView, controls, delay, duration]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: initialY }}
      animate={controls}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Container component that staggers children animations
export function ScrollTriggerGroup({
  children,
  threshold = 0.2,
  staggerDelay = 0.1,
  initialY = 50,
  className = '',
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    amount: threshold 
  });
  const controls = useAnimation();
  const [childrenCount, setChildrenCount] = useState(0);
  
  useEffect(() => {
    if (ref.current) {
      // Count direct children that will be animated
      setChildrenCount(ref.current.children.length);
    }
  }, []);
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: initialY },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
      }
    },
  };
  
  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className={className}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          variants={itemVariants}
          custom={index}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Also export the ScrollTrigger as default for backward compatibility
export default ScrollTrigger;