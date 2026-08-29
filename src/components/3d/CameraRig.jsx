import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

/**
 * CameraRig Component
 * Provides smooth OrbitControls damping, preset animations (Hero, Side, Cockpit, Front, Rear),
 * automatic user interaction release, and multi-shot Hollywood Cinematic Showcase mode.
 */
export function CameraRig({ cameraTarget, autoRotate, onTargetReached, isCinematicMode }) {
  const controlsRef = useRef()
  const isAnimatingRef = useRef(false)
  const targetPosRef = useRef(new THREE.Vector3())
  const cinematicTimeRef = useRef(0)

  useEffect(() => {
    if (cameraTarget && !isCinematicMode) {
      targetPosRef.current.set(cameraTarget[0], cameraTarget[1], cameraTarget[2])
      isAnimatingRef.current = true
    }
  }, [cameraTarget, isCinematicMode])

  useFrame((state, delta) => {
    // 1. Hollywood Multi-Shot Cinematic Choreography
    if (isCinematicMode && controlsRef.current) {
      cinematicTimeRef.current += delta * 0.35
      const t = cinematicTimeRef.current
      const phase = t % 24

      const targetCamPos = new THREE.Vector3()
      const targetLookAt = new THREE.Vector3(0, 0.55, 0)

      if (phase < 6) {
        // Shot 1: Low Front-Quarter Sweeping Glide
        const p = phase / 6
        const angle = -0.7 + p * 1.3
        targetCamPos.set(
          Math.sin(angle) * 3.7,
          0.45 + Math.sin(p * Math.PI) * 0.35,
          Math.cos(angle) * 3.7
        )
        targetLookAt.set(0, 0.48, 0.6)
      } else if (phase < 12) {
        // Shot 2: Low Wheel & Side Profile Glide
        const p = (phase - 6) / 6
        const z = 2.4 - p * 4.2
        targetCamPos.set(2.8 + Math.sin(p * Math.PI) * 0.35, 0.45 + p * 0.35, z)
        targetLookAt.set(0, 0.45, z * 0.4)
      } else if (phase < 18) {
        // Shot 3: Aggressive Low Rear GT-Wing & Quad Taillights
        const p = (phase - 12) / 6
        const angle = Math.PI - 0.6 + p * 1.2
        targetCamPos.set(
          Math.sin(angle) * 3.8,
          0.65 + Math.sin(p * Math.PI) * 0.4,
          Math.cos(angle) * 3.8
        )
        targetLookAt.set(0, 0.65, -0.8)
      } else {
        // Shot 4: Drone Aerial Orbit with breathing height
        const p = (phase - 18) / 6
        const angle = p * Math.PI * 2
        targetCamPos.set(
          Math.cos(angle) * 4.2,
          1.8 + Math.sin(p * Math.PI * 2) * 0.45,
          Math.sin(angle) * 4.2
        )
        targetLookAt.set(0, 0.55, 0)
      }

      state.camera.position.lerp(targetCamPos, 0.04)
      controlsRef.current.target.lerp(targetLookAt, 0.04)
      controlsRef.current.update()
      return
    }

    // 2. Smooth Lerp to Selected Preset Angle
    if (isAnimatingRef.current && controlsRef.current) {
      state.camera.position.lerp(targetPosRef.current, 0.08)
      controlsRef.current.target.lerp(new THREE.Vector3(0, 0.6, 0), 0.08)
      controlsRef.current.update()

      if (state.camera.position.distanceTo(targetPosRef.current) < 0.03) {
        isAnimatingRef.current = false
        if (onTargetReached) onTargetReached()
      }
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      target={[0, 0.6, 0]}
      enableDamping
      dampingFactor={0.05}
      autoRotate={!isCinematicMode && autoRotate}
      autoRotateSpeed={0.8}
      minDistance={1.2}
      maxDistance={8.5}
      maxPolarAngle={Math.PI / 2 - 0.02}
      onStart={() => {
        if (!isCinematicMode) {
          isAnimatingRef.current = false
          if (onTargetReached) onTargetReached()
        }
      }}
    />
  )
}
