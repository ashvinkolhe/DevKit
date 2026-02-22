import { useState, useCallback } from 'react'
import { ToolShell, ControlsBar } from '../components/ToolShell'
import { useCopy } from '../hooks/useCopy'
import styles from './ColorPicker.module.css'

const SWATCHES = ['#4b83f0','#7c6ff7','#34d399','#fbbf24','#f87171','#c084fc','#38bdf8','#fb923c','#f472b6','#a3e635','#e2e8f0','#0f172a']

function hexToRgb(hex) {
  return { r: parseInt(hex.slice(1,3),16), g: parseInt(hex.slice(3,5),16), b: parseInt(hex.slice(5,7),16) }
}
function rgbToHsl(r,g,b) {
  r/=255; g/=255; b/=255
  const max=Math.max(r,g,b), min=Math.min(r,g,b)
  let h=0, s=0, l=(max+min)/2
  if(max!==min){ const d=max-min; s=l>0.5?d/(2-max-min):d/(max+min); h=max===r?(g-b)/d+(g<b?6:0):max===g?(b-r)/d+2:(r-g)/d+4; h/=6 }
  return {h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)}
}
function toHex(n) { return Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,'0') }

function CopyField({ label, value }) {
  const { copied, copy } = useCopy()
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.fieldRow}>
        <input className="text-input" value={value} readOnly style={{ flex:1 }} />
        <button className={`btn btn-sm ${copied ? 'btn-success' : 'btn-ghost'}`} onClick={() => copy(value)}>
          {copied ? '' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

export default function ColorPicker() {
  const [hex, setHex] = useState('#4b83f0')

  const { r, g, b } = hexToRgb(hex)
  const { h, s, l } = rgbToHsl(r, g, b)

  const update = useCallback((newHex) => {
    if (/^#[0-9a-fA-F]{6}$/.test(newHex)) setHex(newHex.toLowerCase())
  }, [])

  function fromRgb(ri, gi, bi) {
    setHex('#' + toHex(ri) + toHex(gi) + toHex(bi))
  }

  return (
    <ToolShell icon="" title="Color Picker" desc="Pick any color and convert between HEX, RGB, and HSL instantly.">
      <div className={styles.layout}>
        <div className={styles.leftCol}>
          <input type="color" className={styles.picker} value={hex} onChange={e => update(e.target.value)} />
          <div className={styles.preview} style={{ background: hex }} />
          <div className={styles.swatches}>
            {SWATCHES.map(c => (
              <button key={c} className={styles.swatch} style={{ background: c, outline: hex === c ? '2px solid white' : 'none' }}
                onClick={() => update(c)} title={c} />
            ))}
          </div>
        </div>
        <div className={styles.rightCol}>
          <CopyField label="HEX"  value={hex} />
          <CopyField label="RGB"  value={`rgb(${r}, ${g}, ${b})`} />
          <CopyField label="HSL"  value={`hsl(${h}, ${s}%, ${l}%)`} />
          <div className={styles.field}>
            <label className={styles.fieldLabel}>R / G / B (0255)</label>
            <div className={styles.fieldRow}>
              {['r','g','b'].map((ch, ci) => (
                <input key={ch} type="number" className="text-input" min={0} max={255}
                  value={[r,g,b][ci]}
                  onChange={e => {
                    const vals = [r,g,b]; vals[ci] = parseInt(e.target.value)||0
                    fromRgb(...vals)
                  }} style={{ flex:1 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
