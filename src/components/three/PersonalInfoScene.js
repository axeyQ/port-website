'use client';
import { useRef } from 'react';
import DecorativeAstronaut from '@/components/three/DecorativeAstronaut';

// A dedicated scene component for PersonalInfo section without the white blobs
export default function PersonalInfoScene({ mousePosition }) {
  return (
    <>
      {/* Astronaut floating on the right side */}
      <DecorativeAstronaut 
        position={[3, -0.5, 0]} 
        scale={0.4} 
        rotation={[0, -Math.PI / 4, 0]} 
        mousePosition={mousePosition}
      />
      
      {/* Add lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#0ea5e9" />
    </>
  );
}