'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const skills = [
  { name: 'Next.js', level: 9, color: '#ffffff' },
  { name: 'React', level: 9.5, color: '#61dafb' },
  { name: 'JavaScript', level: 9, color: '#f7df1e' },
  { name: 'Three.js', level: 8, color: '#049ef4' },
  { name: 'Tailwind CSS', level: 8.5, color: '#38bdf8' },
  { name: 'Node.js', level: 7.5, color: '#43853d' },
  { name: 'UI/UX', level: 7, color: '#ff6b6b' },
  { name: 'GSAP', level: 7.5, color: '#8bc34a' },
];

// Arrange skills in a 3D spiral
function arrangeSkillsInSpiral(skills, radius, turns) {
  return skills.map((skill, index) => {
    const angle = (index / skills.length) * Math.PI * 2 * turns;
    const skillRadius = radius * (1 + skill.level / 10);
    
    return {
      ...skill,
      position: [
        Math.cos(angle) * skillRadius,
        (index / skills.length) * 5 - 2.5,
        Math.sin(angle) * skillRadius
      ],
      rotation: [0, -angle, 0],
    };
  });
}

export default function SkillsVisualization({ scrollRef }) {
  const sphereRef = useRef(null);
  // Create individual refs instead of using map
  const skillRef0 = useRef(null);
  const skillRef1 = useRef(null);
  const skillRef2 = useRef(null);
  const skillRef3 = useRef(null);
  const skillRef4 = useRef(null);
  const skillRef5 = useRef(null);
  const skillRef6 = useRef(null);
  const skillRef7 = useRef(null);
  
  // Store refs in an array for easier access
  const skillRefs = [
    skillRef0, skillRef1, skillRef2, skillRef3,
    skillRef4, skillRef5, skillRef6, skillRef7
  ];
  
  const [highlightedSkill, setHighlightedSkill] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sphereScale, setSphereScale] = useState(0);
  const { getSectionVisibility } = useScrollAnimation();
  
  // Arrange skills in 3D space
  const arrangedSkills = arrangeSkillsInSpiral(skills, 3, 1.5);
  
  // Detect when the section becomes visible
  useEffect(() => {
    if (scrollRef?.current) {
      const checkVisibility = () => {
        const visibility = getSectionVisibility(scrollRef);
        setIsVisible(visibility > 0.1);
        setSphereScale(visibility * 2);
      };
      
      checkVisibility();
      window.addEventListener('scroll', checkVisibility);
      
      return () => {
        window.removeEventListener('scroll', checkVisibility);
      };
    }
  }, [scrollRef, getSectionVisibility]);
  
  // Animate the skills visualization
  useFrame((state) => {
    const { clock } = state;
    const elapsedTime = clock.getElapsedTime();
    
    // Rotate the center sphere
    if (sphereRef.current) {
      sphereRef.current.rotation.y = elapsedTime * 0.1;
      
      // Scale based on visibility
      sphereRef.current.scale.set(sphereScale, sphereScale, sphereScale);
    }
    
    // Animate each skill sphere
    skillRefs.forEach((ref, index) => {
      if (ref.current) {
        // Floating animation
        ref.current.position.y = arrangedSkills[index].position[1] + Math.sin(elapsedTime * 0.5 + index) * 0.2;
        
        // Scale animation based on visibility
        const isHighlighted = highlightedSkill === index;
        const targetScale = isVisible ? (isHighlighted ? 0.8 : 0.5) : 0;
        
        ref.current.scale.x = MathUtils.lerp(ref.current.scale.x, targetScale, 0.1);
        ref.current.scale.y = MathUtils.lerp(ref.current.scale.y, targetScale, 0.1);
        ref.current.scale.z = MathUtils.lerp(ref.current.scale.z, targetScale, 0.1);
      }
    });
  });
  
  return (
    <group>
      {/* Center sphere */}
      <mesh ref={sphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#0ea5e9" 
          emissive="#0ea5e9"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Skills spheres instead of text */}
      {arrangedSkills.map((skill, index) => (
        <group key={skill.name} position={skill.position}>
          {/* Connecting line */}
          <line>
            <bufferGeometry
              attach="geometry"
              onUpdate={(self) => {
                const points = [];
                points.push(new Vector3(0, 0, 0));
                points.push(new Vector3(0, 0, 0).sub(new Vector3(...skill.position)).multiplyScalar(0.85));
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
          
          {/* Skill sphere instead of text */}
          <mesh 
            ref={skillRefs[index]}
            position={[0, 0, 0]}
            scale={[0, 0, 0]}
            onPointerOver={() => setHighlightedSkill(index)}
            onPointerOut={() => setHighlightedSkill(null)}
          >
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial 
              color={skill.color} 
              emissive={skill.color}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          
          {/* Small indicator for skill level */}
          <mesh position={[0, -1, 0]}>
            <boxGeometry args={[skill.level / 5, 0.1, 0.1]} />
            <meshBasicMaterial color={skill.color} />
          </mesh>
        </group>
      ))}
    </group>
  );
}