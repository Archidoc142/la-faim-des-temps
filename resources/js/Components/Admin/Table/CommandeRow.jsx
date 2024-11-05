import ActionCell from "./ActionCell"
import Cell from "./Cell"

export default function CommandeRow({commande, showClient, toggledMenuId, setToggledMenuId, setCommandeShow, setCommande}) {

    const toggleVisibility = () => {
        setCommande(commande)
        setCommandeShow(true)
    }

    return (
        <tr>
            <Cell className="cursor-pointer" onClick={() => toggleVisibility()}>{commande.id}</Cell>
            {showClient ? <Cell>{commande.user.prenom + " " + commande.user.nom}</Cell> : null}
            <Cell>{commande.total} $</Cell>
            <Cell>{commande.created_at}</Cell>
        </tr>
    )
}
