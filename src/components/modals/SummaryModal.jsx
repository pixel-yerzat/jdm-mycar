import React from 'react'
import { X, ChevronRight } from 'lucide-react'
import {
  JDM_COLORS,
  INTERIOR_COLORS,
  FINISHES,
  WHEEL_FINISHES,
  CALIPER_COLORS,
  UNDERGLOW_COLORS
} from '../../data/colorOptions'

/**
 * Cyber-HUD Modal: Specification Certificate Summary
 */
export function SummaryModal({
  onClose,
  carColor,
  interiorColor,
  carFinish,
  wheelColor,
  caliperColor,
  underglowColor,
  t
}) {
  return (
    <div className="cyber-modal-backdrop ui-interactive" onClick={onClose}>
      <div className="cyber-hud-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cyber-hud-header">
          <div>
            <div className="hud-tag-stage">
              <span className="plus-icon">+ [SPEC 05]</span> SPECIFICATION
            </div>
            <div className="cyber-hud-title">
              <span>{t.carModel}</span>
              <span className="kanji-badge">仕様書</span>
            </div>
          </div>
          <button className="cyber-hud-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="cyber-hud-body">
          <div className="hud-box-telemetry">
            <div className="hud-spec-row">
              <span className="hud-spec-key">{t.paintName}</span>
              <span className="hud-spec-val" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: carColor,
                    display: 'inline-block',
                    border: '1px solid rgba(255,255,255,0.4)',
                    boxShadow: '0 0 8px rgba(255,0,60,0.5)'
                  }}
                />
                {JDM_COLORS.find((c) => c.hex === carColor)?.name || carColor}
              </span>
            </div>

            <div className="hud-spec-row">
              <span className="hud-spec-key">{t.interiorName}</span>
              <span className="hud-spec-val" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: interiorColor,
                    display: 'inline-block',
                    border: '1px solid rgba(255,255,255,0.4)',
                    boxShadow: '0 0 8px rgba(255,0,60,0.5)'
                  }}
                />
                {INTERIOR_COLORS.find((i) => i.hex === interiorColor)?.name || interiorColor}
              </span>
            </div>

            <div className="hud-spec-row">
              <span className="hud-spec-key">{t.finishName}</span>
              <span className="hud-spec-val">
                {FINISHES.find((f) => f.id === carFinish)?.name}
              </span>
            </div>

            <div className="hud-spec-row">
              <span className="hud-spec-key">{t.wheelName}</span>
              <span className="hud-spec-val">
                {WHEEL_FINISHES.find((w) => w.hex === wheelColor)?.name || 'Custom'}
              </span>
            </div>

            <div className="hud-spec-row">
              <span className="hud-spec-key">{t.caliperName}</span>
              <span className="hud-spec-val">
                {CALIPER_COLORS.find((c) => c.hex === caliperColor)?.name || 'Custom'}
              </span>
            </div>

            <div className="hud-spec-row">
              <span className="hud-spec-key">{t.neonName}</span>
              <span className="hud-spec-val">
                {UNDERGLOW_COLORS.find((u) => u.hex === underglowColor)?.name || 'OFF'}
              </span>
            </div>

            <div className="hud-spec-row">
              <span className="hud-spec-key">{t.engineName}</span>
              <span className="hud-spec-val highlight">{t.engineVal}</span>
            </div>

            <div className="hud-spec-row">
              <span className="hud-spec-key">{t.transmissionName}</span>
              <span className="hud-spec-val">{t.transVal}</span>
            </div>

            <div className="hud-spec-row">
              <span className="hud-spec-key">3D {t.modelCredit}</span>
              <span className="hud-spec-val">
                <a
                  href="https://sketchfab.com/ddiaz-design"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#00f0ff', textDecoration: 'none', fontWeight: 700 }}
                >
                  Ddiaz Design (Sketchfab)
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="cyber-hud-footer">
          <button className="btn-cyber-secondary" onClick={onClose}>
            {t.backBtn}
          </button>
          <button
            className="btn-cyber-primary"
            onClick={() => {
              alert(t.savedAlert)
              onClose()
            }}
          >
            <span>{t.saveBtn}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
