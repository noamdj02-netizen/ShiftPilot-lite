'use client'

import { Canvas } from '@react-three/fiber'
import { Float, PerspectiveCamera, Environment } from '@react-three/drei'
import { FloatingCalendar3D } from '@/components/3d/FloatingCalendar3D'
import { FloatingShiftCards } from '@/components/3d/FloatingShiftCards'

export function Scene3D() {
  return (
    <Canvas
      gl={{ alpha: false }}
      style={{ background: '#1e3a5f' }}
    >
      <color attach="background" args={['#1e3a5f']} />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={1}
      >
        <FloatingCalendar3D />
      </Float>
      <FloatingShiftCards />
      <Environment preset="night" />
    </Canvas>
  )
}

