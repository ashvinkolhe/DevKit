import { useState, useMemo } from 'react'
import { ToolShell, ControlsBar, PanelLabel, StatusBadge } from '../components/ToolShell'

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags]     = useState('g')
  const [text, setText]       = useState('')

  const result = useMemo(() => {
    if (!pattern) return { highlighted: text, count: 0, error: null }
    try {
      const f = flags.includes('g') ? flags : flags + 'g'
      const re = new RegExp(pattern, f)
      const matches = [...text.matchAll(re)]
      const count = matches.length

      // Build highlighted segments
      const segments = []
      let lastIdx = 0
      for (const m of matches) {
        if (m.index > lastIdx) segments.push({ t: 'text', v: text.slice(lastIdx, m.index) })
        segments.push({ t: 'match', v: m[0] })
        lastIdx = m.index + m[0].length
      }
      if (lastIdx < text.length) segments.push({ t: 'text', v: text.slice(lastIdx) })
      return { segments, count, error: null }
    } catch (e) {
      return { segments: [{ t: 'text', v: text }], count: 0, error: e.message }
    }
  }, [pattern, flags, text])

  function loadSample() {
    setPattern('\\b\\w+@\\w+\\.\\w+\\b')
    setFlags('g')
    setText('Contact us at hello@DevKit.co or support@example.com for assistance.')
  }

  return (
    <ToolShell icon="" title="Regex Tester" desc="Test regular expressions with real-time match highlighting.">
      <ControlsBar>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '1.1rem' }}>/</span>
        <input
          className="text-input"
          style={{ flex: 1, maxWidth: 360, borderRadius: 0 }}
          placeholder="pattern"
          value={pattern}
          onChange={e => setPattern(e.target.value)}
          spellCheck={false}
        />
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '1.1rem' }}>/</span>
        <input
          className="text-input"
          style={{ width: 64, borderRadius: 0 }}
          placeholder="flags"
          value={flags}
          onChange={e => setFlags(e.target.value)}
          spellCheck={false}
        />
        <button className="btn btn-ghost btn-sm" onClick={loadSample}> Sample</button>
        <span className="inline-label" style={{ marginLeft: 'auto' }}>
          Matches: <strong style={{ color: 'var(--accent)' }}>{result.count}</strong>
        </span>
      </ControlsBar>

      {result.error && <StatusBadge type="error"> {result.error}</StatusBadge>}
      {!result.error && result.count > 0 && <StatusBadge type="success"> {result.count} match{result.count !== 1 ? 'es' : ''} found</StatusBadge>}
      {!result.error && pattern && result.count === 0 && <StatusBadge type="info">No matches found</StatusBadge>}

      <div>
        <PanelLabel>Test String</PanelLabel>
        <textarea
          className="code-area" rows={5}
          placeholder="Enter text to test your regex against..."
          value={text}
          onChange={e => setText(e.target.value)}
          spellCheck={false}
        />
      </div>

      <div>
        <PanelLabel>Highlighted Matches</PanelLabel>
        <div className="output-area" style={{ minHeight: 80, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)' }}>
          {!text && <span style={{ color: 'var(--text-muted)' }}>Matches will be highlighted here...</span>}
          {result.segments?.map((seg, i) =>
            seg.t === 'match'
              ? <mark key={i} style={{ background: 'rgba(251,191,36,0.28)', color: '#fde68a', borderRadius: 2 }}>{seg.v}</mark>
              : <span key={i}>{seg.v}</span>
          )}
        </div>
      </div>
    </ToolShell>
  )
}
