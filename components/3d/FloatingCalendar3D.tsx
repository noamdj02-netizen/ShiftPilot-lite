'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

export function FloatingCalendar3D() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })
  
  const days = ['L', 'M', 'Me', 'J', 'V', 'S', 'D']
  const shifts = [
    [1, 1, 1, 0, 1, 0, 0], // Employé 1
    [0, 1, 1, 1, 1, 0, 0], // Employé 2
    [1, 0, 1, 1, 0, 1, 0], // Employé 3
    [0, 1, 0, 1, 1, 1, 0], // Employé 4
  ]
  
  return (
    <group ref={groupRef}>
      {/* Base du calendrier */}
      <RoundedBox
        args={[3.5, 2.5, 0.1]}
        radius={0.1}
        smoothness={4}
      >
        <meshStandardMaterial 
          color="#ffffff"
          transparent
          opacity={0.95}
        />
      </RoundedBox>
      
      {/* Header */}
      <RoundedBox
        args={[3.5, 0.4, 0.12]}
        position={[0, 0.95, 0.02]}
        radius={0.05}
      >
        <meshStandardMaterial color="#10b981" />
      </RoundedBox>
      
      <Text
        position={[0, 0.95, 0.1]}
        fontSize={0.15}
        color="#ffffff"
      >
        Planning Semaine 48
      </Text>
      
      {/* Jours de la semaine */}
      {days.map((day, i) => (
        <Text
          key={`day-${i}`}
          position={[-1.4 + i * 0.45, 0.55, 0.06]}
          fontSize={0.1}
          color="#64748b"
        >
          {day}
        </Text>
      ))}
      
      {/* Grille de shifts */}
      {shifts.map((row, rowIndex) => (
        row.map((hasShift, colIndex) => (
          <RoundedBox
            key={`cell-${rowIndex}-${colIndex}`}
            args={[0.35, 0.3, 0.05]}
            position={[-1.4 + colIndex * 0.45, 0.15 - rowIndex * 0.4, 0.05]}
            radius={0.03}
          >
            <meshStandardMaterial 
              color={hasShift ? '#10b981' : '#f1f5f9'}
              transparent
              opacity={hasShift ? 0.9 : 0.5}
            />
          </RoundedBox>
        ))
      ))}
      
      {/* Noms des employés (simplifiés) */}
      {['Marie', 'Lucas', 'Emma', 'Hugo'].map((name, i) => (
        <Text
          key={`name-${i}`}
          position={[-2, 0.15 - i * 0.4, 0.06]}
          fontSize={0.08}
          color="#334155"
          anchorX="right"
        >
          {name}
        </Text>
      ))}
    </group>
  )
}

