import { Link, usePage } from '@inertiajs/react'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next'
import { useEffect, useState, useRef } from 'react';
import Dropdown from '@/Components/Dropdown';

import logo from '../../../public/img/logo-rect.jpg'

export default function Header() {

    const [t, i18n] = useTranslation("global");
    const url = usePage().url;
    const user = usePage().props.auth.user;

    const out = useRef(null);
    useOutside(out);

    const [message, setMessage] = useState()
    const noRedLabelURL = ['/avis', '/admin']

    const dateToShow = new Date(usePage().props.dateToShow) // Date d' handleInertiaRequest
    const canCommand = usePage().props.canCommand

    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const tempDate = dateToShow.toLocaleDateString('fr-FR', options) + ' à 16:00';
    const [date, setDate] = useState(tempDate)

    useEffect(() => {
        if (canCommand){
            // Peut commander
            setMessage(t("Header.date"))

            if (i18n.language === 'fr') {
                setDate(dateToShow.toLocaleDateString('fr-FR', options) + ' à 16:00')
            } else {
                setDate(dateToShow.toLocaleDateString('en-EN', options) + ' at 16:00')
            }
        } else {
            // Ne peut pas commander
            setMessage(t("Header.nextMenu"))

            if (i18n.language === 'fr') {
                setDate(dateToShow.toLocaleDateString('fr-FR', options) + ' à 12:00')
            } else {
                setDate(dateToShow.toLocaleDateString('en-EN', options) + ' at 12:00')
            }
        }
    }, [i18n.language])

    const handleChangeLanguage = (e) => {
        i18next.changeLanguage(e.target.value)
        document.cookie = "lng=" + i18n.language + "; max-age=31536000";
    }

    const toggleMenu = () => {
        document.getElementById('menu').classList.toggle('hidden');
    }

    const handleClosure = () => {
        document.getElementById('menu').classList.add('hidden');
    }

    const [menuUser, setMenuUser] = useState(false)
    const toggleMenuUser = () => {
        setMenuUser(!menuUser)
        handleClosure()
    }

    function useOutside(ref) {
        useEffect(() => {
            function handleClickOutside(e) {
                if (out.current && !out.current.contains(e.target)) {
                    setMenuUser(false)
                }
            }

            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [out])
    };

    return (
        <header className='border-b border-[#9b9b9b] sticky top-0 z-30'>
            <div className='flex bg-white'>
                <a href="/" className='content-center'><img className='hidden lg:block w-auto self-center max-h-[80px] lg:max-h-[70px]' src={logo} alt="logo-rect-img" /></a>

                <div className='flex py-10 items-center flex-nowrap justify-between w-full max-h-[80px] lg:max-h-[70px] bg-[#041a37] pl-6 xl:pl-8'>
                    {/* Menu*/}
                    <button onClick={toggleMenu} className='lg:hidden'>
                        <svg className='mx-4' width="34" height="34" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2">
                            <path d="M3 6 H21 M3 12 H21 M3 18 H21" />
                        </svg>
                    </button>

                    <div className='hidden lg:flex'>
                        <div className='text-[#b7b6a9] flex gap-8 xl:gap-12 items-center'>
                            <Link className={`text-xs xl:text-base ${url === '/' ? 'text-white' : false}`} href='/'><strong>{t("Header.accueil")}</strong></Link>
                            <Link className={`text-xs xl:text-base ${url === '/menu' ? 'text-white' : false}`} href='/menu'><strong>{t("Header.menu")}</strong></Link>
                            <Link className={`text-xs xl:text-base ${url === '/valeurs' ? 'text-white' : false}`} href='/valeurs'><strong>{t("Header.valeurs")}</strong></Link>
                            <Link className={`text-xs xl:text-base ${url === '/producteurs' ? 'text-white' : false}`} href='/producteurs'><strong>{t("Header.producteurs")}</strong></Link>
                            <Link className={`text-xs xl:text-base ${url === '/histoire' ? 'text-white' : false}`} href='/histoire'><strong>{t("Header.histoire")}</strong></Link>
                            {user ? user.data.role !== "admin" ? <Link className={`text-xs xl:text-base ${url === '/avis' ? 'text-white' : false}`} href='/avis'><strong>{t("Header.avis")}</strong></Link> : null : null}
                        </div>
                    </div>


                    <div className='flex items-center justify-evenly gap-1'>
                        {/* User*/}
                        {user ?
                            <div
                                className='items-center flex gap-4 relative cursor-pointer group'
                                onClick={toggleMenuUser}
                            >
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={user ? user.data.role === "admin" ? "#BB285C" : "#75A9F9" : "#929292"} strokeWidth="2" id="iconUser">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>

                                <p className='text-white hidden sm:block text-xs xl:text-base font-bold group-hover:text-gray-300 relative ease-in-out before:transition-[width] before:ease-in-out before:duration-200 before:absolute before:bg-white before:origin-center before:h-[2px] before:w-0 group-hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-200 after:absolute after:bg-white after:origin-center after:h-[2px] after:w-0 group-hover:after:w-[50%] after:bottom-0 after:right-[50%]'>
                                    {user ?
                                        user.data.role === "admin" ? "Admin" : user.data.prenom :
                                        t("Header.connexion")}
                                </p>

                                {menuUser ? <div ref={out} className='z-30 absolute bg-[#d4dbe8] text-white text-center top-10 w-[150px] rounded-lg shadow-xl'>
                                    <Dropdown.Link href={user.data.role == "admin" ? route('admin.accueil') : route('profile.edit')} className='font-semibold rounded-t-lg'>{user.data.role == "admin" ? "Admin" : t("Header.compte")}</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} className='font-semibold rounded-b-lg' method="post" as="button">{t("Header.logout")}</Dropdown.Link>
                                </div> : null}
                            </div> :

                            <Link href='/login' className='items-center flex gap-4'>
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={user ? user.data.role === "admin" ? "#BB285C" : "#75A9F9" : "#929292"} strokeWidth="2" id="iconUser">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>

                                <p className='text-white hidden sm:block text-xs xl:text-base font-bold'>{t("Header.connexion")}</p>
                            </Link>}

                        {/* Panier*/}
                        <Link href='/panier' onClick={handleClosure}>
                            <svg className='ml-8 ' width="28" height="28" viewBox="0 0 24 24" fill='transparent' stroke="#fff" strokeWidth="2">
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


            <div id='menu' className='lg:hidden hidden text-center text-lg absolute z-20'>
                <Link onClick={handleClosure} className={`block hover:bg-[#dfdfdf] w-screen py-4 border-y-2 border-[#dfdfdf] ${url === '/' ? 'bg-[#dfdfdf]' : 'bg-[#fff]'}`} href='/'>{t("Header.accueil")}</Link>
                <Link onClick={handleClosure} className={`block hover:bg-[#dfdfdf] py-4 border-b-2 border-[#dfdfdf] ${url === '/menu' ? 'bg-[#dfdfdf]' : 'bg-[#fff]'}`} href='/menu'>{t("Header.menu")}</Link>
                <Link onClick={handleClosure} className={`block hover:bg-[#dfdfdf] py-4 border-b-2 border-[#dfdfdf] ${url === '/valeurs' ? 'bg-[#dfdfdf]' : 'bg-[#fff]'}`} href='/valeurs'>{t("Header.valeurs")}</Link>
                <Link onClick={handleClosure} className={`block hover:bg-[#dfdfdf] py-4 border-b-2 border-[#dfdfdf] ${url === '/producteurs' ? 'bg-[#dfdfdf]' : 'bg-[#fff]'}`} href='/producteurs'>{t("Header.producteurs")}</Link>
                <Link onClick={handleClosure} className={`block hover:bg-[#dfdfdf] py-4 border-b-2 border-[#dfdfdf] ${url === '/histoire' ? 'bg-[#dfdfdf]' : 'bg-[#fff]'}`} href='/histoire'>{t("Header.histoire")}</Link>
                {user ? user.data.role !== "admin" ? <Link onClick={handleClosure} className={`block hover:bg-[#dfdfdf] py-4 border-b-2 border-[#dfdfdf] ${url === '/avis' ? 'bg-[#dfdfdf]' : 'bg-[#fff]'}`} href='/avis'>{t("Header.avis")}</Link> : null : null}
            </div>

            {/* flash*/}
            {!noRedLabelURL.some(str => url.startsWith(str)) ?
                <div className='py-3 text-sm text-white bg-[#BB285C] text-center'>
                    <p><strong>{message}</strong> <span className='block sm:inline'>{date.toUpperCase()}</span></p>
                </div> : ""
            }
        </header>
    );
}
