import { useState, useEffect } from 'react'
import { ToolShell, ControlsBar, PanelLabel } from '../components/ToolShell'
import { useCopy } from '../hooks/useCopy'
import styles from './HashGenerator.module.css'

async function computeHash(algo, text) {
  const enc = new TextEncoder()
  const buf = await crypto.subtle.digest(algo, enc.encode(text))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function HashRow({ label, value, onCopy }) {
  const { copied, copy } = useCopy()
  return (
    <div className={styles.hashRow}>
      <span className={styles.hashLabel}>{label}</span>
      <span className={styles.hashValue}>{value || ''}</span>
      <button className={`btn btn-sm btn-ghost ${copied ? 'btn-success' : ''}`}
        onClick={() => copy(value)} disabled={!value}>
        {copied ? '' : 'Copy'}
      </button>
    </div>
  )
}

export default function HashGenerator() {
  const [input, setInput]   = useState('')
  const [hashes, setHashes] = useState({})

  useEffect(() => {
    if (!input) { setHashes({}); return }
    Promise.all([
      computeHash('SHA-1', input),
      computeHash('SHA-256', input),
      computeHash('SHA-384', input),
      computeHash('SHA-512', input),
    ]).then(([sha1, sha256, sha384, sha512]) => setHashes({ sha1, sha256, sha384, sha512 }))
  }, [input])

  return (
    <ToolShell icon="" title="Hash Generator" desc="Generate cryptographic hashes using the Web Crypto API. Supports SHA-1, SHA-256, SHA-384, SHA-512.">
      <ControlsBar>
        <button className="btn btn-ghost btn-sm" onClick={() => setInput('Hello, DevKit!')}> Sample</button>
        <button className="btn btn-danger btn-sm" onClick={() => setInput('')}> Clear</button>
      </ControlsBar>
      <div>
        <PanelLabel>Input Text</PanelLabel>
        <textarea className="code-area" rows={4} value={input} onChange={e => setInput(e.target.value)}
          placeholder="Enter text to hash..." spellCheck={false} />
      </div>
      <div className={styles.hashList}>
        <HashRow label="SHA-1"   value={hashes.sha1} />
        <HashRow label="SHA-256" value={hashes.sha256} />
        <HashRow label="SHA-384" value={hashes.sha384} />
        <HashRow label="SHA-512" value={hashes.sha512} />
      </div>
      <div style={{ padding:'10px 14px', background:'var(--bg-input)', border:'1px solid var(--border)', borderRadius:'var(--r-sm)', fontSize:'0.78rem', color:'var(--text-muted)' }}>
         SHA-1 is considered cryptographically weak. Use SHA-256 or higher for security-sensitive applications.
      </div>
    </ToolShell>
  )
}
