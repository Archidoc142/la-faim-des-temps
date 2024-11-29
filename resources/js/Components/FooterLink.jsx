import { Link, usePage } from "@inertiajs/react"
import { useTranslation } from 'react-i18next';

export default function FooterLink({ title }) {

    const url = usePage().url;
    const [t, i18n] = useTranslation("global");
    const user = usePage().props.auth.user;

    return (
        <div className="mb-3 lg:text-left text-center 2xl:mb-6 hidden lg:block">
            <h2 className='text-white stoke mb-1'>{title}</h2>
            <p><Link className={`${url === '/' ? 'text-white font-bold' : 'text-[#D6D6D6] hover:text-gray-100 border-0 hover:border-b-2 border-[#BB285C]'}`} href='/'>{t("Header.accueil")}</Link></p>
            <p><Link className={`${url.includes('/menu') ? 'text-white font-bold' : 'text-[#D6D6D6] hover:text-gray-100 border-0 hover:border-b-2 border-[#BB285C]'}`} href='/menu'>{t("Header.menu")}</Link></p>
            <p><Link className={`${url.includes('/valeurs') ? 'text-white font-bold' : 'text-[#D6D6D6] hover:text-gray-100 border-0 hover:border-b-2 border-[#BB285C]'}`} href='/valeurs'>{t("Header.valeurs")}</Link></p>
            <p><Link className={`${url.includes('/producteurs') ? 'text-white font-bold' : 'text-[#D6D6D6] hover:text-gray-100 border-0 hover:border-b-2 border-[#BB285C]'}`} href='/producteurs'>{t("Header.producteurs")}</Link></p>
            <p><Link className={`${url.includes('/histoire') ? 'text-white font-bold' : 'text-[#D6D6D6] hover:text-gray-100 border-0 hover:border-b-2 border-[#BB285C]'}`} href='/histoire'>{t("Header.histoire")}</Link></p>
            {user ? user.data.role !== "admin" ? <p><Link className={`${url.includes('/avis') ? 'text-white font-bold' : 'text-[#D6D6D6] hover:text-gray-100 border-0 hover:border-b-2 border-[#BB285C]'}`} href='/avis'>{t("Header.avis")}</Link></p> : null : null}
            <p><Link className='text-[#D6D6D6] hover:text-gray-100 border-0 hover:border-b-2 border-[#BB285C]' href='/confidentialite'>{t("Privacy.privacy")}</Link></p>
        </div>
    )
}
