import { useState } from 'react'
import { ToolShell, ControlsBar, PanelLabel, StatusBadge } from '../components/ToolShell'

function lcs(a, b) {
  const m = a.length, n = b.length
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1])
  const res = []
  let i = m, j = n
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) { res.push({ t: 'eq', v: a[i - 1] }); i--; j-- }
    else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) { res.push({ t: 'ins', v: b[j - 1] }); j-- }
    else { res.push({ t: 'del', v: a[i - 1] }); i-- }
  }
  return res.reverse()
}

const SAMPLE_L = `function greet(name) {\n  console.log('Hello, ' + name);\n  return true;\n}\n\nconst x = 10;`
const SAMPLE_R = `function greet(name, greeting = 'Hello') {\n  console.log(greeting + ', ' + name + '!');\n  return name;\n}\n\nconst x = 42;\nconst y = 20;`

export default function DiffViewer() {
  const [left, setLeft]   = useState('')
  const [right, setRight] = useState('')
  const [diff, setDiff]   = useState(null)

  function compute(l = left, r = right) {
    const lLines = l.split('\n')
    const rLines = r.split('\n')
    setDiff(lcs(lLines, rLines))
  }

  function swap() {
    const tmp = left
    setLeft(right)
    setRight(tmp)
    compute(right, left)
  }

  function loadSample() { setLeft(SAMPLE_L); setRight(SAMPLE_R); compute(SAMPLE_L, SAMPLE_R) }
  function clear() { setLeft(''); setRight(''); setDiff(null) }

  const adds = diff?.filter(d => d.t === 'ins').length ?? 0
  const dels = diff?.filter(d => d.t === 'del').length ?? 0

  return (
    <ToolShell icon="" title="Diff Viewer" desc="Compare two text blocks. Green = added, red = removed.">
      <ControlsBar>
        <button className="btn btn-primary btn-sm" onClick={() => compute()}> Compare</button>
        <button className="btn btn-ghost btn-sm" onClick={swap}> Swap</button>
        <button className="btn btn-danger btn-sm" onClick={clear}> Clear</button>
        <button className="btn btn-ghost btn-sm" onClick={loadSample}> Sample</button>
      </ControlsBar>

      {diff && <StatusBadge type={adds || dels ? 'info' : 'success'}>
        {adds} addition{adds !== 1 ? 's' : ''}  {dels} deletion{dels !== 1 ? 's' : ''}
      </StatusBadge>}

      <div className="split-pane">
        <div>
          <PanelLabel>Original</PanelLabel>
          <textarea className="code-area" rows={12} value={left}
            placeholder="Paste original text here..."
            onChange={e => { setLeft(e.target.value); compute(e.target.value, right) }}
            spellCheck={false} />
        </div>
        <div>
          <PanelLabel>Modified</PanelLabel>
          <textarea className="code-area" rows={12} value={right}
            placeholder="Paste modified text here..."
            onChange={e => { setRight(e.target.value); compute(left, e.target.value) }}
            spellCheck={false} />
        </div>
      </div>

      <div>
        <PanelLabel>Diff Result</PanelLabel>
        <div className="output-area" style={{ minHeight: 180 }}>
          {!diff && <span style={{ color: 'var(--text-muted)' }}>Results will appear here...</span>}
          {diff?.map((d, i) => {
            const cls = d.t === 'ins' ? 'diff-add' : d.t === 'del' ? 'diff-del' : 'diff-eq'
            return (
              <div key={i} style={{
                padding: '2px 6px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                background: d.t === 'ins' ? 'rgba(52,211,153,0.1)' : d.t === 'del' ? 'rgba(248,113,113,0.1)' : 'transparent',
                color: d.t === 'ins' ? '#6ee7b7' : d.t === 'del' ? '#fca5a5' : 'var(--text-secondary)',
              }}>
                {d.t === 'ins' ? '+ ' : d.t === 'del' ? '- ' : '  '}{d.v}
              </div>
            )
          })}
        </div>
      </div>
    </ToolShell>
  )
}
