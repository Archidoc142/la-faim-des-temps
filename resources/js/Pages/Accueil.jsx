import { Link, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Accueil() {

    const [t, i18n] = useTranslation("global");

    return (
        <>
            <Head title="Accueil"/>
            <div className=''>
                <div>
                    <div className='bg-white h-96 py-16'>
                        <div className='w-80 m-auto'>
                            <h1 className='font-serif text-[#04203f] text-center text-5xl'>Votre option traiteur et plats cuisinés au Centro</h1>
                        </div>
                        <Link href="/menu">
                            <button className='block m-auto mt-7 uppercase bg-[#7A163C] text-white font-bold text-lg px-8 py-2 rounded-sm '>Menu de la semaine</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
