import { useMemo, useState } from 'react'
import { ToolShell, ControlsBar, PanelLabel, StatusBadge, CopyBtn } from '../components/ToolShell'
import { useCopy } from '../hooks/useCopy'

function parseLine(line, delimiter) {
  const parts = line.split(delimiter).map((p) => p.trim()).filter(Boolean)
  if (!parts.length) return null
  const [segment, ...fields] = parts
  return { segment, fields }
}

export default function SapIdocFormatter() {
  const [delimiter, setDelimiter] = useState('|')
  const [input, setInput] = useState('E1EDK01|ACTION=004|BSART=NB\nE1EDP01|POSEX=000010|MENGE=10')
  const { copied, copy } = useCopy()

  const output = useMemo(() => {
    const lines = input.split('\n').map((l) => l.trim()).filter(Boolean)
    const parsed = lines.map((line) => parseLine(line, delimiter)).filter(Boolean)
    return JSON.stringify(parsed, null, 2)
  }, [input, delimiter])

  return (
    <ToolShell icon="" title="SAP IDoc Formatter" desc="Convert flat IDoc-like segment lines to structured JSON for analysis.">
      <ControlsBar>
        <span className="inline-label">Delimiter</span>
        <input className="text-input" style={{ width: 80 }} value={delimiter} onChange={(e) => setDelimiter(e.target.value || '|')} />
        <CopyBtn onClick={() => copy(output)} copied={copied} label="Copy JSON" />
      </ControlsBar>
      <StatusBadge type="info">Expected format: `SEGMENT|FIELD=VALUE|FIELD=VALUE` per line.</StatusBadge>

      <div className="split-pane">
        <div>
          <PanelLabel>Input Lines</PanelLabel>
          <textarea className="code-area" rows={12} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </div>
        <div>
          <PanelLabel>Structured JSON</PanelLabel>
          <pre className="output-area" style={{ minHeight: 280 }}>{output}</pre>
        </div>
      </div>
    </ToolShell>
  )
}
