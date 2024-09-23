import { Link, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import Title from "./InfoText/Title";
import Text from "./InfoText/Text";

export default function Producteur( { producteurs }) {
    const imgFile = '/img/';
    return (
        <>
        <div className='Producteur bg-[#04203f]'>
            <Head title="Nos Producteurs" />

            <h1>Nos Producteurs</h1>

            {producteurs.map(producteur => (
                <div key={producteur.id}>
                    <div
                        className={`${producteur.id % 2 === 0 ? 'bg-[#7A163C80]' : ''} my-5 rounded-lg m-3 py-4 sm:m-8`}
                    >
                        <div className='sm:grid sm:grid-cols-2 sm:p-4'>
                            <img
                                className={`${producteur.id % 2 === 0 ? 'sm:order-2' : 'sm:order-1'} mx-auto px-10 py-2 order-1 sm:row-span-4 sm:pl-6`} 
                                src={producteur.image.nom_fichier !== '' ? imgFile + producteur.image.nom_fichier : imgFile + 'logo-big.jpg'}   //Si il y à un nom de fichier qui à été spécifié pour le producteur alors on affiche l'image liée, sinon on affiche le logo comme "image par défaut"
                                alt={producteur.nom}
                            />

                            <div className={`${producteur.id % 2 === 0 ? 'sm:order-1' : 'sm:order-2'}`}>
                                <Title url = {producteur.url} nom = {producteur.nom}/>

                                <Text description = 'faire table dans BD' adresse = {producteur.adresse}/>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
            ))}
        </div>
        </>
    )
}