import { useState } from "react"
import ActionCell from "./ActionCell"
import Cell from "./Cell"
import EditableCell from "./EditableCell";

export default function TarifRow({ tarif, id, type, editableId, seteditableId, data, setData, resetData, toggledMenuId, setToggledMenuId }) {

    const [editMode, setEditMode] = useState(false);

    const setTarifData = () => {
        setData({
            "id": id,
            "idIndex": tarif.id,
            "montant": tarif.montant,
            "type": type,
        })
    }

    return(
        <tr className="h-10">
            <Cell className="!text-left pl-4">{ type === "tarif" ? tarif.nom  : tarif.nom['fr'] }</Cell>
            {
                id == editableId ?
                <EditableCell value={data.montant} name="montant" setData={setData}/>  : <Cell>{tarif.montant}</Cell>
            }
            <ActionCell
                id={id}
                editable={true}
                editableId={editableId}
                setEditMode={setEditMode}
                setEditableId={seteditableId}
                setData={setTarifData}
                resetData={resetData}
                toggledMenuId={toggledMenuId}
                setToggledMenuId={setToggledMenuId}
            />
        </tr>
    )
}
