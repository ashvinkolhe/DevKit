import { useState, useMemo } from 'react'
import { ToolShell, ControlsBar, PanelLabel } from '../components/ToolShell'
import { useCopy } from '../hooks/useCopy'
import styles from './MarkdownPreview.module.css'

const SAMPLE = `# Welcome to DevKit 

A **free, open-source** developer toolkit.

## Features

-  JSON Formatter
-  Regex Tester  
-  *Diff Viewer*
-  JWT Decoder

## Code Example

\`\`\`js
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet('Dev'));
\`\`\`

> This is a blockquote. DevKit runs 100% in your browser.

---

Learn more at [DevKit.co](https://DevKit.co)`

function parseMarkdown(md) {
  const escaped = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return escaped
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^---$/gm, '<hr>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
}

export default function MarkdownPreview() {
  const [input, setInput] = useState('')
  const { copied, copy } = useCopy()

  const html = useMemo(() => input ? parseMarkdown(input) : '', [input])

  return (
    <ToolShell icon="" title="Markdown Previewer" desc="Write Markdown on the left, see a live preview on the right.">
      <ControlsBar>
        <button className="btn btn-ghost btn-sm" onClick={() => setInput(SAMPLE)}> Sample</button>
        <button className="btn btn-danger btn-sm" onClick={() => setInput('')}> Clear</button>
        <button
          className={`btn btn-sm ${copied ? 'btn-success' : 'btn-ghost'}`}
          onClick={() => copy(html)}
        >
          {copied ? ' Copied HTML!' : ' Copy HTML'}
        </button>
      </ControlsBar>

      <div className="split-pane" style={{ flex: 1 }}>
        <div>
          <PanelLabel>Markdown Input</PanelLabel>
          <textarea
            className="code-area"
            rows={22}
            value={input}
            placeholder={'# Hello World\n\nWrite your **Markdown** here...'}
            onChange={e => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div>
          <PanelLabel>Preview</PanelLabel>
          <div
            className={styles.preview}
            dangerouslySetInnerHTML={{ __html: html ? `<p>${html}</p>` : '<p style="color:var(--text-muted)">Preview will appear here...</p>' }}
          />
        </div>
      </div>
    </ToolShell>
  )
}
