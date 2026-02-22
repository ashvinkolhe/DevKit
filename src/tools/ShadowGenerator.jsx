import { useState } from 'react'
import { ToolShell, ControlsBar, PanelLabel } from '../components/ToolShell'
import { useCopy } from '../hooks/useCopy'
import styles from './ShadowGenerator.module.css'

export default function ShadowGenerator() {
  const [ox, setOx]       = useState(5)
  const [oy, setOy]       = useState(10)
  const [blur, setBlur]   = useState(20)
  const [spread, setSpread] = useState(0)
  const [color, setColor] = useState('#000000')
  const [inset, setInset] = useState(false)
  const { copied, copy }  = useCopy()

  const shadow = `${inset ? 'inset ' : ''}${ox}px ${oy}px ${blur}px ${spread}px ${color}`
  const css = `box-shadow: ${shadow};`

  const SLIDERS = [
    { label: 'Offset X',       val: ox,     set: setOx,     min:-50, max:50  },
    { label: 'Offset Y',       val: oy,     set: setOy,     min:-50, max:50  },
    { label: 'Blur Radius',    val: blur,   set: setBlur,   min:0,   max:100 },
    { label: 'Spread Radius',  val: spread, set: setSpread, min:-50, max:50  },
  ]

  return (
    <ToolShell icon="" title="CSS Shadow Generator" desc="Visually create box-shadow CSS with sliders. Copy the result for your project.">
      <div className={styles.layout}>
        <div className={styles.preview}>
          <div className={styles.box} style={{ boxShadow: shadow }} />
        </div>
        <div className={styles.controls}>
          {SLIDERS.map(({ label, val, set, min, max }) => (
            <div key={label} className={styles.sliderRow}>
              <span className={styles.sliderLabel}>{label}</span>
              <input type="range" min={min} max={max} value={val}
                onChange={e => set(parseInt(e.target.value))} style={{ flex:1, accentColor:'var(--accent)' }} />
              <span className={styles.sliderVal}>{val}px</span>
            </div>
          ))}
          <div className={styles.sliderRow}>
            <span className={styles.sliderLabel}>Color</span>
            <input type="color" value={color} onChange={e => setColor(e.target.value)}
              style={{ width:36, height:28, borderRadius:4, border:'1px solid var(--border)', cursor:'pointer', background:'none', padding:2 }} />
          </div>
          <div className={styles.sliderRow}>
            <span className={styles.sliderLabel}>Inset</span>
            <input type="checkbox" checked={inset} onChange={e => setInset(e.target.checked)}
              style={{ accentColor:'var(--accent)', width:18, height:18 }} />
          </div>
        </div>
      </div>
      <div>
        <PanelLabel>
          Generated CSS
          <button className={`btn btn-sm ${copied ? 'btn-success' : 'btn-ghost'}`} onClick={() => copy(css)}>
            {copied ? ' Copied!' : ' Copy'}
          </button>
        </PanelLabel>
        <div className="output-area" style={{ fontFamily:'var(--font-mono)', fontSize:'0.875rem', minHeight:48 }}>
          {css}
        </div>
      </div>
    </ToolShell>
  )
}
