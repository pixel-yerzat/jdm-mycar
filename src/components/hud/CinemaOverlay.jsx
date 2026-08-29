import React from 'react'

/**
 * Hollywood 2.39:1 Anamorphic Cinema Overlay
 * Renders cinematic letterbox bars, REC pulsating badge, and quick exit trigger.
 */
export function CinemaOverlay({ onExitCinema, t }) {
  return (
    <div className="cinema-overlay-wrapper ui-interactive" onClick={onExitCinema}>
      <div className="cinema-letterbox-top">
        <div className="cinema-rec-badge">
          <span className="rec-dot" />
          <span>REC // 4K 60FPS CINEMATIC REEL</span>
        </div>
        <button
          className="btn-exit-cinema"
          onClick={(e) => {
            e.stopPropagation()
            onExitCinema()
          }}
        >
          {t.exitCinema}
        </button>
      </div>
      <div className="cinema-letterbox-bottom" />
    </div>
  )
}
