import React from 'react'

/**
 * Camera Presets Bar (Left)
 * Provides one-click camera views (Hero 3/4, Side, Cockpit, Front, Rear) and Cinema Mode toggle.
 */
export function CameraPresets({
  onSelectPreset,
  isCinematicMode,
  setIsCinematicMode,
  t
}) {
  return (
    <div className="camera-views-bar ui-interactive">
      <button
        className={`camera-view-btn ${isCinematicMode ? 'active-cinema' : ''}`}
        onClick={() => setIsCinematicMode(!isCinematicMode)}
      >
        🎬 {t.cinema}
      </button>
      <button className="camera-view-btn" onClick={() => onSelectPreset('hero')}>
        {t.hero}
      </button>
      <button className="camera-view-btn" onClick={() => onSelectPreset('side')}>
        {t.side}
      </button>
      <button className="camera-view-btn" onClick={() => onSelectPreset('cockpit')}>
        {t.cockpit}
      </button>
      <button className="camera-view-btn" onClick={() => onSelectPreset('front')}>
        {t.front}
      </button>
      <button className="camera-view-btn" onClick={() => onSelectPreset('rear')}>
        {t.rear}
      </button>
    </div>
  )
}
