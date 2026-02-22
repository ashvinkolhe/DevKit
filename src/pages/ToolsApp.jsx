import { useEffect, useState, Suspense, lazy } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { TOOL_MAP } from '../constants/tools'
import { clearToolHistory, persistToolHistory, pushToolHistory, readToolHistory } from '../hooks/useToolHistory'
import styles from './ToolsApp.module.css'

// Lazy load all tools
const Dashboard       = lazy(() => import('../tools/Dashboard'))
const JsonFormatter   = lazy(() => import('../tools/JsonFormatter'))
const DiffViewer      = lazy(() => import('../tools/DiffViewer'))
const RegexTester     = lazy(() => import('../tools/RegexTester'))
const TextAnalyzer    = lazy(() => import('../tools/TextAnalyzer'))
const MarkdownPreview = lazy(() => import('../tools/MarkdownPreview'))
const Base64          = lazy(() => import('../tools/Base64'))
const UrlEncoder      = lazy(() => import('../tools/UrlEncoder'))
const HtmlEntity      = lazy(() => import('../tools/HtmlEntity'))
const HashGenerator   = lazy(() => import('../tools/HashGenerator'))
const JwtDecoder      = lazy(() => import('../tools/JwtDecoder'))
const Timestamp       = lazy(() => import('../tools/Timestamp'))
const ColorPicker     = lazy(() => import('../tools/ColorPicker'))
const BaseConverter   = lazy(() => import('../tools/BaseConverter'))
const ShadowGenerator = lazy(() => import('../tools/ShadowGenerator'))
const LoremIpsum      = lazy(() => import('../tools/LoremIpsum'))
const AwsArnParser    = lazy(() => import('../tools/AwsArnParser'))
const AwsCronHelper   = lazy(() => import('../tools/AwsCronHelper'))
const SapODataBuilder = lazy(() => import('../tools/SapODataBuilder'))
const AIAssistant     = lazy(() => import('../tools/AIAssistant'))
const AwsIamPolicyBuilder = lazy(() => import('../tools/AwsIamPolicyBuilder'))
const K8sManifestBuilder  = lazy(() => import('../tools/K8sManifestBuilder'))
const DockerEnvBuilder    = lazy(() => import('../tools/DockerEnvBuilder'))
const SapIdocFormatter    = lazy(() => import('../tools/SapIdocFormatter'))
const SqlFormatter        = lazy(() => import('../tools/SqlFormatter'))

const TOOL_COMPONENTS = {
  json:      JsonFormatter,
  diff:      DiffViewer,
  regex:     RegexTester,
  text:      TextAnalyzer,
  markdown:  MarkdownPreview,
  base64:    Base64,
  url:       UrlEncoder,
  html:      HtmlEntity,
  hash:      HashGenerator,
  jwt:       JwtDecoder,
  timestamp: Timestamp,
  color:     ColorPicker,
  base:      BaseConverter,
  shadow:    ShadowGenerator,
  lorem:     LoremIpsum,
  'aws-arn': AwsArnParser,
  'aws-cron': AwsCronHelper,
  'sap-odata': SapODataBuilder,
  'ai-assistant': AIAssistant,
  'aws-iam': AwsIamPolicyBuilder,
  'k8s-manifest': K8sManifestBuilder,
  'docker-env': DockerEnvBuilder,
  'sap-idoc': SapIdocFormatter,
  sql: SqlFormatter,
}

function Loader() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'200px', color:'var(--text-muted)', gap:'10px' }}>
      <div style={{ width:20, height:20, border:'2px solid var(--border-mid)', borderTopColor:'var(--accent)', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
      Loading tool...
    </div>
  )
}

export default function ToolsApp() {
  const { toolId } = useParams()
  const navigate   = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [history, setHistory] = useState(() => readToolHistory())
  const normalizedToolId = (toolId || '').trim().toLowerCase()

  const CurrentTool = normalizedToolId ? TOOL_COMPONENTS[normalizedToolId] : null
  const toolInfo    = normalizedToolId ? TOOL_MAP[normalizedToolId] : null

  useEffect(() => {
    if (normalizedToolId === 'ai-assistant') {
      navigate('/ai', { replace: true })
      return
    }
  }, [normalizedToolId, navigate])

  useEffect(() => {
    if (!normalizedToolId || !TOOL_MAP[normalizedToolId]) return
    setHistory((prev) => {
      const next = pushToolHistory(prev, normalizedToolId)
      persistToolHistory(next)
      return next
    })
  }, [normalizedToolId])

  function handleClearHistory() {
    clearToolHistory()
    setHistory([])
  }

  return (
    <div className={styles.layout}>
      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`${styles.sidebarWrap} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <Sidebar
          activeTool={normalizedToolId}
          history={history}
          onClearHistory={handleClearHistory}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main */}
      <div className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(o => !o)}
            aria-label="Toggle menu"
          >
            Menu
          </button>
          <div className={styles.breadcrumb}>
            <span
              className={styles.breadRoot}
              onClick={() => navigate('/tools')}
              role="button" tabIndex={0}
            >
              DevKit
            </span>
            {toolInfo && (
              <>
                <span className={styles.breadSep}>/</span>
                <span className={styles.breadCurrent}>{toolInfo.label}</span>
              </>
            )}
          </div>
          <div className={styles.headerActions}>
            <a
              href="https://github.com/ashvinkolhe"
              target="_blank" rel="noreferrer"
              className={styles.iconBtn} title="Star on GitHub"
            >
              <span className={styles.iconGlyph}>GH</span>
            </a>
          </div>
        </header>

        {/* Content */}
        <main className={styles.content}>
          <div className={styles.contentInner}>
            <Suspense fallback={<Loader />}>
              {!normalizedToolId ? (
                <Dashboard history={history} onClearHistory={handleClearHistory} />
              ) : CurrentTool ? (
                <CurrentTool />
              ) : (
                <div className="tool-wrapper">
                  <div className="tool-title">Tool Not Found</div>
                  <div className="tool-desc">No component found for `{normalizedToolId}`. Check tool mapping in `ToolsApp.jsx`.</div>
                </div>
              )}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}
