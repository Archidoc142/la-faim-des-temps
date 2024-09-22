import { useState } from 'react'
import ellipsis from '../../../../../public/icons/action.png'
import { Link } from '@inertiajs/react'

export default function ActionCell({id, options, editable}) {

    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <>
            <td className="relative border even:bg-gray-100 text-center py-3 flex items-center justify-center">
                <button onClick={() => setMenuVisible(!menuVisible)}>
                    <img src={ellipsis} alt="Action" width={32}/>
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
                        { editable ? <div className='flex items-center justify-center w-full py-1'>Modifier</div> : ""}
                    </div> :
                    ""
                }
            </td>
        </>
    )
}
