import { Head } from "@inertiajs/react";
import headImage from '../../../public/img/story.jpg'
import logo from '../../../public/img/logo-big.jpg'
import yannick from '../../../public/img/yannick.jpg'
import { useTranslation } from "react-i18next";

export default function Histoire() {
    const [t, i18n] = useTranslation("global");

    return (
        <div className="bg-white min-h-screen">

            <Head title="Histoire" />

            <div className="flex bg-cover" style={{ backgroundImage: `url('${headImage}')` }}>
                <div className='bg-white py-2 my-14 bg-opacity-75 top-24 w-full lg:py-10'>
                    <h1 className='w-80 m-auto font-serif text-[#04203f] leading-tight text-center text-4xl lg:w-[42rem]'>{t("Histoire.histoire")}</h1>
                </div>
            </div>

            <img
                src={logo}
                alt="logoLFDT"
                className="w-[40%] mx-auto my-6"
            />

            <h2 className='font-serif text-[#04203f] text-center text-3xl font-bold'>{t("Histoire.aventure")}</h2>
            <p className="px-8 py-4 text-justify text-sm">
                {t("Histoire.desc1")}<br /><br />
                {t("Histoire.desc2")}<br /><br />
                {t("Histoire.desc3")}
            </p>

            <p className="px-4 py-4 text-center text-[12px] text-white bg-[#061f3d] font-bold">{t("Histoire.desc4")}</p>

            <img
                src={yannick}
                alt="logoLFDT"
                className="w-[60%] mx-auto my-6"
            />

            <h2 className='font-serif text-[#04203f] text-center text-3xl font-bold'>Yannick Pellerin</h2>
            <p className="px-8 pt-4 pb-8 text-justify text-sm">
                {t("Histoire.desc5")}<br /><br />
                {t("Histoire.desc6")}
            </p>
        </div>
    )
}
