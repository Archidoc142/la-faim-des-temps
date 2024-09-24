export default function FooterArray({title, array}) {
    return(
        <div className="my-4 lg:my-6 2xl:my-8">
            <h2 className='text-white stoke'>{title}</h2>
            {array.map((i) => (
                i.ouvert ?
                    <p className='text-[#D6D6D6]' key={i.id}>
                        {i.jour}: {i.heure_ouverture} - {i.heure_fermeture}
                    </p> : null
            ))}
        </div>
    )
}
