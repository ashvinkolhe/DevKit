// UrlEncoder.jsx
import { useState } from 'react'
import { ToolShell, ControlsBar, PanelLabel, StatusBadge, CopyBtn } from '../components/ToolShell'
import { useCopy } from '../hooks/useCopy'

export default function UrlEncoder() {
  const [input, setInput]   = useState('')
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState(null)
  const { copied, copy }    = useCopy()

  function encode() { setOutput(encodeURIComponent(input)); setStatus({ type:'success', msg:' Encoded' }) }
  function decode() {
    try { setOutput(decodeURIComponent(input)); setStatus({ type:'success', msg:' Decoded' }) }
    catch(e) { setStatus({ type:'error', msg:' Invalid URL encoding' }) }
  }

  return (
    <ToolShell icon="" title="URL Encoder / Decoder" desc="Encode special characters in URLs, or decode percent-encoded strings.">
      <ControlsBar>
        <button className="btn btn-primary btn-sm" onClick={encode}> Encode</button>
        <button className="btn btn-primary btn-sm" onClick={decode}> Decode</button>
        <CopyBtn onClick={() => copy(output)} copied={copied} />
        <button className="btn btn-danger btn-sm" onClick={() => { setInput(''); setOutput(''); setStatus(null) }}> Clear</button>
        <button className="btn btn-ghost btn-sm" onClick={() => setInput('https://example.com/search?q=hello world&lang=en')}> Sample</button>
      </ControlsBar>
      {status && <StatusBadge type={status.type}>{status.msg}</StatusBadge>}
      <div><PanelLabel>Input</PanelLabel>
        <textarea className="code-area" rows={4} value={input} onChange={e => setInput(e.target.value)} placeholder="Enter URL or percent-encoded string..." spellCheck={false} />
      </div>
      <div><PanelLabel>Output</PanelLabel>
        <textarea className="output-area" rows={4} value={output} readOnly style={{ resize:'vertical', cursor:'text' }} />
      </div>
    </ToolShell>
  )
}
