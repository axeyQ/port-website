'use client';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, useCursor, MeshDistortMaterial, Environment } from '@react-three/drei';
import { Vector3 } from 'three';

// The main Avatar3D component that can be used in your Three.js scenes
export default function Avatar3D({ 
  position = [0, 0, 0], 
  scale = 1.5,
  mousePosition = { x: 0, y: 0 },
  isMobile = false 
}) {
  const group = useRef();
  const frontFace = useRef();
  const backPlate = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Set cursor to pointer when hovering
  useCursor(hovered);
  
  // Load avatar texture
  const texture = useTexture('/avatar.png');
  
  // Interactive animation on each frame
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (group.current) {
      // Subtle floating animation
      group.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1;
      
      // Mouse or time-based rotation
      if (!isMobile) {
        // Desktop: follow mouse with subtle, smooth movement
        group.current.rotation.y = mousePosition.x * 0.3;
        group.current.rotation.x = Math.max(-0.2, Math.min(0.2, mousePosition.y * 0.2));
      } else {
        // Mobile: gentle automatic rotation
        group.current.rotation.y = Math.sin(time * 0.3) * 0.2;
      }
    }
    
    // If front face exists, apply subtle breathing animation
    if (frontFace.current) {
      frontFace.current.scale.x = 1 + Math.sin(time * 0.8) * 0.01;
      frontFace.current.scale.y = 1 + Math.sin(time * 0.8) * 0.01;
    }
    
    // Subtle color animation on the backplate when hovered
    if (backPlate.current && hovered) {
      backPlate.current.material.color.r = 0.1 + Math.sin(time * 2) * 0.05;
      backPlate.current.material.color.g = 0.6 + Math.sin(time * 2) * 0.05;
      backPlate.current.material.color.b = 0.9 + Math.sin(time * 2) * 0.05;
    }
  });
  
  // Create layers of depth for a more 3D effect
  return (
    <group 
      ref={group} 
      position={new Vector3(...position)} 
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Background plate with distortion effect - FIXED: using boxGeometry instead of roundedBoxGeometry */}
      <mesh 
        ref={backPlate}
        position={[0, 0, -0.05]}
        scale={[1.2, 1.3, 0.1]}
      >
        <boxGeometry args={[1, 1, 0.1]} />
        <MeshDistortMaterial
          color="#0ea5e9"
          speed={2}
          distort={0.2}
          radius={1}
          opacity={0.7}
          transparent
        />
      </mesh>
      
      {/* Shadow/depth layer */}
      <mesh position={[0.03, -0.03, -0.02]} scale={[0.98, 0.98, 0.1]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color="#000000" 
          opacity={0.2} 
          transparent 
        />
      </mesh>
      
      {/* Main avatar image front face */}
      <mesh 
        ref={frontFace}
        position={[0, 0, 0]}
      >
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial 
          map={texture} 
          transparent={true}
          alphaTest={0.1}
          metalness={0.1}
          roughness={0.4}
        />
      </mesh>
      
      {/* Subtle glow/highlight when hovered */}
      {hovered && (
        <mesh position={[0, 0, 0.01]} scale={[1.03, 1.03, 0.1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial 
            color="#ffffff" 
            opacity={0.2} 
            transparent
            alphaTest={0.1}
          />
        </mesh>
      )}
      
      {/* Decorative elements */}
      <mesh position={[-0.45, -0.45, 0.1]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.1, 0.1, 0.03]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[0.45, 0.45, 0.1]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.1, 0.1, 0.03]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}