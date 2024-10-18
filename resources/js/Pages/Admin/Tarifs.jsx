import AdminLayout from "@/Layouts/AdminLayout";
import HeadCell from "@/Components/Admin/Table/HeadCell";
import HeadActionCell from "@/Components/Admin/Table/HeadActionCell";
import { useEffect, useState } from "react";
import TarifRow from "@/Components/Admin/Table/TarifRow";
import { useForm } from "@inertiajs/react";

export default function Tarifs({ tarifs }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: "",
        montant: "",
    });

    const resetTarifData = () => {
        reset("id", "nom", "montant");
    };

    const [editableId, seteditableId] = useState(0);
    const [toggledMenuId, setToggledMenuId] = useState(0);

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.tarif.update"));
    };

    useEffect(() => {
        if (Object.keys(errors).length == 0) {
            seteditableId(0);
            setToggledMenuId(0);
        } else {
            let errorMsg = "";
            Object.keys(errors).forEach((k) => {
                errorMsg += "- " + errors[k] + "\n";
            });

            alert(errorMsg);
            console.log(errors);
        }
    }, [errors]);

    return (
        <AdminLayout title="Tarifs">
            <form method="post" onSubmit={submit}>
                <table className="border w-full table-fixed">
                    <thead>
                        <tr>
                            <HeadCell title="nom" width="96" />
                            <HeadCell title="montant" width="72" />
                            <HeadActionCell />
                        </tr>
                    </thead>
                    <tbody>
                        {tarifs.data.map((t, i) => (
                            <TarifRow
                                tarif={t}
                                key={i}
                                editableId={editableId}
                                seteditableId={seteditableId}
                                data={data}
                                setData={setData}
                                resetData={resetTarifData}
                                toggledMenuId={toggledMenuId}
                                setToggledMenuId={setToggledMenuId}
                            />
                        ))}
                    </tbody>
                </table>
            </form>
        </AdminLayout>
    );
}
