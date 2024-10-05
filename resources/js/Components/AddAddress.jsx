import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react"

export default function AddAddress({ setContentBox, setBoxVisible, setAdresse }) {

    const [t, i18n] = useTranslation("global");
    const [postalCode, setPostalCode] = useState('');

    // id_secteur_code et visible seront géré dans le controller
    const { data, setData, post, errors, processing } = useForm({
        no_civique: 0,
        rue: '',
        appartement: 0,
        code_postal: '',
    })

    const submit = (e) => {
        e.preventDefault();

        const adresseData = {
            no_civique: data.no_civique,
            rue: data.rue,
            appartement: data.appartement,
            code_postal: data.code_postal,
        };

        axios.post('/adresse', adresseData)
            .then(response => {
                if (response.data.success) {
                    const array = response.data.adresse
                    setAdresse({ id: array.id, nom: array.nom, montant: array.montant, code_postal: array.code_postal });
                    setContentBox(2);
                }
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
    };

    const handlePostalChange = (e) => {
        let text = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase()

        if (text.length > 3) {
            text = text.slice(0, 3) + ' ' + text.slice(3);
        }

        setData('code_postal', text)
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
                    <input id="no_civique" className="mb-2" type="number" placeholder="297" onChange={(e) => setData('no_civique', e.target.value)} />

                    <label htmlFor="rue">{t("Panier.rue")}</label>
                    <input id="rue" className="mb-2" type="text" placeholder="Rue King Ouest" maxLength="128" onChange={(e) => setData('rue', e.target.value)} />

                    <label htmlFor="appartement">{t("Panier.app")}</label>
                    <input id="appartement" className="mb-2" type="number" placeholder="401" onChange={(e) => setData('appartement', e.target.value)} />

                    <label htmlFor="code_postal">{t("Panier.postal")}</label>
                    <input id="code_postal" className="mb-4" type="text" placeholder="J1H 1R2" value={postalCode} maxLength="7" onChange={(e) => handlePostalChange(e)} />

                    <button type="submit" className="font-bold text-white bg-[#06306D] hover:bg-[#467ed2] rounded px-4 py-[5px]">Ajouter</button>
                </div>
            </form>
        </>
    )
}
