import CommentaireRow from "@/Components/Admin/Table/CommentaireRow";
import HeadActionCell from "@/Components/Admin/Table/HeadActionCell";
import HeadCell from "@/Components/Admin/Table/HeadCell";
import PaginationBar from "@/Components/PaginationBar";
import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";

export default function Commentaires({ commentaires }) {
    console.log(commentaires);
    const [ toggledMenuId, setToggledMenuId ] = useState(0);

    return (
        <AdminLayout title="Commentaires">
            <p>* Afficher un commentaire le met visible dans l'accueil, mais il y a une limite de 10 commentaires maximums</p>
            <br />

            <table className="border w-full table-fixed">
                <thead>
                    <tr>
                        <HeadCell title="Commentaire" width="72" />
                        <HeadCell title="Client" width="72" />
                        <HeadCell title="note" width="72" />
                        <HeadCell title="Dans l'accueil" width="72" />
                        <HeadActionCell />
                    </tr>
                </thead>
                <tbody>
                    {commentaires.data.map((c, i) => (
                        <CommentaireRow
                            commentaire={c}
                            key={i}
                            toggledMenuId={toggledMenuId}
                            setToggledMenuId={setToggledMenuId}
                            page={commentaires.meta.current_page}
                        />
                    ))}
                </tbody>
            </table>

            <PaginationBar links={commentaires.meta.links} />
        </AdminLayout>
    );
}
