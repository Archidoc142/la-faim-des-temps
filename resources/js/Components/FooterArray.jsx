import { useTranslation } from "react-i18next";

export default function FooterArray({title, array}) {

    const [t, i18n] = useTranslation("global");

    return(
        <div className="my-4 lg:my-6 2xl:my-8">
            <h2 className='text-white stoke'>{title}</h2>
            {array.map((i) => (
                i.ouvert ?
                    <p className='text-[#D6D6D6]' key={i.id}>
                        {i18n.language == 'fr' ? i.jour_fr : i.jour_en}: {i.heure_ouverture} - {i.heure_fermeture}
                    </p> : null
            ))}
        </div>
    )
}
