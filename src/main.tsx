import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './css/bootstrap.min.css'
import './css/tic-theme.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
