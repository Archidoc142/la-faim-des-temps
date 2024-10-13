import { useTranslation } from "react-i18next"

export default function PanierFinal({ data, prix, setData, adresse, setContentBox, setBoxVisible }) {

    const [t, i18n] = useTranslation("global")

    // AJOUTER CETTE FONCTION ET SUPPRIMER LE COM
    // SEULEMENT SI L'ADRESSE N'EST PAS DANS LA BD
    const addAdresseToDB = () => {
        const adresseData = {
            no_civique: data.no_civique,
            rue: data.rue,
            appartement: data.appartement,
            code_postal: data.code_postal,
        };

        axios.post('/adresse', adresseData)
            .then(response => {
                // YAY
                // On peut afficher les données renvoyées... but it's useless
            })
            .catch(error => {
                if (error.response && error.response.data.errors) {
                    let errorMessages = '';
                    Object.keys(error.response.data.errors).forEach((key) => {
                        errorMessages += `${error.response.data.errors[key].join(', ')}\n`;
                    });

                    alert(`Erreur lors de l'ajout de l'adresse :\n${errorMessages}`);
                }
            });
    }

    let nomAdresse = "";
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

                <div className="text-left px-8 mt-2 mb-4">
                    <h4 className="font-bold mb-2">{t("Panier.allergen")}</h4>
                    <textarea
                        id="allergene"
                        maxLength="128"
                        placeholder={t("Panier.placeholder")}
                        className="w-full min-h-[100px] max-h-[100px]"
                        onChange={(e) => setData("allergenes", e.target.value)}
                    />
                </div>

                <button className="font-bold text-white bg-[#06306D] hover:bg-[#467ed2] rounded px-4 py-[5px]">
                    {t("Panier.terminer")}
                </button>
            </div>
        </>
    )
}
