import Panier from "@/Components/PanierSVG"
import Camion from "@/Components/CamionSVG"
import { useTranslation } from "react-i18next"

export default function PanierChoix({ setContentBox, setBoxVisible, setAdresse }) {

    const [t, i18n] = useTranslation("global")

    const handleCueilletteChoice = () => {
        setAdresse({id: 1, nom:"297 Rue King Ouest", montant: 0})
        setContentBox(2)
    }

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-2xl">{t("Panier.pass")}</h2>

                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="cursor-pointer" onClick={() => setBoxVisible(false)}>
                    <path d="M18 6 L6 18"></path>
                    <path d="M6 6 L18 18"></path>
                </svg>
            </div>

            <p className="font-bold mb-4">{t("Panier.choice")}</p>
            <div className="flex gap-8 sm:p-2 mb-4">
                <div
                    className="bg-[#AAA] rounded-xl w-[48%] sm:w-[50%] h-[180] sm:h-[200px] flex flex-col text-center cursor-pointer hover:bg-gray-500"
                    onClick={() => setContentBox(1)}>
                    <Camion  text={t("Panier.camion")} />
                </div>

                <div
                    className="bg-[#AAA] rounded-xl w-[48%] sm:w-[50%] h-[180px] sm:h-[200px] flex flex-col text-center cursor-pointer hover:bg-gray-500"
                    onClick={() => handleCueilletteChoice()}>
                    <Panier text={t("Panier.cueillette")} />
                </div>
            </div>
        </>
    )
}
