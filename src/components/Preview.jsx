import { useState, useEffect } from 'react'
import img1 from "../assets/images/anime-1.jpg"
import img2 from "../assets/images/anime-2.jpg"
import img3 from "../assets/images/anime-3.jpg"
import img4 from "../assets/images/anime-4.jpg"
import img5 from "../assets/images/anime-5.jpg"
import img6 from "../assets/images/anime-6.jpg"
import img7 from "../assets/images/anime-7.jpg"
import img8 from "../assets/images/anime-8.jpg"
import img9 from "../assets/images/anime-9.jpg"
import 'primeicons/primeicons.css';

export default function Preview({ onComplete, onBack }) {
    const [countdown, setCountdown] = useState(3)

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev === 1) {
                    clearInterval(timer)
                    onComplete()
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [onComplete])

    const pieceImage = [img1, img2, img3, img4, img5, img6, img7, img8, img9]

    return (
        <div className="container flex flex-col w-full min-h-screen justify-center items-center">
            <div className="text-center mb-8">
                <p className="text-md text-white">
                    Acak gambar dalam waktu:
                    <span className="text-white font-medium ml-2">{countdown} detik...</span>
                </p>
            </div>

            <div className="grid grid-cols-3 w-96 h-96 mb-8">
                {pieceImage.map((img, index) => (
                    <div key={index} className="overflow-hidden shadow-lg">
                        <img
                            src={img}
                            alt={`Puzzle piece ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}