import { Head, usePage, router } from "@inertiajs/react";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

import logo from '../../../public/img/logo-big.jpg'
import yannick from '../../../public/img/yannick.jpg'
import HeadWithImage from '@/Components/HeadWithImage';
import TextareaStatique from '@/Components/Admin/TextareaStatique';
import ModifButton from '@/Components/Admin/ModifButton';
import Line from "../Pages/Valeur/InfoText/Line";

export default function Histoire() {
    const [t, i18n] = useTranslation("global");
    const user = usePage().props.auth.user;

    /* TEXTE STATIQUE */
    const [editDesc1, setEditDesc1] = useState(false);
    const [editDesc2, setEditDesc2] = useState(false);
    const [editDesc3, setEditDesc3] = useState(false);

    const [desc1FR, setDesc1FR] = useState(t('Histoire.desc1', { lng: 'fr' }));
    const [desc1EN, setDesc1EN] = useState(t('Histoire.desc1', { lng: 'en' }));

    const [desc2FR, setDesc2FR] = useState(t('Histoire.desc2', { lng: 'fr' }));
    const [desc2EN, setDesc2EN] = useState(t('Histoire.desc2', { lng: 'en' }));

    const [desc3FR, setDesc3FR] = useState(t('Histoire.desc3', { lng: 'fr' }));
    const [desc3EN, setDesc3EN] = useState(t('Histoire.desc3', { lng: 'en' }));

    const [desc4FR, setDesc4FR] = useState(t('Histoire.desc4', { lng: 'fr' }));
    const [desc4EN, setDesc4EN] = useState(t('Histoire.desc4', { lng: 'en' }));

    const [desc5FR, setDesc5FR] = useState(t('Histoire.desc5', { lng: 'fr' }));
    const [desc5EN, setDesc5EN] = useState(t('Histoire.desc5', { lng: 'en' }));

    const [desc6FR, setDesc6FR] = useState(t('Histoire.desc6', { lng: 'fr' }));
    const [desc6EN, setDesc6EN] = useState(t('Histoire.desc6', { lng: 'en' }));

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
                onFinish: () => { setEditSectionText(false); window.location.reload(); }
            });
        }
        else {
            alert("Un élément est manquant.")
        }
    }

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
                    <ModifButton
                        afficher={user && user.data.role == "admin"}
                        editMode={editDesc1}
                        setEditMode={setEditDesc1}
                        changeText={changeText}
                        elemChange={[
                            ["Histoire", "desc1", desc1FR, desc1EN],
                            ["Histoire", "desc2", desc2FR, desc2EN],
                            ["Histoire", "desc3", desc3FR, desc3EN]
                        ]}
                        couleur="black"
                    />

                    <div className="text-center">
                        {editDesc1 ?
                            <>
                                <h2 className="text-start text-xl">Section 1:</h2>
                                <hr className='bg-black h-1'/>
                                <TextareaStatique
                                    setStatiqueFR={setDesc1FR}
                                    setStatiqueEN={setDesc1EN}
                                    element="Histoire.desc1"
                                    couleur="black"
                                /> <br /><br />
                                <h2 className="text-start text-xl">Section 2:</h2>
                                <hr className='bg-black h-1'/>
                                <TextareaStatique
                                    setStatiqueFR={setDesc2FR}
                                    setStatiqueEN={setDesc2EN}
                                    element="Histoire.desc2"
                                    couleur="black"
                                /> <br /><br />
                                <h2 className="text-start text-xl">Section 3:</h2>
                                <hr className='bg-black h-1'/>
                                <TextareaStatique
                                    setStatiqueFR={setDesc3FR}
                                    setStatiqueEN={setDesc3EN}
                                    element="Histoire.desc3"
                                    couleur="black"
                                />
                            </>
                            :
                            <p className="px-8 py-4 text-justify text-sm lg:text-base xl:text-lg">
                                {t("Histoire.desc1")}<br /><br />
                                {t("Histoire.desc2")}<br /><br />
                                {t("Histoire.desc3")}
                            </p>
                        }
                    </div>
                </div>
            </div>

            <div className="bg-[#061f3d] p-5">
                <ModifButton
                            afficher={user && user.data.role == "admin"}
                            editMode={editDesc2}
                            setEditMode={setEditDesc2}
                            changeText={changeText}
                            elemChange={[
                                ["Histoire", "desc4", desc4FR, desc4EN]
                            ]}
                            couleur="white"
                        />
                {editDesc2 ?
                    <>
                        <TextareaStatique
                            setStatiqueFR={setDesc4FR}
                            setStatiqueEN={setDesc4EN}
                            element="Histoire.desc4"
                            couleur="white"
                        />

                    </>
                    :
                    <p className="px-8 py-4 text-center text-[12px] md:text-[14px] lg:text-base xl:text-lg text-white bg-[#061f3d] font-bold italic lg:my-8"><span className="text-[#7A163C] text-4xl">"</span>{t("Histoire.desc4")}<span className="text-[#7A163C] text-4xl">"</span></p>
                }
            </div>
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
                        <ModifButton
                            afficher={user && user.data.role == "admin"}
                            editMode={editDesc3}
                            setEditMode={setEditDesc3}
                            changeText={changeText}
                            elemChange={[
                                ["Histoire", "desc5", desc5FR, desc5EN],
                                ["Histoire", "desc6", desc6FR, desc6EN]
                            ]}
                            couleur="black"
                        />
                        {editDesc3 ?
                            <>
                                <div className="flex px-5">
                                    <div>
                                        <h2 className="text-start text-xl">Section 1:</h2>
                                        <hr className='bg-black h-1'/>
                                        <TextareaStatique
                                            setStatiqueFR={setDesc5FR}
                                            setStatiqueEN={setDesc5EN}
                                            element="Histoire.desc5"
                                            couleur="black"
                                        /> <br /><br />
                                    </div>
                                    <div className="px-4">
                                        <h2 className="text-start text-xl">Section 2:</h2>
                                        <hr className='bg-black h-1'/>
                                        <TextareaStatique
                                            setStatiqueFR={setDesc6FR}
                                            setStatiqueEN={setDesc6EN}
                                            element="Histoire.desc6"
                                            couleur="black"
                                        />
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="hidden md:block md:mr-8">
                                    <p className="md:pl-8 md:pr-8 pt-4 text-justify text-sm lg:text-base xl:text-lg">
                                        {t("Histoire.desc5")}<br /><br />
                                    </p>
                                    <p className="md:px-8 pb-8 text-justify text-sm lg:text-base xl:text-lg">{t("Histoire.desc6")}</p>
                                </div>
                            </>
                        }
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
