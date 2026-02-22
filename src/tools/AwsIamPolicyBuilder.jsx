import { useMemo, useState } from 'react'
import { ToolShell, ControlsBar, PanelLabel, StatusBadge, CopyBtn } from '../components/ToolShell'
import { useCopy } from '../hooks/useCopy'

function parseList(v) {
  return v
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

export default function AwsIamPolicyBuilder() {
  const [effect, setEffect] = useState('Allow')
  const [actions, setActions] = useState('s3:GetObject\ns3:ListBucket')
  const [resources, setResources] = useState('arn:aws:s3:::my-bucket\narn:aws:s3:::my-bucket/*')
  const { copied, copy } = useCopy()

  const output = useMemo(() => {
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'GeneratedByDevKit',
          Effect: effect,
          Action: parseList(actions),
          Resource: parseList(resources),
        },
      ],
    }
    return JSON.stringify(policy, null, 2)
  }, [effect, actions, resources])

  return (
    <ToolShell icon="" title="AWS IAM Policy Builder" desc="Generate IAM policy JSON from actions and resource ARNs.">
      <ControlsBar>
        <span className="inline-label">Effect</span>
        <select className="select-el" value={effect} onChange={(e) => setEffect(e.target.value)}>
          <option value="Allow">Allow</option>
          <option value="Deny">Deny</option>
        </select>
        <CopyBtn onClick={() => copy(output)} copied={copied} label="Copy JSON" />
      </ControlsBar>

      <StatusBadge type="info">Enter one action and one ARN per line.</StatusBadge>

      <div className="split-pane">
        <div>
          <PanelLabel>Actions</PanelLabel>
          <textarea className="code-area" rows={10} value={actions} onChange={(e) => setActions(e.target.value)} spellCheck={false} />
        </div>
        <div>
          <PanelLabel>Resources</PanelLabel>
          <textarea className="code-area" rows={10} value={resources} onChange={(e) => setResources(e.target.value)} spellCheck={false} />
        </div>
      </div>

      <div>
        <PanelLabel>Policy JSON</PanelLabel>
        <pre className="output-area" style={{ minHeight: 220 }}>{output}</pre>
      </div>
    </ToolShell>
  )
}
