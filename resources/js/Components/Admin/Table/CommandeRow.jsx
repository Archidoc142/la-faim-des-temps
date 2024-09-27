import ActionCell from "./ActionCell"
import Cell from "./Cell"

export default function CommandeRow({commande}) {

    const options = [
        {label: "Consulter", route: "/admin/commande/" + commande.id}
    ]

    return (
        <tr>
            <Cell>{commande.id}</Cell>
            <Cell>{commande.user.prenom + " " + commande.user.nom}</Cell>
            <Cell>{commande.total}</Cell>
            <Cell>{commande.created_at}</Cell>
            <ActionCell options={options}/>
        </tr>
    )
}