export default function FooterProps({title, message}) {
    return(
        <div>
            <h2 className='text-white stoke mb-1'>{title}</h2>
            <p className='text-[#D6D6D6]'>{message}</p>
        </div>
    )
}
