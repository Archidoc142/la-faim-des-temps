import { useState } from "react"
import ActionCell from "./ActionCell"
import Cell from "./Cell"
import EditableCell from "./EditableCell";

export default function ClientRow({ client, editableId, seteditableId, data, setData, resetData, toggledMenuId, setToggledMenuId, page }) {

    const options = [
        {label: "Consulter", route: "/admin/client/" + client.id}
    ]

    const [editMode, setEditMode] = useState(false);

    const setClientData = () => {
        setData({
            "page": page,
            "id": client.id,
            "prenom": client.prenom,
            "nom": client.nom,
            "email": client.email,
            "telephone": client.telephone_plain
        })
    }


    return (
        <tr className="h-10">
            {
                client.id == editableId ?
                <>
                    <EditableCell value={data.nom} name="nom" setData={setData}/>
                    <EditableCell value={data.prenom} name="prenom" setData={setData}/>
                    <EditableCell value={data.email} name="email" setData={setData}/>
                    <EditableCell value={data.telephone} name="telephone" setData={setData}/>
                </> :
                <>
                    <Cell>{client.nom}</Cell>
                    <Cell>{client.prenom}</Cell>
                    <Cell>{client.email}</Cell>
                    <Cell>{client.telephone}</Cell>

                </>
            }
            <Cell>{client.created_at}</Cell>
            <ActionCell
                id={client.id}
                options={options}
                editable={true}
                editableId={editableId}
                setEditMode={setEditMode}
                setEditableId={seteditableId}
                setData={setClientData}
                resetData={resetData}
                toggledMenuId={toggledMenuId}setToggledMenuId={setToggledMenuId}
            />
        </tr>
    )
}
