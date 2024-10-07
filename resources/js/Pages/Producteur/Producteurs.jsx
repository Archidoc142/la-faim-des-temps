import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import Title from "./InfoText/Title";
import Text from "./InfoText/Text";
import PaginationBar from '@/Components/PaginationBar';
import HeadWithImage from '@/Components/HeadWithImage';

export default function Producteur( { producteurs }) {
    const imgFile = '/img/';
    return (
        <>
        <div className='Producteur'>
            <Head title="Nos Producteurs" />

            <HeadWithImage
                imgFile="/img/producteurBack.jpg"
                title="Nos Producteurs"
                button={false}
                buttonText="none"
                path="/"
            />

            {producteurs.data.map(producteur => (
                <div key={producteur.id}>
                    <div
                        className={`${producteur.id % 2 === 0 ? 'bg-[#7A163C80]' : ''} my-5 rounded-lg m-3 py-4 lg:m-8`}
                    >
                        <div className='lg:grid lg:grid-cols-2 lg:p-4'>
                            <img
                                className={`${producteur.id % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} mx-auto px-10 py-2 order-1 lg:row-span-4 lg:pl-6 lg:w-5/6`} 
                                src={producteur.image.nom_fichier !== '' ? imgFile + producteur.image.nom_fichier : imgFile + 'logo-big.jpg'}   //Si il y à un nom de fichier qui à été spécifié pour le producteur alors on affiche l'image liée, sinon on affiche le logo comme "image par défaut"
                                alt={producteur.nom}
                            />

                            <div className={`${producteur.id % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                                <Title url = {producteur.url} nom = {producteur.nom}/>

                                <Text description = 'faire table dans BD' adresse = {producteur.adresse}/>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
            ))}
            <PaginationBar links={producteurs.links}/>
        </div>
        </>
    )
}