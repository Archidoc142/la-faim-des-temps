import { useState } from "react"
import ActionCell from "./ActionCell"
import Cell from "./Cell"
import EditableCell from "./EditableCell"

export default function HoraireRow({ horaire, toggledMenuId, setToggledMenuId, resetData, setData, seteditableId, editableId, data }) {

    const op1 = horaire.ouvert ? "Enlever" : "Ajouter"

    const options = [
        { label: `${op1} cette date`, route: "/admin/horaire/toggle/" + horaire.id, type: "POST" },
    ]

    const setJourData = () => {
        setData({
            "id": horaire.id,
            "heure_ouverture": horaire.heure_ouverture,
            "heure_fermeture": horaire.heure_fermeture,
        })
    }

    const [editMode, setEditMode] = useState(false);

    return (
        <tr className="h-10" >
            <Cell className="cursor-pointer">{horaire.jour_fr}</Cell>
            <Cell>{horaire.ouvert ? "Oui" : "Non"}</Cell>
            {
                horaire.id == editableId ?
                    <>
                        <EditableCell value={data.heure_ouverture} name="heure_ouverture" setData={setData} />
                        <EditableCell value={data.heure_fermeture} name="heure_fermeture" setData={setData} />
                    </> :
                    <>
                        <Cell>{horaire.heure_ouverture ? horaire.heure_ouverture : "Aucune"}</Cell>
                        <Cell>{horaire.heure_fermeture ? horaire.heure_fermeture : "Aucune"}</Cell>
                    </>
            }

            <ActionCell
                id={horaire.id}
                options={options}
                toggledMenuId={toggledMenuId}
                setToggledMenuId={setToggledMenuId}
                resetData={resetData}
                setData={setJourData}
                setEditMode={setEditMode}
                editable={true}
                setEditableId={seteditableId}
                editableId={editableId}
            />
        </tr>
    )
}
