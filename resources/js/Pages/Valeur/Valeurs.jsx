import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import MainTitle from "./InfoText/MainTitle";
import Line from "./InfoText/Line";
import LittleOrangeSection from "./InfoText/LittleOrangeSection";
import WhiteSection from './InfoText/WhiteSection';

export default function Valeurs() {
    const [t, i18n] = useTranslation("global"); // translation

    return(
        <>
            <div className='Producteur bg-[#EFBD9A]'>
                <Head title={t("Valeurs.titre")} />

                <MainTitle/>

                <Line/>

                <LittleOrangeSection 
                    image={"loveBag.png"} 
                    title={t("Valeurs.firstSectionTitle")} 
                    textAlignment={'center'} 
                    text={t("Valeurs.firstSectionText")} 
                />

                {/* Section unique dans la page Valeurs.jsx */}
                <div className="lg:grid lg:grid-cols-4">
                    <img
                        className="w-1/3 mx-auto py-5 lg:absolute lg:z-0 lg:w-48 lg:top-2/3 lg:right-0 lg:mr-24"
                        src="img/bigLeafPlant.png"
                        alt="bigLeafPlant.png picture"
                    />

                    <div className="bg-[#F8ECE0] py-5 px-8 mx-14 lg:relative lg:z-0 lg:mr-48 lg:-mt-16 lg:p-8 lg:col-start-3 lg:col-end-5">
                        <h2 className='text-xl font-extrabold angkor-regular pb-3 lg:text-4xl'>
                            {t("Valeurs.secondSectionTitlePart1")} <br />
                            {t("Valeurs.plus")} <span className='text-[#387E39]'>{t("Valeurs.vert")}</span> {t("Valeurs.et")} <br />
                            {t("Valeurs.secondSectionTitlePart2")}
                        </h2>

                        <p>
                            {t("Valeurs.secondSectionText")}
                        </p>
                    </div>
                </div>

                <Line/>

                <WhiteSection 
                    image1={"leaf.png"} 
                    subTitle1={t("Valeurs.thirdSectionSbuTitle1")}
                    text1={t("Valeurs.thirdSectionText1")}                    
                    image2={"plantBag.png"} 
                    subTitle2={t("Valeurs.thirdSectionSbuTitle2")}
                    text2={t("Valeurs.thirdSectionText2")}
                    title={t("Valeurs.thirdSectionTitle")} 
                    textAlignment={'center'}/>

                <Line/>
                {/* Section caché pour le moment, en attente de confirmation du projet */}
                <LittleOrangeSection 
                    image={"crossHand.png"} 
                    title={"Un accueil pour tous"} 
                    text={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing"}
                    textAlignment={'center'} 
                    imgIn={true} 
                    hidden={true}/> 
            </div>
        </>
    )
}