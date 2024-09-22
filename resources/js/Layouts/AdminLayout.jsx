import Header from '../Components/Header'
import Footer from '../Components/Footer'
import DefaultLayout from './DefaultLayout'
import Menu from "../Components/Admin/Menu"
import { Link, Head } from '@inertiajs/react'
import back from '../../../public/icons/back.png'

export default function AdminLayout({ children, title, clientPage }) {
    return(
        <>
            <Head title={title}/>

            <div className='bg-[#7A163C] h-14 flex items-center justify-center border-none'>
                <h1 className='text-white font-bold text-center text-2xl'>Menu administrateur</h1>
            </div>

            <div className='flex w-full'>
                <Menu/>
                <div className='flex-grow p-8 bg-white'>
                    <div className='flex w-full'>
                        { clientPage ?
                            <a href="#" onClick={() => history.back()} className='mr-6'>
                                <img src={back} alt="Précédent" width={48} />
                            </a> :
                        ""}
                        <h1 className="text-4xl font-bold mb-8">{title}</h1>
                    </div>

                    {children}
                </div>
            </div>
        </>
    )
}
