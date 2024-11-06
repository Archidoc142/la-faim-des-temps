import Header from '../Components/Header'
import Footer from '../Components/Footer'
import DefaultLayout from './DefaultLayout'
import Menu from "../Components/Admin/Menu"
import { Link, Head } from '@inertiajs/react'
import back from '../../../public/icons/back.png'
import { useState } from 'react'

export default function AdminLayout({ children, title, clientPage, commandePage, prevPage }) {

    const [menuVisible, setMenuVisible] = useState(true);

    return(
        <>
            <Head title={title}/>

            <div className='bg-[#7A163C] h-14 flex items-center justify-center border-none relative'>
                <button onClick={() => setMenuVisible(!menuVisible)} className='absolute left-0'>
                    <svg className='mx-4' width="34" height="34" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2">
                        <path d="M3 6 H21 M3 12 H21 M3 18 H21"/>
                    </svg>
                </button>
                <h1 className='text-white font-bold text-center text-2xl'>Menu administrateur</h1>
            </div>

            <div className='flex w-full min-h-screen'>
                { menuVisible ? <Menu/> : null }
                <div className='flex-grow p-8 bg-white'>
                    <div className='flex w-full'>
                        { clientPage ?
                            <Link href={"/admin/clients?page=" + prevPage } className='mr-6'>
                                <img src={back} alt="Précédent" width={48} />
                            </Link> : null
                        }

                        { commandePage ?
                            <Link href={"/admin/commandes"} className='mr-6'>
                                <img src={back} alt="Précédent" width={48} />
                            </Link> : null
                        }
                        <h1 className="text-4xl font-bold mb-8">{title}</h1>
                    </div>

                    {children}
                </div>
            </div>
        </>
    )
}
