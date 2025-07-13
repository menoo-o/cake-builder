"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { CakeModel } from "./cake-model"
import type { CakeConfig } from "@/app/page"

interface CakeBuilder3DProps {
  config: CakeConfig
}

export function CakeBuilder3D({ config }: CakeBuilder3DProps) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-50 to-white">
      <Canvas camera={{ position: [0, 5, 8], fov: 45 }} shadows>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        {/* Environment */}
        <Environment preset="studio" />

        {/* Cake Model */}
        <CakeModel config={config} />

        {/* Ground Shadow */}
        <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={10} blur={2} far={4} />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={5}
          maxDistance={15}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
