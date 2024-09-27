import Header from '../Components/Header'
import Footer from '../Components/Footer'

export default function DefaultLayout({ children }) {
    return(
        <>
            <Header/>

            <main className='min-h-[650px] 2xl:min-h-[730px]'>{children}</main>

            <Footer/>
        </>
    )
}
