import React from 'react'
import { Globe, Building2, Landmark, Flag } from 'lucide-react'

/**
 * Top Header Navigation Component
 * Features Brand Logo/Badge, Links to Modals (Heritage, Models, Tuning, Summary),
 * Studio Theme selector (Wangan, Kyoto, Fuji), and Multilingual switcher (RU, EN, JA).
 */
export function Header({
  lang,
  setLang,
  t,
  activeHudModal,
  setActiveHudModal,
  studioEnvironment,
  setStudioEnvironment
}) {
  return (
    <div className="header-wrapper ui-interactive">
      <div className="main-nav">
        {/* Left: Brand Badge */}
        <div
          className="brand-logo-center"
          onClick={() => setActiveHudModal(null)}
          title="Toyota Supra MK IV JZA80"
        >
          <div className="brand-badge">
            <div className="hinomaru-dot" />
            <span className="brand-main-title">TOYOTA SUPRA</span>
            <span className="brand-jp-title">JZA80</span>
          </div>
        </div>

        {/* Center: Essential Modals Navigation */}
        <div className="nav-links-center">
          <button
            className={`clean-nav-btn ${activeHudModal === 'heritage' ? 'active' : ''}`}
            onClick={() => setActiveHudModal('heritage')}
          >
            {t.heritage}
          </button>
          <button
            className={`clean-nav-btn ${activeHudModal === 'models' ? 'active' : ''}`}
            onClick={() => setActiveHudModal('models')}
          >
            {t.modelRange}
          </button>
          <button
            className={`clean-nav-btn ${activeHudModal === 'tuning' ? 'active' : ''}`}
            onClick={() => setActiveHudModal('tuning')}
          >
            {t.tuning}
          </button>
          <button
            className={`clean-nav-btn ${activeHudModal === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveHudModal('summary')}
          >
            {t.summary}
          </button>
        </div>

        {/* Right: Studio & Language Switcher */}
        <div className="nav-right-deck">
          <div className="studio-pills-deck">
            <button
              className={`studio-pill-btn ${studioEnvironment === 'wangan' ? 'active' : ''}`}
              onClick={() => setStudioEnvironment('wangan')}
              title="Wangan Tokyo"
            >
              <Building2 size={12} /> {t.wangan}
            </button>
            <button
              className={`studio-pill-btn ${studioEnvironment === 'kyoto' ? 'active' : ''}`}
              onClick={() => setStudioEnvironment('kyoto')}
              title="Kyoto Dojo"
            >
              <Landmark size={12} /> {t.kyoto}
            </button>
            <button
              className={`studio-pill-btn ${studioEnvironment === 'fuji' ? 'active' : ''}`}
              onClick={() => setStudioEnvironment('fuji')}
              title="Fuji Speedway"
            >
              <Flag size={12} /> {t.fuji}
            </button>
          </div>

          <div className="lang-switcher-deck">
            <Globe size={11} style={{ color: '#88909c', marginRight: 2 }} />
            {['RU', 'EN', 'JA'].map((l) => (
              <button
                key={l}
                className={`lang-btn ${lang === l ? 'active' : ''}`}
                onClick={() => setLang(l)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
