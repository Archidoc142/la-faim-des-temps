import TitleSection from '@/Components/Accueil/TitleSection';
import { Link, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Accueil() {

    const [t, i18n] = useTranslation("global");

    return (
        <>
            <Head title="Accueil"/>
                <div className='h-[37rem] bg-[url("img/accueil.jpg")] relative'>
                    <div className='bg-white py-16 bg-opacity-75 my-auto absolute top-24 w-full'>
                        <h1 className='w-80 m-auto font-serif text-[#04203f] text-center text-5xl'>Votre option traiteur et plats cuisinés au Centro</h1>
                        <div className='flex justify-center'>
                            <Link href="/menu">
                                <button className='mt-8 uppercase bg-[#7A163C] text-white font-bold text-lg px-8 py-2 rounded-sm shadow-md hover:shadow-lg'>Menu de la semaine</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='bg-[#04203f] py-12 px-12'>
                    <h2 className='font-serif text-white text-center text-4xl font-medium mb-8 px-4'>
                        Une cuisine de style bistro
                    </h2>
                    <p className='font-serif text-white text-center text-lg'>
                        Ayant fait son apprentissage en cuisine française, mais sans jamais renier ses profondes inspirations américaines, notre chef crée des menus inspirés par les saisons et les produits locaux disponibles. Savourez nos mets préparés pour emporter en profitant de notre bistro pour le dîner. Une fois le travail fini, passez compléter votre épicerie avec notre gamme de produits entièrement québécoise afin de n'avoir à vous soucier que de savourer l'apéro.
                    </p>
                </div>
                {/* image plat avec légende */}
                <TitleSection title="De la ferme..." color="bg-lime-600"/>
                {/* image ferme */}
                <TitleSection title="...à l'assiette!" color="bg-rose-900"/>
                {/* image plat avec légende */}
        </>
    );
}
