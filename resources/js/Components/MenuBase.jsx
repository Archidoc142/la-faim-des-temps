import { useTranslation } from 'react-i18next';
import { useState, useEffect } from "react";
import autoprefixer from 'autoprefixer';

export default function MenuBase({ produit, putPanier, editable, setData, data, afficherMenu, showMessageFlash }) {

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

            <div key={produit.id} className='flex flex-col items-center justify-between  border-2 border-[#EBEBEB] rounded-2xl p-5 md:p-7 text-center md:w-auto'>
                <div className='w-full'>
                    <div>
                        <h3 className='justify-center text-[#FFD8AD] imperial mr-2 pb-1 text-5xl md:text-6xl'>{i18n.language == 'fr' ? produit.formats[0].nom.fr : produit.formats[0].nom.en}</h3>
                        <p className='self-center text-[#FFD8AD] pb-4 imperial mr-2 text-3xl md:text-4xl pl-3'>{i18n.language == 'fr' ? produit.formats[0].montant + "$" : "$" + produit.formats[0].montant}</p>
                    </div>

                    {editable ?
                        <div className='flex flex-col'>
                            <label htmlFor={produit.id + "fr"} className='text-start text-gray-300'>Français</label>
                            <textarea rows={2} name={produit.id + "fr"} id={produit.id + "fr"} value={descriptionFr}
                                onChange={(e) => { setDescriptionFr(e.target.value) }}></textarea>

                            <label htmlFor={produit.id + "en"} className='text-start text-gray-300 mt-2'>Anglais</label>
                            <textarea rows={2} name={produit.id + "en"} id={produit.id + "en"} value={descriptionEn}
                                onChange={(e) => { setDescriptionEn(e.target.value) }}></textarea>
                        </div>
                        :
                        <>
                            <p className='mt-auto text-white md:text-lg'>{i18n.language == 'fr' ? produit.description.fr : produit.description.en}</p>
                        </>
                    }
                </div>
                {editable || !afficherMenu ?
                    null
                    :
                    <button
                        type="button"
                        onClick={() => {putPanier(produit.formats[0].id, produit.id); showMessageFlash(1, t("Menu.bienajoute"));}}
                        className=" inline-block w-44 mt-8 p-1.5 text-sm text-white font-semibold border border-[#BB285C] bg-[#BB285C] hover:border-white hover:cursor-pointer justify-self-center"
                    >
                        {t("Menu.add-panier")}
                    </button>
                }

            </div>
        </>
    )
}
