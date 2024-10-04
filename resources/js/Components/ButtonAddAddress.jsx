export default function ButtonAddAddress({ setContentBox }) {
    return (
        <div
            className="bg-[#AAA] hover:bg-gray-500 p-2 rounded-lg cursor-pointer w-36 h-36 text-center"
            onClick={() => setContentBox(3)}
        >
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" className="mx-auto mt-3">
                <path d="M12 5 V19 M5 12 H19" stroke="white" strokeWidth="2"></path>
            </svg>

            <p className="text-white font-bold">Ajouter une adresse</p>
        </div>
    )
}
