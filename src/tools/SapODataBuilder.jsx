import { useMemo, useState } from 'react'
import { ToolShell, ControlsBar, PanelLabel, StatusBadge, CopyBtn } from '../components/ToolShell'
import { useCopy } from '../hooks/useCopy'

function withNoTrailingSlash(url) {
  return url.endsWith('/') ? url.slice(0, -1) : url
}

export default function SapODataBuilder() {
  const [serviceUrl, setServiceUrl] = useState('')
  const [entitySet, setEntitySet] = useState('')
  const [select, setSelect] = useState('')
  const [filter, setFilter] = useState('')
  const [orderby, setOrderby] = useState('')
  const [expand, setExpand] = useState('')
  const [top, setTop] = useState('')
  const [skip, setSkip] = useState('')
  const { copied, copy } = useCopy()

  const finalUrl = useMemo(() => {
    if (!serviceUrl.trim() || !entitySet.trim()) return ''
    const base = `${withNoTrailingSlash(serviceUrl.trim())}/${entitySet.trim()}`
    const params = new URLSearchParams()
    if (select.trim()) params.set('$select', select.trim())
    if (filter.trim()) params.set('$filter', filter.trim())
    if (orderby.trim()) params.set('$orderby', orderby.trim())
    if (expand.trim()) params.set('$expand', expand.trim())
    if (top.trim()) params.set('$top', top.trim())
    if (skip.trim()) params.set('$skip', skip.trim())
    const query = params.toString()
    return query ? `${base}?${query}` : base
  }, [serviceUrl, entitySet, select, filter, orderby, expand, top, skip])

  function loadSample() {
    setServiceUrl('https://example.sap.com/sap/opu/odata/sap/API_SALES_ORDER_SRV')
    setEntitySet('A_SalesOrder')
    setSelect('SalesOrder,SalesOrganization,CreationDate')
    setFilter("SalesOrganization eq '1000'")
    setOrderby('CreationDate desc')
    setExpand('')
    setTop('50')
    setSkip('0')
  }

  function clear() {
    setServiceUrl('')
    setEntitySet('')
    setSelect('')
    setFilter('')
    setOrderby('')
    setExpand('')
    setTop('')
    setSkip('')
  }

  return (
    <ToolShell icon="" title="SAP OData Builder" desc="Build SAP OData request URLs with common query options for faster API testing.">
      <ControlsBar>
        <button className="btn btn-ghost btn-sm" onClick={loadSample}> Load Sample</button>
        <CopyBtn onClick={() => copy(finalUrl)} copied={copied} label="Copy URL" />
        <button className="btn btn-danger btn-sm" onClick={clear}> Clear</button>
      </ControlsBar>

      {!finalUrl && <StatusBadge type="info">Enter at least Service URL and Entity Set to generate query URL.</StatusBadge>}
      {finalUrl && <StatusBadge type="success"> URL generated</StatusBadge>}

      <div className="split-pane">
        <div style={{ display: 'grid', gap: 8 }}>
          <PanelLabel>Inputs</PanelLabel>
          <input className="text-input" value={serviceUrl} onChange={(e) => setServiceUrl(e.target.value)} placeholder="Service URL" spellCheck={false} />
          <input className="text-input" value={entitySet} onChange={(e) => setEntitySet(e.target.value)} placeholder="Entity set (e.g. A_SalesOrder)" spellCheck={false} />
          <input className="text-input" value={select} onChange={(e) => setSelect(e.target.value)} placeholder="$select (comma separated fields)" spellCheck={false} />
          <input className="text-input" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="$filter (e.g. SalesOrganization eq '1000')" spellCheck={false} />
          <input className="text-input" value={orderby} onChange={(e) => setOrderby(e.target.value)} placeholder="$orderby (e.g. CreationDate desc)" spellCheck={false} />
          <input className="text-input" value={expand} onChange={(e) => setExpand(e.target.value)} placeholder="$expand (optional)" spellCheck={false} />
          <div className="split-pane" style={{ gap: 8 }}>
            <input className="text-input" value={top} onChange={(e) => setTop(e.target.value)} placeholder="$top" spellCheck={false} />
            <input className="text-input" value={skip} onChange={(e) => setSkip(e.target.value)} placeholder="$skip" spellCheck={false} />
          </div>
        </div>

        <div>
          <PanelLabel>Generated URL</PanelLabel>
          <pre className="output-area" style={{ minHeight: 300, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {finalUrl || <span style={{ color: 'var(--text-muted)' }}>Generated URL appears here...</span>}
          </pre>
        </div>
      </div>
    </ToolShell>
  )
}
