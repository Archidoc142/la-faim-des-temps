import { useTranslation } from "react-i18next"

export default function PanierFinal({ post, data, prix, setData, adresse, setContentBox, setBoxVisible }) {

    const [t, i18n] = useTranslation("global")

    const submitCommande = (online) => {
        const routeName = online ? 'checkout' : 'envoiCommande';
        post(route(routeName));
    }

    let nomAdresse = "";

    if(data.livraison)
        if(data.adresse_exists)
            nomAdresse = data.adresse
        else
            nomAdresse = data.adresse.no_civique + ", " + data.adresse.rue + " (" + data.adresse.code_postal + ")"

    return (
        <>
            <div className="relative text-center">
                <div className="flex gap-2 absolute right-0">
                    <button onClick={() => setContentBox(0)}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" >
                            <path d="M19 12H6M12 5l-7 7 7 7" />
                        </svg>
                    </button>

                    <button onClick={() => setBoxVisible(false)}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" >
                            <path d="M18 6 L6 18 M6 6 L18 18"></path>
                        </svg>
                    </button>
                </div>


                <h2 className="font-bold text-3xl pb-6 pt-10">{t("Panier.pass")}</h2>

                <p className="font-bold text-lg pb-4 mx-10 mb-6 border-b-black border-b-[1px]">{t("Panier.finaliser")}</p>

                <h3 className="font-bold text-3xl mb-4">{t("Panier.total")}</h3>

                <div className="flex justify-center flex-col mx-28 mb-4">
                    <div className="flex justify-between">
                        <p>{t("Panier.article")}:</p>
                        <p>{data.sous_total}$</p>
                    </div>

                    <div className="flex justify-between">
                        <p>{t("Panier.livraison")}:</p>
                        <p>{data.frais_livraison}$</p>
                    </div>

                    <div className="flex justify-between">
                        <p>{t("Panier.total")}:</p>
                        <p>{data.total}$</p>
                    </div>
                </div>

                {
                    data.livraison ?
                        <div>
                            <h3 className="font-bold text-3xl mb-2">{t("Panier.adresse")}:</h3>
                            <p>{nomAdresse}</p>
                        </div> : <div className="mb-8"></div>
                }

                <div className="text-left px-8 mt-2 mb-6">
                    <h4 className="font-bold mb-2">{t("Panier.allergen")}</h4>
                    <textarea
                        id="allergene"
                        maxLength="128"
                        placeholder={t("Panier.placeholder")}
                        className="w-full min-h-[100px] max-h-[100px]"
                        onChange={(e) => setData("allergenes", e.target.value)}
                    />
                </div>

                <div className="flex flex-col w-80 mx-auto gap-2 mb-2">
                    <button onClick={() => submitCommande(true)} className="font-bold text-white bg-green-600 hover:bg-green-500 rounded px-4 py-2">
                        <span className="text-lg">Payer en ligne</span> <br/>
                        <span className="font-normal">(carte de crédit)</span>
                        {/*t("Panier.terminer")*/}
                    </button>

                    <button onClick={() => submitCommande(false)} className="font-bold text-white bg-[#06306D] hover:bg-[#467ed2] rounded px-4 py-2 mt-1">
                        <span>Payer plus tard</span> <br/>
                        <span className="font-normal">(Interac, comptant...)</span>
                    </button>
                </div>
            </div>
        </>
    )
}
