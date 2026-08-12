"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function HeroMesh() {
  const mesh = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.x = t * 0.18;
      mesh.current.rotation.y = t * 0.28;
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.4;
      ring.current.rotation.x = 0.6 + Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-4, 2, 3]} intensity={1.2} color="#5EEAD4" />
      <pointLight position={[3, -2, 2]} intensity={0.5} color="#93C5FD" />

      <Float speed={1.3} floatIntensity={0.9} rotationIntensity={0.25}>
        <mesh ref={mesh} position={[0.2, 0.1, 0]}>
          <icosahedronGeometry args={[1.35, 1]} />
          <MeshDistortMaterial
            color="#5EEAD4"
            distort={0.38}
            speed={1.8}
            metalness={0.7}
            roughness={0.12}
          />
        </mesh>
      </Float>

      <mesh ref={ring} position={[0.2, 0.1, 0]}>
        <torusGeometry args={[2.05, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#93C5FD"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.55}
        />
      </mesh>
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <HeroMesh />
    </Canvas>
  );
}
