import { useTranslation } from 'react-i18next';
import { useState, useEffect } from "react";
import autoprefixer from 'autoprefixer';

export default function MenuBase({ produit, putPanier, editable, setData, data, afficherMenu }) {

    const [t, i18n] = useTranslation("global");

    const [descriptionFr, setDescriptionFr] = useState(produit.description.fr);
    const [descriptionEn, setDescriptionEn] = useState(produit.description.en);

    useEffect(() => {
        const newData = data;
        newData[produit.id - 1].fr = descriptionFr;
        setData(newData);
    }, [descriptionFr]);

    useEffect(() => {
        const newData = data;
        newData[produit.id - 1].en = descriptionEn;
        setData(newData);
    }, [descriptionEn]);

    return (
        <>

            <div key={produit.id} className='border-2 border-[#EBEBEB] rounded-2xl p-7 justify-center text-center md:w-auto'>
                <h3 className='justify-center text-[#FFD8AD] pb-4 imperial text-5xl flex flex-nowrap lg:text-6xl'>{i18n.language == 'fr' ? produit.formats[0].nom.fr : produit.formats[0].nom.en}<span className='self-center text-4xl lg:text-5xl pl-3'>- {i18n.language == 'fr' ? Math.trunc(produit.formats[0].montant) + "$" : "$" + Math.trunc(produit.formats[0].montant)}</span></h3>
                {editable ?
                    <div className='flex flex-col'>
                        <label htmlFor={produit.id + "fr"} className='text-start text-gray-300'>Français</label>
                        <textarea rows={2} name={produit.id + "fr"} id={produit.id + "fr"} value={descriptionFr}
                        onChange={(e) => {setDescriptionFr(e.target.value)}}></textarea>

                        <label htmlFor={produit.id + "fr"} className='text-start text-gray-300 mt-2'>Anglais</label>
                        <textarea rows={2} name={produit.id + "fr"} id={produit.id + "en"} value={descriptionEn}
                        onChange={(e) => {setDescriptionEn(e.target.value)}}></textarea>
                    </div>
                    :
                    <>
                        <p className='text-white text-lg pb-3 min-h-16'>{i18n.language == 'fr' ? produit.description.fr : produit.description.en}</p>
                    </>
                }

                {editable || !afficherMenu ?
                    null
                    :
                    <button
                        type="button"
                        onClick={() => putPanier(produit.formats[0].id, produit.id)}
                        className="inline-block min-w-40 mt-6 p-1.5 text-sm text-white font-semibold border border-[#BB285C] bg-[#BB285C] hover:border-white hover:cursor-pointer justify-self-center"
                    >
                        {t("Menu.add-panier")}
                    </button>
                }

            </div>
        </>
    )
}
