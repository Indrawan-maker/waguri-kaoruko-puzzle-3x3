import { useState } from 'react'
import Board from './components/Board'
import Lobby from './components/Lobby'

function App() {
  const [isShow,setIsShown] = useState(false)

function handleBtn() {
  console.log("hello btn")
  setIsShown(previsShown => !previsShown)
}
  
  return (
    <div className='bg-[#282d35] min-h-screen'>
      <section>
        {isShow ? null : 
    <Lobby 
    onClick={handleBtn}
    />
        }
      </section>
      <section>
    { isShow && 
    <Board 
    onClick={handleBtn}
    />}
      </section>
    </div>
  )
}

export default App
