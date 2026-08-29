import React from 'react'
import { Gauge, Volume2, Flame, Square, Sparkles } from 'lucide-react'

/**
 * Japanese JDM Telemetry HUD (Bottom Left)
 * Displays 2JZ RPM gauge, redline glow, boost telemetry, and interactive engine throttle button.
 */
export function TelemetryHUD({ isThrottleActive, rpm, boost, onToggleGas, t }) {
  return (
    <div className="jdm-telemetry-hud ui-interactive">
      <div className="hud-title-row">
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Gauge size={12} /> 2JZ-GTE
        </span>
        <span>TWIN TURBO</span>
      </div>

      <div className="hud-rpm-gauge-wrapper">
        <div className="hud-rpm-numbers">
          <span className={`hud-rpm-value ${rpm >= 7000 ? 'redline' : ''}`}>
            {rpm.toLocaleString()} <span style={{ fontSize: 10, color: '#888' }}>RPM</span>
          </span>
          <span className="hud-boost-value">
            {boost >= 0 ? `+${boost}` : boost} BAR
          </span>
        </div>
        <div className="hud-tacho-track">
          <div
            className="hud-tacho-fill"
            style={{ width: `${Math.min(100, (rpm / 8000) * 100)}%` }}
          />
        </div>
      </div>

      <div className="hud-stats-grid">
        <div className="hud-stat-item">
          {t.disp}: <span>2,997 cc</span>
        </div>
        <div className="hud-stat-item">
          {t.boost}: <span>{boost >= 0 ? `+${boost}` : boost} BAR</span>
        </div>
        <div className="hud-stat-item">
          0-100: <span>4.6s</span>
        </div>
        <div className="hud-stat-item">
          {t.gear}: <span>6-SPD</span>
        </div>
      </div>

      <button
        className={`btn-engine-throttle ${isThrottleActive ? 'active' : ''}`}
        onClick={onToggleGas}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {isThrottleActive ? <Flame size={14} color="#ffdd00" /> : <Volume2 size={14} />}
          {isThrottleActive ? t.revving : t.rev2jz}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {isThrottleActive ? <Square size={10} /> : <Sparkles size={11} />}
          {isThrottleActive ? 'STOP' : 'PLAY'}
        </span>
      </button>
    </div>
  )
}
