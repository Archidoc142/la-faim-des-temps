import { useState } from "react";
import { useForm } from "@inertiajs/react";

import AdminLayout from "@/Layouts/AdminLayout";
import HeadCell from "@/Components/Admin/Table/HeadCell";
import CommandeRow from "@/Components/Admin/Table/CommandeRow";
import HeadActionCell from "@/Components/Admin/Table/HeadActionCell";
import PaginationBar from "@/Components/PaginationBar";
import SearchBar from "@/Components/SearchBar";

export default function Commandes({ commandes }) {
    const [toggledMenuId, setToggledMenuId] = useState(0);

    const { data, setData, error } = useForm({
        search: "",
    });

    const searchHandler = (e) => {
        // e.preventDefault();
        // get(route('admin.commandes'), { search: data.search });
    };

    return (
        <AdminLayout title="Commandes">
            <form onSubmit={searchHandler}>
                <SearchBar
                    labelName="search"
                    placeHolder="Rechercher une commande"
                    data={data}
                    setData={setData}
                    error={error}
                />
            </form>
            {commandes.data.length === 0 ? (
                <div className="text-center py-4 text-lg text-gray-500 font-bold italic">Aucune commande</div>
            ) : (
                <>
                    <table className="border w-full table-fixed">
                        <thead>
                            <tr>
                                <HeadCell title="Numéro de facture" width="36" />
                                <HeadCell title="Numéro QuickBooks" width="36" />
                                <HeadCell title="Client" width="48" />
                                <HeadCell title="Montant" width="36" />
                                <HeadCell title="Date de Vente" width="36" />
                                <HeadActionCell />
                            </tr>
                        </thead>
                        <tbody>
                            {commandes.data.length > 0 ? (
                                commandes.data.map((c, i) => (
                                    <CommandeRow
                                        commande={c}
                                        key={i}
                                        showClient={true}
                                        toggledMenuId={toggledMenuId}
                                        setToggledMenuId={setToggledMenuId}
                                        page={commandes.meta.current_page}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-lg text-gray-500 font-bold italic">
                                        Aucun résultat trouvé
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <PaginationBar links={commandes.meta.links} />
                </>
            )}
        </AdminLayout>
    )
}
