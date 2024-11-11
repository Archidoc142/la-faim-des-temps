import { useEffect, useState } from "react";

export default function TextareaStatique(editMode, statiqueFR, statiqueEN, element) {

    return (
        <>
            {/* #################################
                    TEXTAREA */
                editMode ?
                    <>
                        <label htmlFor="descfr">Français</label>
                        <textarea className='w-full mb-2' name="descfr" id="descfr" placeholder="Entrez le texte approprié en FRANÇAIS"
                            defaultValue={t(element, { lng: 'fr' })}
                            onChange={(e) => { statiqueFR[0] = e.target.value }}></textarea>

                        <label htmlFor="descen">Anglais</label>
                        <textarea className='w-full' name="descen" id="descen" placeholder="Entrez le texte approprié en ANGLAIS"
                            defaultValue={t(element, { lng: 'en' })}
                            onChange={(e) => { statiqueEN[0] = e.target.value }}></textarea>
                    </>
                    :
                    <p className='text-sm md:text-base'>{t("Menu.livr-p")}</p>
            }
        </>
    );
}
