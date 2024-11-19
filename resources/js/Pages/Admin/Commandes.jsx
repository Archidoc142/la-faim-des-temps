import { useState } from "react";

import AdminLayout from "@/Layouts/AdminLayout";
import HeadCell from "@/Components/Admin/Table/HeadCell";
import CommandeRow from "@/Components/Admin/Table/CommandeRow";
import HeadActionCell from "@/Components/Admin/Table/HeadActionCell";
import PaginationBar from "@/Components/PaginationBar";
import Commande from "@/Pages/Admin/Commande";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SearchBar from "@/Components/SearchBar";
export default function Commandes({ commandes }) {
    const [toggledMenuId, setToggledMenuId] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const searchHandler = (searchInput) => {
        setSearchInput(searchInput);

        if (searchInput !== "") {
            const newCommandes = commandes.data.filter((commande) => {
                // Object.values(commande)[0] == numéro de facture
                // Object.values(commande)[6] == information du client
                return (
                    Object.values(commande)[0].toString().toLowerCase().includes(searchInput.toLowerCase()) ||
                    Object.values(commande)[6].nom.toLowerCase().includes(searchInput.toLowerCase()) || 
                    Object.values(commande)[6].prenom.toLowerCase().includes(searchInput.toLowerCase())
                );
                });
            setSearchResult(newCommandes);
        } else {
            setSearchResult(commandes);
        }
    };

    return (
        <AdminLayout title="Commandes">
            {commandes.data.length === 0 ? (
                <div className="text-center py-4 text-lg text-gray-500 font-bold italic">Aucune commandes</div>
            ) : (
                <>
                    <SearchBar
                        labelName="Recherche: "
                        placeHolder={"Nom du client"}
                        value={searchInput}
                        setValue={setSearchInput}
                        searchWord={searchHandler}
                    />
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
                            {searchInput.length < 1 ? (
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
                                searchResult.length > 0 ? (
                                    searchResult.map((c, i) => (
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
                                )
                            )}
                        </tbody>
                    </table>
                    <PaginationBar links={commandes.meta.links} />
                </>
            )}
        </AdminLayout>
    )
}
