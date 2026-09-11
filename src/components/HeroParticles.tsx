"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

export default function HeroParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[2] opacity-80">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* Partikel Debu/Bintang Melayang 3D */}
        <Sparkles
          count={120} // Jumlah partikel
          scale={[12, 10, 10]} // Area sebaran 3D (X, Y, Z)
          size={2.5} // Ukuran partikel
          speed={0.4} // Kecepatan melayang
          opacity={0.6} // Transparansi
          color="#ffffff" // Warna bintang
        />
      </Canvas>
    </div>
  );
}
