'use client';

import { useState, useEffect } from 'react';
import { throttle } from '@/lib/utils';

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Default position at center
    if (typeof window !== 'undefined') {
      setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
    
    const updateMousePosition = throttle(event => {
      setPosition({ x: event.clientX, y: event.clientY });
      
      // Normalize mouse position to range -1 to 1 for 3D effects
      setNormalizedPosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    }, 50);

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return { position, normalizedPosition };
}

export default useMousePosition;