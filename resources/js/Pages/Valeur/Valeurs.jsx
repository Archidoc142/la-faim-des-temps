import { usePage, Head, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import MainTitle from "./InfoText/MainTitle";
import Line from "./InfoText/Line";
import LittleOrangeSection from "./InfoText/LittleOrangeSection";
import WhiteSection from './InfoText/WhiteSection';
import ModifButton from '@/Components/Admin/ModifButton';
import TextareaStatique from '@/Components/Admin/TextareaStatique';

export default function Valeurs() {
    const [t, i18n] = useTranslation("global"); // translation
    const user = usePage().props.auth.user;

    /* TEXTE STATIQUE */
    const [editSecondSectionText, setEditSecondSectionText] = useState(false);

    const [SecondSectionTextFR, setSecondSectionTextFR] = useState(t('Valeurs.secondSectionText', { lng: 'fr' }));
    const [SecondSectionTextEN, setSecondSectionTextEN] = useState(t('Valeurs.secondSectionText', { lng: 'en' }));

    async function changeText(nouveau_texte) {
        if (nouveau_texte) {
            let textData = {};

            for (let index = 0; index < nouveau_texte.length; index++) {
                textData[index] = {
                    "groupe": nouveau_texte[index][0],
                    "target": nouveau_texte[index][1],
                    "fr": nouveau_texte[index][2],
                    "en": nouveau_texte[index][3]
                }
            }
            router.patch('/modifier-texte', textData, {
                preserveScroll: true,
                onError: (errors) => { alert(errors[0]); },
                preserveState: 'errors',
                onFinish: () => { setEditSecondSectionText(false); window.location.reload(); }
            });
        }
        else {
            alert("Un élément est manquant.")
        }
    }

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
                    text="Valeurs.firstSectionText" 
                />

                {/* Section unique dans la page Valeurs.jsx */}
                <div className="lg:grid lg:grid-cols-4">
                    <img
                        className="w-1/3 mx-auto py-5 lg:absolute lg:z-0 lg:w-48 lg:top-2/3 lg:right-0 lg:mr-24"
                        src="img/bigLeafPlant.png"
                        alt="bigLeafPlant.png picture"
                    />

                    <div className="bg-[#F8ECE0] py-5 px-8 mx-14 lg:relative lg:z-0 lg:mr-48 lg:-mt-16 lg:p-8 lg:col-start-3 lg:col-end-5">
                        <div className="flex justify-between">
                            <h2 className='text-xl font-extrabold angkor-regular pb-3 lg:text-4xl'>
                                {t("Valeurs.secondSectionTitlePart1")} <br />
                                {t("Valeurs.plus")} <span className='text-[#387E39]'>{t("Valeurs.vert")}</span> {t("Valeurs.et")} <br />
                                {t("Valeurs.secondSectionTitlePart2")}
                            </h2>

                            <div className="flex justify-end gap-5">
                                <ModifButton
                                    afficher={user && user.data.role == "admin"}
                                    editMode={editSecondSectionText}
                                    setEditMode={setEditSecondSectionText}
                                    changeText={changeText}
                                    elemChange={[
                                        ['Valeurs', 'secondSectionText', SecondSectionTextFR, SecondSectionTextEN],
                                    ]}
                                    couleur="black"
                                />
                            </div>
                        </div>
                        {editSecondSectionText ?
                        <TextareaStatique
                            setStatiqueFR={setSecondSectionTextFR}
                            setStatiqueEN={setSecondSectionTextEN}
                            element="Valeurs.secondSectionText"
                            couleur="black"
                        />
                        :
                        <p>{t("Valeurs.secondSectionText")}</p>
                    }
                    </div>
                </div>

                <Line/>

                <WhiteSection 
                    image1={"leaf.png"} 
                    subTitle1={t("Valeurs.thirdSectionSbuTitle1")}
                    text1="Valeurs.thirdSectionText1"                   
                    image2={"plantBag.png"} 
                    subTitle2={t("Valeurs.thirdSectionSbuTitle2")}
                    text2="Valeurs.thirdSectionText2"
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