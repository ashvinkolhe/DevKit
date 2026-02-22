import { useMemo, useState } from 'react'
import { ToolShell, ControlsBar, PanelLabel, StatusBadge, CopyBtn } from '../components/ToolShell'
import { useCopy } from '../hooks/useCopy'

function parseArn(arn) {
  const m = arn.trim().match(/^arn:([^:]*):([^:]*):([^:]*):([^:]*):(.+)$/)
  if (!m) return null

  const [, partition, service, region, accountId, resource] = m
  let resourceType = ''
  let resourceId = resource

  if (resource.includes('/')) {
    const [first, ...rest] = resource.split('/')
    resourceType = first
    resourceId = rest.join('/')
  } else if (resource.includes(':')) {
    const [first, ...rest] = resource.split(':')
    resourceType = first
    resourceId = rest.join(':')
  }

  return { partition, service, region, accountId, resource, resourceType, resourceId }
}

export default function AwsArnParser() {
  const [input, setInput] = useState('')
  const { copied, copy } = useCopy()

  const parsed = useMemo(() => parseArn(input), [input])

  function loadSample() {
    setInput('arn:aws:lambda:us-east-1:123456789012:function:invoice-processor')
  }

  function clear() {
    setInput('')
  }

  const formatted = parsed ? JSON.stringify(parsed, null, 2) : ''

  return (
    <ToolShell icon="" title="AWS ARN Parser" desc="Parse any ARN into partition, service, region, account and resource parts.">
      <ControlsBar>
        <button className="btn btn-ghost btn-sm" onClick={loadSample}> Sample ARN</button>
        <CopyBtn onClick={() => copy(formatted)} copied={copied} label="Copy JSON" />
        <button className="btn btn-danger btn-sm" onClick={clear}> Clear</button>
      </ControlsBar>

      {input && !parsed && <StatusBadge type="error"> Invalid ARN format</StatusBadge>}
      {parsed && <StatusBadge type="success"> Valid ARN for service: {parsed.service || 'unknown'}</StatusBadge>}

      <div>
        <PanelLabel>ARN Input</PanelLabel>
        <input
          className="text-input"
          style={{ width: '100%' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="arn:aws:service:region:account-id:resource"
          spellCheck={false}
        />
      </div>

      <div>
        <PanelLabel>Parsed Output</PanelLabel>
        <pre className="output-area" style={{ minHeight: 220 }}>
          {parsed ? formatted : <span style={{ color: 'var(--text-muted)' }}>Parsed fields will appear here...</span>}
        </pre>
      </div>
    </ToolShell>
  )
}
