import { Link, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Compte() {

    const [t, i18n] = useTranslation("global");

    return (
        <div className='Compte'>
            <Head title="Compte" />
        </div>
    );
}
