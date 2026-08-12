"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Lattice({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current) {
      group.current.rotation.y = s.clock.elapsedTime * 0.25;
      group.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1.2} floatIntensity={0.5}>
      <group ref={group}>
        {[-1, 0, 1].map((x) =>
          [-1, 0, 1].map((y) => (
            <mesh key={`${x}-${y}`} position={[x * 0.7, y * 0.7, 0]}>
              <boxGeometry args={[0.35, 0.35, 0.35]} />
              <meshStandardMaterial
                color={color}
                metalness={0.7}
                roughness={0.2}
                transparent
                opacity={0.9}
              />
            </mesh>
          ))
        )}
      </group>
    </Float>
  );
}

function Orb({ color }: { color: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (mesh.current) {
      mesh.current.rotation.x = s.clock.elapsedTime * 0.2;
      mesh.current.rotation.y = s.clock.elapsedTime * 0.35;
    }
  });
  return (
    <Float speed={1.4} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.15, 1]} />
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={1.6}
          metalness={0.65}
          roughness={0.18}
        />
      </mesh>
    </Float>
  );
}

function Rings({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current) group.current.rotation.z = s.clock.elapsedTime * 0.35;
  });
  return (
    <Float speed={1} floatIntensity={0.4}>
      <group ref={group} rotation={[0.6, 0.3, 0]}>
        {[0.6, 0.95, 1.3].map((r, i) => (
          <mesh key={r} rotation={[Math.PI / 2, 0, i * 0.4]}>
            <torusGeometry args={[r, 0.045, 16, 64]} />
            <meshStandardMaterial
              color={color}
              metalness={0.8}
              roughness={0.15}
              emissive={color}
              emissiveIntensity={0.15}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Scene({
  variant,
  color,
}: {
  variant: "orb" | "lattice" | "rings";
  color: string;
}) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 3]} intensity={1.1} />
      <pointLight position={[-3, 2, 2]} intensity={0.7} color={color} />
      {variant === "orb" && <Orb color={color} />}
      {variant === "lattice" && <Lattice color={color} />}
      {variant === "rings" && <Rings color={color} />}
    </>
  );
}

export default function ProjectVisual({
  variant,
  color,
}: {
  variant: "orb" | "lattice" | "rings";
  color: string;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Scene variant={variant} color={color} />
    </Canvas>
  );
}
