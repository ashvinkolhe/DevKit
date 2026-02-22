import { Link } from 'react-router-dom'
import { ALL_TOOLS } from '../constants/tools'
import styles from './Landing.module.css'

const FEATURES = [
  { icon: 'FREE', title: 'Always Free', desc: 'No paywalls, no limits, no credit card. Use everything forever.' },
  { icon: 'OSS', title: 'Open Source', desc: 'MIT licensed. Fork it, self-host it, modify it freely.' },
  { icon: 'SAFE', title: 'Privacy First', desc: 'All processing happens in your browser. Zero data sent to servers.' },
  { icon: 'FAST', title: 'Instant Results', desc: 'No round-trips. Everything runs locally for zero latency.' },
  { icon: 'FOCUS', title: 'No Distractions', desc: 'No cookie popups, login walls, or upsell modals. Ever.' },
  { icon: 'MOBILE', title: 'Fully Responsive', desc: 'Works on any device. Mobile, tablet, desktop.' },
]

export default function Landing() {
  return (
    <div className={styles.landing}>
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <div className={styles.logoIcon}>DK</div>
          <span>Dev<span className={styles.accent}>Kit</span></span>
        </div>
        <div className={styles.navLinks}>
          <a href="#features">Features</a>
          <a href="#tools">Tools</a>
          <a href="https://github.com/ashvinkolhe" target="_blank" rel="noreferrer">GitHub</a>
          <Link to="/tools" className={`btn btn-primary ${styles.navCta}`}>Open App</Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden />
        <div className={styles.heroGlow} aria-hidden />

        <div className={`${styles.badge} anim-fade-up`}>
          <span className={styles.dot} />
          Free and Open Source | No Login Required
        </div>

        <h1 className={`${styles.heroTitle} anim-fade-up anim-delay-1`}>
          Every tool a dev<br />
          <span className={styles.gradientText}>actually needs</span>
        </h1>

        <p className={`${styles.heroSub} anim-fade-up anim-delay-2`}>
          15+ hand-crafted utilities in one place. Format JSON, test regex,
          decode JWT, compare diffs - all free, all instant, all in your browser.
        </p>

        <div className={`${styles.heroActions} anim-fade-up anim-delay-3`}>
          <Link to="/tools" className="btn btn-primary btn-lg">Open DevKit</Link>
          <a href="https://github.com/ashvinkolhe" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Star on GitHub</a>
        </div>

        <div className={`${styles.heroStats} anim-fade-up anim-delay-4`}>
          {[['15+','Developer Tools'], ['100%','Free Forever'], ['0','Sign-ups Needed'], ['24/7','Uses Per Day']].map(([n, l], i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statNum}>{n}</span>
              <span className={styles.statLbl}>{l}</span>
              {i < 3 && <div className={styles.statDiv} />}
            </div>
          ))}
        </div>
      </section>

      <div className={styles.mockSection}>
        <div className={styles.mockBrowser}>
          <div className={styles.mockBar}>
            <div className={styles.mockDots}>
              <span style={{background:'#ff5f56'}} />
              <span style={{background:'#ffbd2e'}} />
              <span style={{background:'#27c93f'}} />
            </div>
            <div className={styles.mockUrl}>DevKit.co/tools/json</div>
          </div>
          <div className={styles.mockBody}>
            <div className={styles.mockSidebar}>
              {['JSON','Diff','Regex','Base64','Hash','JWT'].map((t, i) => (
                <div key={t} className={`${styles.mockNavItem} ${i===0 ? styles.mockNavActive : ''}`}>{t}</div>
              ))}
            </div>
            <div className={styles.mockContent}>
              <div className={styles.mockToolTitle}>JSON Formatter</div>
              <div className={styles.mockRow}>
                <div className={styles.mockPane} style={{borderColor:'rgba(75,131,240,0.35)'}}>
                  <span style={{color:'var(--text-muted)'}}>{'{'}</span><br/>
                  &nbsp;&nbsp;<span style={{color:'var(--accent)'}}>"name"</span>: <span style={{color:'var(--success)'}}>DevKit</span>,<br/>
                  &nbsp;&nbsp;<span style={{color:'var(--accent)'}}>"free"</span>: <span style={{color:'var(--warning)'}}>true</span><br/>
                  <span style={{color:'var(--text-muted)'}}>{'}'}</span>
                </div>
                <div className={styles.mockPane}>
                  <span style={{color:'var(--success)'}}>Valid JSON</span><br/><br/>
                  <span style={{color:'var(--text-muted)'}}>Keys: 2</span><br/>
                  <span style={{color:'var(--text-muted)'}}>Size: 38 bytes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.featSection} id="features">
        <div className={styles.sectionHead}>
          <div className={styles.sectionLabel}>Why DevKit</div>
          <h2 className={styles.sectionTitle}>Built for devs, by devs</h2>
          <p className={styles.sectionSub}>Everything you reach for during development, in one distraction-free interface.</p>
        </div>
        <div className={styles.featGrid}>
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title} className={styles.featCard}>
              <div className={styles.featIcon}>{icon}</div>
              <h3 className={styles.featTitle}>{title}</h3>
              <p className={styles.featDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.toolsSection} id="tools">
        <div className={styles.sectionHead}>
          <div className={styles.sectionLabel}>The Toolkit</div>
          <h2 className={styles.sectionTitle}>15+ tools and counting</h2>
          <p className={styles.sectionSub}>Every tool you need during development - and more on the way.</p>
        </div>
        <div className={styles.toolsGrid}>
          {ALL_TOOLS.map(({ id, icon, label, desc }) => (
            <Link to={id === 'ai-assistant' ? '/ai' : `/tools/${id}`} key={id} className={styles.toolCard}>
              <span className={styles.toolCardIcon}>{icon}</span>
              <span className={styles.toolCardName}>{label}</span>
              <span className={styles.toolCardDesc}>{desc}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaGlow} aria-hidden />
          <div className={styles.ctaBadge}>Built for daily dev workflows</div>
          <div className={styles.ctaEmblem}>
            <span className={styles.ctaEmblemCore}>DevKit</span>
            <span className={styles.ctaEmblemRing} aria-hidden />
          </div>
          <h2 className={styles.ctaTitle}>Ready to build faster?</h2>
          <p className={styles.ctaSub}>No sign-up, no tracking, no BS. Just tools.</p>
          <div className={styles.ctaChips}>
            <span className={styles.ctaChip}>Local first</span>
            <span className={styles.ctaChip}>Cloud + backend tools</span>
            <span className={styles.ctaChip}>History saved on device</span>
          </div>
          <div className={styles.ctaActions}>
            <Link to="/tools" className="btn btn-primary btn-lg">Open DevKit</Link>
            <a href="https://github.com/ashvinkolhe" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">View Source</a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <div className={styles.logoIcon}>DK</div>
          <span className={styles.accent}>DevKit</span>
        </div>
        <div className={styles.footerLinks}>
          <Link to="/tools">Tools</Link>
          <a href="https://github.com/ashvinkolhe" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://github.com/ashvinkolhe/issues" target="_blank" rel="noreferrer">Report Bug</a>
          <a href="https://github.com/ashvinkolhe/blob/main/LICENSE" target="_blank" rel="noreferrer">MIT License</a>
        </div>
        <div className={styles.footerCopy}>2026 DevKit.</div>
      </footer>
    </div>
  )
}
/*  */
