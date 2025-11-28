'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export function FloatingCalendar3D() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Rotation très subtile et lente
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.03
    }
  })
  
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  const employees = ['Marie D.', 'Lucas M.', 'Emma L.', 'Hugo R.']
  
  // Planning réaliste avec horaires
  const shifts = [
    { employee: 0, day: 0, start: '9h', end: '17h' },
    { employee: 0, day: 1, start: '9h', end: '17h' },
    { employee: 0, day: 2, start: '9h', end: '17h' },
    { employee: 0, day: 4, start: '9h', end: '17h' },
    { employee: 1, day: 1, start: '14h', end: '22h' },
    { employee: 1, day: 2, start: '14h', end: '22h' },
    { employee: 1, day: 3, start: '14h', end: '22h' },
    { employee: 1, day: 4, start: '14h', end: '22h' },
    { employee: 2, day: 0, start: '11h', end: '19h' },
    { employee: 2, day: 2, start: '11h', end: '19h' },
    { employee: 2, day: 3, start: '11h', end: '19h' },
    { employee: 2, day: 5, start: '11h', end: '19h' },
    { employee: 3, day: 1, start: '17h', end: '23h' },
    { employee: 3, day: 3, start: '17h', end: '23h' },
    { employee: 3, day: 4, start: '17h', end: '23h' },
    { employee: 3, day: 5, start: '17h', end: '23h' },
  ]
  
  // Créer une grille pour chaque cellule
  const hasShift = (employeeIndex: number, dayIndex: number) => {
    return shifts.some(s => s.employee === employeeIndex && s.day === dayIndex)
  }
  
  return (
    <group ref={groupRef}>
      {/* Fond du planning - Style professionnel */}
      <RoundedBox
        args={[4, 3, 0.05]}
        radius={0.08}
        smoothness={4}
      >
        <meshStandardMaterial 
          color="#ffffff"
          metalness={0.1}
          roughness={0.3}
        />
      </RoundedBox>
      
      {/* Header - Style tableau */}
      <RoundedBox
        args={[4, 0.5, 0.06]}
        position={[0, 1.15, 0.03]}
        radius={0.05}
      >
        <meshStandardMaterial 
          color="#1e293b"
          metalness={0.2}
          roughness={0.4}
        />
      </RoundedBox>
      
      {/* Ligne de séparation header */}
      <RoundedBox
        args={[4, 0.02, 0.04]}
        position={[0, 0.85, 0.03]}
        radius={0.01}
      >
        <meshStandardMaterial color="#e2e8f0" />
      </RoundedBox>
      
      {/* Colonne des noms */}
      <RoundedBox
        args={[0.8, 2, 0.04]}
        position={[-1.5, -0.15, 0.03]}
        radius={0.03}
      >
        <meshStandardMaterial 
          color="#f8fafc"
          metalness={0.1}
          roughness={0.4}
        />
      </RoundedBox>
      
      {/* Jours de la semaine - Header */}
      {days.map((day, i) => (
        <RoundedBox
          key={`day-${i}`}
          args={[0.45, 0.35, 0.04]}
          position={[-1.1 + i * 0.45, 0.7, 0.03]}
          radius={0.02}
        >
          <meshStandardMaterial 
            color="#f1f5f9"
            metalness={0.1}
            roughness={0.4}
          />
        </RoundedBox>
      ))}
      
      {/* Grille de shifts - Style professionnel */}
      {employees.map((_, employeeIndex) => (
        days.map((_, dayIndex) => {
          const shift = shifts.find(s => s.employee === employeeIndex && s.day === dayIndex)
          const isActive = !!shift
          
          return (
            <RoundedBox
              key={`cell-${employeeIndex}-${dayIndex}`}
              args={[0.42, 0.35, 0.04]}
              position={[-1.1 + dayIndex * 0.45, 0.35 - employeeIndex * 0.4, 0.03]}
              radius={0.02}
            >
              <meshStandardMaterial 
                color={isActive ? '#3b82f6' : '#f8fafc'}
                metalness={isActive ? 0.3 : 0.1}
                roughness={isActive ? 0.4 : 0.5}
                emissive={isActive ? '#3b82f6' : '#000000'}
                emissiveIntensity={isActive ? 0.1 : 0}
              />
            </RoundedBox>
          )
        })
      ))}
      
      {/* Lignes de séparation verticales */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <RoundedBox
          key={`vline-${i}`}
          args={[0.01, 2, 0.04]}
          position={[-1.1 + i * 0.45 - 0.225, -0.15, 0.03]}
          radius={0.005}
        >
          <meshStandardMaterial color="#e2e8f0" />
        </RoundedBox>
      ))}
      
      {/* Lignes de séparation horizontales */}
      {[1, 2, 3].map((i) => (
        <RoundedBox
          key={`hline-${i}`}
          args={[3.2, 0.01, 0.04]}
          position={[0.2, 0.35 - i * 0.4 + 0.175, 0.03]}
          radius={0.005}
        >
          <meshStandardMaterial color="#e2e8f0" />
        </RoundedBox>
      ))}
    </group>
  )
}
