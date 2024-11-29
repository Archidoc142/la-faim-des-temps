import Header from '../Components/Header'
import Footer from '../Components/Footer'
import CookieConsent from "react-cookie-consent";
import { useTranslation } from 'react-i18next';

export default function DefaultLayout({ children }) {

    const [t, i18n] = useTranslation("global");

    return(
        <>
            <Header/>

            <main className='min-h-[650px] 2xl:min-h-[730px]'>{children}</main>

            <Footer/>

            <CookieConsent
                location="bottom"
                buttonText={t("CookieConsent.accept")}
                enableDeclineButton
                declineButtonText={t("CookieConsent.decline")}
                cookieName="userConsent"
                style={{ background: "#2B373B" }}
                expires={30}
            >
                {t("CookieConsent.message")}
            </CookieConsent>
        </>
    )
}
