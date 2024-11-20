import HoraireRow from "@/Components/Admin/Table/HoraireRow";
import HeadActionCell from "@/Components/Admin/Table/HeadActionCell";
import HeadCell from "@/Components/Admin/Table/HeadCell";
import AdminLayout from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";

export default function Commentaires({ horaire }) {

    const [toggledMenuId, setToggledMenuId] = useState(0)
    const [ editableId, seteditableId ] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
        heure_ouverture: '',
        heure_fermeture: '',
    });

    const resetHoraireData = () => {
        reset("id", "heure_ouverture", "heure_fermeture");
    }

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.horaire.update'));
    };

    useEffect(() => {
        if (Object.keys(errors).length == 0) {
            seteditableId(0);
            setToggledMenuId(0);
        }
        else {
            let errorMsg = ""
            Object.keys(errors).forEach((k) => {
                errorMsg += "- " + errors[k] + "\n";
            })

            alert(errorMsg);
            console.log(errors);
        }

    }, [errors])

    return (
        <AdminLayout title="Horaire">
            <form method="post" onSubmit={submit}>
                <table className="border w-full table-fixed">
                    <thead>
                        <tr>
                            <HeadCell title="Jour" width="72" />
                            <HeadCell title="ouvert" width="72" />
                            <HeadCell title="Heure d'ouverture" width="72" />
                            <HeadCell title="Heure de fermeture" width="72" />
                            <HeadActionCell />
                        </tr>
                    </thead>
                    <tbody>
                        {horaire.map((h, i) => (
                            <HoraireRow
                                horaire={h}
                                key={i}
                                toggledMenuId={toggledMenuId}
                                setToggledMenuId={setToggledMenuId}
                                resetData={resetHoraireData}
                                setData={setData}
                                editableId={editableId}
                                seteditableId={seteditableId}
                                data={data}
                            />
                        ))}
                    </tbody>
                </table>
            </form>
        </AdminLayout>
    );
}
