import AdminLayout from "@/Layouts/AdminLayout";
import HeadCell from "@/Components/Admin/Table/HeadCell";
import CommandeRow from "@/Components/Admin/Table/CommandeRow";
import HeadActionCell from "@/Components/Admin/Table/HeadActionCell";

export default function Commandes({commandes}) {

  return (
    <AdminLayout title="Commandes">
        <table className="border w-full table-fixed">
            <thead>
                <tr>
                    <HeadCell title="Numéro de facture" width="96"/>
                    <HeadCell title="Client" width="96"/>
                    <HeadCell title="Montant" width="36"/>
                    <HeadCell title="Date de Vente" width="48"/>
                    <HeadActionCell/>
                </tr>
            </thead>
            <tbody>
                {commandes.data.map((c, i) =>
                    <CommandeRow commande={c} key={i}/>
                )}
            </tbody>
        </table>
    </AdminLayout>
  )
}