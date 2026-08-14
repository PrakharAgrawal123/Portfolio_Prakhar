import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { usePortfolioStore } from '../store/usePortfolioStore';

// Interactive core: pulls mesh rotation toward cursor position
const InteractiveSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;

    // Smooth hover parallax rotation
    const targetX = pointer.x * 0.4;
    const targetY = pointer.y * 0.4;

    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * 0.05;

    // Steady autorotate
    meshRef.current.rotation.z += 0.002;

    // Dynamic wave scale pulsing based on time
    if (materialRef.current) {
      materialRef.current.distort = 0.35 + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.6, 64, 64]} scale={1}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#141416"
          roughness={0.1}
          metalness={0.9}
          distort={0.4}
          speed={1.5}
          emissive="#ffb44f"
          emissiveIntensity={0.15}
          bumpScale={0.05}
        />
      </Sphere>
    </Float>
  );
};

// Shard structure representing data fragments orbiting the sphere
const DataShards: React.FC = () => {
  const shardsCount = 20; // Reduced count slightly to optimize layout frames
  const meshRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      // Orbit around the center
      const time = state.clock.getElapsedTime();
      const speed = 0.15 + (i % 3) * 0.05;
      const radius = 3 + (i % 4) * 0.4;
      const angle = time * speed + (i * Math.PI * 2) / shardsCount;

      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.z = Math.sin(angle) * radius;
      mesh.position.y = Math.sin(time * 0.5 + i) * 0.5;

      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
    });
  });

  return (
    <>
      {Array.from({ length: shardsCount }).map((_, i) => {
        const scale = 0.05 + Math.random() * 0.08;
        return (
          <mesh
            key={i}
            ref={(el) => {
              if (el) meshRefs.current[i] = el;
            }}
            position={[
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 5,
              (Math.random() - 0.5) * 8,
            ]}
          >
            <tetrahedronGeometry args={[scale, 0]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? '#ffb44f' : '#8a8a8f'}
              roughness={0.2}
              metalness={0.8}
              emissive={i % 3 === 0 ? '#ffb44f' : '#000000'}
              emissiveIntensity={i % 3 === 0 ? 0.3 : 0}
            />
          </mesh>
        );
      })}
    </>
  );
};

export const HeroScene: React.FC = () => {
  const { prefersReducedMotion } = usePortfolioStore();
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  // Check layout widths to detect mobile/tablets or resizing sizes
  useEffect(() => {
    const checkViewport = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Responsive animated CSS grid gradients for mobile, tablet, or reduced motion settings
  if (prefersReducedMotion || isMobileOrTablet) {
    return (
      <div className="absolute inset-0 z-0 bg-[#0b0b0d] overflow-hidden w-full h-full">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,180,79,0.12)_0%,transparent_70%)]" />
        <div className="absolute top-[25%] left-[10%] w-[300px] h-[300px] bg-[#ffb44f]/5 rounded-full filter blur-[90px]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-[#0b0b0d]">
      <Canvas gl={{ antialias: true, alpha: false }} dpr={[1, 1.2]}>
        <color attach="background" args={['#0b0b0d']} />
        
        <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={50} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 2]} intensity={1.5} color="#ffb44f" />
        <pointLight position={[-5, -5, -2]} intensity={0.5} color="#8a8a8f" />
        <pointLight position={[0, 3, 2]} intensity={1} color="#f2f1ed" />

        <Suspense fallback={null}>
          <InteractiveSphere />
          <DataShards />
          
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.3}
              luminanceSmoothing={0.9}
              height={300}
              intensity={0.6}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};
export default HeroScene;
