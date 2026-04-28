import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AgentsProvider } from './context/AgentsProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AgentsProvider>
      <App />
    </AgentsProvider>
  </StrictMode>,
)
