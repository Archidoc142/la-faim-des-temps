import AdminLayout from "@/Layouts/AdminLayout";
import HeadCell from "@/Components/Admin/Table/HeadCell";
import HeadActionCell from "@/Components/Admin/Table/HeadActionCell";
import { useEffect, useState } from "react";
import TarifRow from "@/Components/Admin/Table/TarifRow";
import AddTarifForm from "@/Components/Admin/AddTarifForm";
import { useForm } from "@inertiajs/react";

export default function Tarifs({ tarifs, formats }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        id: "",       // L'id de la rangé
        idIndex: "", // L'id de l'item dans la BD : Format | Tarif Livraison
        montant: "",
        type: "",
    });

    const [popupActif, setPopupActif] = useState(false)

    const resetTarifData = () => {
        reset("id", "idIndex", "montant", "type");
    };

    const [editableId, seteditableId] = useState(0);
    const [toggledMenuId, setToggledMenuId] = useState(0);

    const submit = (e) => {
        e.preventDefault();

        if (data.type === "tarif") {
            post(route("admin.tarif.updateTarif"));
        } else {
            post(route("admin.tarif.updateFormat"));
        }
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

    let id = 0

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
                        {tarifs.data.map(t => {
                            id += 1

                            return <TarifRow
                                tarif={t}
                                type={"tarif"}
                                id={id}
                                key={id}
                                editableId={editableId}
                                seteditableId={seteditableId}
                                data={data}
                                setData={setData}
                                resetData={resetTarifData}
                                toggledMenuId={toggledMenuId}
                                setToggledMenuId={setToggledMenuId}
                            />
                        })}

                        {formats.data.map(f => {
                            id += 1

                            return <TarifRow
                                tarif={f}
                                type={"format"}
                                id={id}
                                key={id}
                                editableId={editableId}
                                seteditableId={seteditableId}
                                data={data}
                                setData={setData}
                                resetData={resetTarifData}
                                toggledMenuId={toggledMenuId}
                                setToggledMenuId={setToggledMenuId}
                            />
                        })}
                    </tbody>
                </table>
            </form>
            <div className="flex justify-end mt-4">
                <button onClick={() => setPopupActif(true)} className="p-2 w-60 rounded-md text-lg bg-[#7A163C] text-white font-bold hover:cursor-pointer hover:bg-slate-700">Ajouter un tarif</button>
            </div>

            {popupActif ?
                <AddTarifForm
                    setPopupActif={setPopupActif}
                />
                : null}
        </AdminLayout >
    );
}
