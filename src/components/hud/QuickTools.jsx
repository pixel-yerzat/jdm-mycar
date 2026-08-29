import React from 'react'
import { Lightbulb, RefreshCw, MapPin, Clapperboard } from 'lucide-react'

/**
 * Floating Quick Tools (Top Right)
 * Controls Headlights emissive toggle, 360 Turntable rotation, Hotspot pins, and Cinema Mode.
 */
export function QuickTools({
  headlightsOn,
  setHeadlightsOn,
  autoRotate,
  setAutoRotate,
  showHotspots,
  setShowHotspots,
  isCinematicMode,
  setIsCinematicMode,
  t
}) {
  return (
    <div className="quick-tools-floating ui-interactive">
      <button
        className={`tool-icon-btn ${isCinematicMode ? 'active' : ''}`}
        title={t.cinema}
        onClick={() => setIsCinematicMode(!isCinematicMode)}
      >
        <Clapperboard size={15} />
        <span className="btn-sub-label">{t.cinema}</span>
      </button>

      <button
        className={`tool-icon-btn ${headlightsOn ? 'active' : ''}`}
        title={t.lights}
        onClick={() => setHeadlightsOn(!headlightsOn)}
      >
        <Lightbulb size={15} />
        <span className="btn-sub-label">{t.lights}</span>
      </button>

      <button
        className={`tool-icon-btn ${autoRotate ? 'active' : ''}`}
        title={t.rotate}
        onClick={() => setAutoRotate(!autoRotate)}
      >
        <RefreshCw size={14} className={autoRotate ? 'spin-icon' : ''} />
        <span className="btn-sub-label">{t.rotate}</span>
      </button>

      <button
        className={`tool-icon-btn ${showHotspots ? 'active' : ''}`}
        title={t.hotspots}
        onClick={() => setShowHotspots(!showHotspots)}
      >
        <MapPin size={15} />
        <span className="btn-sub-label">{t.hotspots}</span>
      </button>
    </div>
  )
}
