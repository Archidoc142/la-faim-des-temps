import { Link, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Item from '../item'

export default function Panier() {

    const [t, i18n] = useTranslation("global");
    let panier = JSON.parse(localStorage.getItem("panier"));
    /*panier.push(new Item("kiwi", 999, "Individuel"));
    panier.push(new Item("Poutine", 1, "Individuel"));
    localStorage.removeItem("panier");
    localStorage.setItem("panier", JSON.stringify(panier))
    console.log(panier)*/

    /*panier.push({"kiwi" : "kiwi"});
    alert(panier[0].kiwi)*/

    return (
        <div className='py-8 px-12 min-h-[650px] 2xl:min-h-[730px]'>
            <Head title="Panier"/>

            <h2 className='text-white text-2xl font-bold border-b-[1px] border-b-white pb-2 mb-8'>Mon panier</h2>

            {panier.length > 0 ?
                <>
                </>

                : <p className='text-[#929292] font-bold text-xl'>Vide</p>
            }
        </div>
    );
}
