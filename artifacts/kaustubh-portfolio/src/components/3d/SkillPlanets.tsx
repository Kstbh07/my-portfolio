import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, Points, PointMaterial, Environment } from '@react-three/drei';
import { EffectComposer, N8AO, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ─── Skill Data & Textures ──────────────────────────────────────────────────────────────
const textureLoader = new THREE.TextureLoader();
const loadedTextures: Record<string, THREE.Texture> = {};

const SKILLS = [
  // Inner Ring
  { name: 'Python',     category: 'AI / Backend', ring: 0, color: '#FFD43B', scale: 1.0, imageUrl: '/attached_assets/python.webp' },
  { name: 'React',      category: 'Frontend',     ring: 0, color: '#61DAFB', scale: 1.0, imageUrl: '/attached_assets/react2.webp' },
  { name: 'TypeScript', category: 'Frontend',     ring: 0, color: '#3178C6', scale: 1.0, imageUrl: '/attached_assets/typescript.webp' },
  { name: 'Node.js',    category: 'Backend',      ring: 0, color: '#68A063', scale: 1.0, imageUrl: '/attached_assets/node2.webp' },

  // Middle Ring
  { name: 'Next.js',    category: 'Fullstack', ring: 1, color: '#EEEEEE', scale: 1.0, imageUrl: '/attached_assets/next2.webp' },
  { name: 'Django',     category: 'Backend',   ring: 1, color: '#0C4B33', scale: 1.2, imageUrl: '/attached_assets/django.webp' },
  { name: 'PostgreSQL', category: 'Database',  ring: 1, color: '#336791', scale: 1.2, imageUrl: '/attached_assets/postgresql.webp' },
  { name: 'MongoDB',    category: 'Database',  ring: 1, color: '#47A248', scale: 1.0, imageUrl: '/attached_assets/mongo.webp' },

  // Outer Ring
  { name: 'AWS',        category: 'Cloud',     ring: 2, color: '#FF9900', scale: 1.2, imageUrl: '/attached_assets/aws.webp' },
  { name: 'Express',    category: 'Backend',   ring: 2, color: '#ffffff', scale: 1.0, imageUrl: '/attached_assets/express.webp' },
  { name: 'JavaScript', category: 'Frontend',  ring: 2, color: '#F7DF1E', scale: 1.0, imageUrl: '/attached_assets/javascript.webp' },
  { name: 'MySQL',      category: 'Database',  ring: 2, color: '#4479A1', scale: 1.0, imageUrl: '/attached_assets/mysql.webp' },
];

SKILLS.forEach(skill => {
  if (skill.imageUrl) {
    textureLoader.load(
      skill.imageUrl,
      (texture) => { loadedTextures[skill.name] = texture; },
      undefined,
      // fail silently so it doesn't break if not uploaded yet
      () => {} 
    );
  }
});

// Radius, Speed, Tilt for the deterministic orbit
const RING_CONFIG = [
  { radius: 3.2, speed: 0.15, tiltX: 0.22, tiltY: 0.08  }, // Inner
  { radius: 5.5, speed: 0.10, tiltX: 0.15, tiltY: -0.05 }, // Middle
  { radius: 7.8, speed: 0.06, tiltX: 0.18, tiltY: 0.12  }, // Outer
];

// Base size for planets
const BASE_PLANET_RADIUS = 0.45; 

// ─── Shared Geometry ──────────────────────────────────────────────────────────────
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

// ─── Starfield Background ─────────────────────────────────────────────────────────
function Starfield() {
  const positions = useMemo(() => {
    const pts = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      pts[i * 3]     = (Math.random() - 0.5) * 35;
      pts[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pts[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    return pts;
  }, []);

  return (
    <Points positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent color="#ffffff" size={0.03}
        sizeAttenuation depthWrite={false}
        blending={THREE.AdditiveBlending} opacity={0.6}
      />
    </Points>
  );
}

// ─── Thin orbit ring ─────────────────────────────────────────────────────────
function OrbitRing({ radius, tiltX, tiltY }: { radius: number; tiltX: number; tiltY: number }) {
  return (
    <group rotation={[tiltX, tiltY, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.015, 32, 120]} />
        <meshBasicMaterial
          color="#a855f7" transparent opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// ─── Central KS core ─────────────────────────────────────────────────────────
function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(t * 1.5) * 0.1; // subtle float
    }
    if (glowRef.current) {
      glowRef.current.position.y = Math.sin(t * 1.5) * 0.1;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.3 + Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <group>
      {/* Core sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshPhysicalMaterial
          color="#1a0033"
          emissive="#a855f7"
          emissiveIntensity={1.5}
          roughness={0.05}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0}
          transmission={0.5}
          thickness={0.5}
        />
      </mesh>

      {/* KS label inside */}
      <Html center zIndexRange={[10, 0]} style={{ pointerEvents: 'none', userSelect: 'none' }}>
        <div style={{
          fontFamily: 'monospace',
          fontWeight: 900,
          fontSize: '24px',
          color: '#ffffff',
          letterSpacing: '0.15em',
          textShadow: '0 0 15px #a855f7, 0 0 30px #a855f7',
          whiteSpace: 'nowrap',
        }}>
          &lt; KS /&gt;
        </div>
      </Html>

      {/* Outer glow shell */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#a855f7" transparent opacity={0.15}
          blending={THREE.AdditiveBlending} depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Point light at core */}
      <pointLight color="#a855f7" intensity={5} distance={20} decay={2} />
    </group>
  );
}

// ─── Individual skill planet ──────────────────────────────────────────────────
function SkillPlanet({
  skill,
  radius,
  speed,
  phaseOffset,
  tiltX,
  tiltY,
}: {
  skill: typeof SKILLS[number];
  radius: number;
  speed: number;
  phaseOffset: number;
  tiltX: number;
  tiltY: number;
}) {
  const planetRef  = useRef<THREE.Group>(null);
  const glowRef    = useRef<THREE.Mesh>(null);
  const angleRef   = useRef(phaseOffset);
  const [hovered, setHovered]   = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const hoverRef   = useRef(false);

  // Use the loaded texture if available
  const tex = loadedTextures[skill.name];
  const planetRadius = BASE_PLANET_RADIUS * skill.scale;

  // Tilt rotation for the orbit plane
  const tiltQuat = useMemo(() => {
    const e = new THREE.Euler(tiltX, tiltY, 0);
    return new THREE.Quaternion().setFromEuler(e);
  }, [tiltX, tiltY]);

  useFrame((state, delta) => {
    if (!planetRef.current || !glowRef.current) return;

    // Advance orbit angle. Slow down on hover.
    const spd = hoverRef.current ? speed * 0.1 : speed;
    angleRef.current -= delta * spd; // counter-clockwise

    // Orbit position in the tilted plane
    const localX = Math.cos(angleRef.current) * radius;
    const localZ = Math.sin(angleRef.current) * radius;
    
    // Add subtle up/down bobbing
    const localY = Math.sin(state.clock.elapsedTime * 1.5 + phaseOffset) * 0.2;

    const pos = new THREE.Vector3(localX, localY, localZ).applyQuaternion(tiltQuat);
    planetRef.current.position.copy(pos);

    // Keep planet facing camera
    planetRef.current.quaternion.copy(state.camera.quaternion);

    // Scale logic
    const targetScale = hoverRef.current ? 1.2 : 1.0;
    planetRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    // Glow pulse
    const mat = glowRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = (hoverRef.current ? 0.6 : 0.2) + Math.sin(state.clock.elapsedTime * 2 + phaseOffset) * 0.05;
  });

  return (
    <group
      ref={planetRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        hoverRef.current = true;
        setHovered(true);
        setShowLabel(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        hoverRef.current = false;
        setHovered(false);
        setShowLabel(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Planet body */}
      <mesh castShadow receiveShadow geometry={sphereGeometry} scale={planetRadius}>
        <meshPhysicalMaterial
          map={tex || undefined}
          emissive={skill.color}
          emissiveMap={tex || undefined}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          color={tex ? "#ffffff" : skill.color}
          roughness={0.1}
          metalness={0.3}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>

      {/* Rim glow — behind the sphere */}
      <mesh ref={glowRef} scale={planetRadius * 1.4} geometry={sphereGeometry}>
        <meshBasicMaterial
          color={skill.color}
          transparent opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false} side={THREE.BackSide}
        />
      </mesh>

      {/* Hover tooltip via Html */}
      <Html
        center
        zIndexRange={[100, 0]}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
        position={[0, planetRadius + 0.5, 0]}
      >
        <div style={{
          opacity: showLabel ? 1 : 0,
          transform: showLabel ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)',
          transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          background: 'rgba(5, 2, 10, 0.6)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${skill.color}50`,
          borderRadius: '8px',
          padding: '6px 12px',
          whiteSpace: 'nowrap',
          boxShadow: `0 0 20px ${skill.color}30`,
        }}>
          <span style={{
            fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 800,
            color: '#fff', display: 'block', textAlign: 'center', letterSpacing: '0.05em',
          }}>
            {skill.name}
          </span>
        </div>
      </Html>
    </group>
  );
}

// ─── Camera mouse parallax ────────────────────────────────────────────────────
function CameraParallax() {
  const { camera } = useThree();
  const basePos = useMemo(() => new THREE.Vector3(0, 3, 22), []);

  useFrame((state) => {
    // Subtle parallax effect based on mouse pointer
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, basePos.x + state.pointer.x * 1.5, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, basePos.y + state.pointer.y * 1.5, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, basePos.z, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function SolarSystem() {
  return (
    <>
      <CameraParallax />
      <Starfield />

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 10, -5]} intensity={1.5} color="#ffffff" />

      {/* Core */}
      <CoreSphere />

      {/* Orbit rings + planets */}
      {RING_CONFIG.map((cfg, ringIdx) => {
        const ringSkills = SKILLS.filter((s) => s.ring === ringIdx);

        return (
          <React.Fragment key={ringIdx}>
            <OrbitRing radius={cfg.radius} tiltX={cfg.tiltX} tiltY={cfg.tiltY} />

            {ringSkills.map((skill, i) => (
              <SkillPlanet
                key={skill.name}
                skill={skill}
                radius={cfg.radius}
                speed={cfg.speed}
                phaseOffset={(i / ringSkills.length) * Math.PI * 2}
                tiltX={cfg.tiltX}
                tiltY={cfg.tiltY}
              />
            ))}
          </React.Fragment>
        );
      })}

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}
