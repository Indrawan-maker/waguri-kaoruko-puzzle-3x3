import { useState, useEffect, useRef } from "react"
import img1 from "../assets/images/anime-1.jpg"
import img2 from "../assets/images/anime-2.jpg"
import img3 from "../assets/images/anime-3.jpg"
import img4 from "../assets/images/anime-4.jpg"
import img5 from "../assets/images/anime-5.jpg"
import img6 from "../assets/images/anime-6.jpg"
import img7 from "../assets/images/anime-7.jpg"
import img8 from "../assets/images/anime-8.jpg"
import img9 from "../assets/images/anime-9.jpg"
import audio from "../assets/sound/loveLori.mp3"
import 'primeicons/primeicons.css'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

// sisa task 
// responsive btn  pakai xs:✅
// atur confetti
// set game lose when timelimit

export default function Board({ onBack }) {
    const [tiles, setTiles] = useState([])
    const [moves, setMoves] = useState(0)
    const [isWon, setIsWon] = useState(false)
    const [isLose, setIsLose] = useState(false)
    const [isEmpty, setIsEmpty] = useState(null)
    const [timeLeft, setTimeLeft] = useState(300)
    const [isShuffling, setIsShuffling] = useState(true)
    const pieceImage = [img1, img2, img3, img4, img5, img6, img7, img8, img9]
    const timerRef = useRef(null)
    const { width, height } = useWindowSize()

    useEffect(() => {
        setTiles([0, 1, 2, 3, 4, 5, 6, 7, 8])
        setIsEmpty(8)

        const shuffleTimer = setTimeout(() => {
            initializePuzzle()
            startGameTimer()
            setIsShuffling(false)
        }, 3000)

        return () => {
            clearTimeout(shuffleTimer)
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [])

    const startGameTimer = () => {
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60)
        const seconds = timeLeft % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    const initializePuzzle = () => {
        const initialTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        const shuffled = [...initialTiles]

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }

        const inversions = countInversions(shuffled)
        if (inversions % 2 !== 0) {
            if (shuffled[0] !== 8 && shuffled[1] !== 8) {
                ;[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]]
            } else {
                ;[shuffled[2], shuffled[3]] = [shuffled[3], shuffled[2]]
            }
        }

        setTiles(shuffled)
        setIsEmpty(shuffled.indexOf(8))
        setMoves(0)
        setIsWon(false)
        setIsLose(false)
    }

    const countInversions = (arr) => {
        let inversions = 0
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] !== 8 && arr[j] !== 8 && arr[i] > arr[j]) {
                    inversions++
                }
            }
        }
        return inversions
    }

    const checkWin = (currentTiles) => {
        const winningState = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        return currentTiles.every((tile, index) => tile === winningState[index])
    }

    const handleTileClick = (index) => {
        if (isWon || isLose || timeLeft === 0 || isShuffling) return

        const clickedRow = Math.floor(index / 3)
        const clickedCol = index % 3
        const emptyRow = Math.floor(isEmpty / 3)
        const emptyCol = isEmpty % 3

        const isAdjacent =
            (Math.abs(clickedRow - emptyRow) === 1 && clickedCol === emptyCol) ||
            (Math.abs(clickedCol - emptyCol) === 1 && clickedRow === emptyRow)

        if (isAdjacent) {
            const newTiles = [...tiles]
                ;[newTiles[index], newTiles[isEmpty]] = [newTiles[isEmpty], newTiles[index]]

            setTiles(newTiles)
            setIsEmpty(index)
            setMoves(moves + 1)

            if (checkWin(newTiles)) {
                setIsWon(true)
                clearInterval(timerRef.current)
            }
        }
    }

    return (
        <section className="container grid w-full min-h-full justify-center items-center text-shadow-white p-32">
            {audio && <audio src={audio} autoPlay loop></audio>}
            {isWon && <Confetti
                width={width}
                height={height}
            />}
            <div className="text-center mb-2">
                <p className="text-white">
                    {isShuffling
                        ? "Mengacak gambar..."
                        : isLose ? "Anda kalah" :
                            isWon
                                ? "Selamat! Anda menang!"
                                : "Selesaikan puzzle!"}
                </p>
            </div>

            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-1 md:gap-3">
                    <i className="pi pi-clock text-white"></i>
                    <p className="font-normal text-white">{formatTime()}</p>
                </div>

                <div className="flex justify-center items-center">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1 md:gap-2 cursor-pointer border-3 border-[#4b525a] hover:bg-[#4b525a] bg-[#1f2226]  min-w-18 max-w-22 max-h-10 font-stretch-ultra-condensed text-white rounded-lg transition-colors px-3 text-center"
                    >
                        <i className="pi pi-arrow-left bounceHorizontalLeft text-center" style={{ fontSize: '0.800rem', color: "white" }}></i>
                        reset
                    </button>
                </div>
            </div>

            {(isWon || isLose) && (
                <div>
                    <p className="text-xl font-bold text-white text-center">{isWon ? '🎉 Congrats!' : ' Game Over!'}</p>
                    <p className="text-white text-center mb-2">{isWon ? `Kamu menyelesaikan puzzle dalam ${moves} langkah!` : 'Waktu habis! Coba lagi.'}</p>
                </div>
            )}

            <div className={`grid grid-cols-3 w-86 md:gap-1 md:w-96 md:h-96 ${isShuffling ? 'opacity-70' : ''}`}>
                {tiles.map((tile, index) => (
                    <div
                        key={index}
                        onClick={() => handleTileClick(index)}
                        className={`flex justify-center items-center overflow-hidden transition-all ${tile === 8
                                ? 'bg-gray-900 cursor-not-allowed'
                                : 'bg-gray-700 shadow-lg hover:shadow-xl cursor-pointer'
                            } ${isShuffling ? 'pointer-events-none' : ''}`}
                    >
                        {tile !== 8 && (
                            <img
                                src={pieceImage[tile]}
                                alt={`Piece ${tile + 1}`}
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                        )}
                    </div>
                ))}
            </div>

        </section>
    )
}
