import { useTranslation } from "react-i18next"

export default function PanierFinal({ prix, adresse, setBoxVisible }) {

    const [t, i18n] = useTranslation("global")

    let livraison = adresse.montant
    if (prix >= 60 && livraison === 6) {
        livraison = 0
    }

    return (
        <>
            <div className="relative text-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="cursor-pointer absolute right-0" onClick={() => setBoxVisible(false)}>
                    <path d="M18 6 L6 18 M6 6 L18 18"></path>
                </svg>

                <h2 className="font-bold text-3xl py-6">{t("Panier.pass")}</h2>


                <p className="font-bold text-lg pb-4 mx-10 mb-6 border-b-black border-b-[1px]">{t("Panier.finaliser")}</p>

                <h3 className="font-bold text-3xl mb-4">{t("Panier.total")}</h3>

                <div className="flex justify-center flex-col mx-28 mb-4">
                    <div className="flex justify-between">
                        <p>{t("Panier.article")}:</p>
                        <p>{prix}$</p>
                    </div>

                    <div className="flex justify-between">
                        <p>{t("Panier.livraison")}:</p>
                        <p>{livraison}$</p>
                    </div>

                    <div className="flex justify-between">
                        <p>{t("Panier.total")}:</p>
                        <p>{prix + livraison}$</p>
                    </div>
                </div>

                <h3 className="font-bold text-3xl mb-2">{t("Panier.adresse")}:</h3>
                <p>{adresse.nom}</p>

                <div className="text-left px-8 mt-2 mb-4">
                    <h4 className="font-bold mb-2">{t("Panier.allergen")}</h4>
                    <textarea
                        id="allergene"
                        maxLength="128"
                        placeholder={t("Panier.placeholder")}
                        className="w-full min-h-[100px] max-h-[100px]"
                    />
                </div>

                <button className="font-bold text-white bg-[#06306D] rounded px-4 py-[5px]">
                    {t("Panier.terminer")}
                </button>
            </div>
        </>
    )
}
