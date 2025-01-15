import { useTranslation } from 'react-i18next';

export default function MainTitle() {
    const [t, i18n] = useTranslation("global"); // translation

    return (
        <div className="font-extrabold text-center text-xl md:text-3xl angkor-regular py-6">
            {i18n.language === "fr" ?
                <h1>
                    {t("Valeurs.titrePagePart1")} <br/>
                    <span className="text-[#387E39] text-3xl md:text-6xl">{t("Valeurs.titrePagePart2")}</span> <br />
                    {t("Valeurs.titrePagePart3")}
                </h1>
            :
                <h1>
                    <span className=" tracking-widest">{t("Valeurs.titrePagePart1")}</span> <br/>
                    <span className="text-[#387E39] text-3xl lg:text-5xl">{t("Valeurs.titrePagePart3")}</span> <br />
                    <span className="tracking-widest">{t("Valeurs.titrePagePart2")}</span>
                </h1>
            }
        </div>
    )
}
