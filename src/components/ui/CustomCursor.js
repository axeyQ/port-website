'use client';
import { useState, useEffect } from 'react';
import useMousePosition from '@/hooks/useMousePosition';

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState('default');
  const { position } = useMousePosition();
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  // To handle modal cursor visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === 'undefined') return;
    
    // Comprehensive mobile detection function
    const detectMobile = () => {
      // Method 1: Media query (primary method)
      const mediaQuery = window.matchMedia('(max-width: 768px), (pointer: coarse)');
      
      // Method 2: Check for touch capability
      const hasTouch = 'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;
      
      // Method 3: User agent detection (fallback)
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      // A device is considered mobile if any of these methods return true
      const isMobileDevice = mediaQuery.matches || hasTouch || mobileUserAgent;
      
      // Set state based on detection
      setIsDesktop(!isMobileDevice);
      
      // Only apply cursor-none class to body on desktop
      if (!isMobileDevice) {
        document.body.classList.add('cursor-none');
      } else {
        document.body.classList.remove('cursor-none');
      }
    };
    
    // Custom modal check function
    const checkModalState = () => {
      // Check for any modal elements with high z-index that are visible
      const modalElements = document.querySelectorAll('.fixed.z-50');
      setIsModalOpen(modalElements.length > 0);
    };
    
    // Run detection
    detectMobile();
    checkModalState();
    setIsMounted(true);
    
    // Create a mutation observer to detect modal changes
    const observer = new MutationObserver((mutations) => {
      checkModalState();
    });
    
    // Start observing the document body for DOM changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
    
    // Listen for window resize to detect mobile/desktop changes
    window.addEventListener('resize', detectMobile);
    
    return () => {
      document.body.classList.remove('cursor-none');
      window.removeEventListener('resize', detectMobile);
      observer.disconnect();
    };
  }, []);

  // Critical: Return null early for non-desktop devices
  if (!isMounted || !isDesktop) {
    return null;
  }

  return (
    <div
      className={`fixed pointer-events-none z-[9999] rounded-full mix-blend-difference 
      ${cursorVariant === 'default' ? 'w-6 h-6 bg-white' : 'w-10 h-10 bg-sky-400'}
      transition-all duration-150 ease-out`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}