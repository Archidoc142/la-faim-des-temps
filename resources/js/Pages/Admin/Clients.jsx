import AdminLayout from "@/Layouts/AdminLayout";
import Table from "./Table/Table";
import HeadCell from "./Table/HeadCell";
import BodyCell from "./Table/Cell";

export default function Clients({clients}) {
    console.log(clients)
  return (
    <AdminLayout title="Clients">
        <p>{clients[0].nom}</p>
        {/* temporaire, à modulariser pour les autres tableaux */}
        <table className="border w-full">
            <thead>
                <tr>
                    <HeadCell title="Nom"/>
                    <HeadCell title="Prénom"/>
                    <HeadCell title="Courriel"/>
                    <HeadCell title="Téléphone"/>
                    <HeadCell title="Date de création"/>
                    <HeadCell title="Action"/>
                </tr>
            </thead>
            <tbody>
                {clients.map((c) =>
                <tr>
                    <BodyCell>{c.nom}</BodyCell>
                    <BodyCell>{c.prenom}</BodyCell>
                    <BodyCell>{c.email}</BodyCell>
                    <BodyCell>{c.telephone}</BodyCell>
                    <BodyCell>{c.created_at}</BodyCell>
                    <BodyCell>...</BodyCell>
                </tr>
                )}
            </tbody>
        </table>
    </AdminLayout>
  )
}
