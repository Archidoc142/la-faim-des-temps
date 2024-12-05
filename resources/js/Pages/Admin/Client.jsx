import ClientInfo from '@/Components/Admin/ClientInfo'
import CommandeRow from '@/Components/Admin/Table/CommandeRow'
import HeadActionCell from '@/Components/Admin/Table/HeadActionCell'
import HeadCell from '@/Components/Admin/Table/HeadCell'
import PaginationBar from '@/Components/PaginationBar'
import AdminLayout from '@/Layouts/AdminLayout'
import { useState } from "react";

export default function Client({client, commandes, prevPage})
{
    const nomComplet = client.data.prenom + " " + client.data.nom;

    const [ toggledMenuId, setToggledMenuId ] = useState(0);

    return (
    <AdminLayout title="Informations du client" clientPage={true} prevPage={prevPage}>
        <ClientInfo title="Nom complet" value={nomComplet}/>
        <ClientInfo title="Téléphone" value={client.data.telephone}/>
        <ClientInfo title="Courriel" value={client.data.email}/>
        <ClientInfo title="Date de création du compte" value={client.data.created_at_hour}/>

        <h2 className="text-2xl font-bold mt-8 mb-2">Commandes du client</h2>

        { commandes.data.length > 0 ?
        <>
        <table className="border w-full table-fixed mt-3">
            <thead>
                <tr>
                    <HeadCell title="Numéro de facture" width="96" />
                    <HeadCell title="Numéro QuickBooks" width="96" />
                    <HeadCell title="Montant" width="48" />
                    <HeadCell title="Date de Vente" width="48" />
                    <HeadActionCell />
                </tr>
            </thead>
            <tbody>
                {commandes.data.map((c, i) => <CommandeRow commande={c} key={i} showClient={false} toggledMenuId={toggledMenuId} setToggledMenuId={setToggledMenuId}/>)}
            </tbody>
        </table>
        {commandes.last_page > 1 ? <PaginationBar links={commandes.links} /> : null}
        </> :
        <p className='italic text-gray-600'>Aucune commande</p> }



    </AdminLayout>
    )
}
