import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';
import { Points, PointMaterial, Float, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll as useFramerScroll } from 'framer-motion';

// Instanced particles for better performance
function CinematicParticles({ count = 2000, color = "#a855f7", size = 0.02, radius = 5, depth = 150 }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * radius * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * radius * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * depth; // spread across Z
    }
    return pos;
  }, [count, radius, depth]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z += delta * 0.02;
      const mouseX = (state.pointer.x * Math.PI) / 20;
      const mouseY = (state.pointer.y * Math.PI) / 20;
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, mouseY, 0.05);
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, mouseX, 0.05);
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

// Low-poly developer silhouette
function DeveloperSilhouette() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && groupRef.current.children[1]) {
      const mouseX = (state.pointer.x * Math.PI) / 4;
      const mouseY = (state.pointer.y * Math.PI) / 4;
      const head = groupRef.current.children[1];
      head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, mouseX, 0.1);
      head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, -mouseY, 0.1);
    }
  });

  return (
    <group position={[-2, -1.5, 4]} ref={groupRef} scale={[0.8, 0.8, 0.8]}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 0.8, 6]} />
        <meshBasicMaterial color="#030105" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.6, 0]}>
        <icosahedronGeometry args={[0.25, 1]} />
        <meshBasicMaterial color="#05020a" />
        <lineSegments>
          <edgesGeometry args={[new THREE.IcosahedronGeometry(0.25, 1)]} />
          <lineBasicMaterial color="#4c1d95" transparent opacity={0.5} />
        </lineSegments>
      </mesh>
      {/* Desk glow */}
      <mesh position={[0, 0.2, 0.5]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[1, 0.6]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function DigitalGlobe({ position = [4, 0, 0] }: { position?: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const globePoints = useRef<THREE.Points>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  const spherePositions = useMemo(() => {
    const points = [];
    const radius = 3.5;
    for (let i = 0; i < 3000; i++) {
      const phi = Math.acos(-1 + (2 * i) / 3000);
      const theta = Math.sqrt(3000 * Math.PI) * phi;
      points.push(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
    }
    return new Float32Array(points);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (state.pointer.y * Math.PI) / 10;
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouseY, 0.02);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mouseX, 0.02);
    }
    if (globePoints.current) globePoints.current.rotation.y += delta * 0.05;
    if (ring1.current) {
      ring1.current.rotation.z += delta * 0.1;
      ring1.current.rotation.x += delta * 0.05;
    }
    if (ring2.current) {
      ring2.current.rotation.z -= delta * 0.15;
      ring2.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group position={position} ref={ref}>
      <Points ref={globePoints} positions={spherePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a855f7"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      {/* Very subtle core glow — kept small so it doesn't flood the screen */}
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#7e22ce" transparent opacity={0.03} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Orbital Rings — the two circular lines the brief keeps */}
      <mesh ref={ring1} rotation={[Math.PI / 2, 0.2, 0]}>
        <torusGeometry args={[4.2, 0.01, 16, 100]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[4.5, 0.005, 16, 100]} />
        <meshBasicMaterial color="#e879f9" transparent opacity={0.2} />
      </mesh>
      {/* Removed: large 12×12 purple plane that was flooding the right half of the screen */}
    </group>
  );
}

// The camera controller that ties to framer-motion scroll
function CameraController() {
  const { scrollYProgress } = useFramerScroll();
  
  useFrame((state) => {
    const p = scrollYProgress.get();
    
    const targetZ = 6 - (p * 150); 
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);

    // Add some cinematic wobble and rotation as we travel deep
    const wobble = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, wobble + (state.pointer.x * 0.5), 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, (state.pointer.y * 0.5), 0.05);
    
    // Slight roll for barrel effect
    state.camera.rotation.z = THREE.MathUtils.lerp(state.camera.rotation.z, p * Math.PI * 2, 0.01);
  });
  return null;
}

export function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020104]">
      {/* Subtle animated grain overlay */}
      <div className="absolute inset-0 z-10 opacity-20 pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
      
      {/* Soft Vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none" 
           style={{ background: 'radial-gradient(circle at center, transparent 40%, #020104 100%)' }} />

      <WebGLErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        frameloop="always"
        gl={{ antialias: true, alpha: false, failIfMajorPerformanceCaveat: false }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault());
        }}
      >
        <color attach="background" args={['#020104']} />
        <fog attach="fog" args={['#020104', 5, 25]} />
        <ambientLight intensity={0.2} />
        
        <CameraController />
        
        {/* Z = 0: Hero */}
        <group position={[0, 0, 0]}>
          <DigitalGlobe />
          <DeveloperSilhouette />
        </group>

        {/* Z = -20: About Core */}
        <group position={[-2, 2, -28]}>
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
             <mesh scale={[0.8, 0.8, 0.8]}>
               <boxGeometry args={[3, 3, 3]} />
               <meshBasicMaterial color="#05020a" wireframe={true} transparent opacity={0.1} />
               <lineSegments>
                  <edgesGeometry args={[new THREE.BoxGeometry(3, 3, 3)]} />
                  <lineBasicMaterial color="#a855f7" transparent opacity={0.15} />
               </lineSegments>
             </mesh>
          </Float>
        </group>

        {/* Z = -50: Projects Holograms */}
        <group position={[3, 0, -50]}>
           <mesh rotation={[0, 0.5, 0]}>
             <cylinderGeometry args={[2, 2, 0.1, 32]} />
             <meshBasicMaterial color="#a855f7" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
           </mesh>
           <mesh position={[0, 3, 0]}>
             <cylinderGeometry args={[2.2, 2.2, 6, 32, 1, true]} />
             <meshBasicMaterial color="#c084fc" transparent opacity={0.05} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
           </mesh>
        </group>

        {/* Z = -140: Contact Terminal */}
        <group position={[2, -1, -140]}>
           <mesh rotation={[-0.2, -0.4, 0]}>
             <planeGeometry args={[6, 4]} />
             <meshBasicMaterial color="#a855f7" transparent opacity={0.1} wireframe />
           </mesh>
        </group>

        {/* Global Particles spread across the whole Z depth */}
        <CinematicParticles count={4000} radius={15} depth={160} color="#c084fc" />
        <CinematicParticles count={2000} radius={10} depth={160} color="#e879f9" size={0.03} />
        
      </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
