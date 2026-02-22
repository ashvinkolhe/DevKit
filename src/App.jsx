import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import ToolsApp from './pages/ToolsApp'
import AiStudio from './pages/AiStudio'

export default function App() {
  return (
    <Routes>
      <Route path="/"        element={<Landing />} />
      <Route path="/tools"   element={<ToolsApp />} />
      <Route path="/tools/:toolId" element={<ToolsApp />} />
      <Route path="/ai"      element={<AiStudio />} />
      <Route path="*"        element={<Navigate to="/" replace />} />
    </Routes>
  )
}
