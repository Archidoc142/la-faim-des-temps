import { useState } from 'react'
import { Link } from '@inertiajs/react'
import ActionIcon from './ActionIcon';

import ellipsis from '../../../../../public/icons/action.png'
import exit from '../../../../../public/icons/exit.png'
import save from '../../../../../public/icons/save.png'


export default function ActionCell({id, options, editable, setEditMode, editableId, setEditableId, setData, resetData}) {

    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <>
            <td className="relative border even:bg-gray-100 text-center py-2 h-full flex items-center justify-center">
                <div className={id == editableId ? "flex py-1 gap-3" : "hidden"}>
                    <button type="reset" onClick={() => {
                        resetData();
                        setMenuVisible(false);
                        setEditMode(false);
                        setEditableId(0);
                    }}>
                        <img src={exit} alt="Annuler" width={18}/>
                    </button>
                    <button type="submit">
                        <img src={save} alt="Enregistrer" width={18}/>
                    </button>
                </div>

                <button type="button" className={id == editableId ? "hidden" : "flex"} onClick={() => setMenuVisible(!menuVisible)}>
                    <img src={ellipsis} alt="Action" width={24}/>
                </button>


                {
                    menuVisible ?
                    <div className='absolute bg-white border border-solid border-gray-300 rounded shadow-lg text-black -bottom-14 right-1/4 w-32 z-10 py-1'>
                        { options.map((o, i) =>
                            <Link href={o.route} key={i}>
                                <p className='flex items-center justify-center w-full py-1 hover:bg-gray-300'>
                                    {o.label}
                                </p>
                            </Link>

                        ) }
                        { editable ?
                        <button onClick={() => {
                            setEditMode(true);
                            setMenuVisible(false);
                            setEditableId(id);
                            setData();
                            }} className='flex items-center justify-center w-full py-1 hover:bg-gray-300'>
                            Modifier
                        </button>
                        : ""}
                    </div> :
                    ""
                }
            </td>
        </>
    )
}
