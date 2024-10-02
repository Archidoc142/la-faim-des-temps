import { useTranslation } from 'react-i18next';
import MenuFormats from '@/Components/MenuFormats';

export default function MenuPrinc({ produit, putPanier, editable, setData, categories, data }) {

    const [t, i18n] = useTranslation("global");
    //const formattrim = formats.filter(format => format.id_format > 2);
    console.log(data)
    return (
        <>
            <div key={produit.id} className='mt-5 border-b border-[#FFD8AD] py-2 justify-between text-start gap-10 md:flex md:w-auto'>
                {editable ?
                    <div className='flex flex-col w-full p-3'>
                        <label htmlFor={produit.id + "fr"} className='text-start text-gray-300'>Français</label>
                        <input id={produit.id + "fr"} type="text" name={produit.id + "fr"} defaultValue={produit.description.fr} onChange={(e) => {
                            let newData = data;
                            const id = produit.id;
                            if(newData[id] == null)
                                newData[id] = {}

                            newData[id].fr = e.target.value;
                            setData(newData);
                        }} />


                        <label htmlFor={produit.id + "fr"} className='text-start text-gray-300 mt-2'>Anglais</label>
                        <input id={produit.id + "fr"} type="text" name={produit.id + "en"} defaultValue={produit.description.en} onChange={(e) => {
                            let newData = data;
                            const id = produit.id;
                            if(newData[id] == null)
                                newData[id] = {}

                            newData[id].en = e.target.value;
                            setData(newData);
                        }} />

                        <label htmlFor={produit.id + "fr"} className='text-start text-gray-300 mt-2'>Catégorie</label>
                        <select className='max-w-60' name="categorie" id="categorie">
                            {categories.map(cat =>
                            (cat.id > 2 ?
                                <option selected={cat.nom == produit.nom ? "selected" : null}>{cat.nom}</option>
                                : null))}
                        </select>
                    </div>
                    :
                    <p className='text-white text-lg'>{i18n.language == 'fr' ? produit.description.fr : produit.description.en}</p>
                }

                {editable ?
                    null
                    :
                    <MenuFormats
                        produitId={produit.id}
                        formats={produit.formats}
                        putPanier={putPanier}
                    />
                }
            </div>
        </>
    )
}
