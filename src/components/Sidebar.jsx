import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TOOL_GROUPS, TOOL_MAP } from '../constants/tools'
import styles from './Sidebar.module.css'

export default function Sidebar({ activeTool, history = [], onClearHistory, onClose }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleNav(id) {
    if (id === 'ai-assistant') navigate('/ai')
    else navigate(`/tools/${id}`)
    onClose?.()
  }

  const q = query.toLowerCase()
  const recentTools = history
    .map((item) => ({ ...item, tool: TOOL_MAP[item.id] }))
    .filter((item) => item.tool)
    .slice(0, 6)

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logoIcon}>DT</div>
        <Link to="/" className={styles.logoText}>
          <span className={styles.accent}>DevKit</span>
        </Link>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">x</button>
      </div>

      <div className={styles.searchWrap}>
        <span className={styles.searchIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search tools..."
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className={styles.clearSearch} onClick={() => setQuery('')} aria-label="Clear search">X</button>
        )}
      </div>

      <nav className={styles.nav}>
        {(!q || 'dashboard'.includes(q)) && (
          <button
            className={`${styles.navItem} ${!activeTool ? styles.active : ''}`}
            onClick={() => { navigate('/tools'); onClose?.() }}
          >
            <span className={styles.navIcon}>DB</span>
            <span className={styles.navLabel}>Dashboard</span>
          </button>
        )}

        {!q && recentTools.length > 0 && (
          <div className={styles.group}>
            <div className={styles.groupLabelRow}>
              <div className={styles.groupLabel}>Recent</div>
              <button className={styles.clearHistoryBtn} onClick={onClearHistory}>Clear</button>
            </div>
            {recentTools.map(({ id, tool }) => (
              <button
                key={`recent-${id}`}
                className={`${styles.navItem} ${activeTool === id ? styles.active : ''}`}
                onClick={() => handleNav(id)}
              >
                <span className={styles.navIcon}>{tool.icon}</span>
                <span className={styles.navLabel}>{tool.label}</span>
              </button>
            ))}
          </div>
        )}

        {Object.entries(TOOL_GROUPS).map(([group, tools]) => {
          const filtered = tools.filter((t) =>
            !q || t.label.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
          )
          if (!filtered.length) return null
          return (
            <div key={group} className={styles.group}>
              <div className={styles.groupLabel}>{group}</div>
              {filtered.map(({ id, label, icon }) => (
                <button
                  key={id}
                  className={`${styles.navItem} ${activeTool === id ? styles.active : ''}`}
                  onClick={() => handleNav(id)}
                >
                  <span className={styles.navIcon}>{icon}</span>
                  <span className={styles.navLabel}>{label}</span>
                </button>
              ))}
            </div>
          )
        })}
      </nav>

      <div className={styles.sidebarFooter}>
        <a
          href="https://github.com/ashvinkolhe"
          target="_blank" rel="noreferrer"
          className={styles.githubLink}
        >
          Star on GitHub
        </a>
      </div>
    </aside>
  )
}
