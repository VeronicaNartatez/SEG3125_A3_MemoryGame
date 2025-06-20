import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MemoryGame from './memorygame';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MemoryGame></MemoryGame>
    </>
  )
}

export default App
