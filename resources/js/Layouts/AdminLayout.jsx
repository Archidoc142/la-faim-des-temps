import Header from '../Components/Header'
import Footer from '../Components/Footer'
import DefaultLayout from './DefaultLayout'
import Menu from "../Components/Admin/Menu"
import { Link, Head } from '@inertiajs/react';

export default function AdminLayout({ children, title }) {
    return(
        <>
            <Head title={title}/>
            <div className='bg-[#7A163C] h-14 flex items-center justify-center'>
                <h1 className='text-white font-bold text-center text-2xl'>Menu administrateur</h1>
            </div>

            <div className='flex w-full'>
                <Menu/>
                <div className='flex-grow p-8'>
                    <h1 className="text-4xl font-bold mb-6">{title}</h1>
                    {children}
                </div>
            </div>
        </>
    )
}
