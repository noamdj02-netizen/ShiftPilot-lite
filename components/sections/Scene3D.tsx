'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, PerspectiveCamera, Environment } from '@react-three/drei'
import { FloatingCalendar3D } from '@/components/3d/FloatingCalendar3D'

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-3 border-accent/20 border-t-accent rounded-full animate-spin" />
    </div>
  )
}

export function Scene3D() {
  return (
    <Canvas
      gl={{ 
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
        
        {/* Éclairage professionnel et réaliste */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.8} 
          color="#ffffff"
        />
        <directionalLight 
          position={[-5, 3, -5]} 
          intensity={0.3} 
          color="#ffffff"
        />
        <pointLight 
          position={[0, 3, 3]} 
          intensity={0.4} 
          color="#3b82f6"
        />
        
        {/* Planning avec animation très subtile */}
        <Float
          speed={1}
          rotationIntensity={0.1}
          floatIntensity={0.3}
        >
          <FloatingCalendar3D />
        </Float>
        
        {/* Environnement neutre */}
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
