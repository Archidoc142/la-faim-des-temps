import { Link, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Accueil() {

    const [t, i18n] = useTranslation("global");

    return (
        <div className='Accueil bg-blue-500'>
            <Head title="Accueil" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam consequuntur ab dolorum consequatur repellat odit aspernatur laborum beatae fuga corrupti voluptatibus, esse, deleniti, delectus quam hic doloremque eaque qui consectetur!</p>
        </div>
    );
}
