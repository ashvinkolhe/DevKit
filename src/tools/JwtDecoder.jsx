import { useState, useEffect } from 'react'
import { ToolShell, ControlsBar, PanelLabel, StatusBadge } from '../components/ToolShell'
import styles from './JwtDecoder.module.css'

const SAMPLE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

function safeDecode(s) {
  try { return JSON.parse(atob(s.replace(/-/g, '+').replace(/_/g, '/'))) }
  catch { try { return atob(s) } catch { return null } }
}

export default function JwtDecoder() {
  const [token, setToken]   = useState('')
  const [parts, setParts]   = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (!token.trim()) { setParts(null); setStatus(null); return }
    const segs = token.trim().split('.')
    if (segs.length !== 3) { setStatus({ type:'error', msg:' Invalid JWT  must have 3 parts separated by dots' }); setParts(null); return }
    const header  = safeDecode(segs[0])
    const payload = safeDecode(segs[1])
    if (!header || !payload) { setStatus({ type:'error', msg:' Failed to decode JWT parts' }); setParts(null); return }
    setParts({ header, payload, sig: segs[2] })
    if (payload.exp) {
      const exp = new Date(payload.exp * 1000)
      const expired = exp < new Date()
      setStatus({ type: expired?'error':'success', msg: expired ? ` Expired on ${exp.toLocaleString()}` : ` Valid  expires ${exp.toLocaleString()}` })
    } else { setStatus({ type:'success', msg:' Decoded successfully' }) }
  }, [token])

  return (
    <ToolShell icon="" title="JWT Decoder" desc="Decode JWT tokens to inspect header, payload, and signature. Checks token expiration.">
      <ControlsBar>
        <button className="btn btn-ghost btn-sm" onClick={() => setToken(SAMPLE)}> Sample</button>
        <button className="btn btn-danger btn-sm" onClick={() => { setToken(''); setParts(null); setStatus(null) }}> Clear</button>
      </ControlsBar>

      <div>
        <PanelLabel>JWT Token</PanelLabel>
        <textarea className="code-area" rows={4} value={token} onChange={e => setToken(e.target.value)}
          placeholder="Paste your JWT token here (eyJ...)" spellCheck={false} />
      </div>

      {status && <StatusBadge type={status.type}>{status.msg}</StatusBadge>}

      {parts && (
        <div className={styles.parts}>
          <div className={`${styles.part} ${styles.partHeader}`}>
            <div className={`${styles.partLabel} ${styles.red}`}> Header</div>
            <pre className={styles.partJson}>{JSON.stringify(parts.header, null, 2)}</pre>
          </div>
          <div className={`${styles.part} ${styles.partPayload}`}>
            <div className={`${styles.partLabel} ${styles.yellow}`}> Payload</div>
            <pre className={styles.partJson}>{JSON.stringify(parts.payload, null, 2)}</pre>
          </div>
          <div className={`${styles.part} ${styles.partSig}`}>
            <div className={`${styles.partLabel} ${styles.purple}`}> Signature</div>
            <pre className={styles.partJson} style={{ wordBreak:'break-all', whiteSpace:'pre-wrap' }}>{parts.sig}</pre>
          </div>
        </div>
      )}

      <div style={{ padding:'10px 14px', background:'var(--bg-input)', border:'1px solid var(--border)', borderRadius:'var(--r-sm)', fontSize:'0.78rem', color:'var(--text-muted)' }}>
         This decoder runs entirely in your browser. Never paste production secrets or sensitive tokens into online tools.
      </div>
    </ToolShell>
  )
}
