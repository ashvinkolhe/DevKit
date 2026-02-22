import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const serverApiKey = env.OPENAI_API_KEY || process.env.OPENAI_API_KEY || ''

  return {
  plugins: [
    react(),
    {
      name: 'devkit-ai-api',
      configureServer(server) {
        server.middlewares.use('/api/chat', async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: { message: 'Method not allowed' } }))
            return
          }

          const apiKey = serverApiKey
          if (!apiKey) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: { message: 'Missing OPENAI_API_KEY in .env' } }))
            return
          }

          try {
            let raw = ''
            for await (const chunk of req) raw += chunk
            const body = raw ? JSON.parse(raw) : {}
            const model = body?.model || 'gpt-4.1-mini'
            const messages = Array.isArray(body?.messages) ? body.messages : []
            const safeMessages = messages
              .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
              .slice(-20)

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

            const text = await upstream.text()
            res.statusCode = upstream.status
            res.setHeader('Content-Type', 'application/json')
            res.end(text)
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: { message: err?.message || 'Server error' } }))
          }
        })
      },
    },
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
}
})
