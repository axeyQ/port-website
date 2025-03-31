'use client';

import { Canvas as ThreeCanvas } from '@react-three/fiber';
import { Preload, OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';

export default function Canvas({ children, cameraPosition = [0, 0, 5], enableOrbit = false, enableZoom = false, enablePan = false, className = "" }) {
  return (
    <div className={`w-full h-full absolute inset-0 -z-10 ${className}`}>
      <ThreeCanvas
        shadows
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance" 
        }}
        dpr={[1, 2]} // Responsive to device pixel ratio
        linear
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={cameraPosition} fov={75} />
          
          {enableOrbit && (
            <OrbitControls 
              enableZoom={enableZoom}
              enablePan={enablePan}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 6}
            />
          )}
          
          {/* Environment preset for realistic lighting */}
          <Environment preset="city" />
          
          {children}
          
          <Preload all />
        </Suspense>
      </ThreeCanvas>
    </div>
  );
}