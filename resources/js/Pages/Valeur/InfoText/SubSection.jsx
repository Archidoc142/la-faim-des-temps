import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { usePage, router } from '@inertiajs/react';

import SubTitle from "./SubTitle";
import TextareaStatique from '@/Components/Admin/TextareaStatique';
import ModifButton from '@/Components/Admin/ModifButton';

export default function SubSection(props) {
    const isEven = props.index % 2 === 0;

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
        <div>
            <div className="p-4 m-5 lg:grid lg:grid-cols-2">
                <img
                    className={`w-1/3 mx-auto py-5 ${props.imgRight ? 'lg:order-2' : ''}`}
                    src={"img/"+props.image}
                    alt={props.image+" picture"}
                />

                <div>
                    <div className="flex justify-between">
                        <SubTitle title={props.SubTitle} />

                        <div className="flex justify-end">
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
                        </div>
                    </div>

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