"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

type CakeConfig = {
  size: "6" | "8" | "10" | null
  sponge: "vanilla" | "red-velvet" | "chocolate" | "salted-caramel" | "lemon" | null
  filling: "pink" | "blue" | "yellow" | null
  extras: string[]
}


interface CakeSceneProps {
  config: CakeConfig
}

export function CakeScene({ config }: CakeSceneProps) {
  const cakeRef = useRef<Mesh>(null)

  /* gentle Y rotation */
  useFrame((state) => {
    if (cakeRef.current){ 
     cakeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
    })

  /* === dimensions & colours ======================================= */
  const cakeScale = useMemo(() => {
    switch (config.size) {
      case "6":
        return 0.8
      case "8":
        return 1.0
      case "10":
        return 1.2
      default:
        return 1
    }
  }, [config.size])

  const spongeColor = useMemo(() => {
    switch (config.sponge) {
      case "vanilla":
        return "#FFF8DC"
      case "red-velvet":
        return "#DC143C"
      case "chocolate":
        return "#8B4513"
      case "salted-caramel":
        return "#DEB887"
      case "lemon":
        return "#FFFF99"
      default:
        return "#FFF8DC"
    }
  }, [config.sponge])

  const fillingColor = useMemo(() => {
    switch (config.filling) {
      case "pink":
        return "#FFB6C1"
      case "blue":
        return "#87CEEB"
      case "yellow":
        return "#FFFF99"
      default:
        return "#FFB6C1"
    }
  }, [config.filling])

  /* === SCENE ======================================================= */
  if (!config.size) {
    /* placeholder plinth before the user picks a size */
    return (
      <mesh>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    )
  }

  return (
    <group ref={cakeRef} scale={cakeScale}>
      {/* outer icing */}
      <mesh>
        <cylinderGeometry args={[1, 1, 1, 64]} />
        <meshStandardMaterial color="#F5DEB3" />
      </mesh>

      {/* sponge core */}
      {config.sponge && (
        <mesh>
          <cylinderGeometry args={[0.9, 0.9, 0.9, 64]} />
          <meshStandardMaterial color={spongeColor} />
        </mesh>
      )}

      {/* filling */}
      {config.filling && (
        <mesh>
          <cylinderGeometry args={[0.85, 0.85, 0.1, 64]} />
          <meshStandardMaterial color={fillingColor} />
        </mesh>
      )}

      {/* slice cut-out */}
      {config.size && (
        <mesh position={[0.35, 0, 0.35]} rotation={[0, Math.PI / 4, 0]}>
          {/* invisible geometry to mask slice – depthWrite false keeps outer icing edges clean */}
          <boxGeometry args={[1.2, 1.2, 0.16]} />
          <meshStandardMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      )}
    </group>
  )
}
