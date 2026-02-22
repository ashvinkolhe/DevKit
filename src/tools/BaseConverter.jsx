import { useState } from 'react'
import { ToolShell, ControlsBar, StatusBadge } from '../components/ToolShell'
import styles from './BaseConverter.module.css'

export default function BaseConverter() {
  const [vals, setVals] = useState({ dec: '', bin: '', oct: '', hex: '' })
  const [status, setStatus] = useState(null)

  const BASES = { dec: 10, bin: 2, oct: 8, hex: 16 }
  const LABELS = { dec: 'Decimal (Base 10)', bin: 'Binary (Base 2)', oct: 'Octal (Base 8)', hex: 'Hexadecimal (Base 16)' }

  function convert(src, rawVal) {
    const newVals = { dec: '', bin: '', oct: '', hex: '' }
    newVals[src] = rawVal
    if (!rawVal.trim()) { setVals(newVals); setStatus(null); return }
    try {
      const n = parseInt(rawVal.trim(), BASES[src])
      if (isNaN(n)) throw new Error('Invalid')
      Object.keys(BASES).forEach(k => { if (k !== src) newVals[k] = n.toString(BASES[k]).toUpperCase() })
      setVals(newVals)
      setStatus({ type: 'success', msg: `= ${n} decimal` })
    } catch { setStatus({ type: 'error', msg: ' Invalid number for this base' }) }
  }

  return (
    <ToolShell icon="" title="Number Base Converter" desc="Convert between Decimal, Binary, Octal, and Hexadecimal. Edit any field to update all others.">
      <ControlsBar>
        <button className="btn btn-ghost btn-sm" onClick={() => convert('dec', '255')}> Sample</button>
        <button className="btn btn-danger btn-sm" onClick={() => { setVals({ dec:'', bin:'', oct:'', hex:'' }); setStatus(null) }}> Clear</button>
      </ControlsBar>
      {status && <StatusBadge type={status.type}>{status.msg}</StatusBadge>}
      <div className={styles.grid}>
        {Object.keys(BASES).map(k => (
          <div key={k} className={styles.item}>
            <div className={styles.label}>{LABELS[k]}</div>
            <input className="text-input" style={{ width:'100%', fontFamily:'var(--font-mono)' }}
              value={vals[k]}
              placeholder={k === 'dec' ? '255' : k === 'bin' ? '11111111' : k === 'oct' ? '377' : 'FF'}
              onChange={e => convert(k, e.target.value)}
              spellCheck={false}
            />
          </div>
        ))}
      </div>
    </ToolShell>
  )
}
