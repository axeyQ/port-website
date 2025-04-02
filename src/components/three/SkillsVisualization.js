'use client';
import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, Vector3, Color } from 'three';
import * as THREE from 'three';
import useScrollAnimation from '@/hooks/useScrollAnimation';

// Organized skills by category
const skillCategories = [
  {
    name: "Frontend",
    color: "#38bdf8", // Sky blue
    skills: [
      { name: 'React.js', level: 95, color: '#61dafb' },
      { name: 'Next.js', level: 90, color: '#ffffff' },
      { name: 'JavaScript', level: 92, color: '#f7df1e' },
      { name: 'HTML5', level: 95, color: '#e34c26' },
      { name: 'CSS3', level: 90, color: '#264de4' },
    ]
  },
  {
    name: "Styling",
    color: "#8b5cf6", // Purple
    skills: [
      { name: 'TailwindCSS', level: 88, color: '#38bdf8' },
      { name: 'Bootstrap', level: 85, color: '#7952b3' },
      { name: 'MaterialUI', level: 82, color: '#0081cb' },
      { name: 'Styled Components', level: 80, color: '#db7093' },
    ]
  },
  {
    name: "Animation",
    color: "#10b981", // Green
    skills: [
      { name: 'GSAP', level: 85, color: '#8bc34a' },
      { name: 'Framer Motion', level: 82, color: '#ff6b6b' },
      { name: 'Three.js', level: 78, color: '#049ef4' },
    ]
  },
  {
    name: "Backend",
    color: "#f97316", // Orange
    skills: [
      { name: 'NodeJS', level: 75, color: '#3c873a' },
      { name: 'ExpressJS', level: 78, color: '#000000' },
      { name: 'MongoDB', level: 75, color: '#47A248' },
      { name: 'RESTful APIs', level: 80, color: '#FF9900' },
    ]
  },
  {
    name: "Tools",
    color: "#ef4444", // Red
    skills: [
      { name: 'Git', level: 85, color: '#F05032' },
      { name: 'Webpack', level: 75, color: '#8DD6F9' },
      { name: 'Figma', level: 80, color: '#F24E1E' },
      { name: 'TypeScript', level: 78, color: '#3178C6' },
    ]
  }
];

export default function SkillsVisualization({ scrollRef, onSkillHover }) {
  // References
  const groupRef = useRef(null);
  const centerRef = useRef(null);
  
  // State
  const [highlightedSkill, setHighlightedSkill] = useState(null);
  const [highlightedCategory, setHighlightedCategory] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [scale, setScale] = useState(1);
  const [mousePosition, setMousePosition] = useState([0, 0, 0]);
  const [autoRotate, setAutoRotate] = useState(true);
  
  // Get Three.js context
  const { camera } = useThree();
  
  // Get scroll animation utilities
  const { getSectionVisibility } = useScrollAnimation();
  
  // Position camera to see all skills
  useEffect(() => {
    if (camera) {
      camera.position.z = 10;
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
  }, [camera]);
  
  // Notify parent when highlighted skill changes
  useEffect(() => {
    if (onSkillHover) {
      // Extract just the skill name without category prefix
      const skillName = highlightedSkill ? highlightedSkill.split('-')[1] : null;
      
      // Find the skill object to pass level information
      let skillInfo = null;
      if (skillName) {
        // Search through all categories to find matching skill
        for (const category of skillCategories) {
          const found = category.skills.find(s => s.name === skillName);
          if (found) {
            skillInfo = {
              name: found.name,
              level: found.level,
              category: category.name
            };
            break;
          }
        }
      }
      
      onSkillHover(skillInfo);
    }
  }, [highlightedSkill, onSkillHover]);

  // Handle section visibility
  useEffect(() => {
    if (!scrollRef?.current) return;
    
    const checkVisibility = () => {
      try {
        const visibility = getSectionVisibility(scrollRef);
        setIsVisible(visibility > 0.1);
        setScale(Math.max(0.8, visibility * 1.5));
      } catch (error) {
        console.error("SkillsVisualization visibility error:", error);
        setIsVisible(true);
        setScale(1);
      }
    };
    
    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', checkVisibility);
    };
  }, [scrollRef, getSectionVisibility]);

  // Animation loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Group animations
    if (groupRef.current) {
      // Auto-rotate unless disabled
      if (autoRotate) {
        groupRef.current.rotation.y += 0.001; // Very slow rotation
      }
      
      // Mouse influence on tilt
      groupRef.current.rotation.x = MathUtils.lerp(
        groupRef.current.rotation.x,
        mousePosition[1] * 0.1,
        0.02
      );
      
      // Apply scale
      const targetScale = isVisible ? scale : 0.8;
      groupRef.current.scale.set(targetScale, targetScale, targetScale);
    }
    
    // Center sphere animation
    if (centerRef.current) {
      centerRef.current.rotation.y = time * 0.2;
      const pulse = Math.sin(time * 0.6) * 0.05 + 1;
      centerRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  // Handle mouse movement
  const handlePointerMove = (e) => {
    if (!e.point) return;
    
    const x = (e.point.x / 8);
    const y = (e.point.y / 8);
    setMousePosition([x, y, 0]);
  };

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
      onPointerMove={handlePointerMove}
    >
      {/* Center sphere */}
      <mesh ref={centerRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      
      {/* Orbital system - each category is a ring */}
      {skillCategories.map((category, categoryIndex) => (
        <OrbitalRing
          key={category.name}
          category={category}
          index={categoryIndex}
          totalCategories={skillCategories.length}
          isHighlighted={category.name === highlightedCategory}
          setHighlightedCategory={setHighlightedCategory}
          setHighlightedSkill={setHighlightedSkill}
          setAutoRotate={setAutoRotate}
          highlightedSkill={highlightedSkill}
        />
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} color="#ffffff" />
      <pointLight position={[-3, 2, -3]} intensity={0.6} color="#38bdf8" />
      <pointLight position={[3, -2, 3]} intensity={0.6} color="#0ea5e9" />
    </group>
  );
}

// Orbital ring component for a category
function OrbitalRing({ category, index, totalCategories, isHighlighted, setHighlightedCategory, setHighlightedSkill, setAutoRotate, highlightedSkill }) {
  const ringRef = useRef(null);
  const orbitRef = useRef(null);
  const labelRef = useRef(null);
  
  // Calculate orbit radius based on category index
  const baseRadius = 2.5;
  const orbitRadius = baseRadius + index * 1.2;
  
  // Calculate orbit tilt angle (alternating)
  const tiltAngle = (index % 2 === 0 ? 0.1 : -0.1) * Math.PI;

  // Create category label
  useEffect(() => {
    if (labelRef.current) {
      // Create canvas for category label
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const fontSize = 36;
      
      canvas.width = 200;
      canvas.height = 80;
      
      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw category name
      context.font = `bold ${fontSize}px Arial, sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = category.color;
      context.fillText(category.name, canvas.width / 2, canvas.height / 2);
      
      // Create texture
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      
      // Apply texture
      if (labelRef.current.material) {
        labelRef.current.material.map = texture;
        labelRef.current.material.needsUpdate = true;
      }
    }
  }, [category]);
  
  // Animation loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate orbit
    if (orbitRef.current) {
      // Rotate slower when highlighted, faster when not
      const rotationSpeed = isHighlighted ? 0.05 : 0.1;
      orbitRef.current.rotation.y += rotationSpeed * 0.01;
    }
    
    // Animate ring
    if (ringRef.current) {
      // Pulse effect when category is highlighted
      if (isHighlighted) {
        const pulse = Math.sin(time * 2) * 0.05 + 1;
        ringRef.current.scale.set(pulse, pulse, pulse);
      } else {
        ringRef.current.scale.set(1, 1, 1);
      }
    }
    
    // Animate label
    if (labelRef.current) {
      // Always face camera
      labelRef.current.lookAt(state.camera.position);
      
      // Pulse and show/hide based on highlight state
      const labelOpacity = isHighlighted ? 0.9 : 0.4;
      labelRef.current.material.opacity = MathUtils.lerp(
        labelRef.current.material.opacity || labelOpacity,
        labelOpacity,
        0.1
      );
      
      if (isHighlighted) {
        const pulse = Math.sin(time * 1.5) * 0.1 + 1.1;
        labelRef.current.scale.set(pulse, pulse, pulse);
      }
    }
  });
  
  // Handle mouse interactions
  const handleRingHover = () => {
    setHighlightedCategory(category.name);
    setAutoRotate(false);
  };
  
  const handleRingLeave = () => {
    setHighlightedCategory(null);
    setAutoRotate(true);
  };

  return (
    <group
      rotation={[tiltAngle, 0, 0]} 
      onPointerOver={handleRingHover}
      onPointerOut={handleRingLeave}
    >
      {/* Orbital path (ring) */}
      <mesh ref={ringRef}>
        <torusGeometry args={[orbitRadius, 0.02, 16, 100]} />
        <meshStandardMaterial
          color={category.color}
          emissive={category.color}
          emissiveIntensity={isHighlighted ? 0.5 : 0.2}
          transparent
          opacity={isHighlighted ? 0.8 : 0.3}
        />
      </mesh>
      
      {/* Category label */}
      <sprite
        ref={labelRef}
        position={[0, 0, orbitRadius]}
        scale={[1, 0.5, 1]}
      >
        <spriteMaterial 
          transparent={true} 
          opacity={0.8}
          depthTest={false}
        />
      </sprite>
      
      {/* Rotating group for skills */}
      <group ref={orbitRef}>
        {/* Category marker */}
        <mesh
          position={[0, 0, orbitRadius]}
          scale={isHighlighted ? 1.2 : 1}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={category.color}
            emissive={category.color}
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Skills distributed around the orbit */}
        {category.skills.map((skill, skillIndex) => {
          // Calculate position on the orbital ring
          const angle = (skillIndex / category.skills.length) * Math.PI * 2;
          const x = Math.cos(angle) * orbitRadius;
          const z = Math.sin(angle) * orbitRadius;
          
          // Check if this skill is the highlighted one
          const isSkillHighlighted = highlightedSkill === `${category.name}-${skill.name}`;
          
          return (
            <SkillNode
              key={skill.name}
              skill={skill}
              position={[x, 0, z]}
              categoryName={category.name}
              categoryColor={category.color}
              isHighlighted={isSkillHighlighted}
              isInHighlightedCategory={isHighlighted}
              setHighlightedSkill={setHighlightedSkill}
            />
          );
        })}
      </group>
    </group>
  );
}

// Improved skill node component with better text display
function SkillNode({ skill, position, categoryName, categoryColor, isHighlighted, isInHighlightedCategory, setHighlightedSkill }) {
  const nodeRef = useRef(null);
  const glowRef = useRef(null);
  const textRef = useRef(null);
  
  const [hovered, setHovered] = useState(false);
  const fullSkillId = `${categoryName}-${skill.name}`;

  // Calculate skill size based on level
  const baseSize = 0.12;
  const sizeBoost = skill.level / 500; // Subtle size difference based on level
  const radius = baseSize + sizeBoost;
  
  // Create a texture with skill name
  useEffect(() => {
    if (textRef.current) {
      // Create canvas for text
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const fontSize = 40;
      
      // Set canvas size to fit text
      canvas.width = 256;
      canvas.height = 128;
      
      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Prepare background with rounded corners
      context.fillStyle = 'rgba(0, 0, 0, 0.85)'; // Darker background for better contrast
      roundRect(context, 0, 0, canvas.width, canvas.height, 16, true, false);
      
      // Add a subtle border in the category color
      context.strokeStyle = categoryColor;
      context.lineWidth = 3;
      roundRect(context, 2, 2, canvas.width - 4, canvas.height - 4, 14, false, true);
      
      // Draw skill name
      context.font = `bold ${fontSize}px Arial, sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = categoryColor;
      context.fillText(skill.name, canvas.width / 2, canvas.height / 3);
      
      // Draw skill level
      context.font = `${fontSize * 0.9}px Arial, sans-serif`;
      context.fillStyle = '#ffffff';
      context.fillText(`${skill.level}%`, canvas.width / 2, canvas.height * 2/3);
      
      // Create texture from canvas
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      
      // Apply texture to sprite
      if (textRef.current.material) {
        textRef.current.material.map = texture;
        textRef.current.material.needsUpdate = true;
      }
    }
  }, [skill, categoryColor]);
  
  // Helper function for rounded rectangle
  function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  }
  
  // Animation loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (nodeRef.current) {
      // Floating animation
      nodeRef.current.position.y = Math.sin(time * 0.5 + position[0]) * 0.1;
      
      // Rotate the skill node to face camera
      nodeRef.current.rotation.y = time * 0.2;
      
      // Scale when highlighted or hovered
      const targetScale = (isHighlighted || hovered) ? 1.5 : 
                          isInHighlightedCategory ? 1.2 : 1;
      
      nodeRef.current.scale.x = MathUtils.lerp(nodeRef.current.scale.x || 1, targetScale, 0.1);
      nodeRef.current.scale.y = MathUtils.lerp(nodeRef.current.scale.y || 1, targetScale, 0.1);
      nodeRef.current.scale.z = MathUtils.lerp(nodeRef.current.scale.z || 1, targetScale, 0.1);
    }
    
    // Animate glow
    if (glowRef.current && glowRef.current.material) {
      const glowIntensity = isHighlighted || hovered ? 0.8 : 
                           isInHighlightedCategory ? 0.4 : 0;
      
      glowRef.current.material.opacity = MathUtils.lerp(
        glowRef.current.material.opacity || 0,
        glowIntensity,
        0.1
      );
      
      if (isHighlighted || hovered) {
        const pulseFactor = Math.sin(time * 2) * 0.1 + 1.3;
        glowRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
      }
    }
    
    // Show/hide and position text sprite
    if (textRef.current) {
      // Text visibility
      textRef.current.visible = isHighlighted || hovered;
      
      // Text always faces camera
      textRef.current.lookAt(state.camera.position);
      
      // Position above skill node - increased height to avoid orbit intersection
      textRef.current.position.y = radius * 4; // Increased from 3 to 4
      
      // Scale animation for text
      const textScale = 0.6; // Smaller text scale
      if (isHighlighted || hovered) {
        const pulseFactor = Math.sin(time * 1.5) * 0.05 + 1;
        textRef.current.scale.set(
          textScale * pulseFactor, 
          textScale * 0.5 * pulseFactor, // Make height proportionally smaller
          textScale * pulseFactor
        );
      }
    }
  });

  // Choose geometry based on skill level
  const getGeometry = (skill) => {
    if (skill.level >= 90) {
      return <dodecahedronGeometry args={[radius, 0]} />;
    } else if (skill.level >= 80) {
      return <icosahedronGeometry args={[radius, 0]} />;
    } else if (skill.level >= 70) {
      return <octahedronGeometry args={[radius, 0]} />;
    } else {
      return <sphereGeometry args={[radius, 16, 16]} />;
    }
  };

  // Handle pointer events
  const handlePointerOver = () => {
    setHovered(true);
    setHighlightedSkill(fullSkillId);
  };
  
  const handlePointerOut = () => {
    setHovered(false);
    setHighlightedSkill(null);
  };

  return (
    <group position={position}>
      {/* Skill node */}
      <group
        ref={nodeRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Glow effect */}
        <mesh ref={glowRef} scale={[1.3, 1.3, 1.3]}>
          <sphereGeometry args={[radius, 16, 16]} />
          <meshBasicMaterial
            color={skill.color}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
        
        {/* Skill geometry */}
        <mesh>
          {getGeometry(skill)}
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={isHighlighted || hovered ? 0.7 : 0.3}
            metalness={0.8}
            roughness={0.2}
            wireframe={isHighlighted || hovered}
          />
        </mesh>
        
        {/* Skill level indicator (only visible when highlighted) */}
        {(isHighlighted || hovered) && (
          <mesh position={[0, radius * 2, 0]}>
            <boxGeometry args={[skill.level / 80, 0.03, 0.03]} />
            <meshStandardMaterial color={skill.color} />
          </mesh>
        )}
        
        {/* Text label that appears on hover - improved positioning */}
        <sprite
          ref={textRef}
          visible={false}
          position={[0, radius * 4, 0]} // Higher position to avoid orbits
          scale={[1.8, 0.9, 1]}
        >
          <spriteMaterial 
            transparent={true}
            opacity={0.9}
            depthTest={false} // Make sure text renders on top
          />
        </sprite>
      </group>
    </group>
  );
}