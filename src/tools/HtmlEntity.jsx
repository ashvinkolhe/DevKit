import { useState } from 'react'
import { ToolShell, ControlsBar, PanelLabel, StatusBadge, CopyBtn } from '../components/ToolShell'
import { useCopy } from '../hooks/useCopy'

export default function HtmlEntity() {
  const [input, setInput]   = useState('')
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState(null)
  const { copied, copy }    = useCopy()

  function encode() {
    const d = document.createElement('div'); d.textContent = input
    setOutput(d.innerHTML); setStatus({ type:'success', msg:' Encoded' })
  }
  function decode() {
    const d = document.createElement('div'); d.innerHTML = input
    setOutput(d.textContent); setStatus({ type:'success', msg:' Decoded' })
  }

  return (
    <ToolShell icon="" title="HTML Entity Encoder" desc="Encode special characters to HTML entities or decode entities back to text.">
      <ControlsBar>
        <button className="btn btn-primary btn-sm" onClick={encode}> Encode</button>
        <button className="btn btn-primary btn-sm" onClick={decode}> Decode</button>
        <CopyBtn onClick={() => copy(output)} copied={copied} />
        <button className="btn btn-danger btn-sm" onClick={() => { setInput(''); setOutput(''); setStatus(null) }}> Clear</button>
        <button className="btn btn-ghost btn-sm" onClick={() => setInput('<div class="hi">Hello & "World"!</div>')}> Sample</button>
      </ControlsBar>
      {status && <StatusBadge type={status.type}>{status.msg}</StatusBadge>}
      <div><PanelLabel>Input</PanelLabel>
        <textarea className="code-area" rows={5} value={input} onChange={e => setInput(e.target.value)} placeholder="Enter HTML or text..." spellCheck={false} />
      </div>
      <div><PanelLabel>Output</PanelLabel>
        <textarea className="output-area" rows={5} value={output} readOnly style={{ resize:'vertical', cursor:'text' }} />
      </div>
    </ToolShell>
  )
}
