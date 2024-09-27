import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function PanierItem({produit, format, quantity}) {

    const [t, i18n] = useTranslation("global");
    const [qte, setQte] = useState(quantity)

    return(
        <div className='border-b-[1px] border-gray-500 mb-4'>
            <div className="flex justify-between text-white lg:font-bold mb-2">
                <p className='lg:text-xl'>{produit.id_produit < 3 ? format.nom : produit.description}</p>
                <p>{format.montant * qte}$</p>
            </div>
            <div className="flex justify-between mb-2">
                <select></select>
            </div>
        </div>
    )
}
