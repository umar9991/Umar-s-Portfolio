"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Spiral({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (group.current) group.current.rotation.y += d * 0.4;
  });
  return (
    <Float speed={1.3} floatIntensity={0.7}>
      <group ref={group}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(i * 0.7) * (0.35 + i * 0.08),
              (i - 3.5) * 0.18,
              Math.sin(i * 0.7) * (0.35 + i * 0.08),
            ]}
            rotation={[0.4, i * 0.4, 0.2]}
          >
            <boxGeometry args={[0.55, 0.08, 0.9]} />
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.22} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Cylinders({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current) group.current.rotation.y = s.clock.elapsedTime * 0.3;
  });
  const shades = [color, "#BFDBFE", "#64748B"];
  return (
    <Float speed={1.1} floatIntensity={0.5}>
      <group ref={group} position={[0, -0.2, 0]}>
        {shades.map((c, i) => (
          <mesh key={c} position={[(i - 1) * 0.65, i === 1 ? 0.12 : 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 1.35 + i * 0.12, 32]} />
            <meshStandardMaterial color={c} metalness={0.7} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Screens({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.45) * 0.35;
    }
  });
  return (
    <Float speed={1.4} floatIntensity={0.6}>
      <group ref={group}>
        <mesh position={[-0.45, 0.15, 0]} rotation={[0.12, -0.3, 0]}>
          <boxGeometry args={[0.85, 1.25, 0.05]} />
          <meshStandardMaterial color={color} metalness={0.45} roughness={0.28} />
        </mesh>
        <mesh position={[0.5, -0.1, 0.25]} rotation={[-0.1, 0.35, 0.08]}>
          <boxGeometry args={[0.65, 0.95, 0.05]} />
          <meshStandardMaterial color="#E0E7FF" metalness={0.4} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

export default function ExpertiseScene({
  variant,
  color,
}: {
  variant: "spiral" | "cylinders" | "screens";
  color: string;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 4, 4]} intensity={1} />
      <pointLight position={[-2, 2, 3]} intensity={0.6} color={color} />
      {variant === "spiral" && <Spiral color={color} />}
      {variant === "cylinders" && <Cylinders color={color} />}
      {variant === "screens" && <Screens color={color} />}
    </Canvas>
  );
}
