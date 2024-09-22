import ActionCell from "./ActionCell"
import Cell from "./Cell"
import { Option } from "./Option"

export default function ClientRow({client}) {

    const options = [
        new Option("Consulter", "/admin/client/" + client.id)
    ]

    return (
        <tr>
            <Cell>{client.nom}</Cell>
            <Cell>{client.prenom}</Cell>
            <Cell>{client.email}</Cell>
            <Cell>{client.telephone}</Cell>
            <Cell>{client.created_at}</Cell>
            <ActionCell options={options} editable={true}/>
        </tr>
    )
}
