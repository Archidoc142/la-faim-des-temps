import ButtonAddress from "./ButtonAddress"
import ButtonAddAddress from "./ButtonAddAddress"

export default function PanierLivraison({ setContentBox, setBoxVisible, adresses, setAdresse }) {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-2xl">Passer une commande</h2>

                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="cursor-pointer" onClick={() => setBoxVisible(false)}>
                    <path d="M18 6 L6 18"></path>
                    <path d="M6 6 L18 18"></path>
                </svg>
            </div>

            <p className="font-bold mb-4">À quelle adresse voulez-vous recevoir votre commande?</p>

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
                            />
                        : null
                    )
                })}
                <ButtonAddAddress setContentBox={setContentBox} />
            </div>

            <p className="italic">Un montant s'applique à la livraison sur les commandes en dessous de 60$ au secteur de Sherbrooke.</p>
        </>
    )
}
