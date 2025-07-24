import img1 from "../assets/images/anime-1.jpg"

export default function Board({ onClick }) {
    return (
        <>
        <img src={img1} className="w-32"/>


        <div className="">
        <button 
                    onClick={() => onClick()}
                    className="flex justify-center items-center border-3 border-[#4b525a] hover:bg-[#4b525a] bg-[#1f2226] w-28 h-12 rounded-lg m-auto gap-2
                    cursor-pointer transition-all duration-600 text-white tracking-wide" 
                    
                    >
                        <i className="pi pi-arrow-left" style={{ fontSize: '0.800rem'}}></i>Reset
                    </button>
                        </div>
        </>
    )
}