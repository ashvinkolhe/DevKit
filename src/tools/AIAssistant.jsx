import { useMemo, useState } from 'react'
import { ToolShell, ControlsBar, PanelLabel, StatusBadge } from '../components/ToolShell'
import styles from './AIAssistant.module.css'

const KEY_STORAGE = 'DevKit_openai_key_v1'

function extractText(payload) {
  if (payload?.output_text) return payload.output_text
  const chunks = payload?.output?.flatMap((item) => item?.content || []) || []
  const text = chunks
    .map((c) => c?.text || '')
    .filter(Boolean)
    .join('\n')
    .trim()
  return text || 'No text returned from model.'
}

export default function AIAssistant() {
  const storedKey = typeof window !== 'undefined' ? window.localStorage.getItem(KEY_STORAGE) || '' : ''
  const [apiKey, setApiKey] = useState(storedKey)
  const [rememberKey, setRememberKey] = useState(Boolean(storedKey))
  const [model, setModel] = useState('gpt-4.1-mini')
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const canAsk = useMemo(() => apiKey.trim() && question.trim() && !loading, [apiKey, question, loading])

  async function ask() {
    if (!canAsk) return
    const prompt = question.trim()
    setQuestion('')
    setError('')
    setLoading(true)
    setMessages((prev) => [...prev, { role: 'You', text: prompt }])

    try {
      if (rememberKey) window.localStorage.setItem(KEY_STORAGE, apiKey.trim())
      else window.localStorage.removeItem(KEY_STORAGE)

      const res = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({
          model,
          input: [
            {
              role: 'system',
              content: 'You are a concise software engineering assistant inside DevKit.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.2,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        const msg = data?.error?.message || 'Request failed'
        throw new Error(msg)
      }

      const answer = extractText(data)
      setMessages((prev) => [...prev, { role: 'AI', text: answer }])
    } catch (e) {
      setError(e.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  function clearChat() {
    setMessages([])
    setError('')
  }

  return (
    <ToolShell icon="" title="AI Assistant" desc="Ask coding and cloud questions directly from DevKit with your own API key.">
      <ControlsBar>
        <input
          className="text-input"
          style={{ minWidth: 280, flex: 1 }}
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="OpenAI API key (sk-...)"
          spellCheck={false}
        />
        <select className="select-el" value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="gpt-4.1-mini">gpt-4.1-mini</option>
          <option value="gpt-4.1">gpt-4.1</option>
          <option value="gpt-4o-mini">gpt-4o-mini</option>
        </select>
        <label className="inline-label">
          <input
            type="checkbox"
            checked={rememberKey}
            onChange={(e) => setRememberKey(e.target.checked)}
            style={{ marginRight: 6 }}
          />
          Remember key
        </label>
        <button className="btn btn-ghost btn-sm" onClick={clearChat}>Clear Chat</button>
      </ControlsBar>

      <StatusBadge type="warning">
        Security tip: use a restricted key; in-browser keys are visible to this browser session.
      </StatusBadge>
      {error && <StatusBadge type="error"> {error}</StatusBadge>}
      {loading && <StatusBadge type="info">Thinking...</StatusBadge>}

      <div className={styles.wrap}>
        <div className={styles.messages}>
          {messages.length === 0 && <div style={{ color: 'var(--text-muted)' }}>No messages yet. Ask anything about AWS, SAP, APIs, code, or debugging.</div>}
          {messages.map((m, idx) => (
            <div key={idx} className={`${styles.msg} ${m.role === 'You' ? styles.msgUser : ''}`}>
              <div className={styles.msgRole}>{m.role}</div>
              <div className={styles.msgText}>{m.text}</div>
            </div>
          ))}
        </div>

        <div className={styles.inputRow}>
          <PanelLabel>Your Prompt</PanelLabel>
          <textarea
            className="code-area"
            rows={5}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Example: Write an AWS IAM policy that allows S3 read-only access to one bucket."
            spellCheck={false}
          />
          <div>
            <button className="btn btn-primary" disabled={!canAsk} onClick={ask}>
              {loading ? 'Asking...' : 'Ask AI'}
            </button>
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
