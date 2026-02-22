import { useState } from 'react'
import { ToolShell, ControlsBar, PanelLabel } from '../components/ToolShell'
import { useCopy } from '../hooks/useCopy'

const WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ')

function sentence() {
  const len = 8 + Math.floor(Math.random() * 12)
  const w = Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)])
  w[0] = w[0].charAt(0).toUpperCase() + w[0].slice(1)
  return w.join(' ') + '.'
}
function paragraph() {
  return Array.from({ length: 4 + Math.floor(Math.random() * 4) }, sentence).join(' ')
}

export default function LoremIpsum() {
  const [type, setType]     = useState('paragraphs')
  const [count, setCount]   = useState(3)
  const [output, setOutput] = useState('')
  const { copied, copy }    = useCopy()

  function generate() {
    let out = ''
    if (type === 'words') out = WORDS.slice(0, count).join(' ')
    else if (type === 'sentences') out = Array.from({ length: count }, sentence).join(' ')
    else out = Array.from({ length: count }, paragraph).join('\n\n')
    setOutput(out)
  }

  return (
    <ToolShell icon="" title="Lorem Ipsum Generator" desc="Generate placeholder text by words, sentences, or paragraphs.">
      <ControlsBar>
        <span className="inline-label">Generate</span>
        <input type="number" className="text-input" value={count} min={1} max={100}
          onChange={e => setCount(Math.max(1, parseInt(e.target.value) || 1))}
          style={{ width: 70 }} />
        <select className="select-el" value={type} onChange={e => setType(e.target.value)}>
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
        </select>
        <button className="btn btn-primary btn-sm" onClick={generate}> Generate</button>
        <button className={`btn btn-sm ${copied ? 'btn-success' : 'btn-ghost'}`}
          onClick={() => copy(output)} disabled={!output}>
          {copied ? ' Copied!' : ' Copy'}
        </button>
      </ControlsBar>

      <div>
        <PanelLabel>Generated Text</PanelLabel>
        <div className="output-area" style={{ minHeight: 320, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-ui)', fontSize: '0.875rem', lineHeight: 1.75 }}>
          {output || <span style={{ color: 'var(--text-muted)' }}>Click Generate to create placeholder text...</span>}
        </div>
      </div>
    </ToolShell>
  )
}
