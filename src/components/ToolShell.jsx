import styles from './ToolShell.module.css'

export function ToolShell({ icon, title, desc, children }) {
  return (
    <div className={`tool-wrapper anim-fade-up`}>
      <div className="tool-header-block">
        <div className="tool-title">{icon} {title}</div>
        <div className="tool-desc">{desc}</div>
      </div>
      {children}
    </div>
  )
}

export function ControlsBar({ children }) {
  return <div className="controls-bar">{children}</div>
}

export function PanelLabel({ children, actions }) {
  return (
    <div className="panel-label">
      <span>{children}</span>
      {actions && <div style={{ display: 'flex', gap: 6 }}>{actions}</div>}
    </div>
  )
}

export function StatusBadge({ type, children }) {
  if (!children) return null
  return <div className={`status-badge status-${type}`}>{children}</div>
}

export function CopyBtn({ onClick, copied, label = 'Copy' }) {
  return (
    <button
      className={`btn btn-sm ${copied ? 'btn-success' : 'btn-ghost'}`}
      onClick={onClick}
    >
      {copied ? 'Copied!' : label}
    </button>
  )
}
