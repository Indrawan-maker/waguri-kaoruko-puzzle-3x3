import { useState } from 'react'
import Board from './components/Board'
import Lobby from './components/Lobby'

function App() {
  const isBoardShown = false
  return (
    <div className='bg-[#282d35] min-h-screen'>
    <Lobby />
    { isBoardShown && <Board />}
    </div>
  )
}

export default App
