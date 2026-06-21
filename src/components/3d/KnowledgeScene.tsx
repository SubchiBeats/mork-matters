import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Icosahedron, Torus, Html } from '@react-three/drei';
import * as THREE from 'three';
import { CATEGORIES } from '@/data/categories';
import { useAppStore } from '@/store/appStore';
import { hasWebGL } from './webgl';

function Planet({ night }: { night: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const reduced = useAppStore((s) => s.settings.reducedMotion);
  useFrame((_, delta) => {
    if (ref.current && !reduced) ref.current.rotation.y += delta * 0.15;
  });
  return (
    <Icosahedron ref={ref} args={[1.35, 4]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color={night ? '#4f46e5' : '#6366f1'}
        emissive={night ? '#1e1b4b' : '#312e81'}
        emissiveIntensity={night ? 0.6 : 0.35}
        roughness={0.35}
        metalness={0.6}
        flatShading
      />
    </Icosahedron>
  );
}

function CategoryOrb({
  index,
  total,
  color,
  glyph,
}: {
  index: number;
  total: number;
  color: string;
  glyph: string;
}) {
  const ref = useRef<THREE.Group>(null);
  const reduced = useAppStore((s) => s.settings.reducedMotion);
  const radius = 3.1;
  const speed = 0.12 + (index % 3) * 0.03;
  const phase = (index / total) * Math.PI * 2;
  const tilt = (index % 4) * 0.25 - 0.4;

  useFrame((state) => {
    if (!ref.current) return;
    const t = reduced ? phase : state.clock.elapsedTime * speed + phase;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 1.3 + tilt) * 0.9 + tilt,
      Math.sin(t) * radius,
    );
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.3} />
      </mesh>
      <Html center distanceFactor={9} occlude>
        <div className="select-none text-lg" style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.6))' }}>
          {glyph}
        </div>
      </Html>
    </group>
  );
}

function Rig({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const reduced = useAppStore((s) => s.settings.reducedMotion);
  useFrame((state) => {
    if (reduced) return;
    const p = pointer.current;
    state.camera.position.x += (p.x * 1.2 - state.camera.position.x) * 0.04;
    state.camera.position.y += (p.y * 0.8 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function SceneContents({ night }: { night: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });

  const orbs = useMemo(
    () =>
      CATEGORIES.slice(0, 10).map((c, i) => ({
        key: c.id,
        index: i,
        color: c.accent,
        glyph: c.glyph,
      })),
    [],
  );

  return (
    <group
      onPointerMove={(e) => {
        pointer.current.x = (e.pointer?.x ?? 0) * 1.5;
        pointer.current.y = (e.pointer?.y ?? 0) * 1.5;
      }}
    >
      <ambientLight intensity={night ? 0.25 : 0.5} />
      <pointLight position={[5, 5, 5]} intensity={night ? 1.2 : 1.6} color="#a5b4fc" />
      <pointLight position={[-6, -3, -4]} intensity={0.8} color="#e879f9" />

      <Stars radius={60} depth={40} count={night ? 2600 : 1400} factor={4} saturation={0} fade speed={0.5} />

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <Planet night={night} />
        <Torus args={[2.1, 0.02, 16, 100]} rotation={[Math.PI / 2.4, 0, 0]}>
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8} />
        </Torus>
      </Float>

      {orbs.map((o) => (
        <CategoryOrb key={o.key} index={o.index} total={orbs.length} color={o.color} glyph={o.glyph} />
      ))}

      <Rig pointer={pointer} />
    </group>
  );
}

export function KnowledgeScene({ className = '' }: { className?: string }) {
  const theme = useAppStore((s) => s.theme);
  const [supported] = useState(() => hasWebGL());
  const night = theme === 'dark';

  if (!supported) {
    return <SceneFallback className={className} />;
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <SceneContents night={night} />
        </Suspense>
      </Canvas>
    </div>
  );
}

/** Pure-CSS fallback for devices without usable WebGL. */
export function SceneFallback({ className = '' }: { className?: string }) {
  return (
    <div className={`relative grid place-items-center ${className}`}>
      <div className="relative h-56 w-56">
        <div className="absolute inset-0 animate-float rounded-full bg-gradient-to-br from-nebula-500 to-magenta-500 shadow-glow" />
        <div className="absolute inset-0 rounded-full border border-aurora-400/50" style={{ transform: 'rotate(20deg) scaleY(0.35)' }} />
        {CATEGORIES.slice(0, 8).map((c, i) => (
          <span
            key={c.id}
            className="absolute text-2xl"
            style={{
              left: `${50 + 46 * Math.cos((i / 8) * Math.PI * 2)}%`,
              top: `${50 + 46 * Math.sin((i / 8) * Math.PI * 2)}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {c.glyph}
          </span>
        ))}
      </div>
    </div>
  );
}
