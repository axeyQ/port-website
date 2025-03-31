'use client';

import { useState, useEffect } from 'react';
import useMousePosition from '@/hooks/useMousePosition';

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState('default');
  const { position } = useMousePosition();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Add cursor-none class to body
    document.body.classList.add('cursor-none');
    
    return () => {
      document.body.classList.remove('cursor-none');
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed pointer-events-none z-50 rounded-full mix-blend-difference ${
        cursorVariant === 'default' ? 'w-6 h-6 bg-white' : 'w-10 h-10 bg-sky-400'
      } transition-all duration-150 ease-out`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}