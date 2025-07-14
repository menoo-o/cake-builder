"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"
import type { CakeConfig } from "@/app/page"

interface CakeModelProps {
  config: CakeConfig
}

export function CakeModel({ config }: CakeModelProps) {
  const cakeRef = useRef<Mesh>(null)
  const fillingRef = useRef<Mesh>(null)

  // Gentle rotation animation
  useFrame((state) => {
    if (cakeRef.current) {
      cakeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  // Calculate size based on diameter
  const getRadius = () => {
    switch (config.size) {
      case "6":
        return 1.5
      case "8":
        return 2
      case "10":
        return 2.5
      default:
        return 2
    }
  }

  // Get sponge color
  const getSpongeColor = () => {
    switch (config.sponge) {
      case "vanilla":
        return "#F5E6A3"
      case "chocolate":
        return "#8B4513"
      default:
        return "#F5E6A3"
    }
  }

  // Get filling color
  const getFillingColor = () => {
    switch (config.filling) {
      case "chocolate-buttercream":
        return "#6B4423"
      case "cream-cheese":
        return "#FFF8DC"
      case "vanilla-buttercream":
        return "#F5E6A3"
      default:
        return "#6B4423"
    }
  }

  const radius = getRadius()
  const height = 1.2

  return (
    <group position={[0, 0, 0]}>
      {/* Main Cake Body */}
      <mesh ref={cakeRef} position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, 32]} />
        <meshStandardMaterial color={getSpongeColor()} roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Filling Layer (visible as a thin band) */}
      <mesh ref={fillingRef} position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[radius * 0.95, radius * 0.95, 0.1, 32]} />
        <meshStandardMaterial color={getFillingColor()} roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Top Frosting Layer */}
      <mesh position={[0, height / 2 + 0.05, 0]} castShadow>
        <cylinderGeometry args={[radius * 1.02, radius * 1.02, 0.1, 32]} />
        <meshStandardMaterial color={getFillingColor()} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Decorative Edge */}
      <mesh position={[0, height / 2 + 0.1, 0]}>
        <torusGeometry args={[radius * 0.9, 0.05, 8, 32]} />
        <meshStandardMaterial color={getFillingColor()} roughness={0.3} metalness={0.3} />
      </mesh>

      {/* Size Indicator Text (floating above cake) */}
      <group position={[0, height + 1, 0]}>
        <mesh>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial color="#FF69B4" emissive="#FF1493" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </group>
  )
}
