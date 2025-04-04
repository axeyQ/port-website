'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Default export for the main component
export default function MagneticButton({
  children,
  className = '',
  magneticStrength = 0.5,
  scale = 1.05,
  radius = 400,
  smooth = 0.2,
  as = 'button',
  disabled = false,
  ...props
}) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset position when not hovered
  useEffect(() => {
    if (!isHovered) {
      setPosition({ x: 0, y: 0 });
    }
  }, [isHovered]);

  // Magnetic effect on mouse move - only on desktop
  const handleMouseMove = (e) => {
    if (disabled || isMobile) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    // Calculate the center of the button
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distances from mouse to center
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Calculate distance from mouse to center
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    // Only apply magnetic effect if mouse is within radius
    if (distance < radius) {
      // Calculate magnetic pull (stronger when closer)
      const pull = 1 - Math.min(distance / radius, 1);
      
      // Update position with smooth transition
      setPosition({
        x: distanceX * magneticStrength * pull,
        y: distanceY * magneticStrength * pull,
      });
    } else {
      // Reset position when mouse is outside radius
      setPosition({ x: 0, y: 0 });
    }
  };

  // Dynamic button component based on the 'as' prop
  const Component = as;

  // If mobile, render a simpler version without magnetic effects
  if (isMobile) {
    return (
      <Component
        className={`${className} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </Component>
    );
  }

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered && !disabled ? scale : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      style={{ display: 'inline-block' }}
    >
      <Component
        className={`${className} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  );
}

// Primary button variant with corrected styling
export function PrimaryMagneticButton({ children, className = '', ...props }) {
  return (
    <MagneticButton
      className={`inline-flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors ${className}`}
      {...props}
    >
      {children}
    </MagneticButton>
  );
}

// Secondary button variant with corrected styling
export function SecondaryMagneticButton({ children, className = '', ...props }) {
  return (
    <MagneticButton
      className={`inline-flex items-center justify-center bg-transparent hover:bg-white/10 border border-white text-white font-semibold py-3 px-6 rounded-lg transition-colors ${className}`}
      {...props}
    >
      {children}
    </MagneticButton>
  );
}

// Icon button variant
export function IconMagneticButton({ icon, className = '', magneticStrength = 0.3, ...props }) {
  return (
    <MagneticButton
      className={`inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors ${className}`}
      magneticStrength={magneticStrength}
      {...props}
    >
      {icon}
    </MagneticButton>
  );
}