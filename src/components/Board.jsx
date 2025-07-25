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

export default function Board({ onClick }) {
    return (
        <section className="container flex w-full min-h-screen justify-center items-center text-shadow-white">
        <div className="">
            <p className="text-white justify-center items-center text-center mb-3">acak gambar dalam waktu 3 detik...</p>
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
            <p className=" pi pi-clock" style={{ fontSize: '1rem', color:"white"}}></p>
            <p className="text-white">05:00</p>
            </div>
            <div>
        <button 
                    onClick={() => onClick()}
                    className="flex justify-center items-center border-3 border-[#4b525a] hover:bg-[#4b525a] bg-[#1f2226] w-24 h-8 rounded-lg m-auto gap-2
                    cursor-pointer transition-all duration-600 text-white tracking-wide"
                    >
                        <i className="pi pi-arrow-left bounceHorizontalLeft" style={{ fontSize: '0.800rem'}}></i>Reset
                    </button>
            </div>
                        </div>
                        <div className="grid grid-cols-3 grid-rows-3 ">
                            <audio src={audio} autoPlay loop></audio>

                    <img src={img1} className="w-30"/>
                    <img src={img2} className="w-30"/>
                    <img src={img3} className="w-30"/>
                    <img src={img4} className="w-30"/>
                    <img src={img5} className="w-30"/>
                    <img src={img6} className="w-30"/>
                    <img src={img7} className="w-30"/>
                    <img src={img8} className="w-30"/>
                    <img src={img9} className="w-30"/>
                        </div>
                        </div>
        </section>
    )
}