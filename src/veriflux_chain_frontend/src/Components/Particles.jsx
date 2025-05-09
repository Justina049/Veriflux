import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

const ParticlePoints = () => {
  const pointsRef = useRef();

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  const particles = new Float32Array(
    new Array(1000).fill().flatMap(() => [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
    ])
  );

  return (
    <Points ref={pointsRef} positions={particles}>
      <PointMaterial size={0.05} color="#FFD700" transparent opacity={0.8} />
    </Points>
  );
};

const Particles = () => {
  return (
    <Canvas className="particles">
      <ParticlePoints />
    </Canvas>
  );
};

export default Particles;
