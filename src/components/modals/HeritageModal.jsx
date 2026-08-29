import React, { useState } from 'react'
import { X, ChevronRight, History } from 'lucide-react'
import { HERITAGE_GENERATIONS } from '../../data/heritageData'

/**
 * Cyber-HUD Modal: Heritage Archives (MK I - MK V)
 */
export function HeritageModal({ onClose, lang, t }) {
  const [selectedGenId, setSelectedGenId] = useState('mk4')
  const curGen =
    HERITAGE_GENERATIONS.find((g) => g.id === selectedGenId) || HERITAGE_GENERATIONS[0]

  return (
    <div className="cyber-modal-backdrop ui-interactive" onClick={onClose}>
      <div className="cyber-hud-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cyber-hud-header">
          <div>
            <div className="hud-tag-stage">
              <span className="plus-icon">+ [PART 01]</span> HERITAGE ARCHIVES
            </div>
            <div className="cyber-hud-title">
              <span>SUPRA GENERATIONS</span>
              <span className="kanji-badge">系譜録</span>
            </div>
          </div>
          <button className="cyber-hud-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="cyber-hud-tabs-nav">
          {HERITAGE_GENERATIONS.map((gen) => (
            <button
              key={gen.id}
              className={`cyber-tab-btn ${selectedGenId === gen.id ? 'active' : ''}`}
              onClick={() => setSelectedGenId(gen.id)}
            >
              <History size={13} /> {gen.title.split(' ')[1]} ({gen.years.split(' ')[0]})
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="cyber-hud-body">
          <div className="cyber-split-grid">
            <div className="hud-box-telemetry">
              <div className="hud-spec-row">
                <span className="hud-spec-key">GENERATION</span>
                <span className="hud-spec-val highlight">{curGen.title}</span>
              </div>
              <div className="hud-spec-row">
                <span className="hud-spec-key">YEARS</span>
                <span className="hud-spec-val">{curGen.years}</span>
              </div>
              <div className="hud-spec-row">
                <span className="hud-spec-key">ENGINE</span>
                <span className="hud-spec-val highlight">{curGen.engine}</span>
              </div>
              <div className="hud-spec-row">
                <span className="hud-spec-key">POWER</span>
                <span className="hud-spec-val">{curGen.power}</span>
              </div>
              <div className="hud-spec-row">
                <span className="hud-spec-key">0-100 KM/H</span>
                <span className="hud-spec-val">{curGen.accel}</span>
              </div>
              <div className="hud-spec-row">
                <span className="hud-spec-key">TOP SPEED</span>
                <span className="hud-spec-val">{curGen.speed}</span>
              </div>
              <div className="hud-spec-row">
                <span className="hud-spec-key">WEIGHT</span>
                <span className="hud-spec-val">{curGen.weight}</span>
              </div>
            </div>

            <div className="hud-box-description">
              <div className="hud-desc-heading">
                <span className="chevron-cyan">»»</span> {curGen.badge} // {curGen.title}
              </div>
              <div className="hud-desc-text">
                {curGen.desc[lang] || curGen.desc.RU}
              </div>
              <div className="hud-desc-highlights">
                {curGen.tags.map((tag) => (
                  <span key={tag} className="hud-badge-pill">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="cyber-hud-footer">
          <div className="hud-barcode-deco">|||| |||||| |||| 2JZ-ARCHIVE</div>
          <button className="btn-cyber-primary" onClick={onClose}>
            <span>{t.backBtn}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
