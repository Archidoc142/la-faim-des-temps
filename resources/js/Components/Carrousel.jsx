import { useState } from "react";

export default function Carrousel({ images, i18n }) {

    const [index, setIndex] = useState(0)
    const imagesTenFirst = images.slice(0, 10)

    const movePostLeft = () => {
        const newIndex = (index > 0) ? index - 1 : imagesTenFirst.length - 1;
        setIndex(newIndex);
    };

    const movePostRight = () => {
        const newIndex = (index < imagesTenFirst.length - 1) ? index + 1 : 0;
        setIndex(newIndex);
    };

    const moveToIndex = (index) => {
        setIndex(index)
    }

    return (
        <div className="bg-[#ba275b] pt-4 h-fit relative">
            <div className="flex justify-center items-center mx-[10%]">
                <button className="absolute left-0 h-1/2 bg-[#ffffffb5] rounded-e-xl z-10" onClick={() => movePostLeft()}>
                    <svg className='min-w-12 md:max-w-24' viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                </button>

                {imagesTenFirst.map((image, i) =>
                    <img
                        key={i}
                        src={`/img/${images[i].src}`}
                        alt={"img_plat_" + i}
                        className={"max-h-[500px] xl:max-w-[60%] mb-6 mt-4 border-4 border-white " + (index == i ? "block" : "hidden")}
                    />
                )}

                <button className="absolute right-0 h-1/2 bg-[#ffffffb5] rounded-s-xl z-10" onClick={() => movePostRight()}>
                    <svg className='min-w-12 md:max-w-24' viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                </button>
            </div>

            <div className='flex gap-4 justify-center pb-6'>
                {imagesTenFirst.map((item, tempIndex) => (
                    <span
                        onClick={() => moveToIndex(tempIndex)}
                        key={tempIndex}
                        className={"dot cursor-pointer" + (index === tempIndex ? " !bg-white" : "")}
                    ></span>
                ))}
            </div>

            <div className="text-center text-white italic pb-4">
                <p>{imagesTenFirst[index].legende[i18n.language]}</p>
            </div>
        </div>

    )
}
