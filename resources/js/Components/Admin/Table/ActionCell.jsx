import { useState } from 'react'
import ellipsis from '../../../../../public/icons/action.png'

export default function ActionCell({id, options, editable}) {

    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <>
            <td className="relative border even:bg-gray-100 text-center py-3 flex items-center justify-center">
                <button onClick={() => setMenuVisible(!menuVisible)}>
                    <img src={ellipsis} alt="" width={32}/>
                </button>
                {
                    menuVisible ?
                    <div className='absolute bg-white border border-solid border-gray-300 rounded shadow-lg text-black -bottom-14 right-1/4 w-32 py-1'>
                        { options.map((o, i) =>
                            <div key={i} className='py-1'>
                                {o.label}
                            </div>

                        ) }
                        { editable ? <div className='py-1'>Modifier</div> : ""}
                    </div> :
                    ""
                }
            </td>
        </>
    )
}
