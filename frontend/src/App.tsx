import { useState } from 'react'
import './App.css'
import AppRouter from './router'
import { ThemeProvider } from './components/themeProvider'

function App() {


  return (
    <>
      <div>
          <AppRouter/>
      </div>
    </>
  )
}

export default App
