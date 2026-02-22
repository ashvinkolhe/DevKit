export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: { message: 'Method not allowed' } })
    return
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: { message: 'Server missing OPENAI_API_KEY' } })
    return
  }

  try {
    const { model = 'gpt-4.1-mini', messages = [] } = req.body || {}

    const safeMessages = Array.isArray(messages)
      ? messages
          .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
          .slice(-20)
      : []

    const upstream = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        input: [
          {
            role: 'system',
            content:
              'You are DevKit AI. Help with coding, debugging, cloud/devops, writing emails, rewriting text, and documentation. Be clear and actionable.',
          },
          ...safeMessages,
        ],
      }),
    })

    const data = await upstream.json()
    res.status(upstream.status).json(data)
  } catch (err) {
    res.status(500).json({
      error: {
        message: err?.message || 'Server error',
      },
    })
  }
}

