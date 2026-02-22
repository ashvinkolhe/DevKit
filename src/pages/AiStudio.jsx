import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './AiStudio.module.css'

const MODEL_STORAGE = 'devkit_ai_model_v1'
const CHATS_STORAGE = 'devkit_ai_chats_v1'
const CHAT_LIMIT = 24
const AI_ENDPOINT = import.meta.env.VITE_AI_ENDPOINT || '/api/chat'

const TASKS = [
  {
    label: 'Write code',
    prompt: 'Write clean production-ready code for this task:\n\n',
  },
  {
    label: 'Fix bug',
    prompt: 'Help me debug this issue step by step.\nProblem:\n\n',
  },
  {
    label: 'Refactor',
    prompt: 'Refactor this code for readability and performance.\nCode:\n\n',
  },
  {
    label: 'Write email',
    prompt: 'Write a professional email using this context:\n\n',
  },
  {
    label: 'Rewrite text',
    prompt: 'Rewrite this text in a clearer and more concise style:\n\n',
  },
  {
    label: 'Explain concept',
    prompt: 'Explain this topic clearly with examples:\n\n',
  },
]

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

function readLS(key, fallback) {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function writeLS(key, value) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

function extractText(payload) {
  if (payload?.output_text) return payload.output_text
  const parts = payload?.output?.flatMap((item) => item?.content || []) || []
  const text = parts.map((p) => p?.text || '').filter(Boolean).join('\n').trim()
  return text || 'No text returned from model.'
}

function newChat() {
  const id = uid()
  return {
    id,
    title: 'New chat',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    messages: [],
  }
}

function toInputMessages(messages) {
  return messages.map((m) => ({
    role: m.role,
    content: m.content,
  }))
}

function getChatTitle(text) {
  const first = text.trim().split('\n')[0].slice(0, 44)
  return first || 'New chat'
}

export default function AiStudio() {
  const initialChats = readLS(CHATS_STORAGE, [])
  const [chats, setChats] = useState(initialChats.length ? initialChats : [newChat()])
  const [activeId, setActiveId] = useState((initialChats[0] && initialChats[0].id) || null)
  const [model, setModel] = useState(() => {
    if (typeof window === 'undefined') return 'gpt-4.1-mini'
    return window.localStorage.getItem(MODEL_STORAGE) || 'gpt-4.1-mini'
  })
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const activeChat = useMemo(() => {
    return chats.find((c) => c.id === activeId) || chats[0] || null
  }, [activeId, chats])

  function persist(next) {
    setChats(next)
    writeLS(CHATS_STORAGE, next.slice(0, CHAT_LIMIT))
  }

  function updateActive(updater) {
    const next = chats.map((c) => (c.id === activeChat.id ? updater(c) : c))
    persist(next)
  }

  function createChat() {
    const chat = newChat()
    const next = [chat, ...chats].slice(0, CHAT_LIMIT)
    persist(next)
    setActiveId(chat.id)
    setDraft('')
    setError('')
  }

  function removeChat(id) {
    const filtered = chats.filter((c) => c.id !== id)
    if (!filtered.length) {
      const fallback = [newChat()]
      persist(fallback)
      setActiveId(fallback[0].id)
      return
    }
    persist(filtered)
    if (activeId === id) setActiveId(filtered[0].id)
  }

  function clearAllChats() {
    const fresh = [newChat()]
    persist(fresh)
    setActiveId(fresh[0].id)
    setError('')
    setDraft('')
  }

  async function send() {
    if (!activeChat || !draft.trim() || loading) return

    const userText = draft.trim()
    setDraft('')
    setError('')
    setLoading(true)

    const nextUserMsg = { role: 'user', content: userText, ts: Date.now() }
    const optimistic = chats.map((c) =>
      c.id === activeChat.id
        ? {
            ...c,
            title: c.messages.length ? c.title : getChatTitle(userText),
            updatedAt: Date.now(),
            messages: [...c.messages, nextUserMsg],
          }
        : c
    )
    persist(optimistic)

    try {
      window.localStorage.setItem(MODEL_STORAGE, model)

      const chatNow = optimistic.find((c) => c.id === activeChat.id)
      const conversation = chatNow ? chatNow.messages.slice(-20) : [nextUserMsg]

      const res = await fetch(AI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: toInputMessages(conversation),
        }),
      })

      const rawText = await res.text()
      let data = {}
      try {
        data = rawText ? JSON.parse(rawText) : {}
      } catch {
        data = { error: { message: rawText || 'Invalid server response' } }
      }
      if (!res.ok) {
        throw new Error(data?.error?.message || 'Request failed')
      }

      const answer = extractText(data)
      updateActive((c) => ({
        ...c,
        updatedAt: Date.now(),
        messages: [...c.messages, { role: 'assistant', content: answer, ts: Date.now() }],
      }))
    } catch (e) {
      setError(e.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  function applyTask(text) {
    setDraft(text)
  }

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <Link to="/tools" className={styles.backLink}>Back to tools</Link>
          <span className={styles.sep}>/</span>
          <span className={styles.title}>AI Workspace</span>
        </div>
        <div className={styles.actions}>
          <button className={styles.ghostBtn} onClick={createChat}>New Chat</button>
          <button className={styles.ghostBtn} onClick={clearAllChats}>Clear All</button>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideHead}>Conversations</div>
          <div className={styles.chatList}>
            {chats.map((chat) => (
              <div key={chat.id} className={`${styles.chatRow} ${chat.id === activeId ? styles.activeChat : ''}`}>
                <button className={styles.chatItem} onClick={() => setActiveId(chat.id)}>
                  <span className={styles.chatTitle}>{chat.title}</span>
                </button>
                <button className={styles.deleteBtn} onClick={() => removeChat(chat.id)} aria-label="Delete chat">
                  X
                </button>
              </div>
            ))}
          </div>
        </aside>

        <section className={styles.main}>
          <div className={styles.headBlock}>
            <h1 className={styles.headTitle}>AI Workspace</h1>
            <p className={styles.headSub}>Code, debug, write emails, and transform text in one place.</p>
          </div>

          <div className={styles.configBar}>
            <select className={styles.modelInput} value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="gpt-4.1-mini">gpt-4.1-mini</option>
              <option value="gpt-4.1">gpt-4.1</option>
              <option value="gpt-4o-mini">gpt-4o-mini</option>
            </select>
          </div>

          <div className={styles.tip}>
            AI is enabled by the server. Users can chat directly with no API key field.
          </div>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.tasks}>
            {TASKS.map((t) => (
              <button key={t.label} className={styles.taskBtn} onClick={() => applyTask(t.prompt)}>
                {t.label}
              </button>
            ))}
          </div>

          <div className={styles.messages}>
            {!activeChat?.messages.length && (
              <div className={styles.empty}>
                Ask anything: code, debugging, system design, documentation, emails, rewriting, summaries, cloud workflows.
              </div>
            )}
            {activeChat?.messages.map((m, idx) => (
              <div key={idx} className={`${styles.msg} ${m.role === 'user' ? styles.user : styles.assistant}`}>
                <div className={styles.role}>{m.role === 'user' ? 'You' : 'AI'}</div>
                <div className={styles.content}>{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className={`${styles.msg} ${styles.assistant}`}>
                <div className={styles.role}>AI</div>
                <div className={styles.loadingDots}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>

          <div className={styles.composer}>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  e.preventDefault()
                  send()
                }
              }}
              placeholder="Type your message..."
              className={styles.textarea}
              rows={4}
              spellCheck={false}
            />
            <div className={styles.hint}>Tip: press Ctrl+Enter to send</div>
            <button className={styles.sendBtn} disabled={!draft.trim() || loading} onClick={send}>
              {loading ? 'Thinking...' : 'Send'}
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
