'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

export default function Scene({ mousePosition = { x: 0, y: 0 } }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState('#0ea5e9'); // sky-500 color
  
  // Handle hover effect
  useEffect(() => {
    if (hovered) {
      setColor('#38bdf8'); // sky-400 color
      setScale(1.2);
    } else {
      setColor('#0ea5e9'); // sky-500 color
      setScale(1);
    }
  }, [hovered]);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Base rotation animation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      
      // Add mouse influence
      meshRef.current.position.x = MathUtils.lerp(
        meshRef.current.position.x,
        mousePosition.x * 2,
        0.1
      );
      
      meshRef.current.position.y = MathUtils.lerp(
        meshRef.current.position.y,
        mousePosition.y * 2,
        0.1
      );
      
      // Animate scale using lerp
      meshRef.current.scale.x = MathUtils.lerp(meshRef.current.scale.x, scale, 0.1);
      meshRef.current.scale.y = MathUtils.lerp(meshRef.current.scale.y, scale, 0.1);
      meshRef.current.scale.z = MathUtils.lerp(meshRef.current.scale.z, scale, 0.1);
    }
  });

  // Create multiple floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    ],
    rotation: Math.random() * Math.PI,
    scale: Math.random() * 0.5 + 0.1,
  }));

  return (
    <>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial 
          color={color} 
          wireframe={hovered}
        />
      </mesh>
      
      {/* Particles */}
      {particles.map((particle) => (
        <Particle key={particle.id} {...particle} />
      ))}
    </>
  );
}

// Particle component
function Particle({ position, rotation, scale }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 0.5 + rotation) * 0.005;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.z += 0.01;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position} rotation={[rotation, rotation, rotation]} scale={scale}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial color="#0ea5e9" opacity={0.6} transparent />
    </mesh>
  );
}