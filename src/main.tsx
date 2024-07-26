import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import UserInputProvider from './contexts/UserInput.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserInputProvider>
      <App />
    </UserInputProvider>
  </React.StrictMode>,
)
