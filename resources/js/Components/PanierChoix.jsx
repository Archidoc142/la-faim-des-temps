import Panier from "@/Components/PanierSVG"
import Camion from "@/Components/CamionSVG"
import { useState } from "react"

export default function PanierChoix({setContentBox}) {
    return (
        <>
            <p className="font-bold mb-4">Comment voulez-vous recevoir votre commande ?</p>
            <div className="flex gap-8 p-2">
                <div
                    className="bg-[#AAA] rounded-xl w-[50%] h-[200px] flex flex-col text-center cursor-pointer hover:bg-gray-500"
                    onClick={() => setContentBox(1)}>
                    <Camion />
                </div>

                <div
                    className="bg-[#AAA] rounded-xl w-[50%] h-[200px] flex flex-col text-center cursor-pointer hover:bg-gray-500"
                    onClick={() => setContentBox(2)}>
                    <Panier />
                </div>
            </div>
        </>
    )
}
