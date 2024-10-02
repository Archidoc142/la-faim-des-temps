import { useEffect, useState } from "react";

export default function MessageFlash({status, message, visibility, duration = 2, setVisibility}) {

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

    return(
        <div className="fixed bg-red-700">
            <p>{visible ? message : ""}</p>
        </div>
    )
}
