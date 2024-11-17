import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { usePage, router } from '@inertiajs/react';

import SectionTitle from "./SectionTitle";
import TextareaStatique from '@/Components/Admin/TextareaStatique';
import ModifButton from '@/Components/Admin/ModifButton';

export default function LittleOrangeSection(props) {
    const [t, i18n] = useTranslation("global"); // translation
    const user = usePage().props.auth.user;

    const textArray = props.text.split(".");
    const groupe = textArray[0];
    const target = textArray[1];

    /* TEXTE STATIQUE */
    const [editSectionText, setEditSectionText] = useState(false);

    const [sectionTextFR, setSectionTextFR] = useState(t(props.text, { lng: 'fr' }));
    const [SectionTextEN, setSectionTextEN] = useState(t(props.text, { lng: 'en' }));

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

    return(
        <div className={`py-5 ${props.hidden ? 'hidden' : ''}`}>
            <img
                className={`w-1/3 mx-auto py-5 ${props.imgIn ? 'hidden' : ''} lg:absolute lg:z-0 lg:w-48 lg:top-1/3 lg:ml-24 lg:-rotate-8`}
                src={"img/"+props.image}
                alt={props.image+" picture"}
            />

            <div className="bg-[#E2A76C] p-4 m-5 lg:relative lg:z-0 lg:grid lg:grid-cols-7 lg:m-0 lg:w-1/3 lg:p-5 lg:ml-48 lg:mt-20">
                <img
                    className={`w-1/3 mx-auto py-5 ${props.imgIn ? '' : 'hidden'} lg:hidden`}
                    src={"img/"+props.image}
                    alt={props.image+" picture"}
                />
                <SectionTitle title={props.title}  textAlignment={props.textAlignment}/>

                <ModifButton
                    afficher={user && user.data.role == "admin"}
                    editMode={editSectionText}
                    setEditMode={setEditSectionText}
                    changeText={changeText}
                    elemChange={[
                        [groupe, target, sectionTextFR, SectionTextEN],
                    ]}
                    couleur="black"
                />
                {/* Cette image n'apparaît que en format laptop */}
                <img 
                    className="w-1/3 hidden lg:block lg:z-0 lg:col-span-2 lg:w-full lg:my-auto"
                    src="img/handPlant.png" 
                    alt="hand planting picture" 
                />
                <div className=" lg:z-10 lg:col-span-5 lg:mt-3">
                    {editSectionText ?
                        <TextareaStatique
                            setStatiqueFR={setSectionTextFR}
                            setStatiqueEN={setSectionTextEN}
                            element={props.text}
                            couleur="black"
                        />
                        :
                        <p>{t(props.text)}</p>
                    }
                </div>
            </div>
        </div>
    );
}