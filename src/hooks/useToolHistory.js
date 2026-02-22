const STORAGE_KEY = 'DevKit_tool_history_v1'
const MAX_ITEMS = 20

function safeParse(json) {
  try {
    const parsed = JSON.parse(json)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function readToolHistory() {
  if (typeof window === 'undefined') return []
  return safeParse(window.localStorage.getItem(STORAGE_KEY))
}

export function clearToolHistory() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
}

export function pushToolHistory(prev, toolId) {
  if (!toolId) return prev
  const now = Date.now()
  const next = [...prev]
  const idx = next.findIndex((item) => item.id === toolId)

  if (idx >= 0) {
    const existing = next[idx]
    next[idx] = { ...existing, ts: now, count: (existing.count || 1) + 1 }
  } else {
    next.push({ id: toolId, ts: now, count: 1 })
  }

  next.sort((a, b) => b.ts - a.ts)
  return next.slice(0, MAX_ITEMS)
}

export function persistToolHistory(history) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}
