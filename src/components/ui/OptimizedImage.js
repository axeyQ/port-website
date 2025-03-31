'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes = '100vw',
  priority = false,
  quality = 75,
  className = '',
  objectFit = 'cover',
  objectPosition = 'center',
  placeholderColor = '#1e293b', // slate-800
  animation = true,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(src);
  
  // Handle image load error
  useEffect(() => {
    const handleError = () => {
      // If image fails to load, use a placeholder service
      setImageSrc(`https://placehold.co/${width || 800}x${height || 600}/${placeholderColor.replace('#', '')}/gray?text=${encodeURIComponent(alt || 'Image')}`);
    };
    
    const img = new window.Image();
    img.src = src;
    img.onerror = handleError;
    
    return () => {
      img.onerror = null;
    };
  }, [src, alt, width, height, placeholderColor]);
  
  const imageProps = {
    src: imageSrc,
    alt,
    quality,
    priority,
    sizes,
    fill,
    width: !fill ? width : undefined,
    height: !fill ? height : undefined,
    onLoad: () => setIsLoading(false),
    style: {
      objectFit,
      objectPosition,
    },
    ...props,
  };
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-slate-800 animate-pulse" 
          style={{ backgroundColor: placeholderColor }}
        />
      )}
      
      {/* Actual image */}
      {animation ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isLoading ? 0 : 1,
          }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <Image 
            {...imageProps}
            className={`w-full h-full transition-opacity duration-300`}
          />
        </motion.div>
      ) : (
        <Image 
          {...imageProps}
          className={`w-full h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
      )}
    </div>
  );
}

// Variant optimized for background images
export function BackgroundImage({ 
  src, 
  alt = 'Background Image',
  priority = true,
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  className = '',
  children,
  ...props
}) {
  return (
    <div className={`relative ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="absolute inset-0 -z-10"
        {...props}
      />
      {overlayColor && (
        <div 
          className="absolute inset-0 -z-10" 
          style={{ backgroundColor: overlayColor }}
        />
      )}
      {children}
    </div>
  );
}