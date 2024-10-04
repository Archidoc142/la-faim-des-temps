import { useState } from "react"
import PanierChoix from "./PanierChoix"
import PanierLivraison from "./PanierLivraison"
import PanierFinal from "./PanierFinal"
import AddAddress from "./AddAddress"

export default function PanierFinalisation({prix, setBoxVisible, adresses}) {

    // boxVisible - 0 = PanierChoix
    // boxVisible - 1 = PanierLivraison
    // boxVisible - 2 = PanierFinal
    // boxVisible - 3 = AddAddress
    const [contentBox, setContentBox] = useState(0)
    const [adresse, setAdresse] = useState({id: 0, nom: "", montant: 0})

    return (
        <div id="finalisation">
            <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50"></div>

            <div className="absolute w-full flex justify-center top-[12%] left-0 p-4">
                <div className={"bg-white w-[450px] sm:w-[500px] p-4 px-6 rounded-lg border-black border-2 " + (contentBox === 2 ? "h-[600px] !w-[420px] !px-4" : "") + (contentBox === 1 ? "!w-[500px]" : "")}>
                    {/* Content*/}
                    {contentBox === 0 ? <PanierChoix setContentBox={setContentBox} setBoxVisible={setBoxVisible} setAdresse={setAdresse} /> : null}
                    {contentBox === 1 ? <PanierLivraison setContentBox={setContentBox} setBoxVisible={setBoxVisible} adresses={adresses} setAdresse={setAdresse} /> : null}
                    {contentBox === 2 ? <PanierFinal setBoxVisible={setBoxVisible} prix={prix} adresse={adresse}/> : null}
                    {contentBox === 3 ? <AddAddress setContentBox={setContentBox} setBoxVisible={setBoxVisible} setAdresse={setAdresse} /> : null}
                </div>
            </div>
        </div>
    )
}
