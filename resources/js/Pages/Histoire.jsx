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

            <div className="h-[40vh] bg-cover flex flex-col justify-center" style={{ backgroundImage: `url('${headImage}')` }}>
                <div className='bg-white bg-opacity-75'>
                    <h1 className='font-serif text-[#04203f] text-center text-4xl h-16 flex items-center justify-center'>{t("Histoire.histoire")}</h1>
                </div>
            </div>

            <div className="block md:flex md:mx-6">
                <div className="block md:flex items-center md:max-w-[450px]">
                    <img
                        src={logo}
                        alt="logoLFDT"
                        className="w-[40%] md:w-full mx-auto my-6"
                    />
                </div>

                <div className="md:py-8 lg:w-full lg:mx-8 xl:32">
                    <h2 className='font-serif text-[#04203f] text-center text-3xl md:text-4xl font-bold'>{t("Histoire.aventure")}</h2>
                    <div className="text-center">
                        <p className="px-8 py-4 text-justify text-sm lg:text-base xl:text-lg">
                            {t("Histoire.desc1")}<br /><br />
                            {t("Histoire.desc2")}<br /><br />
                            {t("Histoire.desc3")}
                        </p>
                    </div>
                </div>
            </div>

            <p className="px-8 py-4 text-center text-[12px] md:text-[14px] lg:text-base xl:text-lg text-white bg-[#061f3d] font-bold italic lg:my-8">"{t("Histoire.desc4")}"</p>

            <div className="xl:px-12 xl:py-6">
                <div className="md:hidden">
                    <img
                        src={yannick}
                        alt="yannick-img"
                        className="w-[60%] max-w-[300px] mx-auto my-6"
                    />
                </div>

                <div className="md:flex">
                    <div className="md:mt-8">
                        <h2 className='font-serif text-[#04203f] text-center md:text-left md:pl-8 text-3xl md:text-4xl font-bold'>Yannick Pellerin</h2>
                        <p className="px-8 md:pl-8 md:w-[90%] pt-4 text-justify text-sm lg:text-base xl:text-lg">
                            {t("Histoire.desc5")}<br /><br />
                        </p>
                        <p className="px-8 pb-8 text-justify text-sm lg:text-base xl:text-lg">{t("Histoire.desc6")}</p>
                    </div>

                    <div className="hidden md:block md:mr-8">
                        <img
                            src={yannick}
                            alt="yannick-img"
                            className="mx-auto my-6 max-w-[300px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
