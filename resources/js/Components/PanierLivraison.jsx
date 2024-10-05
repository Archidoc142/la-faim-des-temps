import ButtonAddress from "./ButtonAddress"
import ButtonAddAddress from "./ButtonAddAddress"
import { useTranslation } from "react-i18next"

export default function PanierLivraison({ setContentBox, setBoxVisible, adresses, setAdresse }) {

    const [t, i18n] = useTranslation("global")

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <button onClick={() => setContentBox(0)}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" >
                            <path d="M19 12H6M12 5l-7 7 7 7"/>
                        </svg>
                    </button>

                    <h2 className="font-bold text-2xl">{t("Panier.pass")}</h2>
                </div>

                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="cursor-pointer" onClick={() => setBoxVisible(false)}>
                    <path d="M18 6 L6 18"></path>
                    <path d="M6 6 L18 18"></path>
                </svg>
            </div>

            <p className="font-bold mb-4">{t("Panier.address")}</p>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
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
                <ButtonAddAddress
                    text={t("Panier.add")}
                    setContentBox={setContentBox}
                    setAdresse={setAdresse}
                />
            </div>

            <p className="italic">{t("Panier.info")}</p>
        </>
    )
}
