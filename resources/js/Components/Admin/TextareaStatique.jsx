import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';


export default function TextareaStatique({ setStatiqueFR, setStatiqueEN, element, couleur }) {
    const [t, i18n] = useTranslation("global");

    return (
        <>
            <label className={"text-" + couleur} htmlFor="descfr">Français</label>
            <textarea className='w-full mb-2' name="descfr" id="descfr" placeholder="Entrez le texte approprié en FRANÇAIS" rows={5}
                defaultValue={t(element, { lng: 'fr' })}
                onChange={(e) => { setStatiqueFR(e.target.value) }}></textarea>

            <label className={"text-" + couleur} htmlFor="descen">Anglais</label>
            <textarea className='w-full' name="descen" id="descen" placeholder="Entrez le texte approprié en ANGLAIS" rows={5}
                defaultValue={t(element, { lng: 'en' })}
                onChange={(e) => { setStatiqueEN(e.target.value) }}></textarea>
        </>
    );
}
