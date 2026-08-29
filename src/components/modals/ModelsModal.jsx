import React, { useState } from 'react'
import { X, ChevronRight, Car } from 'lucide-react'
import { MODEL_RANGE_VARIANTS } from '../../data/modelsData'

/**
 * Cyber-HUD Modal: Supra MK IV Variants Lineup
 */
export function ModelsModal({ onClose, lang, t }) {
  const [selectedVariantId, setSelectedVariantId] = useState('rz')
  const curModel =
    MODEL_RANGE_VARIANTS.find((m) => m.id === selectedVariantId) || MODEL_RANGE_VARIANTS[0]

  return (
    <div className="cyber-modal-backdrop ui-interactive" onClick={onClose}>
      <div className="cyber-hud-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cyber-hud-header">
          <div>
            <div className="hud-tag-stage">
              <span className="plus-icon">+ [PART 02]</span> LINEUP SPECIFICATIONS
            </div>
            <div className="cyber-hud-title">
              <span>SUPRA MK IV VARIANTS</span>
              <span className="kanji-badge">仕様群</span>
            </div>
          </div>
          <button className="cyber-hud-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="cyber-hud-tabs-nav">
          {MODEL_RANGE_VARIANTS.map((m) => (
            <button
              key={m.id}
              className={`cyber-tab-btn ${selectedVariantId === m.id ? 'active' : ''}`}
              onClick={() => setSelectedVariantId(m.id)}
            >
              <Car size={13} /> {m.title.split(' ')[1]} {m.title.split(' ')[2] || ''}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="cyber-hud-body">
          <div className="cyber-split-grid">
            <div className="hud-box-telemetry">
              <div className="hud-spec-row">
                <span className="hud-spec-key">MODEL</span>
                <span className="hud-spec-val highlight">{curModel.title}</span>
              </div>
              <div className="hud-spec-row">
                <span className="hud-spec-key">CONFIG</span>
                <span className="hud-spec-val">{curModel.type}</span>
              </div>
              <div className="hud-spec-row">
                <span className="hud-spec-key">POWER</span>
                <span className="hud-spec-val highlight">{curModel.power}</span>
              </div>
              <div className="hud-spec-row">
                <span className="hud-spec-key">TORQUE</span>
                <span className="hud-spec-val">{curModel.torque}</span>
              </div>
              <div className="hud-spec-row">
                <span className="hud-spec-key">GEARBOX</span>
                <span className="hud-spec-val">{curModel.transmission}</span>
              </div>
              <div className="hud-spec-row">
                <span className="hud-spec-key">DIFF</span>
                <span className="hud-spec-val">{curModel.diff}</span>
              </div>
              <div className="hud-spec-row">
                <span className="hud-spec-key">BRAKES</span>
                <span className="hud-spec-val">{curModel.brakes}</span>
              </div>
            </div>

            <div className="hud-box-description">
              <div className="hud-desc-heading">
                <span className="chevron-cyan">»»</span> {curModel.badge} // {curModel.title}
              </div>
              <div className="hud-desc-text">
                {curModel.desc[lang] || curModel.desc.RU}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="cyber-hud-footer">
          <div className="hud-barcode-deco">||||| ||| ||||| TRD-JZA80</div>
          <button className="btn-cyber-primary" onClick={onClose}>
            <span>{t.backBtn}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
