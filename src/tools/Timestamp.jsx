import { useState, useEffect, useCallback } from 'react'
import { ToolShell, ControlsBar } from '../components/ToolShell'
import styles from './Timestamp.module.css'

function timeAgo(ms) {
  const s = Math.floor((Date.now() - ms) / 1000)
  const abs = Math.abs(s)
  const future = s < 0
  if (abs < 60) return `${abs}s ${future ? 'from now' : 'ago'}`
  if (abs < 3600) return `${Math.floor(abs/60)}m ${future ? 'from now' : 'ago'}`
  if (abs < 86400) return `${Math.floor(abs/3600)}h ${future ? 'from now' : 'ago'}`
  return `${Math.floor(abs/86400)}d ${future ? 'from now' : 'ago'}`
}

export default function Timestamp() {
  const [input, setInput] = useState('now')
  const [data, setData]   = useState(null)
  const [, setTick] = useState(0)

  const convert = useCallback((val = input) => {
    let ms
    if (val === 'now' || !val) ms = Date.now()
    else if (/^\d+$/.test(val.trim())) ms = val.trim().length > 10 ? parseInt(val) : parseInt(val) * 1000
    else ms = Date.parse(val)
    const d = new Date(ms)
    if (isNaN(d)) { setData(null); return }
    setData({ unix: Math.floor(ms/1000), unixMs: ms, utc: d.toUTCString(), local: d.toLocaleString(), iso: d.toISOString(), ms })
  }, [input])

  useEffect(() => { convert() }, [])
  useEffect(() => {
    if (input !== 'now') return
    const id = setInterval(() => { setTick(t => t+1); convert('now') }, 1000)
    return () => clearInterval(id)
  }, [input])

  const ROWS = data ? [
    ['Unix (seconds)',     data.unix],
    ['Unix (milliseconds)',data.unixMs],
    ['UTC',               data.utc],
    ['Local Time',        data.local],
    ['ISO 8601',          data.iso],
    ['Relative',          timeAgo(data.ms)],
  ] : []

  return (
    <ToolShell icon="" title="Unix Timestamp Converter" desc="Convert Unix timestamps to dates and vice versa. Type 'now' for a live clock.">
      <ControlsBar>
        <input className="text-input" style={{ flex:1, maxWidth:380 }}
          value={input} onChange={e => { setInput(e.target.value); convert(e.target.value) }}
          placeholder="Unix timestamp, date string, or 'now'" />
        <button className="btn btn-primary btn-sm" onClick={() => { setInput('now'); convert('now') }}> Now</button>
        <button className="btn btn-ghost btn-sm" onClick={() => { setInput('1700000000'); convert('1700000000') }}> Sample</button>
      </ControlsBar>

      {!data && input && <div style={{ color:'var(--danger)', fontSize:'0.8rem' }}> Invalid input</div>}

      {data && (
        <div className={styles.grid}>
          {ROWS.map(([label, val]) => (
            <div key={label} className={styles.card}>
              <div className={styles.label}>{label}</div>
              <div className={styles.value}>{val}</div>
            </div>
          ))}
        </div>
      )}
    </ToolShell>
  )
}
