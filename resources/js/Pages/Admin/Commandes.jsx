import AdminLayout from "@/Layouts/AdminLayout";
import HeadCell from "@/Components/Admin/Table/HeadCell";
import CommandeRow from "@/Components/Admin/Table/CommandeRow";
import HeadActionCell from "@/Components/Admin/Table/HeadActionCell";
import PaginationBar from "@/Components/PaginationBar";
import { useState } from "react"

export default function Commandes({commandes}) {
console.log(commandes)
const [ toggledMenuId, setToggledMenuId ] = useState(0);

return (
    <AdminLayout title="Commandes">
        {commandes.data.length === 0 ? (
            <div className="text-center py-4 text-lg text-gray-500 font-bold italic">Aucune commandes</div>
        ) : (
            <>
                <table className="border w-full table-fixed">
                    <thead>
                        <tr>
                            <HeadCell title="Numéro de facture" width="96" />
                            <HeadCell title="Client" width="96" />
                            <HeadCell title="Montant" width="36" />
                            <HeadCell title="Date de Vente" width="48" />
                            <HeadActionCell />
                        </tr>
                    </thead>
                    <tbody>
                        {commandes.data.map((c, i) => <CommandeRow commande={c} key={i} showClient={true} toggledMenuId={toggledMenuId} setToggledMenuId={setToggledMenuId}/>
                        )}
                    </tbody>
                </table>
                <PaginationBar links={commandes.meta.links} />
            </>
        )}
    </AdminLayout>
)
}
