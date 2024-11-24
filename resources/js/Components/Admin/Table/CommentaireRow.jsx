import { useEffect } from "react";
import ActionCell from "./ActionCell"
import Cell from "./Cell"
import StarsComment from "@/Components/StarsComment";

export default function CommentaireRow({ commentaire, toggledMenuId, setToggledMenuId, page, setCommentaireShow, setCommentaire }) {

    const options = [
        { label: "Supprimer", route: "/admin/commentaire/destroy/" + commentaire.id, type: "DELETE" },
    ]

    const label = commentaire.masque ? "Cacher" : "Afficher"

    if (typeof commentaire.commentaire === "string") {
        options.unshift({ label: label, route: "/admin/commentaire/toggle/" + commentaire.id, type: "PATCH" })
    }

    const toggleVisibility = () => {
        setCommentaire(commentaire)
        setCommentaireShow(true)
    }

    return (
        <tr className="h-10" >

            <Cell className="cursor-pointer" onClick={() => toggleVisibility()}>
                {commentaire.commentaire ?
                    commentaire.commentaire.length >= 30 ?
                        commentaire.commentaire.substring(0, 30) + "..."
                        : commentaire.commentaire
                    : "---"}
            </Cell>
            <Cell>{commentaire.utilisateur}</Cell>
            <Cell className=""><StarsComment note={commentaire.note} updatable={false} className="justify-center" /></Cell>
            <Cell>{commentaire.masque ? "Oui" : "Non"}</Cell>

            <ActionCell
                id={commentaire.id}
                options={options}
                toggledMenuId={toggledMenuId}
                setToggledMenuId={setToggledMenuId}
            />
        </tr>
    )
}
