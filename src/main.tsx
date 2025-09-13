import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// Import jQuery and make it globally available
import $ from 'jquery'
window.$ = window.jQuery = $

// Import Bootstrap JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './styles/tic-theme.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
