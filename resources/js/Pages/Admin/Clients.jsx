import AdminLayout from "@/Layouts/AdminLayout";
import HeadCell from "@/Components/Admin/Table/HeadCell";
import ClientRow from "@/Components/Admin/Table/ClientRow";
import HeadActionCell from "@/Components/Admin/Table/HeadActionCell";

export default function Clients({clients}) {

  return (
    <AdminLayout title="Clients">
        <table className="border w-full">
            <thead>
                <tr>
                    <HeadCell title="Nom" width="60"/>
                    <HeadCell title="Prénom" width="60"/>
                    <HeadCell title="Courriel" width="48"/>
                    <HeadCell title="Téléphone" width="36"/>
                    <HeadCell title="Date de création"  width="36"/>
                    <HeadActionCell/>
                </tr>
            </thead>
            <tbody>
                {clients.data.map((c, i) =>
                    <ClientRow client={c} key={i}/>
                )}
            </tbody>
        </table>
    </AdminLayout>
  )
}
