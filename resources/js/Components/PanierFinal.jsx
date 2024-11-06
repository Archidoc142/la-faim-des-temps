import { useState } from "react"
import { useTranslation } from "react-i18next"

export default function PanierFinal({ post, data, prix, setData, adresse, setContentBox, setBoxVisible, secteur }) {

    const [t, i18n] = useTranslation("global")
    const [allergenes, setAllergenes] = useState(true)

    /*const codeIn = data.adresse.code_postal.substring(0,3);
    const secteur = secteurs.data.filter((s) => s.codes.includes(codeIn));

    console.log(codeIn)*/

    const checkAllergenes = () => {
        if(allergenes && data.allergenes == "") {
            alert("Veuillez ajouter vos allergènes. Si vous n'en avez pas, cochez la case « Je n'ai pas d'allergènes ».");
            return false;
        }
        return true;
    }

    const submitCommande = () => {
        if(checkAllergenes())
            post(route('envoiCommande'))
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

                <h3 className="font-bold text-3xl mb-4">{data.livraison ? t("Panier.total") : "Total"}</h3>

                <div className="flex justify-center flex-col mx-20 mb-4">
                    <div className="border-b-black border-b-[1px] pb-3">
                        <div className="flex justify-between">
                            <p>{t("Panier.article")} :</p>
                            <p>{data.sous_total}$</p>
                        </div>
                        <div className="flex justify-between">
                            <p>{t("Panier.livraison")} ({secteur}) :</p>
                            <p>{data.frais_livraison}$</p>
                        </div>
                    </div>
                    <div className="flex justify-between pt-3 text-lg">
                        <p>Total :</p>
                        <p className="font-bold">{data.total}$</p>
                    </div>
                </div>

                {
                    data.livraison ?
                        <div>
                            <h3 className="font-bold text-3xl mb-2">{t("Panier.adresse")}:</h3>
                            <p>{nomAdresse}</p>
                        </div> : <div className="mb-8"></div>
                }

                <div className="text-left px-8 mt-6 mb-3">
                    <h4 className="font-bold mb-2">{t("Panier.allergen")}</h4>
                    <textarea
                        id="allergene"
                        maxLength="128"
                        placeholder={t("Panier.placeholder")}
                        className={"w-full min-h-[100px] max-h-[100px]" + (!allergenes ? " bg-gray-300 hover:cursor-not-allowed" : "")}
                        onChange={(e) => setData("allergenes", e.target.value)}
                        required={allergenes}
                        disabled={!allergenes}
                    />
                </div>

                <div className="mb-6 w-full flex justify-start items-center px-8">
                    <input type="checkbox" name="allergenes" id="allergenes" className="mr-3" onChange={(e) => setAllergenes(!allergenes)} />
                    <label htmlFor="allergenes">Je n'ai pas d'allergènes.</label>
                </div>

                <button onClick={submitCommande} className="font-bold text-white bg-[#06306D] hover:bg-[#467ed2] rounded px-4 py-[5px]">
                    {t("Panier.terminer")}
                </button>
            </div>
        </>
    )
}
