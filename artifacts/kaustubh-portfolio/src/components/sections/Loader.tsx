import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Quote, TerminalSquare } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LoaderProps {
  onComplete: () => void;
}

const LOGS = [
  { text: '> waking developer........', status: '[OK]', statusClass: 'text-green-400', glitch: false },
  { text: '> restoring unfinished ideas', status: '[OK]', statusClass: 'text-green-400', glitch: false },
  { text: '> loading caffeine.dll.....', status: '[LOW]', statusClass: 'text-yellow-400', glitch: false },
  { text: '> checking emotional stability', status: '[404]', statusClass: 'text-red-400', glitch: true },
  { text: '> ignoring..................', status: '[OK]', statusClass: 'text-green-400', glitch: false },
  { text: '> initializing kaustubh.....', status: '[OK]', statusClass: 'text-green-400', glitch: false },
];

const CODE_TEXT = `const kaustubh = {\n  passion: "Code",\n  focus: "Backend",\n  goal: "Impact",\n  status: "Building..."\n}\n\nreturn <Experience />`;

// ─── Starfield background ────────────────────────────────────────────────────
function Stars() {
  const stars = useRef<{ x: number; y: number; size: number; opacity: number }[]>([]);
  if (stars.current.length === 0) {
    for (let i = 0; i < 120; i++) {
      stars.current.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.4,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
  }
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.current.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [s.opacity, s.opacity * 0.3, s.opacity] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
        />
      ))}
    </div>
  );
}

// ─── Floating dust particles ─────────────────────────────────────────────────
function FloatingParticles() {
  const particles = useRef<{ x: number; size: number; delay: number; duration: number }[]>([]);
  if (particles.current.length === 0) {
    for (let i = 0; i < 30; i++) {
      particles.current.push({
        x: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 12,
      });
    }
  }
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.current.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/30"
          style={{ left: `${p.x}%`, bottom: '-4px', width: p.size, height: p.size }}
          animate={{ y: [0, -(window.innerHeight + 20)], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

// Removed ScanSweep

// ─── Inner 3D Reactor Component ──────────────────────────────────────────────
function ReactorCore({ phase, progress, glitchActive }: { phase: string; progress: number; glitchActive: boolean }) {
  const groupRef  = useRef<THREE.Group>(null);
  const ring1Ref  = useRef<THREE.Mesh>(null);
  const ring2Ref  = useRef<THREE.Mesh>(null);
  const ring3Ref  = useRef<THREE.Mesh>(null);
  const ring4Ref  = useRef<THREE.Mesh>(null);
  const ring5Ref  = useRef<THREE.Mesh>(null);  // new scanning ring
  const nodesRef  = useRef<THREE.Group>(null);
  const scanRef   = useRef<THREE.Mesh>(null);

  const innerRing  = new THREE.RingGeometry(1.8, 1.83, 64);
  const midRing    = new THREE.RingGeometry(2.4, 2.45, 64, 1, 0, Math.PI * 1.5);
  const midRing2   = new THREE.RingGeometry(2.6, 2.62, 64, 1, Math.PI, Math.PI * 0.8);

  // Dotted orbit
  const dotsGeo = new THREE.BufferGeometry();
  const dotCount = 80;
  const positions = new Float32Array(dotCount * 3);
  for (let i = 0; i < dotCount; i++) {
    const angle = (i / dotCount) * Math.PI * 2;
    positions[i * 3]     = Math.cos(angle) * 3.8;
    positions[i * 3 + 1] = Math.sin(angle) * 3.8;
    positions[i * 3 + 2] = 0;
  }
  dotsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const neonMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xa855f7).multiplyScalar(1.5),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const neonBrightMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xd8b4fe).multiplyScalar(2),
    transparent: true,
    opacity: 1,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const faintMat = new THREE.MeshBasicMaterial({
    color: 0x6b21a8,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  });
  const scanMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xc084fc),
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Glitch effect — random jitter on rings for 200ms
    if (glitchActive) {
      if (ring1Ref.current) ring1Ref.current.rotation.z += (Math.random() - 0.5) * 2;
      if (ring2Ref.current) ring2Ref.current.rotation.z += (Math.random() - 0.5) * 2;
      if (nodesRef.current) nodesRef.current.rotation.z += (Math.random() - 0.5) * 3;
    }

    if (phase === 'init' || phase === 'scan') {
      if (groupRef.current) groupRef.current.scale.setScalar(0.001);
    } else if (phase === 'assembly') {
      if (groupRef.current) groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
    } else if (phase === 'active' || phase === 'sync') {
      if (groupRef.current) groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);

      if (ring1Ref.current) ring1Ref.current.rotation.z -= delta * 0.5;
      if (ring2Ref.current) ring2Ref.current.rotation.z += delta * 0.8;
      if (nodesRef.current) nodesRef.current.rotation.z += delta * 1.2;

      const pulse = Math.sin(t * 5) * 0.5 + 0.5;
      neonBrightMat.opacity = 0.8 + pulse * 0.2 + (progress / 100) * 0.5;
      if (scanMat) scanMat.opacity = 0.05 + Math.sin(t * 2) * 0.1;
    } else if (phase === 'transition') {
      // Launch: rings spin insanely fast then freeze
      if (ring1Ref.current) ring1Ref.current.rotation.z -= delta * 15;
      if (ring2Ref.current) ring2Ref.current.rotation.z += delta * 20;
      if (nodesRef.current) nodesRef.current.rotation.z += delta * 25;
      if (groupRef.current) {
        groupRef.current.scale.lerp(new THREE.Vector3(30, 30, 30), 0.05);
        groupRef.current.position.z += delta * 5;
      }
    }
  });

  return (
    <group ref={groupRef} scale={0}>
      {/* Inner Ring */}
      <mesh ref={ring1Ref} geometry={innerRing} material={neonBrightMat} />

      {/* Mid Rings (Broken Arcs) */}
      <mesh ref={ring2Ref} geometry={midRing} material={neonMat} />
      <mesh geometry={midRing2} material={neonBrightMat} />

      {/* Dotted Orbit */}
      <group ref={ring4Ref}>
        <points geometry={dotsGeo}>
          <pointsMaterial color={0xa855f7} size={0.03} sizeAttenuation transparent opacity={0.6} />
        </points>
      </group>

      {/* Glowing Nodes on Orbit */}
      <group ref={nodesRef}>
        <mesh position={[2.4, 0, 0]}>
          <circleGeometry args={[0.06, 16]} />
          <meshBasicMaterial color={0xffffff} transparent blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[-3.2, 0, 0]}>
          <circleGeometry args={[0.05, 16]} />
          <meshBasicMaterial color={0xa855f7} transparent blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[0, 3.8, 0]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color={0xd8b4fe} transparent blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[0, -5.5, 0]}>
          <circleGeometry args={[0.035, 16]} />
          <meshBasicMaterial color={0xe879f9} transparent blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[5.5, 0, 0]}>
          <circleGeometry args={[0.03, 16]} />
          <meshBasicMaterial color={0xc084fc} transparent blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  );
}

// ─── Typewriter hook ─────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 35, active = false) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active) return;
    indexRef.current = 0;
    setDisplayed('');
    intervalRef.current = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        // restart
        setTimeout(() => {
          indexRef.current = 0;
          setDisplayed('');
        }, 2000);
      }
    }, speed);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [text, speed, active]);

  return displayed;
}

// ─── Main Loader ─────────────────────────────────────────────────────────────
export function Loader({ onComplete }: LoaderProps) {
  const [phase, setPhase] = useState<'init' | 'scan' | 'assembly' | 'active' | 'sync' | 'transition'>('init');
  const [logIndex, setLogIndex] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const typedCode = useTypewriter(CODE_TEXT, 30, phase === 'active' || phase === 'sync');

  // --- Audio Logic ---
  useEffect(() => {
    const audio = new Audio('/loader-sound.mp3');
    console.log("Loader audio created");
    
    audio.addEventListener('loadeddata', () => {
      console.log("Loader audio loaded");
    });
    
    audio.volume = 0;
    audio.loop = false;
    audioRef.current = audio;

    let interactionCleanup = () => {};

    const fadeInAudio = async () => {
      try {
        console.log("Loader audio playing");
        await audio.play();
        const start = performance.now();
        const fade = (time: number) => {
          const elapsed = time - start;
          if (elapsed < 500) {
            audio.volume = Math.min(0.35, (elapsed / 500) * 0.35);
            requestAnimationFrame(fade);
          } else {
            audio.volume = 0.35;
          }
        };
        requestAnimationFrame(fade);
      } catch (err) {
        console.log("Loader audio error", err);
        // Autoplay blocked; wait for user interaction
        const onInteract = () => {
          interactionCleanup();
          console.log("Loader audio playing after interaction");
          audio.play().then(() => {
            const start = performance.now();
            const fade = (time: number) => {
              const elapsed = time - start;
              if (elapsed < 500) {
                audio.volume = Math.min(0.35, (elapsed / 500) * 0.35);
                requestAnimationFrame(fade);
              } else {
                audio.volume = 0.35;
              }
            };
            requestAnimationFrame(fade);
          }).catch((e) => {
            console.log("Loader audio error after interaction", e);
          });
        };
        
        interactionCleanup = () => {
          window.removeEventListener('pointerdown', onInteract);
          window.removeEventListener('keydown', onInteract);
          window.removeEventListener('touchstart', onInteract);
          window.removeEventListener('click', onInteract);
        };
        
        window.addEventListener('pointerdown', onInteract);
        window.addEventListener('keydown', onInteract);
        window.addEventListener('touchstart', onInteract);
        window.addEventListener('click', onInteract);
      }
    };

    fadeInAudio();

    return () => {
      interactionCleanup();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  // Fade out on transition phase
  useEffect(() => {
    if (phase === 'transition' && audioRef.current) {
      const audio = audioRef.current;
      const startVol = audio.volume;
      const start = performance.now();
      
      const fadeOut = (time: number) => {
        const elapsed = time - start;
        if (elapsed < 700) {
          audio.volume = Math.max(0, startVol * (1 - elapsed / 700));
          requestAnimationFrame(fadeOut);
        } else {
          audio.volume = 0;
          audio.pause();
        }
      };
      requestAnimationFrame(fadeOut);
    }
  }, [phase]);

  useEffect(() => {
    // Always play the full loader — never skip
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, delay: number) => timeouts.push(setTimeout(fn, delay));

    // 0.8s: Scan
    t(() => setPhase('scan'), 800);

    // 2.0s: Assembly
    t(() => setPhase('assembly'), 2000);

    // 3.0s: Active (Logs & Progress)
    t(() => {
      setPhase('active');

      // Logs sequentially over 6.5 seconds (3.0 → 9.5s)
      const logInterval = 6500 / LOGS.length;
      let currentLog = 0;
      const lInt = setInterval(() => {
        setLogIndex(currentLog);
        // Trigger glitch effect for logs marked with glitch: true
        if (LOGS[currentLog]?.glitch) {
          setGlitchActive(true);
          setTimeout(() => setGlitchActive(false), 200);
        }
        currentLog++;
        if (currentLog >= LOGS.length) clearInterval(lInt);
      }, logInterval);
      timeouts.push(lInt as any);

      // Progress bar smoothly 0 → 100 over 8.5 seconds (3.0 → 11.5s)
      const startTime = Date.now();
      const pInt = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min((elapsed / 8500) * 100, 100);
        setProgress(Math.floor(p));
        if (p >= 100) clearInterval(pInt);
      }, 50);
      timeouts.push(pInt as any);
    }, 3000);

    // 11.5s: Sync
    t(() => setPhase('sync'), 11500);

    // 12.5s: Transition
    t(() => setPhase('transition'), 12500);

    // 14.0s: Complete
    t(() => onComplete(), 14000);

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  const isVisible      = phase !== 'init' && phase !== 'scan';
  const isTransitioning = phase === 'transition';

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black font-mono overflow-hidden transition-colors duration-1000 ${
        isTransitioning ? 'bg-transparent pointer-events-none' : ''
      }`}
    >
      {/* Stars */}
      <Stars />

      {/* Floating dust */}
      <FloatingParticles />

      {/* 0.0 – 0.8s: Tiny purple pixel flicker */}
      <AnimatePresence>
        {phase === 'init' && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[2px] bg-primary rounded-full shadow-[0_0_10px_#a855f7]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0.5, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* 0.8 – 2.0s: Scan line */}
      <AnimatePresence>
        {phase === 'scan' && (
          <motion.div
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary shadow-[0_0_20px_#a855f7]"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: [1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        )}
      </AnimatePresence>

      {/* Clean Background (No Vignettes/Grids) */}

      {/* Central 3D Reactor */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true, antialias: true }}>
          <ReactorCore phase={phase} progress={progress} glitchActive={glitchActive} />
        </Canvas>
      </div>

      {/* ── HUD OVERLAY ── */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible && !isTransitioning ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {/* Top Header */}
        <div className="flex justify-between items-start w-full">
          {/* Top-left branding */}
          <div className="flex flex-col gap-1">
            <h1 className="text-white text-lg md:text-xl font-bold tracking-[0.2em] flex items-center gap-1">
              KAUSTUBH SEN
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#a855f7] animate-pulse" />
            </h1>
            <span className="text-gray-500 text-xs md:text-sm tracking-widest font-mono">
              // Developer Portfolio
            </span>
          </div>

          {/* Top-right HUD status */}
          <div className="hidden sm:flex flex-col items-end gap-2">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-primary" />
              <motion.span
                className="text-primary text-xs tracking-[0.3em] uppercase"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Initializing Experience
              </motion.span>
              <TerminalSquare className="text-primary w-4 h-4" />
            </div>
            {/* Animated progress blocks */}
            <div className="flex gap-1">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 ${i < (progress / 100) * 12 ? 'bg-primary/80' : 'bg-white/10'}`}
                  animate={i < (progress / 100) * 12 ? { opacity: [0.6, 1, 0.6] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex-1 flex items-center justify-between w-full mt-10 mb-10 relative">

          {/* Left: Terminal Panel */}
          <div className="w-[33%] min-w-[320px] h-[440px] border border-white/5 bg-black/40 backdrop-blur-md p-6 hidden lg:flex flex-col rounded-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-white text-xs tracking-widest font-bold">&gt; SYSTEM.LOG</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </div>

            <div className="flex-1 flex flex-col gap-3 overflow-hidden text-[10px] xl:text-xs">
              {LOGS.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: i <= logIndex ? 1 : 0, x: i <= logIndex ? 0 : -10 }}
                  className="flex justify-between font-mono"
                >
                  <span className="text-gray-400">{log.text}</span>
                  <motion.span
                    className={`${log.statusClass} ${log.glitch ? 'drop-shadow-[0_0_5px_#ef4444]' : ''}`}
                    animate={i === logIndex ? { opacity: [0, 1, 0.7, 1] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    {log.status}
                  </motion.span>
                </motion.div>
              ))}

              <motion.div
                className="w-full h-[1px] bg-white/10 my-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: logIndex >= LOGS.length - 1 ? 1 : 0 }}
              />

              {/* Typewriter code snippet */}
              <div className="font-mono text-[10px] xl:text-xs leading-relaxed">
                <span className="text-purple-400">const</span>{' '}
                <span className="text-blue-400">kaustubh</span> = {'{\n'}
                {typedCode.split('\n').slice(1).map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {'\n'}
                  </React.Fragment>
                ))}
                <motion.span
                  className="inline-block w-1.5 h-3 bg-primary align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              </div>
            </div>

            {/* Top reflection */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Center: KS Text + Progress */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-none z-20">
            <h2 className="text-7xl md:text-8xl lg:text-[140px] font-sans font-bold text-white tracking-tighter mix-blend-plus-lighter mb-6 md:mb-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              KS
            </h2>
            <div className="flex flex-col items-center gap-2">
              <span className="text-white text-[10px] md:text-xs tracking-[0.4em] font-mono">LOADING PORTFOLIO</span>
              <motion.span
                className="text-primary text-lg md:text-xl font-bold font-mono drop-shadow-[0_0_8px_#a855f7]"
                animate={{ textShadow: ['0 0 8px #a855f7', '0 0 20px #a855f7', '0 0 8px #a855f7'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {progress}%
              </motion.span>
            </div>
          </div>

          {/* Right: Quote HUD Card */}
          <motion.div
            className="w-[20%] min-w-[220px] border border-primary/30 bg-black/40 backdrop-blur-md p-6 hidden lg:flex flex-col rounded-sm relative overflow-hidden"
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: phase === 'active' || phase === 'sync' ? 1 : 0 }}
            transition={{ duration: 0.8, ease: 'circOut', delay: 1 }}
          >
            <Quote className="text-primary w-8 h-8 mb-6 opacity-80" />
            <p className="text-white font-serif text-lg xl:text-xl leading-relaxed mb-8">
              Code is the<br />
              closest thing<br />
              to <span className="text-primary drop-shadow-[0_0_8px_#a855f7]">magic.</span>
            </p>
            <p className="text-gray-400 font-mono text-[10px] xl:text-xs leading-loose mb-10">
              I just use logic<br />
              instead of spells.
            </p>
            <p className="text-primary font-mono text-[10px] xl:text-xs tracking-widest flex items-center gap-2">
              <span className="w-3 h-[1px] bg-primary" /> Kaustubh Sen
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
          </motion.div>
        </div>

        {/* Bottom Elements */}
        <div className="flex justify-between items-end w-full">
          {/* Bottom-left socials */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
            <a href="https://github.com/kstbh07" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-colors cursor-none pointer-events-auto">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/kaustubhsenwrks/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-colors cursor-none pointer-events-auto">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:kaustubhsen2707@gmail.com" className="text-gray-400 hover:text-primary transition-colors cursor-none pointer-events-auto">
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Bottom-center status */}
          <div className="absolute left-1/2 bottom-10 -translate-x-1/2 flex flex-col items-center gap-4">
            <motion.span
              className="text-primary font-mono tracking-[0.2em] text-[10px] md:text-xs font-bold drop-shadow-[0_0_8px_#a855f7]"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {phase === 'transition' ? 'WELCOME, HUMAN' : phase === 'sync' ? 'IDENTITY VERIFIED' : 'SYSTEM INITIALIZING'}
            </motion.span>
            <div className="flex gap-2">
              <div className="w-1 h-1 bg-primary rounded-full animate-ping" />
              <div className="w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '150ms' }} />
              <div className="w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '300ms' }} />
            </div>
          </div>

          {/* Bottom-right tagline */}
          <div className="text-gray-500 font-mono text-[10px] md:text-xs tracking-widest hidden sm:block">
            P.S. Great things take time. <span className="text-primary">💜</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
