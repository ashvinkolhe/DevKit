import { useState } from 'react'
import { ToolShell, ControlsBar, PanelLabel, StatusBadge, CopyBtn } from '../components/ToolShell'
import { useCopy } from '../hooks/useCopy'

export default function Base64() {
  const [input, setInput]   = useState('')
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState(null)
  const { copied, copy }    = useCopy()

  function encode() {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))))
      setStatus({ type: 'success', msg: ' Encoded successfully' })
    } catch (e) { setStatus({ type: 'error', msg: ' ' + e.message }) }
  }
  function decode() {
    try {
      setOutput(decodeURIComponent(escape(atob(input))))
      setStatus({ type: 'success', msg: ' Decoded successfully' })
    } catch { setStatus({ type: 'error', msg: ' Invalid Base64 input' }) }
  }
  function swap() { setInput(output); setOutput(''); setStatus(null) }
  function clear() { setInput(''); setOutput(''); setStatus(null) }

  return (
    <ToolShell icon="" title="Base64 Encoder / Decoder" desc="Encode text to Base64 or decode Base64 back to plain text. Supports Unicode.">
      <ControlsBar>
        <button className="btn btn-primary btn-sm" onClick={encode}> Encode</button>
        <button className="btn btn-primary btn-sm" onClick={decode}> Decode</button>
        <CopyBtn onClick={() => copy(output)} copied={copied} />
        <button className="btn btn-ghost btn-sm" onClick={swap}> Swap</button>
        <button className="btn btn-danger btn-sm" onClick={clear}> Clear</button>
        <button className="btn btn-ghost btn-sm" onClick={() => setInput('Hello, DevKit! ')}> Sample</button>
      </ControlsBar>

      {status && <StatusBadge type={status.type}>{status.msg}</StatusBadge>}

      <div>
        <PanelLabel>Input (text or Base64)</PanelLabel>
        <textarea className="code-area" rows={5} value={input} onChange={e => setInput(e.target.value)}
          placeholder="Enter text to encode, or Base64 to decode..." spellCheck={false} />
      </div>
      <div>
        <PanelLabel>Output</PanelLabel>
        <textarea className="output-area" rows={5} value={output} readOnly
          style={{ resize: 'vertical', cursor: 'text' }}
          placeholder="Result will appear here..." />
      </div>
    </ToolShell>
  )
}
