'use client';

import { Canvas as ThreeCanvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';

export default function Canvas({ children }) {
  return (
    <div className="w-full h-full absolute inset-0 -z-10">
      <ThreeCanvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ position: 'absolute' }}
        shadows
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Responsive to device pixel ratio
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        {children}
        <Preload all />
      </ThreeCanvas>
    </div>
  );
}