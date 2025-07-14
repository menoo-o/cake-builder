'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Cake() {
  const cakeRef = useRef(null)
  
  // Rotate cake slightly for better view
  useFrame(() => {
    cakeRef.current.rotation.y += 0.002
  })

  // Cake dimensions
  const radius = 2
  const height = 1
  const sliceAngle = Math.PI / 6 // 30 degrees slice

  // Create cake geometry with missing slice
  const createCakeGeometry = () => {
    // Main cake body (torus for rounded edges)
    const cakeGeometry = new THREE.TorusGeometry(radius, 0.5, 16, 32, Math.PI * 2 - sliceAngle)
    cakeGeometry.rotateY(Math.PI / 2 + sliceAngle / 2)
    cakeGeometry.translate(0, height / 2, 0)

    // Top icing
    const topIcingGeometry = new THREE.CylinderGeometry(radius - 0.05, radius - 0.05, 0.05, 32, 1, true, 0, Math.PI * 2 - sliceAngle)
    topIcingGeometry.rotateY(sliceAngle / 2)
    topIcingGeometry.translate(0, height, 0)

    // Exposed layers
    const layersGeometry = new THREE.BufferGeometry()
    const layerHeight = height / 5
    const positions = []
    const colors = []
    const color1 = new THREE.Color(0xd45d79) // Red velvet
    const color2 = new THREE.Color(0xf0e0d6) // Cream

    // Create 5 layers with alternating colors
    for (let i = 0; i < 5; i++) {
      const y = (i * layerHeight)
      const angleStart = -sliceAngle / 2
      const angleEnd = sliceAngle / 2
      
      // Create vertices for the layer slice
      for (let j = 0; j <= 8; j++) {
        const angle = angleStart + (angleEnd - angleStart) * (j / 8)
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        positions.push(x, y, z)
        positions.push(x, y + layerHeight, z)
        
        const color = i % 2 === 0 ? color1 : color2
        colors.push(color.r, color.g, color.b)
        colors.push(color.r, color.g, color.b)
      }
    }

    // Add the flat face of the slice
    for (let i = 0; i < 5; i++) {
      const y = i * layerHeight
      positions.push(radius, y, 0)
      positions.push(radius, y + layerHeight, 0)
      positions.push(Math.cos(-sliceAngle/2) * radius, y, Math.sin(-sliceAngle/2) * radius)
      positions.push(Math.cos(-sliceAngle/2) * radius, y + layerHeight, Math.sin(-sliceAngle/2) * radius)
      
      const color = i % 2 === 0 ? color1 : color2
      for (let j = 0; j < 4; j++) {
        colors.push(color.r, color.g, color.b)
      }
    }

    layersGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    layersGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    layersGeometry.computeVertexNormals()

    return { cakeGeometry, topIcingGeometry, layersGeometry }
  }

  const { cakeGeometry, topIcingGeometry, layersGeometry } = createCakeGeometry()

  return (
    <group ref={cakeRef}>
      {/* Main cake body */}
      <mesh geometry={cakeGeometry} position={[0, 0, 0]}>
        <meshStandardMaterial color={0xf8c8dc} roughness={0.3} />
      </mesh>
      
      {/* Top icing */}
      <mesh geometry={topIcingGeometry} position={[0, 0, 0]}>
        <meshStandardMaterial color={0xffffff} roughness={0.1} />
      </mesh>
      
      {/* Exposed layers */}
      <mesh geometry={layersGeometry} position={[0, 0, 0]}>
        <meshStandardMaterial vertexColors side={THREE.DoubleSide} roughness={0.5} />
      </mesh>
    </group>
  )
}

export default function FakeCakeScene() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <Cake />
        <OrbitControls enableZoom={true} enablePan={true} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}