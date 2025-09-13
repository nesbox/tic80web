import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/bootstrap.min.css'
import './styles/tic-theme.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
