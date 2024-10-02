import { useTranslation } from 'react-i18next';
import { useState, useEffect } from "react";
import autoprefixer from 'autoprefixer';

export default function MenuBase({ produit, putPanier, editable, setData, data }) {

    const [t, i18n] = useTranslation("global");
    /*const [descriptionFr, setDescriptionFr] = useState([])
    const [descriptionEn, setDescriptionEn] = useState([])

    useEffect(() => {

    })*/

    return (
        <>

            <div key={produit.id} className='border-2 border-[#EBEBEB] rounded-2xl p-7 justify-center text-center md:w-auto'>
                <h3 className='justify-center text-[#FFD8AD] pb-4 imperial text-5xl flex flex-nowrap lg:text-6xl'>{i18n.language == 'fr' ? produit.formats[0].nom.fr : produit.formats[0].nom.en}<span className='self-center text-4xl lg:text-5xl pl-3'>- {i18n.language == 'fr' ? Math.trunc(produit.formats[0].montant) + "$" : "$" + Math.trunc(produit.formats[0].montant)}</span></h3>
                {editable ?
                    <div className='flex flex-col'>
                        <label htmlFor={produit.id + "fr"} className='text-start text-gray-300'>Français</label>
                        <textarea rows={2} name={produit.id + "fr"} id={produit.id + "fr"} defaultValue={produit.description.fr}
                        onChange={(e) => {
                            let newData = data;
                            const id = produit.id;
                            if(newData[id] == null)
                                newData[id] = {}

                            newData[id].fr = e.target.value;
                            setData(newData);
                        }}></textarea>

                        <label htmlFor={produit.id + "fr"} className='text-start text-gray-300 mt-2'>Anglais</label>
                        <textarea rows={2} name={produit.id + "fr"} id={produit.id + "en"} defaultValue={produit.description.en}
                        onChange={(e) => {
                            let newData = data;
                            const id = produit.id;
                            if(newData[id] == null)
                                newData[id] = {}

                            newData[id].en = e.target.value;
                            setData(newData);
                        }}></textarea>
                    </div>
                    :
                    <p className='text-white text-lg pb-3'>{i18n.language == 'fr' ? produit.description.fr : produit.description.en}</p>
                }

                {editable ?
                    null
                    :
                    <button
                        onClick={() => putPanier(produit.formats[0].id, produit.id)}
                        className="inline-block min-w-40 mt-3 p-1.5 text-sm text-white font-semibold border border-[#BB285C] bg-[#BB285C] hover:border-white hover:cursor-pointer justify-self-center"
                    >
                        {t("Menu.add-panier")}
                    </button>
                }

            </div>
        </>
    )
}
