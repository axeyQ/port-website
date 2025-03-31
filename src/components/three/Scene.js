'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Scene() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'#0ea5e9'} /* sky-500 color *//>

    </mesh>
  );
}