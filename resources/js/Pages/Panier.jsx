import { Link, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import Item from '../item'
import PanierItem from '@/Components/PanierItem';

export default function Panier({produits, formats}) {
    console.log(produits)
    console.log(formats)

    const [t, i18n] = useTranslation("global");
    let panier = JSON.parse(localStorage.getItem("panier"));

    return (
        <div className='py-8 px-12'>
            <Head title="Panier"/>

            <h2 className='text-white text-2xl font-bold border-b-[1px] border-b-white pb-2 mb-8'>Mon panier</h2>

            {panier.length > 0 ?
                <>
                    {panier.map((item, i) => {
                        const p = produits.data.find((p) => p.id_produit == item['produitId'])
                        const f = formats.data.find((f) => f.id_format == item['formatId'])

                        return <PanierItem key={i} produit={p} format={f} quantity={item['qte']} />
                    })}
                </>

                : <p className='text-[#929292] font-bold text-xl'>{t("Panier.vide")}</p>
            }
        </div>
    );
}
