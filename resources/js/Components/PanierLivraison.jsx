import ButtonAddress from "./ButtonAddress"
import ButtonAddAddress from "./ButtonAddAddress"
import { useTranslation } from "react-i18next"

export default function PanierLivraison({ setContentBox, setBoxVisible, adresses, setAdresse }) {

    const [t, i18n] = useTranslation("global")

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-2xl">{t("Panier.pass")}</h2>

                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="cursor-pointer" onClick={() => setBoxVisible(false)}>
                    <path d="M18 6 L6 18"></path>
                    <path d="M6 6 L18 18"></path>
                </svg>
            </div>

            <p className="font-bold mb-4">{t("Panier.address")}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {adresses.data.map(adresse => {
                    let nom = adresse.nom
                    if (adresse.no_app) {
                        nom += " App " + String(adresse.no_app)
                    }

                    return (
                        adresse.visible ?
                            <ButtonAddress
                                key={adresse.id}
                                adresse={adresse}
                                nom={nom}
                                setContentBox={setContentBox}
                                setAdresse={setAdresse}
                                code_postal={adresse.code_postal}
                            />
                        : null
                    )
                })}
                <ButtonAddAddress text={t("Panier.add")} setContentBox={setContentBox} />
            </div>

            <p className="italic">{t("Panier.info")}</p>
        </>
    )
}
