import img from "../assets/images/lobby-img.png"
import 'primeicons/primeicons.css';

export default function Lobby({ onClick }) {
    return (
        <div className="grid text-center font-[inter] text-gray-50 justify-center p-40 gap-6">
            <div className="w-42 m-auto justify-center items-center mb-1">
                <img 
                    src={img} 
                    alt="Puzzle Game" 
                    className="w-full h-full transition-all duration-600 hover:-translate-y-2"
                />
            </div>
            <div className="m-auto transition-all">
                <h1 className="text-2xl font-bold mb-3">Puzzle gambar 3x3</h1>
                <h2 className="font-semibold">Creator Indrawan</h2>
            </div>
            <button 
                onClick={onClick}
                className="flex justify-center items-center border-3 border-[#4b525a] hover:bg-[#4b525a] bg-[#1f2226]  min-h-12 min-w-22 rounded-lg m-auto
                cursor-pointer transition-all duration-600" 
            >
                <div className="flex gap-2 font-light">
                    <i className="pi pi-caret-right" style={{ fontSize: '1.40rem', color:"white" }}></i>
                    Play
                </div>
            </button>
        </div>
    )
}