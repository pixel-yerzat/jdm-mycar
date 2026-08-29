import React, { useMemo, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'
import { FINISHES, WHEEL_FINISHES, HOTSPOTS } from '../../data/colorOptions'

/**
 * SupraModel 3D Component
 * Loads, normalizes scale, and applies dynamic materials for Paint, Interior, Wheels, Calipers, Lights, Underglow,
 * and handles mechanical engine rev micro-vibrations and 3D hotspot annotations.
 */
export function SupraModel({
  carColor,
  interiorColor,
  finish,
  wheelColor,
  caliperColor,
  headlightsOn,
  underglowColor,
  showHotspots,
  isRevving,
  onSelectHotspot
}) {
  const { scene } = useGLTF('/model/supra.glb')
  const finishConfig = FINISHES.find((f) => f.id === finish) || FINISHES[0]
  const wheelConfig = WHEEL_FINISHES.find((w) => w.hex === wheelColor) || WHEEL_FINISHES[0]
  const groupRef = useRef()

  // Normalize model scale to standard studio unit bounds
  const normalizedScene = useMemo(() => {
    const cloned = scene.clone(true)
    const box = new THREE.Box3().setFromObject(cloned)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    const maxDim = Math.max(size.x, size.y, size.z)
    const scaleFactor = maxDim > 0 ? 4.5 / maxDim : 1

    cloned.scale.setScalar(scaleFactor)
    cloned.position.x = -center.x * scaleFactor
    cloned.position.z = -center.z * scaleFactor
    cloned.position.y = -box.min.y * scaleFactor

    return cloned
  }, [scene])

  // Direct material mutation for 60FPS responsive customizer updates
  useEffect(() => {
    normalizedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.castShadow = true
        child.receiveShadow = true
        const mat = child.material
        const name = (mat.name || '').toLowerCase()

        const isGlass = name.includes('glas') || name.includes('window')
        const isGrille = name.includes('grille')
        const isPaint = name.includes('paint') || name.includes('coloured')
        const isWheel = name.includes('wheel')
        const isCaliper = name.includes('calliper')
        const isLight = name.includes('light')
        const isSeatUpholstery =
          name.includes('int_color_1') || name.includes('int_color_2') || name.includes('seatbelt')

        if (isGlass) {
          mat.transparent = true
          mat.opacity = 0.35
          mat.depthWrite = true
          mat.roughness = 0.05
          mat.metalness = 0.2
        } else if (isGrille) {
          mat.transparent = false
          mat.alphaTest = 0.5
          mat.depthWrite = true
        } else if (isSeatUpholstery) {
          mat.transparent = false
          mat.depthWrite = true
          mat.color.set(interiorColor)
          mat.roughness = 0.65
          mat.metalness = 0.1
        } else if (isPaint) {
          mat.transparent = false
          mat.depthWrite = true
          mat.depthTest = true
          mat.color.set(carColor)
          mat.roughness = finishConfig.roughness
          mat.metalness = finishConfig.metalness
        } else if (isWheel) {
          mat.transparent = false
          mat.depthWrite = true
          mat.color.set(wheelColor)
          mat.metalness = wheelConfig.metalness
          mat.roughness = wheelConfig.roughness
        } else if (isCaliper) {
          mat.transparent = false
          mat.depthWrite = true
          mat.color.set(caliperColor)
        } else if (isLight) {
          mat.transparent = false
          mat.depthWrite = true
          if (headlightsOn) {
            mat.emissive.set('#ffffff')
            mat.emissiveIntensity = 3.5
          } else {
            mat.emissive.set('#000000')
            mat.emissiveIntensity = 0
          }
        } else {
          mat.transparent = false
          mat.depthWrite = true
          mat.depthTest = true
        }

        mat.needsUpdate = true
      }
    })
  }, [
    normalizedScene,
    carColor,
    interiorColor,
    finish,
    wheelColor,
    caliperColor,
    headlightsOn,
    finishConfig,
    wheelConfig
  ])

  // Subtle mechanical micro-vibrations when revving
  useFrame(() => {
    if (groupRef.current) {
      if (isRevving) {
        groupRef.current.position.y = (Math.random() - 0.5) * 0.0035
        groupRef.current.position.x = (Math.random() - 0.5) * 0.0025
      } else {
        groupRef.current.position.set(0, 0, 0)
      }
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={normalizedScene} />

      {/* Optimized Underglow Light under chassis */}
      {underglowColor && (
        <group position={[0, 0.08, 0]}>
          <pointLight
            position={[0, 0.15, 0]}
            color={underglowColor}
            intensity={4.5}
            distance={3.8}
            decay={2}
          />
        </group>
      )}

      {/* 3D Hotspot Annotations */}
      {showHotspots &&
        HOTSPOTS.map((spot) => (
          <Html key={spot.id} position={spot.position} center>
            <div
              className="hotspot-annotation"
              onClick={(e) => {
                e.stopPropagation()
                onSelectHotspot(spot)
              }}
            >
              <div className="hotspot-bracket">
                <div className="hotspot-dot" />
                <div className="hotspot-label">{spot.label}</div>
              </div>
            </div>
          </Html>
        ))}
    </group>
  )
}

useGLTF.preload('/model/supra.glb')
