import { useTranslation } from 'react-i18next';
import MenuFormats from '@/Components/MenuFormats';

export default function MenuBase({ produit, putPanier }) {

    const [t, i18n] = useTranslation("global");
    //const formattrim = formats.filter(format => format.id_format > 2);

    return (
        <>
            <div key={produit.id} className='mt-5 border-b border-[#FFD8AD] py-2 justify-between text-start gap-10 md:flex md:w-auto'>
                {/*console.log("mn",otherFormats)*/}

                <p className='text-white text-lg'>{i18n.language == 'fr' ? produit.description.fr : produit.description.en}</p>
                {<MenuFormats
                    produitId={produit.id}
                    formats={produit.formats}
                    putPanier={putPanier}
                />}
                {/*<button
                    onClick={() => putPanier(formatId, produitId)}
                    className="inline-block w-fit p-2 text-xs text-white font-semibold border-2 mt-4 md:mt-0 border-[#BB285C] bg-[#BB285C] hover:bg-transparent hover:text-[#BB285C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 justify-self-center"
                >
                    {t("Menu.add-panier")}
                </button>*/}
            </div>
        </>
    )
}
