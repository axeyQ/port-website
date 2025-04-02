'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ImprovedDecorativeAstronaut({ position = [3, -0.5, 0],
scale = 0.4, rotation = [0, 0, 0], mousePosition = { x: 0, y: 0 } }) {
  const group = useRef();
  const helmet = useRef();
  const visor = useRef();
  const body = useRef();
  const leftArm = useRef();
  const rightArm = useRef();
  
  // Animation parameters - significantly reduced for more subtle movement
  const floatSpeed = 0.2; // Very slow floating
  const floatHeight = 0.05; // Minimal height variation
  const mouseInfluence = 0.05; // Very small mouse influence
  
  // Smoothing function to reduce jerky movements
  const lerp = (current, target, factor) => {
    return current + (target - current) * factor;
  };
  
  // Previous position/rotation state for smoothing
  const prevState = useRef({
    posY: position[1],
    rotX: rotation[0],
    rotY: rotation[1],
    rotZ: rotation[2]
  });
  
  // Animate the astronaut with minimal, smooth motion
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (group.current) {
      // Calculate target values
      const targetPosY = position[1] + Math.sin(time * floatSpeed) * floatHeight;
      const targetRotY = rotation[1] + Math.sin(time * 0.15) * 0.05 + mousePosition.x * mouseInfluence;
      const targetRotX = rotation[0] + Math.max(-0.03, Math.min(0.03, mousePosition.y * 0.02));
      const targetRotZ = rotation[2] + Math.sin(time * 0.1) * 0.01;
      
      // Smooth transitions (very low smoothing factor for subtle movement)
      const smoothFactor = 0.03;
      prevState.current.posY = lerp(prevState.current.posY, targetPosY, smoothFactor);
      prevState.current.rotX = lerp(prevState.current.rotX, targetRotX, smoothFactor);
      prevState.current.rotY = lerp(prevState.current.rotY, targetRotY, smoothFactor);
      prevState.current.rotZ = lerp(prevState.current.rotZ, targetRotZ, smoothFactor);
      
      // Apply smoothed values
      group.current.position.y = prevState.current.posY;
      group.current.rotation.x = prevState.current.rotX;
      group.current.rotation.y = prevState.current.rotY;
      group.current.rotation.z = prevState.current.rotZ;
    }
    
    // Very subtle visor effect
    if (visor.current && visor.current.material) {
      visor.current.material.opacity = 0.65 + Math.sin(time * 0.8) * 0.03;
    }
    
    // Extremely gentle arm movements
    if (leftArm.current) {
      leftArm.current.rotation.x = Math.sin(time * 0.3) * 0.05;
      leftArm.current.rotation.z = 0.5 + Math.sin(time * 0.2) * 0.03;
    }
    
    if (rightArm.current) {
      rightArm.current.rotation.x = Math.sin(time * 0.3 + 1) * 0.05;
      rightArm.current.rotation.z = -0.5 + Math.sin(time * 0.2 + 1) * 0.03;
    }
  });
  
  return (
    <group ref={group} position={[position[0], position[1], position[2]]}
      scale={[scale, scale, scale]} rotation={[rotation[0], rotation[1],
      rotation[2]]}>
      {/* Helmet */}
      <mesh ref={helmet} position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#D0D0D0"
          metalness={0.5}
          roughness={0.2}
        />
        {/* Visor */}
        <mesh ref={visor} position={[0, 0, 0.35]}>
          <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI *
            0.5]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            metalness={0.9}
            roughness={0.1}
            transmission={1}
            transparent
            opacity={0.7}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        {/* Helmet details */}
        <mesh position={[0, 0.15, 0.65]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.25, 0.05, 0.1]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </mesh>
      {/* Body/Suit */}
      <mesh ref={body} position={[0, 1.6, 0]}>
        <capsuleGeometry args={[0.5, 1.2, 8, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.5}
        />
        {/* Suit details - chest controls */}
        <mesh position={[0, 0.3, 0.45]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.4, 0.2, 0.05]} />
          <meshStandardMaterial color="#555" />
        </mesh>
        {/* Suit logo */}
        <mesh position={[0, 0.1, 0.48]} rotation={[0.2, 0, 0]}>
          <circleGeometry args={[0.15, 16]} />
          <meshStandardMaterial color="#0ea5e9" />
        </mesh>
      </mesh>
      {/* Backpack (oxygen tanks) */}
      <group position={[0, 1.7, -0.5]}>
        <mesh position={[-0.25, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
          <meshStandardMaterial color="#777" metalness={0.5}
            roughness={0.2} />
        </mesh>
        <mesh position={[0.25, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
          <meshStandardMaterial color="#777" metalness={0.5}
            roughness={0.2} />
        </mesh>
        {/* Connecting piece */}
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[0.6, 0.2, 0.2]} />
          <meshStandardMaterial color="#555" />
        </mesh>
      </group>
      {/* Left Arm */}
      <group ref={leftArm} position={[0.65, 1.8, 0]}>
        <mesh rotation={[0, 0, 0.5]}>
          <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
        </mesh>
        {/* Left glove */}
        <mesh position={[0.4, -0.3, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#DDD" metalness={0.2}
            roughness={0.3} />
        </mesh>
      </group>
      {/* Right Arm */}
      <group ref={rightArm} position={[-0.65, 1.8, 0]}>
        <mesh rotation={[0, 0, -0.5]}>
          <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
        </mesh>
        {/* Right glove */}
        <mesh position={[-0.4, -0.3, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#DDD" metalness={0.2}
            roughness={0.3} />
        </mesh>
      </group>
      {/* Add a light source to the astronaut for better visibility */}
      <pointLight position={[0, 3, 2]} intensity={0.5} color="#ffffff" />
    </group>
  );
}