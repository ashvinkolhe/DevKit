import { useState, useCallback } from 'react'
import { ToolShell, ControlsBar, PanelLabel, StatusBadge, CopyBtn } from '../components/ToolShell'
import { useCopy } from '../hooks/useCopy'

const SAMPLE = JSON.stringify({ name: 'DevKit', version: '2.0', tools: ['JSON', 'Diff', 'Regex'], meta: { author: 'Dev', open_source: true, year: 2024 } }, null, 2)

export default function JsonFormatter() {
  const [input, setInput]   = useState('')
  const [output, setOutput] = useState('')
  const [indent, setIndent] = useState('2')
  const [status, setStatus] = useState(null) // { type, msg }
  const { copied, copy }    = useCopy()

  const format = useCallback((text = input) => {
    try {
      const parsed = JSON.parse(text.trim() || '{}')
      const indentVal = indent === 'tab' ? '\t' : parseInt(indent)
      const formatted = JSON.stringify(parsed, null, indentVal)
      setOutput(formatted)
      setStatus({ type: 'success', msg: ` Valid JSON  ${Object.keys(parsed).length ?? '?'} top-level key(s)` })
    } catch (e) {
      setStatus({ type: 'error', msg: ' ' + e.message })
      setOutput('')
    }
  }, [input, indent])

  const minify = useCallback(() => {
    try {
      const parsed = JSON.parse(input.trim() || '{}')
      setOutput(JSON.stringify(parsed))
      setStatus({ type: 'success', msg: ' Minified' })
    } catch (e) {
      setStatus({ type: 'error', msg: ' ' + e.message })
    }
  }, [input])

  function clear() { setInput(''); setOutput(''); setStatus(null) }

  function loadSample() {
    setInput(SAMPLE)
    // Format the sample immediately
    try {
      const indentVal = indent === 'tab' ? '\t' : parseInt(indent)
      setOutput(JSON.stringify(JSON.parse(SAMPLE), null, indentVal))
      setStatus({ type: 'success', msg: ' Sample loaded' })
    } catch {}
  }

  return (
    <ToolShell icon="" title="JSON Formatter" desc="Format, validate, and minify JSON. Paste below and click Format.">
      <ControlsBar>
        <button className="btn btn-primary btn-sm" onClick={() => format()}> Format</button>
        <button className="btn btn-ghost btn-sm" onClick={minify}> Minify</button>
        <CopyBtn onClick={() => copy(output)} copied={copied} />
        <button className="btn btn-danger btn-sm" onClick={clear}> Clear</button>
        <button className="btn btn-ghost btn-sm" onClick={loadSample}> Sample</button>
        <span className="inline-label">Indent:</span>
        <select className="select-el" value={indent} onChange={e => setIndent(e.target.value)}>
          <option value="2">2 spaces</option>
          <option value="4">4 spaces</option>
          <option value="tab">Tab</option>
        </select>
      </ControlsBar>

      {status && <StatusBadge type={status.type}>{status.msg}</StatusBadge>}

      <div className="split-pane">
        <div>
          <PanelLabel>Input JSON</PanelLabel>
          <textarea
            className="code-area" rows={16}
            value={input}
            placeholder={'{\n  "key": "value"\n}'}
            onChange={e => { setInput(e.target.value); format(e.target.value) }}
            spellCheck={false}
          />
        </div>
        <div>
          <PanelLabel>Formatted Output</PanelLabel>
          <pre className="output-area" style={{ minHeight: 320 }}>{output || <span style={{ color: 'var(--text-muted)' }}>Output will appear here...</span>}</pre>
        </div>
      </div>
    </ToolShell>
  )
}
