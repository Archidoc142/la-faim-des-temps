import { Link, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Panier() {

    const [t, i18n] = useTranslation("global");

    return (
        <div className='Panier'>
            <Head title="Panier" />
        </div>
    );
}
