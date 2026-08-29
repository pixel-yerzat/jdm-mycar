import React from 'react'
import { X, ChevronRight } from 'lucide-react'
import { TUNING_PARTS } from '../../data/tuningData'

/**
 * Cyber-HUD Modal: JDM Performance Hardware
 */
export function TuningModal({ onClose, lang, t }) {
  return (
    <div className="cyber-modal-backdrop ui-interactive" onClick={onClose}>
      <div className="cyber-hud-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cyber-hud-header">
          <div>
            <div className="hud-tag-stage">
              <span className="plus-icon">+ [PART 03]</span> JDM PERFORMANCE HARDWARE
            </div>
            <div className="cyber-hud-title">
              <span>2JZ RACING HARDWARE</span>
              <span className="kanji-badge">強化部品</span>
            </div>
          </div>
          <button className="cyber-hud-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="cyber-hud-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {TUNING_PARTS.map((part) => (
              <div key={part.name} className="hud-box-telemetry">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span
                    style={{
                      fontSize: 9,
                      color: '#00f0ff',
                      letterSpacing: 1.5,
                      fontFamily: 'Orbitron'
                    }}
                  >
                    {part.category}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      color: '#ffb703',
                      fontWeight: 700,
                      fontFamily: 'Orbitron'
                    }}
                  >
                    {part.powerGain}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#ffffff',
                    fontFamily: 'Syne'
                  }}
                >
                  {part.name}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#9ba2ad',
                    lineHeight: 1.5
                  }}
                >
                  {part.desc[lang] || part.desc.RU}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="cyber-hud-footer">
          <div className="hud-barcode-deco">|||| |||||| HKS-TRUST-RAYS</div>
          <button className="btn-cyber-primary" onClick={onClose}>
            <span>{t.backBtn}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
