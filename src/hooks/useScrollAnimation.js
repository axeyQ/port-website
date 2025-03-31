'use client';

import { useState, useEffect } from 'react';

export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Calculate scroll direction
      if (currentScrollY > prevScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < prevScrollY) {
        setScrollDirection('up');
      }
      
      setPrevScrollY(currentScrollY);
      setScrollY(currentScrollY);
      
      // Calculate scroll progress (0 to 1)
      const documentHeight = document.body.scrollHeight - window.innerHeight;
      const scrollProgressValue = Math.min(Math.max(currentScrollY / documentHeight, 0), 1);
      setScrollProgress(scrollProgressValue);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);
  
  // Calculate section visibility based on scroll position
  const getSectionVisibility = (sectionRef) => {
    if (!sectionRef?.current) return 0;
    
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Section is below viewport
    if (sectionRect.top >= viewportHeight) return 0;
    
    // Section is above viewport
    if (sectionRect.bottom <= 0) return 0;
    
    // Section is partially visible at the top
    if (sectionRect.top < 0 && sectionRect.bottom > 0) {
      return Math.min(sectionRect.bottom / viewportHeight, 1);
    }
    
    // Section is partially visible at the bottom
    if (sectionRect.top < viewportHeight && sectionRect.bottom > viewportHeight) {
      return Math.min((viewportHeight - sectionRect.top) / viewportHeight, 1);
    }
    
    // Section is fully visible
    if (sectionRect.top >= 0 && sectionRect.bottom <= viewportHeight) {
      return 1;
    }
    
    // Section is larger than viewport and encompasses it
    if (sectionRect.top <= 0 && sectionRect.bottom >= viewportHeight) {
      return 1;
    }
    
    return 0;
  };
  
  return {
    scrollY,
    scrollDirection,
    scrollProgress,
    getSectionVisibility
  };
}

export default useScrollAnimation;