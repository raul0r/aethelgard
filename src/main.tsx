import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/textures/grimoire.css'

// This connects the React 'App' to the 'root' div in your index.html
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)