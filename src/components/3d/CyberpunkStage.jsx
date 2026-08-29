import React, { useMemo } from 'react'
import { ContactShadows, Sparkles as DreiSparkles } from '@react-three/drei'
import * as THREE from 'three'

// Sliced Synthwave Sun on the Horizon
function SynthwaveSun({ colorTop = '#ffee00', colorBottom = '#ff0077', position = [0, 4.5, -22] }) {
  const slices = useMemo(() => {
    const arr = []
    const count = 9
    const radius = 6.2
    for (let i = 0; i < count; i++) {
      const yNorm = (i / (count - 1)) * 2 - 1
      const yPos = yNorm * radius * 0.8
      const sliceHeight = ((radius * 1.6) / count) * (0.55 + 0.4 * (1 - i / count))
      const width = 2 * Math.sqrt(Math.max(0, radius * radius - yPos * yPos))
      if (width > 0.5) {
        const t = i / (count - 1)
        arr.push({ id: i, y: yPos, w: width, h: sliceHeight * 0.75, t })
      }
    }
    return arr
  }, [])

  return (
    <group position={position}>
      {/* Sun glow halo back plane */}
      <mesh position={[0, 0, -0.2]}>
        <circleGeometry args={[7.0, 32]} />
        <meshBasicMaterial color={colorBottom} transparent opacity={0.35} />
      </mesh>
      {/* Slices */}
      {slices.map((s) => {
        const col = new THREE.Color(colorBottom).lerp(new THREE.Color(colorTop), s.t)
        return (
          <mesh key={s.id} position={[0, s.y, 0]}>
            <planeGeometry args={[s.w, s.h]} />
            <meshBasicMaterial color={col} />
          </mesh>
        )
      })}
    </group>
  )
}

// Low-Poly Wireframe Cyber Mountains along horizon
function WireframeMountains({ color = '#ff00aa', position = [0, 0, -20] }) {
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(50, 10, 26, 8)
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      if (y > -4) {
        const heightMod =
          Math.sin(x * 0.4) * 2.2 + Math.cos(x * 0.85) * 1.5 + Math.sin(x * 1.7) * 0.7
        pos.setZ(i, Math.abs(heightMod) * ((y + 5) / 10) * 2.6)
      }
    }
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <group position={position} rotation={[-Math.PI / 2 + 0.25, 0, 0]}>
      <mesh geometry={geom}>
        <meshBasicMaterial color="#050308" />
      </mesh>
      <mesh geometry={geom}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.65} />
      </mesh>
    </group>
  )
}

/**
 * Retrowave / Cyberpunk 3D Stage
 * Features infinite neon glowing grid floor, sliced Synthwave sun, wireframe horizon mountains,
 * overhead studio softbox lightbars, atmospheric sparkles, and cached soft contact shadows.
 */
export function CyberpunkStage({ studioEnvironment }) {
  const isWangan = studioEnvironment === 'wangan'
  const isKyoto = studioEnvironment === 'kyoto'

  const themeConfig = useMemo(() => {
    if (isWangan) {
      return {
        gridColor: '#00f0ff',
        gridAccent: '#ff00aa',
        sunTop: '#00f0ff',
        sunBottom: '#ff00aa',
        mountainColor: '#ff00aa',
        particleColor: '#00f0ff',
        laserStripe: '#00f0ff'
      }
    }
    if (isKyoto) {
      return {
        gridColor: '#ff0055',
        gridAccent: '#ffaa00',
        sunTop: '#ffee00',
        sunBottom: '#ff0055',
        mountainColor: '#ffaa00',
        particleColor: '#ffaa00',
        laserStripe: '#ff0055'
      }
    }
    return {
      gridColor: '#8b5cf6',
      gridAccent: '#38bdf8',
      sunTop: '#38bdf8',
      sunBottom: '#8b5cf6',
      mountainColor: '#8b5cf6',
      particleColor: '#38bdf8',
      laserStripe: '#38bdf8'
    }
  }, [isWangan, isKyoto])

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Dark Reflective Cyber Base Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[65, 65]} />
        <meshStandardMaterial color="#040207" roughness={0.35} metalness={0.7} />
      </mesh>

      {/* 2. Infinite Neon Cyber Grid */}
      <gridHelper
        args={[60, 48, themeConfig.gridAccent, themeConfig.gridColor]}
        position={[0, -0.015, 0]}
      />

      {/* 3. Central Neon Laser Runway Stripes under the car */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.012, 0]}>
        <planeGeometry args={[2.8, 45]} />
        <meshBasicMaterial color={themeConfig.laserStripe} transparent opacity={0.12} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.4, -0.008, 0]}>
        <planeGeometry args={[0.08, 45]} />
        <meshBasicMaterial color={themeConfig.laserStripe} transparent opacity={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.4, -0.008, 0]}>
        <planeGeometry args={[0.08, 45]} />
        <meshBasicMaterial color={themeConfig.laserStripe} transparent opacity={0.85} />
      </mesh>

      {/* 4. Car Turntable Circular Accent */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.006, 0]}>
        <ringGeometry args={[3.8, 3.84, 48]} />
        <meshBasicMaterial color={themeConfig.gridColor} transparent opacity={0.8} />
      </mesh>

      {/* 5. Iconic Synthwave Sun on the Horizon */}
      <SynthwaveSun
        colorTop={themeConfig.sunTop}
        colorBottom={themeConfig.sunBottom}
        position={[0, 4.2, -22]}
      />

      {/* 6. Wireframe Cyber Mountains along horizon */}
      <WireframeMountains color={themeConfig.mountainColor} position={[0, 0, -20]} />

      {/* 7. Overhead Cyber Lightbars for Sharp Metallic Specular Highlights */}
      <group position={[0, 4.8, 0]}>
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.5, 5.5]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-3.2, -0.4, 0]} rotation={[Math.PI / 2, 0.45, 0]}>
          <planeGeometry args={[0.4, 6.0]} />
          <meshBasicMaterial color={themeConfig.gridColor} />
        </mesh>
        <mesh position={[3.2, -0.4, 0]} rotation={[Math.PI / 2, -0.45, 0]}>
          <planeGeometry args={[0.4, 6.0]} />
          <meshBasicMaterial color={themeConfig.gridAccent} />
        </mesh>
      </group>

      {/* 8. Atmospheric Floating Cyber Dust Particles */}
      <DreiSparkles
        count={50}
        scale={[16, 6, 16]}
        size={3.0}
        speed={0.45}
        opacity={0.45}
        color={themeConfig.particleColor}
      />

      {/* Cached Soft Contact Shadows */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.8}
        scale={9.5}
        blur={1.5}
        far={3.5}
        resolution={512}
        frames={1}
        color="#000000"
      />
    </group>
  )
}
