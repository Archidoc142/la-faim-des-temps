import { useState } from "react"
import PanierChoix from "./PanierChoix"

export default function PanierFinalisation({setBoxVisible}) {

    // boxVisible - 0 = PanierChoix
    // boxVisible - 1 = PanierLivraison
    // boxVisible - 2 = PanierFinal
    const [contentBox, setContentBox] = useState(0)

    return (
        <div id="finalisation">
            <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50"></div>

            {/* Content*/}
            <div className="absolute w-full h-screen flex justify-center top-0 left-0 p-4">
                <div className="fixed top-[15%] bg-white w-[500px] p-4 rounded-lg border-black border-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-2xl">Passer une commande</h2>

                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="cursor-pointer" onClick={() => setBoxVisible(false)}>
                            <path d="M18 6 L6 18"></path>
                            <path d="M6 6 L18 18"></path>
                        </svg>
                    </div>

                    {contentBox === 0 ? <PanierChoix setContentBox={setContentBox} /> : null}
                </div>
            </div>
        </div>
    )
}
