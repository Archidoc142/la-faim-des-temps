export default function FormatsMenu({ formatLangue, descLangue, montant }) {
    return (
        <>
            <p className='font-semibold pb-2'>{formatLangue}</p>
            <p className='text-sm pb-2'>{descLangue}</p>
            <p className='text-[#2E6FED] font-semibold text-lg'>{montant}</p>
        </>
    )
}
