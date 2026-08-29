import React from 'react'
import { ChevronRight, X } from 'lucide-react'
import {
  JDM_COLORS,
  INTERIOR_COLORS,
  FINISHES,
  WHEEL_FINISHES,
  CALIPER_COLORS,
  UNDERGLOW_COLORS
} from '../../data/colorOptions'

/**
 * Bottom Customizer Deck
 * Features 6 focused category tabs (COLOR, INTERIOR, WHEELS, CALIPERS, NEON, FINISH),
 * Color Swatches with custom color picker, Finish pills, and Next button.
 */
export function BottomCustomizer({
  customizerTab,
  setCustomizerTab,
  carColor,
  setCarColor,
  interiorColor,
  setInteriorColor,
  wheelColor,
  setWheelColor,
  caliperColor,
  setCaliperColor,
  underglowColor,
  setUnderglowColor,
  carFinish,
  setCarFinish,
  onOpenSummary,
  onCockpitFocus,
  t
}) {
  return (
    <div className="bottom-customizer-wrapper ui-interactive">
      {/* Category Tabs */}
      <div className="customizer-category-nav">
        {[
          { id: 'COLOR', en: t.catColor },
          { id: 'INTERIOR', en: t.catInterior },
          { id: 'WHEELS', en: t.catWheels },
          { id: 'CALIPERS', en: t.catCalipers },
          { id: 'UNDERGLOW', en: t.catNeon },
          { id: 'FINISH', en: t.catFinish },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`cat-nav-btn ${customizerTab === tab.id ? 'active' : ''}`}
            onClick={() => {
              setCustomizerTab(tab.id)
              if (tab.id === 'INTERIOR') {
                onCockpitFocus()
              }
            }}
          >
            {tab.en}
          </button>
        ))}
      </div>

      {/* Controls Deck */}
      <div className="customizer-controls-deck">
        <div className="controls-left-spacer" />

        <div className="controls-center-items">
          {/* 1. Paint Color Selection */}
          {customizerTab === 'COLOR' && (
            <>
              {JDM_COLORS.map((c) => (
                <button
                  key={c.name}
                  className={`color-swatch-btn ${carColor === c.hex ? 'active' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  title={`${c.kanji} (${c.name})`}
                  onClick={() => setCarColor(c.hex)}
                />
              ))}
              <label className="custom-color-plus-btn" title="Custom Color">
                +
                <input
                  type="color"
                  value={carColor}
                  onChange={(e) => setCarColor(e.target.value)}
                />
              </label>
            </>
          )}

          {/* 2. Interior Color Selection */}
          {customizerTab === 'INTERIOR' && (
            <>
              {INTERIOR_COLORS.map((i) => (
                <button
                  key={i.name}
                  className={`color-swatch-btn ${interiorColor === i.hex ? 'active' : ''}`}
                  style={{ backgroundColor: i.hex }}
                  title={`${i.kanji} (${i.name})`}
                  onClick={() => setInteriorColor(i.hex)}
                />
              ))}
              <label className="custom-color-plus-btn" title="Custom Interior Color">
                +
                <input
                  type="color"
                  value={interiorColor}
                  onChange={(e) => setInteriorColor(e.target.value)}
                />
              </label>
            </>
          )}

          {/* 3. Wheel Finishes Selection */}
          {customizerTab === 'WHEELS' && (
            <>
              {WHEEL_FINISHES.map((w) => (
                <button
                  key={w.name}
                  className={`color-swatch-btn ${wheelColor === w.hex ? 'active' : ''}`}
                  style={{ backgroundColor: w.hex }}
                  title={`${w.name} (${w.jp})`}
                  onClick={() => setWheelColor(w.hex)}
                />
              ))}
            </>
          )}

          {/* 4. Caliper Color Selection */}
          {customizerTab === 'CALIPERS' && (
            <>
              {CALIPER_COLORS.map((c) => (
                <button
                  key={c.name}
                  className={`color-swatch-btn ${caliperColor === c.hex ? 'active' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  title={`${c.name} (${c.jp})`}
                  onClick={() => setCaliperColor(c.hex)}
                />
              ))}
            </>
          )}

          {/* 5. Underglow Neon Selection */}
          {customizerTab === 'UNDERGLOW' && (
            <>
              {UNDERGLOW_COLORS.map((u) => (
                <button
                  key={u.name}
                  className={`color-swatch-btn ${underglowColor === u.hex ? 'active' : ''}`}
                  style={{
                    backgroundColor: u.hex || '#222630',
                    border: u.hex ? `2px solid ${u.hex}` : '2px solid #555'
                  }}
                  title={`${u.name} (${u.jp})`}
                  onClick={() => setUnderglowColor(u.hex)}
                >
                  {!u.hex && <X size={14} style={{ color: '#888' }} />}
                </button>
              ))}
            </>
          )}

          {/* 6. Finish Selector Pills */}
          {customizerTab === 'FINISH' && (
            <div className="finishes-pills-bar">
              {FINISHES.map((f) => (
                <button
                  key={f.id}
                  className={`finish-pill-btn ${carFinish === f.id ? 'active' : ''}`}
                  onClick={() => setCarFinish(f.id)}
                >
                  {f.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Action: Next Button */}
        <div className="controls-right-action">
          <button className="btn-next-step" onClick={onOpenSummary}>
            <span>{t.next}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Bottom Disclaimer & 3D Model Credit */}
      <div className="bottom-disclaimer-text">
        <span>{t.disclaimer}</span>
        <span className="author-credit-link" style={{ marginLeft: 6 }}>
          {t.modelCredit}:{' '}
          <a
            href="https://sketchfab.com/ddiaz-design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ddiaz Design
          </a>{' '}
          (
          <a
            href="https://skfb.ly/pMGYV"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sketchfab
          </a>
          )
        </span>
      </div>
    </div>
  )
}
