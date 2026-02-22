import { useState, useMemo } from 'react'
import { ToolShell, ControlsBar } from '../components/ToolShell'
import styles from './TextAnalyzer.module.css'

const SAMPLE = `The quick brown fox jumps over the lazy dog.\n\nThis sentence uses every letter of the English alphabet! It's a classic pangram used for testing purposes.\n\nDevKit makes your development workflow faster and smarter. No login required, ever.`

export default function TextAnalyzer() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const words   = text.trim() ? text.trim().split(/\s+/).length : 0
    const chars   = text.length
    const noSpace = text.replace(/\s/g, '').length
    const lines   = text.split('\n').length
    const sents   = text.split(/[.!?]+/).filter(s => s.trim()).length
    const paras   = text.split(/\n\n+/).filter(p => p.trim()).length || (text.trim() ? 1 : 0)
    const readTime = Math.max(1, Math.ceil(words / 200))
    const freq = {}
    for (const c of text.toLowerCase()) { if (/\w/.test(c)) freq[c] = (freq[c] || 0) + 1 }
    const topFreq = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 12)
    return { words, chars, noSpace, lines, sents, paras, readTime, topFreq }
  }, [text])

  const STAT_ITEMS = [
    { label: 'Characters',  val: stats.chars },
    { label: 'Words',       val: stats.words },
    { label: 'No Spaces',   val: stats.noSpace },
    { label: 'Lines',       val: stats.lines },
    { label: 'Sentences',   val: stats.sents },
    { label: 'Paragraphs',  val: stats.paras },
    { label: 'Read Time',   val: `${stats.readTime}m` },
  ]

  return (
    <ToolShell icon="" title="Text Analyzer" desc="Paste or type text to get detailed statistics and character frequency analysis.">
      <ControlsBar>
        <button className="btn btn-ghost btn-sm" onClick={() => { setText(SAMPLE) }}> Sample</button>
        <button className="btn btn-danger btn-sm" onClick={() => setText('')}> Clear</button>
      </ControlsBar>

      <textarea
        className="code-area"
        rows={8}
        value={text}
        placeholder="Start typing or paste your text here..."
        onChange={e => setText(e.target.value)}
        style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem', resize: 'vertical' }}
      />

      <div className={styles.statsGrid}>
        {STAT_ITEMS.map(({ label, val }) => (
          <div key={label} className={styles.statCard}>
            <div className={styles.statVal}>{val}</div>
            <div className={styles.statLabel}>{label}</div>
          </div>
        ))}
      </div>

      {stats.topFreq.length > 0 && (
        <div>
          <div className="panel-label">Top Character Frequency</div>
          <div className={styles.freqRow}>
            {stats.topFreq.map(([c, n]) => (
              <div key={c} className={styles.freqChip}>
                <span className={styles.freqChar}>{c}</span>
                <span className={styles.freqNum}>{n}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolShell>
  )
}
