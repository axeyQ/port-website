'use client';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Vector3, Color } from 'three';
import useScrollAnimation from '@/hooks/useScrollAnimation';

// Updated with your actual skills from resume
const skills = [
  { name: 'React.js', level: 9.5, color: '#61dafb', radius: 0.65, segments: 16 },
  { name: 'Next.js', level: 9, color: '#ffffff', radius: 0.6, segments: 16 },
  { name: 'JavaScript', level: 9.2, color: '#f7df1e', radius: 0.63, segments: 16 },
  { name: 'TailwindCSS', level: 8.8, color: '#38bdf8', radius: 0.6, segments: 16 },
  { name: 'GSAP', level: 8.5, color: '#8bc34a', radius: 0.58, segments: 16 },
  { name: 'Framer Motion', level: 8.2, color: '#ff6b6b', radius: 0.56, segments: 16 },
  { name: 'MongoDB', level: 7.5, color: '#47A248', radius: 0.52, segments: 16 },
  { name: 'RESTful APIs', level: 8, color: '#FF9900', radius: 0.55, segments: 16 },
];

// Create a helix-like arrangement for skills
function arrangeSkillsInHelix(skills, radius, height, turns) {
  return skills.map((skill, index) => {
    const angle = (index / skills.length) * Math.PI * 2 * turns;
    const yPos = (index / skills.length) * height - height / 2;
    
    // Calculate skill-specific radius based on skill level
    const skillRadius = radius * (0.8 + skill.level / 45);
    
    return {
      ...skill,
      position: [
        Math.cos(angle) * skillRadius,
        yPos,
        Math.sin(angle) * skillRadius
      ],
      rotation: [0, -angle, 0],
      orbitSpeed: 0.05 + (Math.random() * 0.05), // Unique orbit speed
      pulseSpeed: 0.5 + (Math.random() * 0.5),   // Unique pulse speed
    };
  });
}

export default function SkillsVisualization({ scrollRef, onSkillHover }) {
  // References and state
  const groupRef = useRef(null);
  const centerSphereRef = useRef(null);
  const particlesRef = useRef(null);
  const ringRef = useRef(null);
  
  const [highlightedSkill, setHighlightedSkill] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scale, setScale] = useState(0);
  const [mousePosition, setMousePosition] = useState([0, 0, 0]);
  const { getSectionVisibility } = useScrollAnimation();
  
  // Arrange skills in a helix formation
  const arrangedSkills = arrangeSkillsInHelix(skills, 3, 5, 1.2);

  // Notify parent component when highlighted skill changes
  useEffect(() => {
    if (onSkillHover) {
      onSkillHover(highlightedSkill);
    }
  }, [highlightedSkill, onSkillHover]);

  // Handle section visibility
  useEffect(() => {
    if (scrollRef?.current) {
      const checkVisibility = () => {
        const visibility = getSectionVisibility(scrollRef);
        setIsVisible(visibility > 0.1);
        setScale(visibility * 2.2); // Slightly larger scaling for more impact
      };
      
      checkVisibility();
      window.addEventListener('scroll', checkVisibility);
      return () => {
        window.removeEventListener('scroll', checkVisibility);
      };
    }
  }, [scrollRef, getSectionVisibility]);

  // Generate particles for the background effect
  const particles = useRef(Array.from({ length: 150 }, () => ({
    position: [
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 15
    ],
    size: Math.random() * 0.1 + 0.05,
    color: new Color().setHSL(Math.random(), 0.6, 0.7).getHex(),
    speed: Math.random() * 0.01
  })));

  // Main animation loop
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // Group rotation follows mouse slightly
    if (groupRef.current) {
      groupRef.current.rotation.y = MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePosition[0] * 0.2,
        0.02
      );
      groupRef.current.rotation.x = MathUtils.lerp(
        groupRef.current.rotation.x,
        mousePosition[1] * 0.1,
        0.02
      );
      
      // Scale based on visibility
      groupRef.current.scale.set(scale, scale, scale);
    }
    
    // Animate center sphere
    if (centerSphereRef.current) {
      centerSphereRef.current.rotation.y = time * 0.2;
      centerSphereRef.current.rotation.z = time * 0.1;
      
      // Pulse effect
      const pulse = Math.sin(time * 0.6) * 0.05 + 1;
      centerSphereRef.current.scale.set(pulse, pulse, pulse);
    }
    
    // Rotate the ring
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.1;
      ringRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
    }
    
    // Animate background particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.03;
      particlesRef.current.rotation.x = Math.sin(time * 0.04) * 0.2;
    }
  });

  // Handler for mouse movement to affect the scene
  const handlePointerMove = (e) => {
    const x = (e.point.x / 10);
    const y = (e.point.y / 10);
    setMousePosition([x, y, 0]);
  };

  return (
    <group 
      ref={groupRef} 
      position={[0, 0, 0]} 
      scale={[0, 0, 0]}
      onPointerMove={handlePointerMove}
    >
      {/* Background particle system */}
      <group ref={particlesRef}>
        {particles.current.map((particle, i) => (
          <mesh key={i} position={particle.position}>
            <sphereGeometry args={[particle.size, 8, 8]} />
            <meshBasicMaterial 
              color={particle.color} 
              transparent 
              opacity={0.6} 
            />
          </mesh>
        ))}
      </group>
      
      {/* Center sphere with animated rings */}
      <group>
        {/* Main sphere */}
        <mesh ref={centerSphereRef} position={[0, 0, 0]}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshPhysicalMaterial
            color="#0ea5e9"
            emissive="#0ea5e9"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.2}
            clearcoat={0.5}
            clearcoatRoughness={0.2}
          />
        </mesh>
        
        {/* Outer ring */}
        <group ref={ringRef}>
          <mesh position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[2.2, 0.08, 16, 60]} />
            <meshPhysicalMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.3}
              metalness={0.9}
              roughness={0.3}
              transparent
              opacity={0.7}
            />
          </mesh>
          
          {/* Inner ring */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI/3, Math.PI/4, 0]}>
            <torusGeometry args={[1.8, 0.05, 16, 50]} />
            <meshPhysicalMaterial
              color="#0ea5e9"
              emissive="#0ea5e9"
              emissiveIntensity={0.2}
              metalness={0.9}
              roughness={0.3}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      </group>
      
      {/* Skills spheres */}
      {arrangedSkills.map((skill, index) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          index={index}
          isVisible={isVisible}
          highlightedIndex={highlightedSkill}
          setHighlightedIndex={setHighlightedSkill}
        />
      ))}
      
      {/* Enhanced lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-3, 2, -3]} intensity={0.5} color="#38bdf8" />
      <pointLight position={[3, -2, 3]} intensity={0.5} color="#0ea5e9" />
    </group>
  );
}

// Enhanced skill node component
function SkillNode({ skill, index, isVisible, highlightedIndex, setHighlightedIndex }) {
  const nodeRef = useRef(null);
  const orbitRef = useRef(null);
  const lineRef = useRef(null);
  const glowRef = useRef(null);
  const isHighlighted = highlightedIndex === index;
  const [hovered, setHovered] = useState(false);
  
  // Animation for each skill node
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (nodeRef.current) {
      // Calculate orbit position
      const orbitAngle = time * skill.orbitSpeed + (index * Math.PI / 4);
      const orbitRadius = 0.1;
      
      // Base position plus small orbital movement
      nodeRef.current.position.x = skill.position[0] + Math.cos(orbitAngle) * orbitRadius;
      nodeRef.current.position.y = skill.position[1] + Math.sin(time * skill.pulseSpeed) * 0.15;
      nodeRef.current.position.z = skill.position[2] + Math.sin(orbitAngle) * orbitRadius;
      
      // Rotate the skill node
      nodeRef.current.rotation.y = time * 0.5;
      
      // Scale animation based on hover/highlight and visibility
      const targetScale = isVisible 
        ? (isHighlighted || hovered ? 1.2 : 0.7) 
        : 0;
        
      nodeRef.current.scale.x = MathUtils.lerp(nodeRef.current.scale.x, targetScale, 0.1);
      nodeRef.current.scale.y = MathUtils.lerp(nodeRef.current.scale.y, targetScale, 0.1);
      nodeRef.current.scale.z = MathUtils.lerp(nodeRef.current.scale.z, targetScale, 0.1);
    }
    
    // Update the connecting line
    if (lineRef.current) {
      const lineOpacity = isHighlighted || hovered ? 0.8 : 0.4;
      lineRef.current.material.opacity = MathUtils.lerp(
        lineRef.current.material.opacity,
        lineOpacity,
        0.1
      );
    }
    
    // Animate glow for highlighted skill
    if (glowRef.current) {
      const glowIntensity = isHighlighted || hovered ? 0.8 : 0;
      glowRef.current.material.opacity = MathUtils.lerp(
        glowRef.current.material.opacity,
        glowIntensity,
        0.1
      );
      
      // Pulse the glow
      if (isHighlighted || hovered) {
        const pulseFactor = Math.sin(time * 2) * 0.1 + 1.1;
        glowRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
      }
    }
  });

  // Choose geometry based on skill level
  const getGeometry = (skill) => {
    // Higher level = more complex geometry
    if (skill.level >= 9) {
      return <dodecahedronGeometry args={[skill.radius, 0]} />;
    } else if (skill.level >= 8) {
      return <icosahedronGeometry args={[skill.radius, 0]} />;
    } else if (skill.level >= 7) {
      return <octahedronGeometry args={[skill.radius, 0]} />;
    } else {
      return <sphereGeometry args={[skill.radius, skill.segments, skill.segments]} />;
    }
  };

  return (
    <group position={skill.position}>
      {/* Connecting line */}
      <line ref={lineRef}>
        <bufferGeometry
          attach="geometry"
          onUpdate={(self) => {
            const points = [];
            points.push(new Vector3(0, 0, 0));
            points.push(new Vector3(0, 0, 0).sub(new Vector3(...skill.position)).multiplyScalar(0.9));
            self.setFromPoints(points);
          }}
        />
        <lineBasicMaterial
          attach="material"
          color={skill.color}
          opacity={0.5}
          transparent
          linewidth={1}
        />
      </line>
      
      {/* Skill node container */}
      <group 
        ref={nodeRef}
        position={[0, 0, 0]}
        scale={[0, 0, 0]}
        onPointerOver={() => {
          setHovered(true);
          setHighlightedIndex(index);
        }}
        onPointerOut={() => {
          setHovered(false);
          setHighlightedIndex(null);
        }}
      >
        {/* Glow effect for highlighted skill */}
        <mesh ref={glowRef} scale={[1.3, 1.3, 1.3]}>
          <sphereGeometry args={[skill.radius, 16, 16]} />
          <meshBasicMaterial
            color={skill.color}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
        
        {/* Skill geometry with material */}
        <mesh>
          {getGeometry(skill)}
          <meshPhysicalMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={isHighlighted || hovered ? 0.5 : 0.2}
            metalness={0.8}
            roughness={0.2}
            clearcoat={0.4}
            clearcoatRoughness={0.2}
            wireframe={isHighlighted || hovered}
          />
        </mesh>
        
        {/* Small orbit indicator */}
        <mesh ref={orbitRef} position={[skill.radius * 1.3, 0, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color={skill.color} transparent opacity={0.8} />
        </mesh>
      </group>
      
      {/* Skill level indicator - more prominent now */}
      <mesh 
        position={[0, -1.2, 0]} 
        rotation={[0, 0, 0]}
        visible={isHighlighted || hovered}
      >
        <boxGeometry args={[skill.level / 4, 0.15, 0.15]} />
        <meshPhongMaterial color={skill.color} />
      </mesh>
    </group>
  );
}