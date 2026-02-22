import { useMemo, useState } from 'react'
import { ToolShell, ControlsBar, PanelLabel, StatusBadge, CopyBtn } from '../components/ToolShell'
import { useCopy } from '../hooks/useCopy'

function normalizeCron(input) {
  const raw = input.trim()
  if (!raw) return ''
  const inner = raw.startsWith('cron(') && raw.endsWith(')') ? raw.slice(5, -1) : raw
  return inner.trim().replace(/\s+/g, ' ')
}

export default function AwsCronHelper() {
  const [minute, setMinute] = useState('0')
  const [hour, setHour] = useState('12')
  const [dayOfMonth, setDayOfMonth] = useState('*')
  const [month, setMonth] = useState('*')
  const [dayOfWeek, setDayOfWeek] = useState('?')
  const [year, setYear] = useState('*')
  const [manualCron, setManualCron] = useState('')
  const { copied, copy } = useCopy()

  const cron = `cron(${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek} ${year})`
  const normalized = normalizeCron(manualCron)
  const parsed = normalized ? normalized.split(' ') : []
  const valid = parsed.length === 6

  const helpText = useMemo(
    () => `minute=${minute}, hour=${hour}, day-of-month=${dayOfMonth}, month=${month}, day-of-week=${dayOfWeek}, year=${year}`,
    [minute, hour, dayOfMonth, month, dayOfWeek, year]
  )

  function loadDailySample() {
    setMinute('0')
    setHour('9')
    setDayOfMonth('*')
    setMonth('*')
    setDayOfWeek('?')
    setYear('*')
  }

  function applyManual() {
    if (!valid) return
    const [m, h, dom, mon, dow, y] = parsed
    setMinute(m)
    setHour(h)
    setDayOfMonth(dom)
    setMonth(mon)
    setDayOfWeek(dow)
    setYear(y)
  }

  return (
    <ToolShell icon="" title="AWS Cron Helper" desc="Create EventBridge cron expressions and quickly validate existing ones.">
      <ControlsBar>
        <button className="btn btn-primary btn-sm" onClick={loadDailySample}>Daily 09:00 UTC</button>
        <CopyBtn onClick={() => copy(cron)} copied={copied} label="Copy cron(...)" />
      </ControlsBar>

      <StatusBadge type="info">{helpText}</StatusBadge>

      <div className="split-pane">
        <div>
          <PanelLabel>Builder</PanelLabel>
          <div style={{ display: 'grid', gap: 8 }}>
            <input className="text-input" value={minute} onChange={(e) => setMinute(e.target.value)} placeholder="Minute (0-59)" />
            <input className="text-input" value={hour} onChange={(e) => setHour(e.target.value)} placeholder="Hour (0-23)" />
            <input className="text-input" value={dayOfMonth} onChange={(e) => setDayOfMonth(e.target.value)} placeholder="Day of month (*, ?, 1-31, etc)" />
            <input className="text-input" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month (*, 1-12, JAN-DEC)" />
            <input className="text-input" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} placeholder="Day of week (?, MON-FRI, etc)" />
            <input className="text-input" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year (* or 1970-2199)" />
          </div>
        </div>

        <div>
          <PanelLabel>AWS Expression</PanelLabel>
          <pre className="output-area" style={{ minHeight: 220 }}>{cron}</pre>
        </div>
      </div>

      <div>
        <PanelLabel actions={<button className="btn btn-ghost btn-sm" onClick={applyManual}>Apply to Builder</button>}>Validate Existing Expression</PanelLabel>
        <input
          className="text-input"
          style={{ width: '100%' }}
          value={manualCron}
          onChange={(e) => setManualCron(e.target.value)}
          placeholder="cron(0 12 * * ? *)"
          spellCheck={false}
        />
        {manualCron && (valid ? <StatusBadge type="success"> Looks valid (6 cron fields)</StatusBadge> : <StatusBadge type="error"> Expected 6 fields inside cron(...)</StatusBadge>)}
      </div>
    </ToolShell>
  )
}
