import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Html } from '@react-three/drei'

// Data & Constants
import { TRANSLATIONS } from './data/translations'

// Custom Hooks
import { useAudioEngine } from './hooks/useAudioEngine'

// 3D Scene Components
import { SupraModel } from './components/3d/SupraModel'
import { CyberpunkStage } from './components/3d/CyberpunkStage'
import { CameraRig } from './components/3d/CameraRig'

// HUD UI Layer Components
import { Header } from './components/hud/Header'
import { TelemetryHUD } from './components/hud/TelemetryHUD'
import { QuickTools } from './components/hud/QuickTools'
import { CameraPresets } from './components/hud/CameraPresets'
import { BottomCustomizer } from './components/hud/BottomCustomizer'
import { CinemaOverlay } from './components/hud/CinemaOverlay'

// Cyber-HUD Modals
import { HeritageModal } from './components/modals/HeritageModal'
import { ModelsModal } from './components/modals/ModelsModal'
import { TuningModal } from './components/modals/TuningModal'
import { SummaryModal } from './components/modals/SummaryModal'

/**
 * Main Application Root Orchestrator
 */
export default function App() {
  // 1. Language State
  const [lang, setLang] = useState('RU')
  const t = TRANSLATIONS[lang] || TRANSLATIONS.RU

  // 2. Modals State
  const [activeHudModal, setActiveHudModal] = useState(null)

  // 3. Customizer Vehicle Configuration State
  const [customizerTab, setCustomizerTab] = useState('COLOR')
  const [carColor, setCarColor] = useState('#07080a') // Shikkoku Black
  const [interiorColor, setInteriorColor] = useState('#8a111a') // Kyoto Crimson Leather
  const [carFinish, setCarFinish] = useState('metallic')
  const [wheelColor, setWheelColor] = useState('#875d38') // TE37 Bronze
  const [caliperColor, setCaliperColor] = useState('#d91b1b') // Brembo Red
  const [underglowColor, setUnderglowColor] = useState('#00f0ff') // Tokyo Cyan Neon

  // 4. Studio Environment & Viewport State
  const [studioEnvironment, setStudioEnvironment] = useState('wangan')
  const [headlightsOn, setHeadlightsOn] = useState(true)
  const [showHotspots, setShowHotspots] = useState(true)
  const [autoRotate, setAutoRotate] = useState(false)
  const [isCinematicMode, setIsCinematicMode] = useState(false)
  const [cameraTarget, setCameraTarget] = useState(null)

  // 5. 2JZ Audio & Telemetry Engine Hook
  const { isThrottleActive, rpm, boost, startGas, stopGas } = useAudioEngine()

  // 6. Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        setIsCinematicMode(false)
        setActiveHudModal(null)
      } else if ((e.code === 'Space' || e.code === 'KeyW') && !e.repeat) {
        e.preventDefault()
        startGas()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [startGas])

  // 7. Camera Preset Handlers
  const handleCameraPreset = (view) => {
    setIsCinematicMode(false)
    switch (view) {
      case 'hero':
        setCameraTarget([3.8, 1.4, 3.8])
        break
      case 'side':
        setCameraTarget([4.8, 0.9, 0])
        break
      case 'cockpit':
        setCameraTarget([0.65, 0.95, 0.55])
        break
      case 'front':
        setCameraTarget([0, 0.9, 4.6])
        break
      case 'rear':
        setCameraTarget([0, 1.1, -4.6])
        break
      default:
        setCameraTarget([3.8, 1.4, 3.8])
    }
  }

  const handleSelectHotspot = (spot) => {
    setIsCinematicMode(false)
    setCameraTarget(spot.targetCam)
  }

  return (
    <div
      className={`configurator-container theme-${studioEnvironment} ${
        isCinematicMode ? 'cinema-active' : ''
      }`}
    >
      {/* 3D WebGL Canvas Layer */}
      <div className="canvas-wrapper">
        <Canvas
          dpr={[1, 1.75]}
          gl={{
            powerPreference: 'high-performance',
            antialias: true,
            stencil: false,
            alpha: false,
            depth: true
          }}
          camera={{ position: [3.8, 1.4, 3.8], fov: 45, near: 0.1, far: 1000 }}
        >
          <ambientLight intensity={0.65} />

          <spotLight
            position={[10, 15, 10]}
            angle={0.45}
            penumbra={1}
            intensity={2.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />

          {/* Dynamic Cyberpunk Rim Lights */}
          <directionalLight
            position={[-12, 6, -10]}
            intensity={2.5}
            color={
              studioEnvironment === 'wangan'
                ? '#00f0ff'
                : studioEnvironment === 'kyoto'
                ? '#ff0055'
                : '#8b5cf6'
            }
          />
          <directionalLight
            position={[12, 6, -8]}
            intensity={2.0}
            color={
              studioEnvironment === 'wangan'
                ? '#ff00aa'
                : studioEnvironment === 'kyoto'
                ? '#ffaa00'
                : '#38bdf8'
            }
          />
          <directionalLight position={[0, -2, 5]} intensity={0.5} />

          <Suspense
            fallback={
              <Html center>
                <div className="luxury-loader">
                  <div className="loader-spinner" />
                  <div className="loader-text">Loading Cyberpunk Studio...</div>
                </div>
              </Html>
            }
          >
            <Environment preset="city" />

            <SupraModel
              carColor={carColor}
              interiorColor={interiorColor}
              finish={carFinish}
              wheelColor={wheelColor}
              caliperColor={caliperColor}
              headlightsOn={headlightsOn}
              underglowColor={underglowColor}
              showHotspots={showHotspots && !isCinematicMode}
              isRevving={isThrottleActive}
              onSelectHotspot={handleSelectHotspot}
            />

            {/* Retrowave / Cyberpunk Infinite Grid & Sun Stage */}
            <CyberpunkStage studioEnvironment={studioEnvironment} />
          </Suspense>

          <CameraRig
            cameraTarget={cameraTarget}
            autoRotate={autoRotate}
            isCinematicMode={isCinematicMode}
            onTargetReached={() => setCameraTarget(null)}
          />
        </Canvas>
      </div>

      {/* Interactive HUD UI Layer */}
      <div className="ui-layer">
        {/* Top Header */}
        <Header
          lang={lang}
          setLang={setLang}
          t={t}
          activeHudModal={activeHudModal}
          setActiveHudModal={setActiveHudModal}
          studioEnvironment={studioEnvironment}
          setStudioEnvironment={setStudioEnvironment}
        />

        {/* Japanese Telemetry Tachometer & 2JZ Throttle */}
        <TelemetryHUD
          isThrottleActive={isThrottleActive}
          rpm={rpm}
          boost={boost}
          onToggleGas={startGas}
          t={t}
        />

        {/* Quick Tools Floating Top Right */}
        <QuickTools
          headlightsOn={headlightsOn}
          setHeadlightsOn={setHeadlightsOn}
          autoRotate={autoRotate}
          setAutoRotate={setAutoRotate}
          showHotspots={showHotspots}
          setShowHotspots={setShowHotspots}
          isCinematicMode={isCinematicMode}
          setIsCinematicMode={setIsCinematicMode}
          t={t}
        />

        {/* Clean Camera Presets Left */}
        <CameraPresets
          onSelectPreset={handleCameraPreset}
          isCinematicMode={isCinematicMode}
          setIsCinematicMode={setIsCinematicMode}
          t={t}
        />

        {/* Bottom Customizer Deck */}
        <BottomCustomizer
          customizerTab={customizerTab}
          setCustomizerTab={setCustomizerTab}
          carColor={carColor}
          setCarColor={setCarColor}
          interiorColor={interiorColor}
          setInteriorColor={setInteriorColor}
          wheelColor={wheelColor}
          setWheelColor={setWheelColor}
          caliperColor={caliperColor}
          setCaliperColor={setCaliperColor}
          underglowColor={underglowColor}
          setUnderglowColor={setUnderglowColor}
          carFinish={carFinish}
          setCarFinish={setCarFinish}
          onOpenSummary={() => setActiveHudModal('summary')}
          onCockpitFocus={() => handleCameraPreset('cockpit')}
          t={t}
        />
      </div>

      {/* Cyber-HUD Modals */}
      {activeHudModal === 'heritage' && (
        <HeritageModal
          onClose={() => setActiveHudModal(null)}
          lang={lang}
          t={t}
        />
      )}

      {activeHudModal === 'models' && (
        <ModelsModal
          onClose={() => setActiveHudModal(null)}
          lang={lang}
          t={t}
        />
      )}

      {activeHudModal === 'tuning' && (
        <TuningModal
          onClose={() => setActiveHudModal(null)}
          lang={lang}
          t={t}
        />
      )}

      {activeHudModal === 'summary' && (
        <SummaryModal
          onClose={() => setActiveHudModal(null)}
          carColor={carColor}
          interiorColor={interiorColor}
          carFinish={carFinish}
          wheelColor={wheelColor}
          caliperColor={caliperColor}
          underglowColor={underglowColor}
          t={t}
        />
      )}

      {/* Hollywood Cinema Mode Overlay */}
      {isCinematicMode && (
        <CinemaOverlay
          onExitCinema={() => setIsCinematicMode(false)}
          t={t}
        />
      )}
    </div>
  )
}
