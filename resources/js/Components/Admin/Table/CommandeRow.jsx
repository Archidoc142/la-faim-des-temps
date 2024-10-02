import ActionCell from "./ActionCell"
import Cell from "./Cell"

export default function CommandeRow({commande, showClient, toggledMenuId, setToggledMenuId}) {

    const options = [
        {label: "Consulter", route: "/admin/commande/" + commande.id}
    ]

    return (
        <tr>
            <Cell>{commande.id}</Cell>
            {showClient ? <Cell>{commande.user.prenom + " " + commande.user.nom}</Cell> : null}
            <Cell>{commande.total} $</Cell>
            <Cell>{commande.created_at}</Cell>
            <ActionCell id={commande.id} options={options} toggledMenuId={toggledMenuId}setToggledMenuId={setToggledMenuId} editable={false}/>
        </tr>
    )
}
