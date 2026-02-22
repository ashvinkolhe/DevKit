import { useMemo, useState } from 'react'
import { ToolShell, ControlsBar, PanelLabel, StatusBadge, CopyBtn } from '../components/ToolShell'
import { useCopy } from '../hooks/useCopy'

function toEnvLine(key, value) {
  return `${key}=${value}`
}

export default function DockerEnvBuilder() {
  const [appName, setAppName] = useState('my-service')
  const [port, setPort] = useState('3000')
  const [nodeEnv, setNodeEnv] = useState('production')
  const [dbUrl, setDbUrl] = useState('postgres://user:pass@db:5432/app')
  const [extra, setExtra] = useState('REDIS_URL=redis://redis:6379')
  const { copied, copy } = useCopy()

  const envOutput = useMemo(() => {
    const lines = [
      toEnvLine('APP_NAME', appName),
      toEnvLine('PORT', port),
      toEnvLine('NODE_ENV', nodeEnv),
      toEnvLine('DATABASE_URL', dbUrl),
    ]
    if (extra.trim()) lines.push(extra.trim())
    return lines.join('\n')
  }, [appName, port, nodeEnv, dbUrl, extra])

  const composeSnippet = useMemo(
    () => `services:
  ${appName}:
    image: ${appName}:latest
    env_file:
      - .env
    ports:
      - "${port}:${port}"`,
    [appName, port]
  )

  return (
    <ToolShell icon="" title="Docker Env Builder" desc="Generate `.env` values and a docker-compose env snippet quickly.">
      <ControlsBar>
        <CopyBtn onClick={() => copy(envOutput)} copied={copied} label="Copy .env" />
      </ControlsBar>
      <StatusBadge type="info">Use this for local and containerized config templates.</StatusBadge>

      <div className="split-pane">
        <div style={{ display: 'grid', gap: 8 }}>
          <PanelLabel>Inputs</PanelLabel>
          <input className="text-input" value={appName} onChange={(e) => setAppName(e.target.value)} placeholder="App name" />
          <input className="text-input" value={port} onChange={(e) => setPort(e.target.value)} placeholder="Port" />
          <input className="text-input" value={nodeEnv} onChange={(e) => setNodeEnv(e.target.value)} placeholder="NODE_ENV" />
          <input className="text-input" value={dbUrl} onChange={(e) => setDbUrl(e.target.value)} placeholder="Database URL" />
          <textarea className="code-area" rows={5} value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="Extra key=value lines" />
        </div>
        <div style={{ display: 'grid', gap: 10 }}>
          <div>
            <PanelLabel>.env Output</PanelLabel>
            <pre className="output-area" style={{ minHeight: 160 }}>{envOutput}</pre>
          </div>
          <div>
            <PanelLabel>docker-compose Snippet</PanelLabel>
            <pre className="output-area" style={{ minHeight: 130 }}>{composeSnippet}</pre>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
