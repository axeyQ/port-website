'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Collection of space-themed 3D elements
 * Import individual components as needed:
 * 
 * import { Planet, Rocket, Satellite, UFO, ShootingStar, SpaceStation } from '@/components/three/SpaceElements';
 */

// Utility function to create a random orbit path
const createOrbitPath = (radius = 1, thickness = 0.01, color = '#555555', opacity = 0.3) => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - thickness, radius + thickness, 64]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  );
};

// Utility to create space dust/stars
export function SpaceDust({ count = 50, radius = 10, color = '#FFFFFF' }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });
  
  return (
    <group ref={ref}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * radius,
            (Math.random() - 0.5) * radius,
            (Math.random() - 0.5) * radius
          ]}
        >
          <sphereGeometry args={[0.02 + Math.random() * 0.05, 4, 4]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

// Planet component
export function Planet({ 
  position = [0, 0, 0], 
  scale = 1, 
  rotation = [0, 0, 0], 
  color = '#3a86ff', 
  emissive = '#3a86ff', 
  cloudsColor = '#ffffff',
  hasRings = false,
  hasAtmosphere = true,
  rotationSpeed = 0.2
}) {
  const planetRef = useRef();
  const cloudsRef = useRef();
  const ringsRef = useRef();
  const atmosphereRef = useRef();
  
  // Animate the planet
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate planet
    if (planetRef.current) {
      planetRef.current.rotation.y = rotation[1] + time * rotationSpeed;
    }
    
    // Rotate clouds slightly faster
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = rotation[1] + time * rotationSpeed * 1.2;
    }
    
    // Rotate rings
    if (ringsRef.current) {
      ringsRef.current.rotation.z = rotation[2] + time * rotationSpeed * 0.3;
    }
    
    // Pulse atmosphere
    if (atmosphereRef.current && atmosphereRef.current.material) {
      atmosphereRef.current.material.opacity = 0.3 + Math.sin(time) * 0.1;
    }
  });
  
  return (
    <group position={position} scale={Array.isArray(scale) ? scale : [scale, scale, scale]}>
      {/* Main planet body */}
      <mesh ref={planetRef} rotation={rotation}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={color}
          emissive={emissive}
          emissiveIntensity={0.2}
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
      
      {/* Cloud layer */}
      {cloudsColor && (
        <mesh ref={cloudsRef} rotation={rotation}>
          <sphereGeometry args={[1.02, 32, 32]} />
          <meshStandardMaterial 
            color={cloudsColor}
            transparent
            opacity={0.4}
            roughness={1}
            metalness={0}
            depthWrite={false}
          />
        </mesh>
      )}
      
      {/* Atmosphere glow */}
      {hasAtmosphere && (
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[1.1, 32, 32]} />
          <meshBasicMaterial 
            color={emissive}
            transparent
            opacity={0.3}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>
      )}
      
      {/* Planet rings */}
      {hasRings && (
        <group ref={ringsRef} rotation={[Math.PI / 4, 0, 0]}>
          <mesh>
            <ringGeometry args={[1.4, 2.2, 64]} />
            <meshStandardMaterial 
              color="#e2e2e2" 
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
              roughness={0.9}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}

// Rocket component
export function Rocket({ 
  position = [0, 0, 0], 
  scale = 1, 
  rotation = [0, 0, 0],
  moving = true,
  thrustIntensity = 1.0
}) {
  const rocketRef = useRef();
  const thrustRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (rocketRef.current) {
      // If moving, apply motion
      if (moving) {
        rocketRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2;
        rocketRef.current.rotation.z = rotation[2] + Math.sin(time * 0.3) * 0.05;
      }
      
      // Rocket body wobbles slightly
      rocketRef.current.rotation.x = rotation[0] + Math.sin(time * 0.7) * 0.02;
    }
    
    // Animate thrust flames
    if (thrustRef.current && thrustRef.current.material) {
      thrustRef.current.material.opacity = 0.7 + Math.sin(time * 5) * 0.3;
      thrustRef.current.scale.y = 1 + Math.sin(time * 10) * 0.2;
    }
  });
  
  return (
    <group 
      ref={rocketRef} 
      position={position} 
      rotation={rotation} 
      scale={Array.isArray(scale) ? scale : [scale, scale, scale]}
    >
      {/* Rocket body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.3, 1.2, 8, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
      </mesh>
      
      {/* Rocket nose cone */}
      <mesh position={[0, 0.9, 0]}>
        <coneGeometry args={[0.3, 0.6, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
      </mesh>
      
      {/* Windows/details */}
      <mesh position={[0, 0.3, 0.25]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Fins */}
      <mesh position={[0.3, -0.4, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.05, 0.5, 0.2]} />
        <meshStandardMaterial color="#FF4136" />
      </mesh>
      <mesh position={[-0.3, -0.4, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.05, 0.5, 0.2]} />
        <meshStandardMaterial color="#FF4136" />
      </mesh>
      <mesh position={[0, -0.4, 0.3]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.2, 0.5, 0.05]} />
        <meshStandardMaterial color="#FF4136" />
      </mesh>
      <mesh position={[0, -0.4, -0.3]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.2, 0.5, 0.05]} />
        <meshStandardMaterial color="#FF4136" />
      </mesh>
      
      {/* Rocket engine */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.3, 16]} />
        <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Rocket thrust */}
      {thrustIntensity > 0 && (
        <group position={[0, -0.9, 0]}>
          <mesh ref={thrustRef}>
            <coneGeometry args={[0.2, 0.6, 16]} />
            <meshBasicMaterial color="#FF8C29" transparent opacity={0.8} />
          </mesh>
          <pointLight color="#FF8C29" intensity={thrustIntensity * 2} distance={3} />
        </group>
      )}
    </group>
  );
}

// Satellite component
export function Satellite({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  orbitRadius = 0,
  orbitSpeed = 0.1
}) {
  const satelliteRef = useRef();
  const panelsRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (satelliteRef.current) {
      // Handle orbiting if orbit radius is provided
      if (orbitRadius > 0) {
        const angle = time * orbitSpeed;
        satelliteRef.current.position.x = position[0] + Math.cos(angle) * orbitRadius;
        satelliteRef.current.position.z = position[2] + Math.sin(angle) * orbitRadius;
        
        // Make satellite look in direction of movement
        satelliteRef.current.rotation.y = angle + Math.PI / 2;
      }
      
      // Small wobbling effect
      satelliteRef.current.rotation.x = rotation[0] + Math.sin(time * 0.5) * 0.05;
      satelliteRef.current.rotation.z = rotation[2] + Math.sin(time * 0.3) * 0.05;
    }
    
    // Rotate solar panels to face "sun"
    if (panelsRef.current) {
      panelsRef.current.rotation.z = time * 0.05;
    }
  });
  
  return (
    <group 
      ref={satelliteRef} 
      position={position} 
      rotation={rotation} 
      scale={Array.isArray(scale) ? scale : [scale, scale, scale]}
    >
      {/* Satellite body */}
      <mesh>
        <boxGeometry args={[0.5, 0.3, 0.3]} />
        <meshStandardMaterial color="#E0E0E0" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Satellite dish */}
      <mesh position={[0, 0.1, 0.3]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.1, 0.1, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Solar panels */}
      <group ref={panelsRef}>
        <mesh position={[1, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1, 0.05, 0.4]} />
          <meshStandardMaterial color="#3a86ff" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-1, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1, 0.05, 0.4]} />
          <meshStandardMaterial color="#3a86ff" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Antenna */}
      <mesh position={[0, 0.25, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
        <meshStandardMaterial color="#888888" metalness={0.8} />
      </mesh>
    </group>
  );
}

// UFO component
export function UFO({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  color = "#C0C0C0",
  lightColor = "#50C878",
  beamActive = false
}) {
  const ufoRef = useRef();
  const cockpitRef = useRef();
  const lightsRef = useRef();
  const beamRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (ufoRef.current) {
      // Hovering motion
      ufoRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.2;
      
      // Subtle tilt
      ufoRef.current.rotation.x = rotation[0] + Math.sin(time * 0.3) * 0.05;
      ufoRef.current.rotation.z = rotation[2] + Math.sin(time * 0.5) * 0.05;
    }
    
    // Rotate faster on y-axis
    if (cockpitRef.current) {
      cockpitRef.current.rotation.y = time * 0.5;
    }
    
    // Pulsing lights
    if (lightsRef.current && lightsRef.current.material) {
      lightsRef.current.material.emissiveIntensity = 0.8 + Math.sin(time * 3) * 0.2;
    }
    
    // Animate beam if active
    if (beamRef.current && beamRef.current.material && beamActive) {
      beamRef.current.material.opacity = 0.3 + Math.sin(time * 2) * 0.1;
    }
  });
  
  return (
    <group 
      ref={ufoRef} 
      position={position} 
      rotation={rotation} 
      scale={Array.isArray(scale) ? scale : [scale, scale, scale]}
    >
      {/* UFO saucer body */}
      <mesh rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Bottom part */}
      <mesh position={[0, -0.1, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.3]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Glass cockpit */}
      <mesh ref={cockpitRef} position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.2, 32, 16]} />
        <meshPhysicalMaterial 
          color="#88CCFF" 
          transmission={0.9} 
          roughness={0.1} 
          ior={1.5} 
          thickness={0.1} 
        />
      </mesh>
      
      {/* Bottom lights */}
      <mesh ref={lightsRef} position={[0, -0.2, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.25, 0.05, 16, 32]} />
        <meshStandardMaterial 
          color={lightColor} 
          emissive={lightColor} 
          emissiveIntensity={1}
        />
      </mesh>
      
      {/* Tractor beam */}
      {beamActive && (
        <mesh ref={beamRef} position={[0, -0.4, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.6, 2, 32, 1, true]} />
          <meshBasicMaterial 
            color={lightColor} 
            transparent 
            opacity={0.3} 
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* Add a light source */}
      <pointLight position={[0, -0.3, 0]} color={lightColor} intensity={1} distance={3} />
    </group>
  );
}

// Shooting Star / Comet component
export function ShootingStar({
  position = [0, 0, 0],
  direction = [-1, -0.5, 0],
  speed = 1,
  color = "#FFFFFF",
  tailLength = 10
}) {
  const starRef = useRef();
  const tailRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed;
    
    if (starRef.current) {
      // Move star in the specified direction
      starRef.current.position.x = position[0] + direction[0] * time;
      starRef.current.position.y = position[1] + direction[1] * time;
      starRef.current.position.z = position[2] + direction[2] * time;
      
      // Reset position when it moves too far
      if (Math.abs(starRef.current.position.x - position[0]) > 20 ||
          Math.abs(starRef.current.position.y - position[1]) > 20 ||
          Math.abs(starRef.current.position.z - position[2]) > 20) {
        starRef.current.position.set(position[0], position[1], position[2]);
      }
    }
    
    // Update tail geometry
    if (tailRef.current && tailRef.current.geometry && starRef.current) {
      const positions = tailRef.current.geometry.attributes.position.array;
      
      // Position 0 follows the star
      positions[0] = 0;
      positions[1] = 0;
      positions[2] = 0;
      
      // Create tail particles with decreasing opacity
      for (let i = 1; i < tailLength; i++) {
        const idx = i * 3;
        const prevX = positions[idx];
        const prevY = positions[idx + 1];
        const prevZ = positions[idx + 2];
        
        // Move in the opposite direction of travel
        positions[idx] = -direction[0] * 0.2 * i;
        positions[idx + 1] = -direction[1] * 0.2 * i;
        positions[idx + 2] = -direction[2] * 0.2 * i;
      }
      
      tailRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <group>
      {/* Shooting star core */}
      <group ref={starRef} position={position}>
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
        
        {/* Tail */}
        <points ref={tailRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={tailLength}
              array={new Float32Array(tailLength * 3)}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial 
            color={color} 
            size={0.1} 
            transparent 
            opacity={0.8} 
            sizeAttenuation
          />
        </points>
        
        {/* Light source */}
        <pointLight color={color} intensity={1} distance={2} />
      </group>
    </group>
  );
}

// Space Station component
export function SpaceStation({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  rotating = true
}) {
  const stationRef = useRef();
  const solarPanelsRef = useRef();
  const modulesRefs = useRef([]);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (stationRef.current && rotating) {
      // Slow rotation for the whole station
      stationRef.current.rotation.y = rotation[1] + time * 0.05;
    }
    
    // Rotate solar panels to track the sun
    if (solarPanelsRef.current) {
      solarPanelsRef.current.rotation.z = rotation[2] + time * 0.03;
    }
    
    // Subtle vibrations for modules
    modulesRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.position.y = Math.sin(time * 0.5 + i) * 0.01;
      }
    });
  });
  
  return (
    <group 
      ref={stationRef} 
      position={position} 
      rotation={rotation} 
      scale={Array.isArray(scale) ? scale : [scale, scale, scale]}
    >
      {/* Main module */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 1.2, 16]} />
        <meshStandardMaterial color="#E0E0E0" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Connection rings */}
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.35, 0.05, 16, 32]} />
        <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <torusGeometry args={[0.35, 0.05, 16, 32]} />
        <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Side modules */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.cos(angle) * 0.8;
        const z = Math.sin(angle) * 0.8;
        
        return (
          <mesh 
            key={i}
            ref={(el) => {modulesRefs.current[i] = el}}
            position={[x, 0, z]}
            rotation={[0, -angle, 0]}
          >
            <cylinderGeometry args={[0.15, 0.15, 0.6, 16]} />
            <meshStandardMaterial color="#E0E0E0" metalness={0.6} roughness={0.4} />
          </mesh>
        );
      })}
      
      {/* Solar panel arrays */}
      <group ref={solarPanelsRef}>
        <group position={[1.2, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[1.5, 0.05, 0.6]} />
            <meshStandardMaterial color="#3a86ff" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
        <group position={[-1.2, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[1.5, 0.05, 0.6]} />
            <meshStandardMaterial color="#3a86ff" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </group>
      
      {/* Communications dish */}
      <group position={[0, 0.8, 0]}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.2, 0.15, 16]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>
    </group>
  );
}

// A orbiting solar system
export function MiniSolarSystem({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  planetCount = 3
}) {
  const systemRef = useRef();
  const sunRef = useRef();
  const planetsRef = useRef(Array(planetCount).fill(null));
  
  // Planet colors
  const planetColors = [
    '#3a86ff', // Blue
    '#ff006e', // Pink
    '#8338ec', // Purple
    '#fb5607', // Orange
    '#ffbe0b', // Yellow
  ];
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate whole system slowly
    if (systemRef.current) {
      systemRef.current.rotation.y = rotation[1] + time * 0.03;
    }
    
    // Rotate sun
    if (sunRef.current) {
      sunRef.current.rotation.y = time * 0.1;
    }
    
    // Orbit planets
    planetsRef.current.forEach((planet, i) => {
      if (planet) {
        const speed = 0.2 / (i + 1); // Further planets move slower
        const angle = time * speed;
        const distance = (i + 1) * 1.2;
        
        planet.position.x = Math.cos(angle) * distance;
        planet.position.z = Math.sin(angle) * distance;
        planet.rotation.y = time * 0.5;
      }
    });
  });
  
  return (
    <group 
      ref={systemRef} 
      position={position} 
      rotation={rotation} 
      scale={Array.isArray(scale) ? scale : [scale, scale, scale]}
    >
      {/* Sun */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial 
          color="#ff9e00" 
          emissive="#ff9e00"
          emissiveIntensity={1}
          roughness={1}
          metalness={0}
        />
        <pointLight color="#ff9e00" intensity={1} distance={15} />
      </mesh>
      
      {/* Planets and their orbits */}
      {Array.from({ length: planetCount }).map((_, i) => {
        const distance = (i + 1) * 1.2;
        const planetColor = planetColors[i % planetColors.length];
        const planetSize = 0.2 - (i * 0.02); // Smaller as they get further out
        
        return (
          <group key={i}>
            {/* Orbit path */}
            {createOrbitPath(distance, 0.01, '#333333', 0.2)}
            
            {/* Planet */}
            <mesh 
              ref={(el) => {planetsRef.current[i] = el}}
              position={[distance, 0, 0]}
            >
              <sphereGeometry args={[planetSize, 16, 16]} />
              <meshStandardMaterial 
                color={planetColor} 
                roughness={0.7}
                metalness={0.2}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Export a scene with multiple elements for a complete space theme
export function SpaceScene({ mousePosition = { x: 0, y: 0 } }) {
  return (
    <>
      {/* Random stars in the background */}
      <SpaceDust count={100} radius={20} />
      
      {/* A solar system */}
      <MiniSolarSystem position={[-5, 0, -10]} scale={0.5} />
      
      {/* Planets */}
      <Planet 
        position={[3, 1, -5]} 
        scale={0.8} 
        color="#3a86ff" 
        emissive="#3a86ff"
        cloudsColor="#ffffff"
      />
      
      <Planet 
        position={[-4, -2, -3]} 
        scale={0.5} 
        color="#ff006e" 
        emissive="#ff006e"
        hasRings={true}
      />
      
      {/* Rocket */}
      <Rocket 
        position={[4, -1, -2]} 
        scale={0.4} 
        rotation={[0, -Math.PI / 4, 0]}
      />
      
      {/* UFO */}
      <UFO
        position={[-2, 3, -8]} 
        scale={0.6}
      />
      
      {/* Satellite orbiting a planet */}
      <group position={[-6, 0, -5]}>
        <Planet 
          scale={0.7} 
          color="#8338ec" 
          emissive="#8338ec"
        />
        <Satellite
          position={[0, 0, 0]}
          scale={0.3}
          orbitRadius={1.5}
          orbitSpeed={0.3}
        />
      </group>
      
      {/* Shooting stars */}
      <ShootingStar 
        position={[10, 5, -10]} 
        direction={[-1, -0.2, 0.1]}
        speed={0.5}
      />
      
      <ShootingStar 
        position={[-10, 8, -5]} 
        direction={[0.8, -0.4, 0.2]}
        speed={0.3}
        color="#ffbe0b"
      />
      
      {/* Space station */}
      <SpaceStation
        position={[8, -3, -7]}
        scale={0.4}
      />
      
      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.2} />
    </>
  );
}
