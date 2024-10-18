import { useState } from "react"
import ActionCell from "./ActionCell"
import Cell from "./Cell"
import EditableCell from "./EditableCell";

export default function TarifRow({ tarif, editableId, seteditableId, data, setData, resetData, toggledMenuId, setToggledMenuId }) {

    const [editMode, setEditMode] = useState(false);

    const setTarifData = () => {
        setData({
            "id": tarif.id,
            "montant": tarif.montant,
        })
    }

    return(
        <tr className="h-10">
            <Cell className="!text-left pl-4">{tarif.nom}</Cell>
            {
                tarif.id == editableId ?
                <EditableCell value={data.montant} name="montant" setData={setData}/>  : <Cell>{tarif.montant}</Cell>
            }
            <ActionCell
                id={tarif.id}
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
