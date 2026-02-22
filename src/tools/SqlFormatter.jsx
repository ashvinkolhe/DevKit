import { useMemo, useState } from 'react'
import { ToolShell, ControlsBar, PanelLabel, StatusBadge, CopyBtn } from '../components/ToolShell'
import { useCopy } from '../hooks/useCopy'

const KEYWORDS = [
  'select', 'from', 'where', 'group by', 'order by', 'having', 'join', 'left join', 'right join', 'inner join',
  'outer join', 'on', 'and', 'or', 'insert into', 'values', 'update', 'set', 'delete', 'limit', 'offset'
]

function formatSql(input) {
  let s = input.replace(/\s+/g, ' ').trim()
  KEYWORDS.forEach((k) => {
    const upper = k.toUpperCase()
    const r = new RegExp(`\\b${k.replace(' ', '\\s+')}\\b`, 'gi')
    s = s.replace(r, `\n${upper}`)
  })
  return s.trim()
}

export default function SqlFormatter() {
  const [input, setInput] = useState('select id,name from users where active = 1 order by created_at desc limit 20')
  const { copied, copy } = useCopy()
  const output = useMemo(() => formatSql(input), [input])

  return (
    <ToolShell icon="" title="SQL Formatter" desc="Format SQL statements into a cleaner readable multi-line style.">
      <ControlsBar>
        <CopyBtn onClick={() => copy(output)} copied={copied} label="Copy SQL" />
      </ControlsBar>
      <StatusBadge type="info">Lightweight formatter for quick readability in browser.</StatusBadge>
      <div className="split-pane">
        <div>
          <PanelLabel>Raw SQL</PanelLabel>
          <textarea className="code-area" rows={12} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </div>
        <div>
          <PanelLabel>Formatted SQL</PanelLabel>
          <pre className="output-area" style={{ minHeight: 280 }}>{output}</pre>
        </div>
      </div>
    </ToolShell>
  )
}
