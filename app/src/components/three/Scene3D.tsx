"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  Float,
  MeshTransmissionMaterial,
  Icosahedron,
  TorusKnot,
  Sphere,
  AdaptiveDpr,
  PerformanceMonitor,
} from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ *
 * A cinematic, premium 3D backdrop — metallic + glass forms drifting
 * in deep space, gently reacting to the pointer. GPU-light: a handful
 * of meshes, adaptive DPR, and it degrades on weak devices.
 * ------------------------------------------------------------------ */

function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });
  const { gl } = useThree();
  useMemo(() => {
    const el = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.current.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl]);
  return pointer;
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const pointer = usePointer();
  useFrame((_, dt) => {
    if (!group.current) return;
    // parallax follow — subtle, damped
    group.current.rotation.y +=
      (pointer.current.x * 0.25 - group.current.rotation.y) *
      Math.min(1, dt * 2);
    group.current.rotation.x +=
      (-pointer.current.y * 0.15 - group.current.rotation.x) *
      Math.min(1, dt * 2);
  });
  return <group ref={group}>{children}</group>;
}

function MetalKnot() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * 0.15;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.6} floatIntensity={1.4}>
      <TorusKnot ref={ref} args={[1.05, 0.32, 220, 32]} position={[-3.1, 0.6, -1]}>
        <meshStandardMaterial
          color="#8b7bff"
          metalness={1}
          roughness={0.18}
          envMapIntensity={1.4}
        />
      </TorusKnot>
    </Float>
  );
}

function GlassGem() {
  return (
    <Float speed={0.9} rotationIntensity={1.2} floatIntensity={1.8}>
      <Icosahedron args={[1.25, 0]} position={[3.2, -0.4, -0.5]}>
        <MeshTransmissionMaterial
          thickness={0.8}
          roughness={0.05}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.06}
          backside
          color="#c9b8ff"
          resolution={256}
          samples={6}
        />
      </Icosahedron>
    </Float>
  );
}

function CopperSphere() {
  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.2}>
      <Sphere args={[0.55, 48, 48]} position={[1.4, 2.1, -2.5]}>
        <meshStandardMaterial
          color="#f6a94a"
          metalness={1}
          roughness={0.25}
          envMapIntensity={1.2}
        />
      </Sphere>
    </Float>
  );
}

function ChromeShards() {
  const items = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        pos: [
          (Math.random() - 0.5) * 11,
          (Math.random() - 0.5) * 7,
          -3 - Math.random() * 4,
        ] as [number, number, number],
        scale: 0.18 + Math.random() * 0.28,
        speed: 0.6 + Math.random(),
        key: i,
      })),
    []
  );
  return (
    <>
      {items.map((it) => (
        <Float
          key={it.key}
          speed={it.speed}
          rotationIntensity={1.4}
          floatIntensity={1.6}
        >
          <Icosahedron args={[it.scale, 0]} position={it.pos}>
            <meshStandardMaterial
              color="#a9b6ff"
              metalness={0.95}
              roughness={0.3}
              envMapIntensity={1}
            />
          </Icosahedron>
        </Float>
      ))}
    </>
  );
}

function SceneContents() {
  return (
    <>
      <color attach="background" args={["#12101f"]} />
      <fog attach="fog" args={["#12101f", 8, 22]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={2.2} color="#cdd4ff" />
      <pointLight position={[-6, -2, 2]} intensity={40} color="#7c5cff" />
      <pointLight position={[6, 3, -2]} intensity={30} color="#f6a94a" />

      <Rig>
        <MetalKnot />
        <GlassGem />
        <CopperSphere />
        <ChromeShards />
      </Rig>

      {/* Self-contained lighting environment — no external HDR fetch, so the
          metallic/glass reflections work fully offline and in the preview. */}
      <Environment resolution={256}>
        <Lightformer
          intensity={2.2}
          color="#cdd4ff"
          position={[0, 4, -6]}
          scale={[12, 6, 1]}
        />
        <Lightformer
          intensity={1.6}
          color="#7c5cff"
          position={[-6, -2, 2]}
          scale={[8, 8, 1]}
        />
        <Lightformer
          intensity={1.4}
          color="#f6a94a"
          position={[6, 2, 3]}
          scale={[6, 6, 1]}
        />
        <Lightformer
          intensity={1}
          color="#ffffff"
          position={[0, -6, 0]}
          scale={[10, 10, 1]}
        />
      </Environment>
    </>
  );
}

export default function Scene3D({ className }: { className?: string }) {
  const [dpr, setDpr] = useState(1.5);
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 7], fov: 42 }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(1.75)}
        />
        <AdaptiveDpr pixelated />
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}
