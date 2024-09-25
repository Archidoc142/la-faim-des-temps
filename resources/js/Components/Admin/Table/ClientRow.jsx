import ActionCell from "./ActionCell"
import Cell from "./Cell"

export default function ClientRow({client}) {

    const options = [
        {label: "Consulter", route: "/admin/client/" + client.id}
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
