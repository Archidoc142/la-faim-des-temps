import { useEffect, useState, useRef } from "react";
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';

export default function MessageFlash({ status, message, visibility, duration = 3, setVisibility }) {

    let showMessage
    const [visible, setVisible] = useState(false)
    const container = useRef()

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

            return () => clearTimeout(showMessage);
        }
    }, [visible])

    useGSAP(() => {
        gsap.fromTo(
            container.current,
            { x: 0 },
            { x: (window.innerWidth * 0.95) - container.current.offsetWidth, ease: "power1.out"})
    }, [visible])

    return (
        <div ref={container} className="fixed left-4 top-40 min-w-[350px]">
            {visible ?
                <div className={`flex gap-4 items-center px-4 rounded-[20px] text-center text-white bg-gradient-to-r from-[#15181c] to-[#0d1c3d] text-xl font-bold  border-2 top-[8%] py-4
             ${status === 1 ? "border-[#21543f]" :
                        status === 2 ? "border-[#dcb43a]" :
                            status === 3 ? "border-[#86211f]" : null
                    }`}>

                    {status === 1 ?
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                            <path d="M16.0303 10.0303C16.3232 9.73744 16.3232 9.26256 16.0303 8.96967C15.7374 8.67678 15.2626 8.67678 14.9697 8.96967L10.5 13.4393L9.03033 11.9697C8.73744 11.6768 8.26256 11.6768 7.96967 11.9697C7.67678 12.2626 7.67678 12.7374 7.96967 13.0303L9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L16.0303 10.0303Z M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" stroke="#21543f" fill="#21543f" strokeWidth={1} />
                        </svg> :
                        status === 2 ?
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#a38322" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01"></path>
                            </svg> :
                            status === 3 ?
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2 A10 10 0 1 1 12 22 A10 10 0 1 1 12 2 M15 9 L9 15 M9 9 L15 15" stroke="#86211f" strokeWidth={2} />
                                </svg>

                                : null}

                    <p>{message}</p>
                </div> : null}
        </div>
    )
}
