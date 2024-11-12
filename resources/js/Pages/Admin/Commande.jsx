import AdminLayout from "@/Layouts/AdminLayout"
import { useEffect, useRef } from "react"

export default function Commande({ commande, produits, prevPage }) {

    console.log(commande)
    console.log(produits)

    const user = commande.data.user
    const allergenes = produits.data[0].commande.allergenes

    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    const date = new Date(commande.data.created_at)

    const adresse = commande.data.adresse;

    return (
        <AdminLayout title={"Commande #" + commande.data.id} prevPage={prevPage} commandePage={true}>

            <h2 className="font-bold text-2xl">Client</h2>
            <div className="grid grid-cols-12 mt-4 mb-8 gap-1 border-black">
                <p className="font-medium col-span-4">Nom complet :</p>
                <p className="col-span-8">{user.prenom + " " + user.nom}</p>

                <p className="font-medium col-span-4">Téléphone :</p>
                <p className="col-span-8">{commande.data.phone}</p>

                <p className="font-medium col-span-4">Courriel :</p>
                <p className="col-span-8">{user.email}</p>

                <p className="font-medium col-span-4">Allergènes :</p>
                <p className="col-span-8">{allergenes ? allergenes : "Aucun"}</p>
            </div>

            <h2 className="font-bold text-2xl">Facture</h2>
            <div className="grid grid-cols-12 mt-4 mb-8 gap-1 border-black">
                <p className="font-medium col-span-4">Code :</p>
                <p className="col-span-8">#{commande.data.id}</p>

                <p className="font-medium col-span-4">Code facture QuickBooks :</p>
                <p className="col-span-8">#{commande.data.qb_invoice_id}</p>

                <p className="font-medium col-span-4">Date :</p>
                <p className="col-span-8">{date.toLocaleDateString('fr-FR', options)}</p>

                <p className="font-medium col-span-4">Type de commande :</p>
                <p className="col-span-8">{commande.data.livraison ? "Livraison" : "Cueillette"}</p>

                <p className="font-medium col-span-4">Adresse de livraison :</p>
                <p className="col-span-8">
                    {adresse ?
                        adresse.no_civique + " " +
                        adresse.rue + ", " +
                        adresse.code_postal +
                        (adresse.appartement !== null && adresse.appartement > 0 ? ", " + adresse.appartement : "") : "En magasin"}
                </p>
            </div>

            <div className="mb-12">
                {produits.data.map(p => {
                    return (
                        <div
                            key={p.id}
                            className="mb-4"
                        >
                            <div className="grid grid-cols-12">
                                <p className="font-bold col-span-4">{p.produit.nom}</p>
                                {p.format.id > 2 ? <p className="col-span-8">{p.prix_vente}$</p> : null}
                            </div>
                            <p>{p.nom_format}</p>
                        </div>
                    )
                })}
            </div>

            <div className="max-w-60 border-gray-400 border-y-2 mb-2 text-lg">
                <div className="flex">
                    <p className="w-48 font-medium">Sous-total:</p>
                    <p className="w-12 text-right">{commande.data.total - commande.data.frais_livraison}$</p>
                </div>

                <div className="flex">
                    <p className="w-48 font-medium">Livraison:</p>
                    <p className="w-12 text-right">{commande.data.frais_livraison}$</p>
                </div>
            </div>

            <div className="flex text-lg">
                <p className="w-48 font-medium">Total:</p>
                <p className="w-12 text-right">{commande.data.total}$</p>
            </div>

        </AdminLayout>
    )
}
