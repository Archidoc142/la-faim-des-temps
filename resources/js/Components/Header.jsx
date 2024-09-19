import { Link, usePage } from '@inertiajs/react'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next'
import { useEffect, useState } from 'react';

import logo from '../../../public/img/logo-rect.jpg'

export default function Header() {

    const [t, i18n] = useTranslation("global");
    const url = usePage().url;
    const user = usePage().props.auth.user;

    let d = new Date();
    d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7);
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const tempDate = d.toLocaleDateString('fr-FR', options) + ' à 16:00';

    const [date, setDate] = useState(tempDate)

    useEffect(() => {
        if (i18n.language === 'fr') {
            setDate(d.toLocaleDateString('fr-FR', options) + ' à 16:00')
        } else {
            setDate(d.toLocaleDateString('en-EN', options) + ' at 16:00')
        }
    }, [i18n.language])

    const handleChangeLanguage = (e) => {
        i18next.changeLanguage(e.target.value)
        document.cookie = "lng=" + i18n.language + "; max-age=31536000";
    }

    const toggleMenu = () => {
        document.getElementById('menu').classList.toggle('hidden');
    }

    return (
        <header>
            <div className='flex'>
                <img className='hidden md:block w-auto max-h-[80px] lg:max-h-[70px] mx-2' src={logo} alt="logo-rect-img" />

                <div className='flex items-center flex-nowrap justify-between w-full max-h-[80px] lg:max-h-[70px] bg-[#041a37] pl-6 xl:pl-8'>
                    {/* Menu*/}
                    <button onClick={toggleMenu} className='sm:hidden'>
                        <svg className='mx-4' width="34" height="34" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2">
                          <path d="M3 6 H21 M3 12 H21 M3 18 H21"/>
                        </svg>
                    </button>

                    <div className='hidden sm:block flex'>
                        <div className='text-[#b7b6a9] flex gap-8 xl:gap-12 items-center'>
                            <Link className={`text-xs xl:text-base ${url === '/' ? 'text-white' : false}`} href='/'><strong>{t("Header.accueil")}</strong></Link>
                            <Link className={`text-xs xl:text-base ${url === '/menu' ? 'text-white' : false}`} href='/menu'><strong>{t("Header.menu")}</strong></Link>
                            <Link className={`text-xs xl:text-base ${url === 'valeurs/' ? 'text-white' : false}`} href='/valeurs'><strong>{t("Header.valeurs")}</strong></Link>
                            <Link className={`text-xs xl:text-base ${url === '/producteurs' ? 'text-white' : false}`} href='/producteurs'><strong>{t("Header.producteurs")}</strong></Link>
                            <Link className={`text-xs xl:text-base ${url === '/histoire' ? 'text-white' : false}`} href='/histoire'><strong>{t("Header.histoire")}</strong></Link>
                        </div>
                    </div>


                    <div className='flex items-center justify-evenly gap-1'>
                        {/* User*/}
                        <Link href='/compte' className='items-center flex gap-4'>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#929292" strokeWidth="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>

                            <p className='text-white hidden sm:block text-xs xl:text-base'><strong>{user ? user.name : t("Header.connexion")}</strong></p>
                        </Link>


                        {/* Panier*/}
                        <Link href='/panier'>
                            <svg className='ml-4' width="28" height="28" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2">
                              <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1
                                       M10 20.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0
                                       M18 20.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/>
                            </svg>
                        </Link>

                        {/* Langue*/}
                        <select className='m-4 bg-[#041a37] border-none text-white' onChange={(e) => handleChangeLanguage(e)} defaultValue={i18n.language}>
                            <option value="fr">FR</option>
                            <option value="en">EN</option>
                        </select>
                    </div>
                </div>
            </div>


            <div id='menu' className='sm:hidden hidden text-center text-lg absolute'>
                <Link className={`block hover:bg-[#dfdfdf] w-screen py-4 border-y-2 border-[#dfdfdf] ${url === '/' ? 'bg-[#dfdfdf]' : 'bg-[#fff]'}`} href='/'>{t("Header.accueil")}</Link>
                <Link className={`block hover:bg-[#dfdfdf] py-4 border-b-2 border-[#dfdfdf] ${url === '/menu' ? 'bg-[#dfdfdf]' : 'bg-[#fff]'}`} href='/menu'>{t("Header.menu")}</Link>
                <Link className={`block hover:bg-[#dfdfdf] py-4 border-b-2 border-[#dfdfdf] ${url === '/valeurs' ? 'bg-[#dfdfdf]' : 'bg-[#fff]'}`} href='/valeurs'>{t("Header.valeurs")}</Link>
                <Link className={`block hover:bg-[#dfdfdf] py-4 border-b-2 border-[#dfdfdf] ${url === '/producteurs' ? 'bg-[#dfdfdf]' : 'bg-[#fff]'}`} href='/producteurs'>{t("Header.producteurs")}</Link>
                <Link className={`block hover:bg-[#dfdfdf] py-4 border-b-2 border-[#dfdfdf] ${url === '/histoire' ? 'bg-[#dfdfdf]' : 'bg-[#fff]'}`} href='/histoire'>{t("Header.histoire")}</Link>
                <Link className={`block hover:bg-[#dfdfdf] py-4 border-b-2 border-[#dfdfdf] ${url === '/avis' ? 'bg-[#dfdfdf]' : 'bg-[#fff]'}`} href='/avis'>{t("Header.avis")}</Link>
            </div>

            {/* flash*/}
            <div className='py-4 text-sm text-white bg-[#BB285C] text-center'>
                <p><strong>{t("Header.date")}</strong> <span className='block sm:inline'>{date.toUpperCase()}</span></p>
            </div>
        </header>
    );
}
