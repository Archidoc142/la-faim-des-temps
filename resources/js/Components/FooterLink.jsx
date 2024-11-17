import { Link, usePage } from "@inertiajs/react"
import { useTranslation } from 'react-i18next';

export default function FooterLink({ title }) {

    const url = usePage().url;
    const [t, i18n] = useTranslation("global");

    return (
        <div className="mb-2 lg:text-left 2xl:text-center 2xl:mb-6 hidden lg:block">
            <h2 className='text-white stoke'>{title}</h2>
            <p><Link className={`${url === '/' ? 'text-white font-bold' : 'hover:text-gray-100 text-[#D6D6D6]'}`} href='/'>{t("Header.accueil")}</Link></p>
            <p><Link className={`${url === '/menu' ? 'text-white font-bold' : 'hover:text-gray-100 text-[#D6D6D6]'}`} href='/menu'>{t("Header.menu")}</Link></p>
            <p><Link className={`${url === '/valeurs' ? 'text-white font-bold' : 'text-[#D6D6D6]'}`} href='/valeurs'>{t("Header.valeurs")}</Link></p>
            <p><Link className={`${url === '/producteurs' ? 'text-white font-bold' : 'hover:text-gray-100 text-[#D6D6D6]'}`} href='/producteurs'>{t("Header.producteurs")}</Link></p>
            <p><Link className={`${url === '/histoire' ? 'text-white font-bold' : 'hover:text-gray-100 text-[#D6D6D6]'}`} href='/histoire'>{t("Header.histoire")}</Link></p>
            <p><Link className={`${url === '/avis' ? 'text-white font-bold' : 'hover:text-gray-100 text-[#D6D6D6]'}`} href='/avis'>{t("Header.avis")}</Link></p>
        </div>
    )
}
