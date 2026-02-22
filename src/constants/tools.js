export const TOOL_GROUPS = {
  Data: [
    { id: 'json', label: 'JSON Formatter', icon: '{}', desc: 'Format, validate & minify JSON' },
    { id: 'sql', label: 'SQL Formatter', icon: 'SQL', desc: 'Format basic SQL queries for readability' },
  ],
  Text: [
    { id: 'diff', label: 'Diff Viewer', icon: '<>', desc: 'Compare text blocks side by side' },
    { id: 'regex', label: 'Regex Tester', icon: '.*', desc: 'Test patterns with live highlights' },
    { id: 'text', label: 'Text Analyzer', icon: 'TXT', desc: 'Count chars, words & reading time' },
    { id: 'markdown', label: 'Markdown Preview', icon: 'MD', desc: 'Live Markdown to HTML renderer' },
  ],
  Encoding: [
    { id: 'base64', label: 'Base64 Coder', icon: '64', desc: 'Encode & decode Base64 strings' },
    { id: 'url', label: 'URL Encoder', icon: 'URL', desc: 'Percent-encode/decode URLs' },
    { id: 'html', label: 'HTML Entities', icon: '</>', desc: 'Encode/decode HTML special chars' },
  ],
  Security: [
    { id: 'hash', label: 'Hash Generator', icon: '#', desc: 'SHA-1/256/384/512 via Web Crypto' },
    { id: 'jwt', label: 'JWT Decoder', icon: 'JWT', desc: 'Decode tokens & check expiry' },
  ],
  Utilities: [
    { id: 'timestamp', label: 'Unix Timestamp', icon: 'TS', desc: 'Convert between epochs & dates' },
    { id: 'color', label: 'Color Picker', icon: 'RGB', desc: 'Convert HEX, RGB and HSL' },
    { id: 'base', label: 'Base Converter', icon: '2-16', desc: 'DEC, BIN, OCT, HEX conversions' },
    { id: 'lorem', label: 'Lorem Ipsum', icon: 'Aa', desc: 'Generate placeholder text' },
  ],
  CSS: [
    { id: 'shadow', label: 'CSS Shadow Gen', icon: 'CSS', desc: 'Visual box-shadow builder' },
  ],
  Cloud: [
    { id: 'aws-arn', label: 'AWS ARN Parser', icon: 'AWS', desc: 'Parse ARNs into service, region, account and resource' },
    { id: 'aws-cron', label: 'AWS Cron Helper', icon: 'CRN', desc: 'Build and explain AWS EventBridge cron expressions' },
    { id: 'aws-iam', label: 'AWS IAM Policy Builder', icon: 'IAM', desc: 'Generate least-privilege IAM policy JSON quickly' },
    { id: 'k8s-manifest', label: 'K8s Manifest Builder', icon: 'K8S', desc: 'Generate Kubernetes Deployment + Service YAML' },
    { id: 'docker-env', label: 'Docker Env Builder', icon: 'ENV', desc: 'Create Docker .env blocks and compose env snippets' },
    { id: 'sap-odata', label: 'SAP OData Builder', icon: 'SAP', desc: 'Generate OData query URLs for SAP APIs quickly' },
    { id: 'sap-idoc', label: 'SAP IDoc Formatter', icon: 'DOC', desc: 'Format pipe/comma-separated IDoc lines into JSON' },
  ],
  AI: [
    { id: 'ai-assistant', label: 'AI Assistant', icon: 'AI', desc: 'Ask engineering questions in-app with your API key' },
  ],
}

export const ALL_TOOLS = Object.values(TOOL_GROUPS).flat()
export const TOOL_MAP = Object.fromEntries(ALL_TOOLS.map((t) => [t.id, t]))
