import { useNavigate } from 'react-router-dom'
import { TOOL_GROUPS, TOOL_MAP } from '../constants/tools'
import styles from './Dashboard.module.css'

function formatWhen(ts) {
  const diff = Date.now() - ts
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  if (diff < minute) return 'just now'
  if (diff < hour) return `${Math.floor(diff / minute)}m ago`
  if (diff < day) return `${Math.floor(diff / hour)}h ago`
  return `${Math.floor(diff / day)}d ago`
}

export default function Dashboard({ history = [], onClearHistory }) {
  const navigate = useNavigate()
  const openTool = (id) => navigate(id === 'ai-assistant' ? '/ai' : `/tools/${id}`)
  const recent = history
    .map((item) => ({ ...item, tool: TOOL_MAP[item.id] }))
    .filter((item) => item.tool)
    .slice(0, 8)

  return (
    <div className={styles.dash}>
      <div className={`${styles.hero} anim-fade-up`}>
        <div className={styles.heroBadge}>Local-First Developer Suite</div>
        <h2 className={styles.heroTitle}>Developer DevKit</h2>
        <p className={styles.heroSub}>
          Select a tool from the sidebar, or jump straight in below.
          Everything runs in your browser and your history stays local on this device.
        </p>
      </div>

      {recent.length > 0 && (
        <div className={styles.group}>
          <div className={styles.groupTop}>
            <div className={styles.groupLabel}>Recent History</div>
            <button className={styles.clearBtn} onClick={onClearHistory}>Clear History</button>
          </div>
          <div className={styles.grid}>
            {recent.map(({ id, tool, ts, count }) => (
              <button
                key={`recent-${id}`}
                className={styles.card}
                onClick={() => openTool(id)}
              >
                <span className={styles.cardIcon}>{tool.icon}</span>
                <span className={styles.cardName}>{tool.label}</span>
                <span className={styles.cardDesc}>Used {count} time{count > 1 ? 's' : ''} - {formatWhen(ts)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {Object.entries(TOOL_GROUPS).map(([group, tools]) => (
        <div key={group} className={styles.group}>
          <div className={styles.groupLabel}>{group}</div>
          <div className={styles.grid}>
            {tools.map(({ id, icon, label, desc }) => (
              <button
                key={id}
                className={styles.card}
                onClick={() => openTool(id)}
              >
                <span className={styles.cardIcon}>{icon}</span>
                <span className={styles.cardName}>{label}</span>
                <span className={styles.cardDesc}>{desc}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
