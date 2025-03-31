'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Fixed version of HighlightWords component
export function HighlightWords({
  text,
  highlights = [],
  highlightClassName = "text-sky-400", // camelCase for prop
  className = "",
  ...props
}) {
  // Split the text and find words to highlight
  const parts = text.split(' ');
  
  return (
    <span className={className} {...props}>
      {parts.map((part, index) => {
        const isHighlighted = highlights.includes(part);
        
        return (
          <span key={index}>
            {/* Use className instead of highlightClassName for DOM element */}
            <span className={isHighlighted ? highlightClassName : ""}>
              {part}
            </span>
            {index !== parts.length - 1 && ' '}
          </span>
        );
      })}
    </span>
  );
}

// Split text into individual characters for animation
const splitText = (text) => {
  return text.split('').map((char, index) => (
    <motion.span key={index} className="inline-block">
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  ));
};

// Split text into words for animation
const splitTextIntoWords = (text) => {
  return text.split(' ').map((word, index) => (
    <motion.span key={index} className="inline-block">
      {word}
      {index !== text.split(' ').length - 1 && '\u00A0'}
    </motion.span>
  ));
};

// Animation for each character or word - fixed version
export function AnimatedText({
  text,
  type = 'words',
  duration = 0.05,
  staggerChildren = 0.03,
  delayChildren = 0,
  triggerOnce = true,
  threshold = 0.1,
  className = '',
  textClassName = '',
  // Fix: rename to "highlightClass" for internal use
  highlightClassName = '', 
  animation = 'fadeUp',
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: triggerOnce, amount: threshold });
  const controls = useAnimation();
  
  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 20 },
      visible: i => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: delayChildren + i * staggerChildren,
          duration,
          ease: [0.215, 0.61, 0.355, 1],
        }
      }),
    },
    typewriter: {
      hidden: { opacity: 0, x: -20 },
      visible: i => ({
        opacity: 1,
        x: 0,
        transition: {
          delay: delayChildren + i * staggerChildren,
          duration: duration * 2,
          ease: "easeOut",
        }
      }),
    },
    wave: {
      hidden: { opacity: 0, y: 20 },
      visible: i => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: delayChildren + i * staggerChildren,
          type: "spring",
          damping: 12,
          stiffness: 200,
        }
      }),
    },
  };
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  let renderedText;
  
  if (type === 'chars') {
    renderedText = splitText(text);
  } else if (type === 'words' || type === 'lines') {
    renderedText = splitTextIntoWords(text);
  }
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      className={className}
      {...props}
    >
      <span className={`inline-block ${textClassName}`}>
        {renderedText.map((item, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={variants[animation]}
            className="inline-block"
          >
            {item}
          </motion.span>
        ))}
      </span>
    </motion.div>
  );
}

// Typewriter effect - no changes needed here
export function Typewriter({
  text,
  speed = 50,
  delay = 0,
  cursor = true,
  loop = false,
  className = "",
  onComplete = () => {},
  ...props
}) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    let timeout;
    
    if (delay > 0 && currentIndex === 0) {
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, delay);
      return () => clearTimeout(timeout);
    }
    
    if (isTyping) {
      if (currentIndex < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
      } else {
        setIsTyping(false);
        onComplete();
        
        if (loop) {
          timeout = setTimeout(() => {
            setDisplayText('');
            setCurrentIndex(0);
            setIsTyping(true);
          }, 2000);
        }
      }
    }
    
    return () => clearTimeout(timeout);
  }, [currentIndex, isTyping, text, speed, delay, loop, onComplete]);
  
  return (
    <div className={className} {...props}>
      {displayText}
      {cursor && isTyping && (
        <span className="inline-block w-1 h-5 ml-1 bg-current animate-blink"></span>
      )}
    </div>
  );
}

export default AnimatedText;