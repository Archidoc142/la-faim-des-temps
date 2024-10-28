import { useTranslation } from 'react-i18next';
import MenuFormats from '@/Components/MenuFormats';
import { useEffect, useState } from "react";

export default function MenuPrinc({ produit, putPanier, editable, setData, categories, data, formIndex, afficherMenu }) {

    const [t, i18n] = useTranslation("global");

    const [produitId, setProduitId] = useState(produit.id);
    const [descriptionFr, setDescriptionFr] = useState(produit.description.fr);
    const [descriptionEn, setDescriptionEn] = useState(produit.description.en);

    useEffect(() => {
        const index = produitId - 1;
        setDescriptionFr(categories[index].description.fr);
        setDescriptionEn(categories[index].description.en);

        const newData = data;

        newData[formIndex - 1].id = produitId;
        newData[formIndex - 1].fr = categories[index].description.fr;
        newData[formIndex - 1].en = categories[index].description.en;

        setData(newData);
    }, [produitId]);

    useEffect(() => {
        const newData = data;
        newData[formIndex - 1].fr = descriptionFr;
        setData(newData);
    }, [descriptionFr]);

    useEffect(() => {
        const newData = data;
        newData[formIndex - 1].en = descriptionEn;
        setData(newData);
    }, [descriptionEn]);

    return (
        <>
            <div key={produitId} className='mt-5 border-b border-[#FFD8AD] py-2 justify-between text-start gap-10 md:flex md:w-auto'>
                {editable ?
                    <div className='flex flex-col w-full p-3'>
                        <label htmlFor={produitId + "fr"} className='text-start text-gray-300'>Catégorie</label>
                        <select className='max-w-60' name="categorie" id="categorie" value={produitId} onChange={(e) => setProduitId(e.target.value)}>
                            {categories.map(cat =>
                            (cat.id > 2 ?
                                <option value={cat.id}>{cat.nom}</option>
                                : null))}
                        </select>

                        <label htmlFor={produitId + "fr"} className='text-start text-gray-300 mt-2'>Français</label>
                        <textarea rows={1} name={produitId + "fr"} id={produitId + "fr"} value={descriptionFr}
                            onChange={(e) => { setDescriptionFr(e.target.value) }}></textarea>

                        <label htmlFor={produitId + "en"} className='text-start text-gray-300 mt-2'>Anglais</label>
                        <textarea rows={1} name={produitId + "en"} id={produitId + "en"} value={descriptionEn}
                            onChange={(e) => { setDescriptionEn(e.target.value) }}></textarea>
                    </div>
                    :
                    <p className='text-white md:text-lg'>{i18n.language == 'fr' ? produit.description.fr : produit.description.en}</p>
                }

                {editable || !afficherMenu ?
                    null
                    :
                    <MenuFormats
                        produitId={produitId}
                        formats={produit.formats}
                        putPanier={putPanier}
                    />
                }
            </div>
        </>
    )
}
