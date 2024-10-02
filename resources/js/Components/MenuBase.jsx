import { useTranslation } from 'react-i18next';

export default function MenuBase({ produit, putPanier }) {

    const [t, i18n] = useTranslation("global");

    return (
        <>

            <div key={produit.id} className='border-2 border-[#EBEBEB] rounded-2xl p-7 justify-center text-center md:w-auto'>
                    <h3 className='justify-center text-[#FFD8AD] pb-4 imperial text-5xl flex flex-nowrap lg:text-6xl'>{i18n.language == 'fr' ? produit.formats[0].nom.fr : produit.formats[0].nom.en}<span className='self-center text-4xl pl-3'>- {i18n.language == 'fr' ? Math.trunc(produit.formats[0].montant) + "$" : "$" + Math.trunc(produit.formats[0].montant)}</span></h3>
                <p className='text-white text-lg pb-3'>{i18n.language == 'fr' ? produit.description.fr : produit.description.en}</p>

                <button
                    onClick={() => putPanier(produit.formats[0].id, produit.id)}
                    className="inline-block min-w-40 mt-3 p-1.5 text-sm text-white font-semibold border border-[#BB285C] bg-[#BB285C] hover:border-white hover:cursor-pointer justify-self-center"
                >
                    {t("Menu.add-panier")}
                </button>
            </div>
        </>
    )
}
