import AdminLayout from "@/Layouts/AdminLayout";
import HeadCell from "@/Components/Admin/Table/HeadCell";
import ClientRow from "@/Components/Admin/Table/ClientRow";
import HeadActionCell from "@/Components/Admin/Table/HeadActionCell";
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from "react";

export default function Clients({clients}) {

    const submit = (e) => {
        e.preventDefault();
        console.log("submit");
        /*post(route('admin.client.edit'), {
        });*/
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
        prenom: '',
        nom: '',
        email: '',
        telephone: ''
    });

    const [ editableId, seteditableId ] = useState(0);

    return (
        <AdminLayout title="Clients">
            <form method="post" onSubmit={submit}>
                <table className="border w-full table-fixed">
                    <thead>
                        <tr>
                            <HeadCell title="Nom" width="96"/>
                            <HeadCell title="Prénom" width="96"/>
                            <HeadCell title="Courriel" width="72"/>
                            <HeadCell title="Téléphone" width="48"/>
                            <HeadCell title="Date de création" width="60"/>
                            <HeadActionCell/>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.data.map((c, i) =>
                            <ClientRow client={c} key={i} editableId={editableId} seteditableId={seteditableId} data={data} setData={setData}/>
                        )}
                    </tbody>
                </table>
            </form>
        </AdminLayout>
    )
}
