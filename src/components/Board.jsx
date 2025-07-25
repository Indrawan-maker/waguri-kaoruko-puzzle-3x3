import { useState, useEffect, useRef } from "react";
import img1 from "../assets/images/anime-1.jpg";
import img2 from "../assets/images/anime-2.jpg";
import img3 from "../assets/images/anime-3.jpg";
import img4 from "../assets/images/anime-4.jpg";
import img5 from "../assets/images/anime-5.jpg";
import img6 from "../assets/images/anime-6.jpg";
import img7 from "../assets/images/anime-7.jpg";
import img8 from "../assets/images/anime-8.jpg";
import img9 from "../assets/images/anime-9.jpg";
import audio from "../assets/sound/loveLori.mp3";
import 'primeicons/primeicons.css';

export default function Board({ onBack }) {
    const [tiles, setTiles] = useState([]);
    const [moves, setMoves] = useState(0);
    const [isWon, setIsWon] = useState(false);
    const [isEmpty, setIsEmpty] = useState(null);
    const [timeLeft, setTimeLeft] = useState(300); // 5 menit
    const [isShuffling, setIsShuffling] = useState(true); // Menandai proses pengacakan
    const pieceImage = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
    const timerRef = useRef(null);

    // Inisialisasi game
    useEffect(() => {
        // Set gambar urutan normal untuk preview
        setTiles([0, 1, 2, 3, 4, 5, 6, 7, 8]);
        setIsEmpty(8);
        
        // Timer untuk pengacakan
        const shuffleTimer = setTimeout(() => {
            initializePuzzle();
            startGameTimer();
            setIsShuffling(false);
        }, 3000);

        return () => {
            clearTimeout(shuffleTimer);
            clearInterval(timerRef.current);
        };
    }, []);

    const startGameTimer = () => {
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Format waktu
    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Inisialisasi puzzle
    const initializePuzzle = () => {
        const initialTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const shuffled = [...initialTiles];
        
        // Fisher-Yates shuffle
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Pastikan puzzle bisa diselesaikan
        const inversions = countInversions(shuffled);
        if (inversions % 2 !== 0) {
            if (shuffled[0] !== 8 && shuffled[1] !== 8) {
                [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
            } else {
                [shuffled[2], shuffled[3]] = [shuffled[3], shuffled[2]];
            }
        }
        
        setTiles(shuffled);
        setIsEmpty(shuffled.indexOf(8));
        setMoves(0);
        setIsWon(false);
    };

    // Hitung inversi
    const countInversions = (arr) => {
        let inversions = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] !== 8 && arr[j] !== 8 && arr[i] > arr[j]) {
                    inversions++;
                }
            }
        }
        return inversions;
    };

    // Cek kemenangan
    const checkWin = (currentTiles) => {
        const winningState = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        return currentTiles.every((tile, index) => tile === winningState[index]);
    };

    // Handler klik tile
    const handleTileClick = (index) => {
        if (isWon || timeLeft === 0 || isShuffling) return;

        const clickedRow = Math.floor(index / 3);
        const clickedCol = index % 3;
        const emptyRow = Math.floor(isEmpty / 3);
        const emptyCol = isEmpty % 3;

        const isAdjacent =
            (Math.abs(clickedRow - emptyRow) === 1 && clickedCol === emptyCol) ||
            (Math.abs(clickedCol - emptyCol) === 1 && clickedRow === emptyRow);

        if (isAdjacent) {
            const newTiles = [...tiles];
            [newTiles[index], newTiles[isEmpty]] = [newTiles[isEmpty], newTiles[index]];
            
            setTiles(newTiles);
            setIsEmpty(index);
            setMoves(moves + 1);

            if (checkWin(newTiles)) {
                setIsWon(true);
                clearInterval(timerRef.current);
            }
        }
    };

    return (
        <section className="container flex w-full min-h-screen justify-center items-center text-shadow-white">
            <audio src={audio} autoPlay loop></audio>
            <div className="p-6 bg-gray-800 bg-opacity-70 rounded-xl shadow-2xl">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">Puzzle Game</h1>
                    <p className="text-white">
                        {isShuffling 
                            ? "Mengacak gambar..." 
                            : isWon 
                                ? "Selamat! Anda menang!" 
                                : "Selesaikan puzzle!"}
                    </p>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3 bg-gray-900 px-4 py-2 rounded-lg">
                        <i className="pi pi-clock text-white"></i>
                        <p className="text-xl font-mono text-white">{formatTime()}</p>
                    </div>
                    <div className="flex justify-center items-center ">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1 border-3 border-[#4b525a] hover:bg-[#4b525a] bg-[#1f2226] w-22 h-8 font-stretch-ultra-condensed text-white rounded-lg transition-colors"
                    >
                        <i className="pi pi-arrow-left ml-4 bounceHorizontalLeft" style={{ fontSize: 'o.400rem', color:"white" }}></i>
                        reset
                    </button>
                        </div>
                </div>

                {isWon && (
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg mb-6 text-center animate-pulse">
                        <p className="text-xl font-bold">🎉 Selamat!</p>
                        <p>Anda menyelesaikan puzzle dalam {moves} langkah!</p>
                    </div>
                )}

                <div className={`grid grid-cols-3 gap-2 w-96 h-96 ${isShuffling ? 'opacity-70' : ''}`}>
                    {tiles.map((tile, index) => (
                        <div
                            key={index}
                            onClick={() => handleTileClick(index)}
                            className={`flex justify-center items-center rounded-lg overflow-hidden transition-all ${
                                tile === 8
                                    ? 'bg-gray-900 cursor-not-allowed'
                                    : 'bg-gray-700 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer'
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
            </div>
        </section>
    );
}