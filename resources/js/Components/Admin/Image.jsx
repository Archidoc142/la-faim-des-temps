export default function Image({img, handleClick}) {
    const imgUrl = "../../../img/";

    return (
        <div
            onClick={() => handleClick(img.id)}
            className="admin-images-div relative"
        >
            <svg
                width="200px"
                height="200px"
                viewBox="0 0 24 24"
                className="z-10 absolute top-3 right-3 drop-shadow-lg h-fit max-w-10 hover:stroke-[#BB285C] hover:cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                stroke="#ffffff"
            >
                <path
                    d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"
                    fill="none"
                    stroke="#ffffff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
                <polygon
                    fill="none"
                    points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
                    stroke="#fffffff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
            </svg>
            <img className="h-72" src={imgUrl + img.src} alt={img.legende.fr} />
        </div>
    );
}
