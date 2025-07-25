import { useState } from 'react'
import Board from './components/Board'
import Lobby from './components/Lobby'
import Preview from './components/Preview'

function App() {
  const [gameState, setGameState] = useState('lobby') 

  const handleStart = () => {
    setGameState('preview')
  }

  const handleStartGame = () => {
    setGameState('board')
  }

  const handleBackToLobby = () => {
    setGameState('lobby')
  }

  return (
    <div className='bg-[#0f172b] min-h-screen'>
      {gameState === 'lobby' && 
        <Lobby onClick={handleStart} />
      }
      
      {gameState === 'preview' && 
        <Preview onComplete={handleStartGame} />
      }
      
      {gameState === 'board' && 
        <Board onBack={handleBackToLobby} />
      }
    </div>
  )
}

export default App