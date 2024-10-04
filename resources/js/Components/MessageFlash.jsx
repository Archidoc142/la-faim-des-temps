import { useEffect, useState } from "react";

export default function MessageFlash({ status, message, visibility, duration = 3, setVisibility }) {

    let showMessage
    const [visible, setVisible] = useState(false)

    const setMessage = () => {
        setVisible(false)
        setVisibility(false)
    }

    useEffect(() => {
        setVisible(visibility)
    }, [visibility])

    useEffect(() => {
        if (visible) {
            showMessage = setTimeout(setMessage, duration * 1000)
        }
    }, [visible])

    return (
        <div className="w-full flex justify-center">
            {visible ?
            <div className={`p-2 rounded-lg text-center w-[70%] text-white text-xl fixed border-2 top-[14%]
             ${status === 1 ? " bg-[#398e3d] border-[#23692a]" :
                        status === 2 ? " bg-[#fac02e] border-[#a38322]" :
                            status === 3 ? " bg-[#d32f2e] border-[#86211f]" : null
                    }`}>

                    <p>{message}</p>
            </div> : null}
        </div>
    )
}
