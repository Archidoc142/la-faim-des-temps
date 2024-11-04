import Panier from "@/Components/PanierSVG"
import Camion from "@/Components/CamionSVG"
import { useTranslation } from "react-i18next"

export default function PanierChoix({ data, setData, setContentBox, setBoxVisible, setSecteur }) {

    const [t, i18n] = useTranslation("global")

    const handleCueilletteChoice = () => {
        let newData = data;

        newData.adresse = null
        newData.adresse_id = 0
        newData.livraison = false
        newData.frais_livraison = 0

        setData(newData)
        setSecteur("cueillette")
        setContentBox(2)
    }

    const handleLivraisonChoice = () => {
        setData("livraison", true)
        setContentBox(1)
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
            <div className="flex gap-4 sm:p-2 mb-4">
                <div
                    className="bg-[#AAA] rounded-xl w-[48%] sm:w-[50%] h-[160px] sm:h-[200px] flex flex-col text-center cursor-pointer hover:bg-gray-500"
                    onClick={() => handleLivraisonChoice()}>
                    <Camion  text={t("Panier.livraison")} />
                </div>

                <div
                    className="bg-[#AAA] rounded-xl w-[48%] sm:w-[50%] h-[160px] sm:h-[200px] flex flex-col text-center cursor-pointer hover:bg-gray-500"
                    onClick={() => handleCueilletteChoice()}>
                    <Panier text={t("Panier.cueillette")} />
                </div>
            </div>
        </>
    )
}
