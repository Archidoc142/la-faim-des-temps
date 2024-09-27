import { useTranslation } from 'react-i18next';

export default function MenuBase({produitId, formatId, produit, formats, otherFormats, putPanier}) {

    const [t, i18n] = useTranslation("global");

    return (
        <>
            <div key={produit.id} className='border-2 border-[#EBEBEB] rounded-2xl p-5 justify-center text-center md:w-auto'>
                <h3 className='text-2xl text-[#FFD8AD] font-semibold pb-2 imperial'>{formats.map(f => (f.id_format == produit.id_produit ? f.nom : ""))} - {otherFormats.map(f => (f.id == produit.id_produit ? Math.trunc(f.montant) : ""))}$</h3>
                <p className='text-white text-lg pb-2'>{produit.description}</p>
                <button
                    onClick={() => putPanier(formatId, produitId)}
                    className="inline-block w-fit mt-3 p-2 text-xs text-white font-semibold border-2 border-[#BB285C] bg-[#BB285C] hover:bg-transparent hover:text-[#BB285C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 justify-self-center"
                >
                    {t("Menu.add-panier")}
                </button>
            </div>
        </>
    )
}
