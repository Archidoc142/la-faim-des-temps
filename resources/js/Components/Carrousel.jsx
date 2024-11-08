import { useState } from "react";

export default function Carrousel({ images, i18n }) {

    const [index, setIndex] = useState(0)

    const movePostLeft = () => {
        const newIndex = (index > 0) ? index - 1 : images.length - 1;
        setIndex(newIndex);
    };

    const movePostRight = () => {
        const newIndex = (index < images.length - 1) ? index + 1 : 0;
        setIndex(newIndex);
    };

    const moveToIndex = (index) => {
        setIndex(index)
    }

    return (
        <div className="bg-[#ba275b] pt-4">
            <div className="flex justify-center items-center gap-4">
                <button onClick={() => movePostLeft()}>
                    <svg className='w-20 h-20 md:w-24 md:h-24 rounded-[50%]' viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                </button>

                {images.map((image, i) =>
                    <img
                        key={i}
                        src={`/img/${images[i].src}`}
                        alt={"img_plat_" + i}
                        className={"max-w-[60%] mb-6 mt-4 border-4 border-white " + (index == i ? "block" : "hidden")}
                    />
                )}


                <button onClick={() => movePostRight()}>
                    <svg className='w-20 h-20 md:w-24 md:h-24 rounded-[50%]' viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                </button>
            </div>

            <div className='flex gap-4 justify-center pb-6'>
                {images.map((item, tempIndex) => (
                    <span
                        onClick={() => moveToIndex(tempIndex)}
                        key={tempIndex}
                        className={"dot cursor-pointer" + (index === tempIndex ? " !bg-white" : "")}
                    ></span>
                ))}
            </div>

            <div className="text-white italic pb-4">
                <p>{images[index].legende[i18n.language]}</p>
            </div>
        </div>

    )
}
