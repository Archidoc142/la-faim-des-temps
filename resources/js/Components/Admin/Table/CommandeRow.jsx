import ActionCell from "./ActionCell"
import Cell from "./Cell"

export default function CommandeRow({commande, showClient, toggledMenuId, setToggledMenuId, page}) {

    const options = [
        {label: "Consulter", route: "/admin/commande/" + commande.id + "?prevPage=" + page}
    ]

    return (
        <tr>
            <Cell>{commande.id}</Cell>
            <Cell>{commande.qb_invoice_id ? commande.qb_invoice_id : <span className="text-red-600">Non envoyé</span>}</Cell>
            {showClient ? <Cell>{commande.user.prenom + " " + commande.user.nom}</Cell> : null}
            <Cell>{commande.total} $</Cell>
            <Cell>{commande.created_at}</Cell>
            <ActionCell id={commande.id} options={options} toggledMenuId={toggledMenuId} setToggledMenuId={setToggledMenuId} editable={false}/>
        </tr>
    )
}
