import TitleSection from '@/Components/TitleSection';
import { Link, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import AccueilImg from '@/Components/AccueilImg';
import HeadWithImage from '@/Components/HeadWithImage';

import ferme from '../../../public/img/ferme.jpg'
import assiette from '../../../public/img/assiette.jpg'

export default function Accueil() {

    const [t, i18n] = useTranslation("global");

    return (
        <>
            <Head title="Accueil" />
{/* this dont work */}
            <HeadWithImage
                imgFile="/img/accueil.jpg"
                title="Votre option traiteur et plats cuisinés au Centro "
                button={true}
                buttonText="Menu de la semaine"
                path="/menu"
            />
            {/* This works
             <div className='flex h-[37rem] lg:h-[48rem] bg-[url("../../../img/accueil.jpg")] bg-cover'>
                <div className='bg-white py-16 bg-opacity-75 my-auto w-full lg:py-10'>
                    <h1 className='w-80 m-auto font-serif text-[#04203f] leading-tight text-center text-5xl lg:w-[42rem]'>Votre option traiteur et plats cuisinés au Centro</h1>
                    <div className='flex justify-center'>
                        <Link href="/menu">
                            <button className='mt-8 lg:mt-6 uppercase bg-[#7A163C] text-white font-bold text-lg lg:text-base px-8 py-2 rounded-sm shadow-md hover:shadow-lg'>Menu de la semaine</button>
                        </Link>
                    </div>
                </div>
            </div> */}


            <div className='bg-[#04203f] py-12 px-8'>
                <h2 className='font-serif text-white text-center text-4xl font-medium mb-8 px-4 h-'>
                    Une cuisine de style bistro
                </h2>
                <p className='font-serif text-white text-center text-xl'>
                    Ayant fait son apprentissage en cuisine française, mais sans jamais renier ses profondes inspirations américaines, notre chef crée des menus inspirés par les saisons et les produits locaux disponibles. Savourez nos mets préparés pour emporter en profitant de notre bistro pour le dîner. Une fois le travail fini, passez compléter votre épicerie avec notre gamme de produits entièrement québécoise afin de n'avoir à vous soucier que de savourer l'apéro.
                </p>
            </div>

            {/* Carrousel images */}

            <div className='lg:flex lg:h-[40rem]'>
                <TitleSection title="De la ferme..." color="bg-lime-600" />
                <AccueilImg src={ferme} alt="De la ferme..." />
            </div>

            <div className='lg:flex flex-row-reverse lg:h-[40rem] '>
                <TitleSection title="...à l'assiette!" color="bg-rose-900" />
                <AccueilImg src={assiette} alt="...à l'assiette!" legend="Lorem ipsum" />
            </div>
        </>
    );
}
