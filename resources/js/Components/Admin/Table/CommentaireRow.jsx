import { useState } from "react"
import ActionCell from "./ActionCell"
import Cell from "./Cell"
import EditableCell from "./EditableCell";
import StarsComment from "@/Components/StarsComment";

export default function CommentaireRow({ commentaire, toggledMenuId, setToggledMenuId, page }) {

    const options = [
        { label: "Afficher/Cacher", route: "/admin/commentaire/toggle/" + commentaire.id, type: "PATCH" },
        { label: "Supprimer", route: "/admin/commentaire/destroy/" + commentaire.id, type: "DELETE" }
    ]

    return (
        <tr className="h-10">
            {
                <>
                    <Cell>{commentaire.commentaire ? commentaire.commentaire : "---"}</Cell>
                    <Cell>{commentaire.utilisateur}</Cell>
                    <Cell className=""><StarsComment note={commentaire.note} updatable={false} className="justify-center" /></Cell>
                    <Cell>{commentaire.masque ? "Oui" : "Non"}</Cell>
                </>
            }
            <ActionCell
                id={commentaire.id}
                options={options}
                toggledMenuId={toggledMenuId}
                setToggledMenuId={setToggledMenuId}
            />
        </tr>
    )
}
