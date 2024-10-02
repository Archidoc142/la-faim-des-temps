import { useTranslation } from 'react-i18next';

export default function MenuBase({ produit, putPanier }) {

    const [t, i18n] = useTranslation("global");

    return (
        <>

            <div key={produit.id} className='border-2 border-[#EBEBEB] rounded-2xl p-7 justify-center text-center md:w-auto'>
                <div className='flex align-middle justify-center pb-5 '>
                    <h3 className='text-[#FFD8AD] pr-4 imperial text-5xl lg:text-6xl'>{i18n.language == 'fr' ? produit.formats[0].nom.fr : produit.formats[0].nom.en}</h3>
                    <p className='text-[#FFD8AD] italic text-xl lg:text-2xl'>{i18n.language == 'fr' ? Math.trunc(produit.formats[0].montant) + "$" : "$" + Math.trunc(produit.formats[0].montant)}</p>
                </div>
                <p className='text-white text-lg pb-3'>{i18n.language == 'fr' ? produit.description.fr : produit.description.en}</p>

                <button
                    onClick={() => putPanier(produit.formats[0].id, produit.id)}
                    className="inline-block min-w-40 mt-3 p-1.5 text-sm text-white font-semibold border border-[#BB285C] bg-[#BB285C] hover:border-white hover:cursor-pointer justify-self-center"
                >
                    {t("Menu.add-panier")}
                </button>
            </div>
            {/* <div key={produit.id} className='border-2 border-[#EBEBEB] rounded-2xl p-7 justify-center text-center md:w-auto'>
                <h3 className='text-[#FFD8AD] pb-5 imperial text-4xl lg:text-5xl'>{formats.map(f => (f.id_format == produit.id_produit ? f.nom : ""))} - {otherFormats.map(f => (f.id == produit.id_produit ? Math.trunc(f.montant) : ""))}$</h3>
                <p className='text-white text-lg pb-3'>{produit.description}</p>
                <button
                    onClick={() => putPanier(formatId, produitId)}
                    className="inline-block w-fit mt-3 p-2 text-xs text-white font-semibold border-2 border-[#BB285C] bg-[#BB285C] hover:bg-transparent hover:text-[#BB285C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 justify-self-center"
                >
                    {t("Menu.add-panier")}
                </button>
            </div>*/}
        </>
    )
}
