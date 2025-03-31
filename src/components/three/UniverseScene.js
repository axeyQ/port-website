'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, Vector3, AdditiveBlending } from 'three';
import { Points, PointMaterial } from '@react-three/drei';

// Generate random points in a 3D space
function generatePoints(count, radius) {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * Math.cbrt(Math.random()); // Cube root for more uniform distribution
    
    points[i3] = r * Math.sin(phi) * Math.cos(theta);
    points[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    points[i3 + 2] = r * Math.cos(phi);
  }
  return points;
}

export default function UniverseScene({ mousePosition = { x: 0, y: 0 } }) {
  const pointsRef = useRef();
  const [starPositions] = useState(() => generatePoints(3000, 12));
  const [nearStarPositions] = useState(() => generatePoints(200, 5));
  const mainObjRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();
  
  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      if (mainObjRef.current) {
        const scale = viewport.width < 768 ? 0.7 : 1;
        mainObjRef.current.scale.set(scale, scale, scale);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewport]);
  
  useFrame((state) => {
    const { clock } = state;
    const elapsedTime = clock.getElapsedTime();
    
    // Rotate star field slowly
    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsedTime * 0.05;
      pointsRef.current.rotation.x = Math.sin(elapsedTime * 0.025) * 0.2;
    }
    
    // Main object animation
    if (mainObjRef.current) {
      // Floating animation
      mainObjRef.current.position.y = Math.sin(elapsedTime * 0.5) * 0.3;
      
      // Rotation animation
      mainObjRef.current.rotation.x = elapsedTime * 0.2;
      mainObjRef.current.rotation.y = elapsedTime * 0.3;
      
      // Mouse movement influence
      mainObjRef.current.position.x = MathUtils.lerp(
        mainObjRef.current.position.x,
        mousePosition.x * 1.5,
        0.05
      );
    }
  });
  
  return (
    <>
      {/* Star field background */}
      <group ref={pointsRef}>
        <Points positions={starPositions}>
          <PointMaterial
            transparent
            size={0.05}
            sizeAttenuation
            blending={AdditiveBlending}
            color="#ffffff"
            opacity={0.8}
          />
        </Points>
        
        <Points positions={nearStarPositions}>
          <PointMaterial
            transparent
            size={0.1}
            sizeAttenuation
            blending={AdditiveBlending}
            color="#8ecdf8"
            opacity={0.9}
          />
        </Points>
      </group>
      
      {/* Main interactive object */}
      <group ref={mainObjRef}>
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <torusKnotGeometry args={[1, 0.3, 200, 32]} />
          <meshStandardMaterial
            color={hovered ? "#38bdf8" : "#0ea5e9"}
            wireframe={hovered}
            emissive={hovered ? "#38bdf8" : "#0ea5e9"}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
      
      {/* Ambient light */}
      <ambientLight intensity={0.3} />
      
      {/* Main directional light */}
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      
      {/* Accent light */}
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#0ea5e9" />
    </>
  );
}