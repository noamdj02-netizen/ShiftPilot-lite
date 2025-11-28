'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

interface ShiftCardProps {
  position: [number, number, number]
  color: string
  name: string
  time: string
  delay: number
}

function ShiftCard({ position, color, name, time, delay }: ShiftCardProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.1
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.05
    }
  })
  
  return (
    <group ref={meshRef as any} position={position}>
      <RoundedBox args={[1, 0.5, 0.05]} radius={0.05}>
        <meshStandardMaterial color={color} transparent opacity={0.9} />
      </RoundedBox>
      <Text
        position={[0, 0.08, 0.03]}
        fontSize={0.08}
        color="#ffffff"
      >
        {name}
      </Text>
      <Text
        position={[0, -0.1, 0.03]}
        fontSize={0.06}
        color="#ffffff"
      >
        {time}
      </Text>
    </group>
  )
}

export function FloatingShiftCards() {
  const cards = [
    { position: [-2.5, 1.5, -1] as [number, number, number], color: '#10b981', name: 'Marie D.', time: '9h - 17h', delay: 0 },
    { position: [2.5, 1, -1.5] as [number, number, number], color: '#3b82f6', name: 'Lucas M.', time: '14h - 22h', delay: 1 },
    { position: [-2, -1, -0.5] as [number, number, number], color: '#f59e0b', name: 'Emma L.', time: '11h - 19h', delay: 2 },
    { position: [2.2, -1.2, -1] as [number, number, number], color: '#8b5cf6', name: 'Hugo R.', time: '17h - 23h', delay: 3 },
  ]
  
  return (
    <group>
      {cards.map((card, i) => (
        <ShiftCard key={i} {...card} />
      ))}
    </group>
  )
}

