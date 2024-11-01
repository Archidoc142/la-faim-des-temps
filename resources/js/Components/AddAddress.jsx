import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react"

export default function AddAddress({ setContentBox, setBoxVisible, data, setData, secteurs, codesValides, seuilGratuit, setSecteur }) {

    const [t, i18n] = useTranslation("global")

    const [noCivique, setNoCivique] = useState(0)
    const [rue, setRue] = useState("")
    const [noAppt, setNoAppt] = useState(0)
    const [postalCode, setPostalCode] = useState("")

    const submit = (e) => {
        e.preventDefault();

        const re = /^[a-zA-Z][0-9][a-zA-Z] [0-9][a-zA-Z][0-9]$/

        if(re.exec(postalCode))
        {
            const codeIn = postalCode.substring(0,3);

            if (codesValides.includes(codeIn)) {
                const secteur = secteurs.data.filter((s) => s.codes.includes(codeIn));
                setSecteur(secteur[0].nom);

                let montant = secteur[0].montant;

                if (secteur[0].nom === "Sherbrooke" && data.total >= seuilGratuit) {
                    montant = 0;
                }

                const adresse = {no_civique: noCivique, rue: rue, no_appt: noAppt, code_postal: postalCode}

                let newData = data
                newData.adresse = adresse
                newData.adresse_exists = false
                newData.adresse_id = 0
                newData.frais_livraison = montant
                newData.total = data.sous_total + montant
                setData(newData)

                setContentBox(2);
            } else {
                alert("Désolé, nous livrons seulement au centre de Sherbrooke, à Fleurimont et à Rock Forest.")
            }
        }
        else
        {
            alert("Le format du code postal est invalide.");
        }

    };

    const handlePostalChange = (e) => {
        let text = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase()

        if (text.length > 3) {
            text = text.slice(0, 3) + ' ' + text.slice(3);
        }

        setPostalCode(text)
    }

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <button onClick={() => setContentBox(1)}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" >
                            <path d="M19 12H6M12 5l-7 7 7 7" />
                        </svg>
                    </button>

                    <h2 className="font-bold text-2xl">{t("Panier.addAddressTitle")}</h2>
                </div>

                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="cursor-pointer" onClick={() => setBoxVisible(false)}>
                    <path d="M18 6 L6 18"></path>
                    <path d="M6 6 L18 18"></path>
                </svg>
            </div>

            <form onSubmit={submit}>
                <div className="flex flex-col">
                    <label htmlFor="no_civique">{t("Panier.civic")}</label>
                    <input id="no_civique" required className="mb-2" type="number" placeholder="297" onChange={(e) => setNoCivique(e.target.value)} />

                    <label htmlFor="rue">{t("Panier.rue")}</label>
                    <input id="rue" required className="mb-2" type="text" placeholder="Rue King Ouest" maxLength="128" onChange={(e) => setRue(e.target.value)} />

                    <label htmlFor="appartement">{t("Panier.app")}</label>
                    <input id="appartement" className="mb-2" type="number" placeholder="401" onChange={(e) => setNoAppt(e.target.value)} />

                    <label htmlFor="code_postal">{t("Panier.postal")}</label>
                    <input id="code_postal" required className="mb-4" type="text" placeholder="J1H 1R2" value={postalCode} maxLength="7" onChange={(e) => handlePostalChange(e)} />

                    <button type="submit" className="font-bold text-white bg-[#06306D] hover:bg-[#467ed2] rounded px-4 py-[5px]">Ajouter</button>
                </div>
            </form>
        </>
    )
}
