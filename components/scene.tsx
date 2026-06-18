"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Model() {
  const mesh = useRef<Mesh>(null);
  useFrame((_, delta) => { if (mesh.current) mesh.current.rotation.y += delta * 0.08; });
  return <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}><mesh ref={mesh} rotation={[0.4, 0.2, 0.4]}><torusKnotGeometry args={[1, 0.025, 180, 12]} /><meshStandardMaterial color="#c8b79f" metalness={0.6} roughness={0.25} /></mesh></Float>;
}

export default function Scene() {
  return <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]}><ambientLight intensity={1.5} /><pointLight position={[3, 3, 3]} intensity={4} /><Model /></Canvas>;
}
