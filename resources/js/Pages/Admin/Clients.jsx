import AdminLayout from "@/Layouts/AdminLayout";
import HeadCell from "@/Components/Admin/Table/HeadCell";
import ClientRow from "@/Components/Admin/Table/ClientRow";
import HeadActionCell from "@/Components/Admin/Table/HeadActionCell";
import PaginationBar from "@/Components/PaginationBar";
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from "react";

export default function Clients({clients}) {

    const { data, setData, post, processing, errors, reset } = useForm({
        page: clients.meta.current_page,
        id: '',
        prenom: '',
        nom: '',
        email: '',
        telephone: ''
    });

    const resetClientData = () => {
        reset("id", "prenom", "nom", "email", "telephone");
    }

    const [ editableId, seteditableId ] = useState(0);
    const [ toggledMenuId, setToggledMenuId ] = useState(0);

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.client.update'));
    };

    useEffect(() =>
    {
        if(Object.keys(errors).length == 0)
        {
            seteditableId(0);
            setToggledMenuId(0);
        }
        else
        {
            let errorMsg = ""
            Object.keys(errors).forEach((k) => {
                errorMsg += "- " + errors[k] + "\n";
            })

            alert(errorMsg);
            console.log(errors);
        }

    }, [errors])

    return (
        <AdminLayout title="Clients">
            <form method="post" onSubmit={submit}>
                <table className="border w-full table-fixed">
                    <thead>
                        <tr>
                            <HeadCell title="Nom" width="72"/>
                            <HeadCell title="Prénom" width="72"/>
                            <HeadCell title="Courriel" width="96"/>
                            <HeadCell title="Téléphone" width="48"/>
                            <HeadCell title="Date création" width="32"/>
                            <HeadActionCell/>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.data.map((c, i) =>
                            <ClientRow client={c} key={i} editableId={editableId} seteditableId={seteditableId} data={data} setData={setData} resetData={resetClientData} toggledMenuId={toggledMenuId} setToggledMenuId={setToggledMenuId} page={clients.meta.current_page}/>
                        )}
                    </tbody>
                </table>
            </form>

            <PaginationBar links={clients.meta.links} />
        </AdminLayout>
    )
}
