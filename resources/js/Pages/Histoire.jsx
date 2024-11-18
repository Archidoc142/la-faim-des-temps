import { Head } from "@inertiajs/react";
import logo from '../../../public/img/logo-big.jpg'
import yannick from '../../../public/img/yannick.jpg'
import HeadWithImage from '@/Components/HeadWithImage';
import { useTranslation } from "react-i18next";

export default function Histoire() {
    const [t, i18n] = useTranslation("global");

    return (
        <div className="bg-white min-h-screen">

            <Head title={t("Onglet.histoire")} />

            <HeadWithImage
                imgFile="/img/story.jpg"
                title={t("Histoire.histoire")}
                button={false}
                buttonText="none"
                path="/"
            />

            <div className="block md:flex max-w-[80%] m-auto items-center">
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
                        <p className="py-4 text-justify text-sm lg:text-base xl:text-lg">
                            {t("Histoire.desc1")}<br /><br />
                            {t("Histoire.desc2")}<br /><br />
                            {t("Histoire.desc3")}
                        </p>
                    </div>
                </div>
            </div>

            <p className="px-8 py-4 text-center text-[12px] md:text-[14px] lg:text-base xl:text-lg text-white bg-[#061f3d] font-bold italic lg:my-8"><span className="text-[#7A163C] text-4xl">"</span>{t("Histoire.desc4")}<span className="text-[#7A163C] text-4xl">"</span></p>

            <div className="xl:py-6 max-w-[80%] m-auto items-center">
                <div className="md:hidden">
                    <img
                        src={yannick}
                        alt="yannick-img"
                        className="w-[60%] max-w-[300px] mx-auto my-6"
                    />
                </div>

                <div className="lg:flex">
                    <div className="md:mt-8">
                        <h2 className='font-serif text-[#04203f] text-center md:text-left md:pl-8 text-3xl md:text-4xl font-bold'>Yannick Pellerin</h2>
                        <p className="md:pl-8 md:pr-8 pt-4 text-justify text-sm lg:text-base xl:text-lg">
                            {t("Histoire.desc5")}<br /><br />
                        </p>
                        <p className="md:px-8 pb-8 text-justify text-sm lg:text-base xl:text-lg">{t("Histoire.desc6")}</p>
                    </div>

                    <div className="hidden md:block md:ml-10 md:mr-8">
                        <img
                            src={yannick}
                            alt="yannick-img"
                            className="mx-auto py-6 max-w-[300px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
