import { useForm } from "@inertiajs/react"
import { useTranslation } from "react-i18next"

export default function ButtonAddress({ data, setData, adresse, nom, setContentBox, setAdresse, code_postal }) {

    const [t, i18n] = useTranslation("global")
    const { delete: destroy } = useForm()

    const handleAdresseChange = () => {
        //setAdresse({ id: adresse.id, nom: nom, montant: adresse.montant, code_postal: code_postal })

        let newData = data;

        newData.adresse_id = adresse.id
        newData.adresse_exists = true
        newData.frais_livraison = adresse.montant

        if(adresse.no_app)
            newData.adresse = adresse.nom + ", Appt " + adresse.no_app + " (" + adresse.code_postal + ")"
        else
            newData.adresse = adresse.nom + " (" + adresse.code_postal + ")"

        setData(newData)

        setContentBox(2)
    }

    const submit = (e) => {
        e.preventDefault()
        if (confirm(t("Panier.alertSuccess"))) {
            destroy(`/adresse/${adresse.id}`)
        }
    }

    return (
        <div className="flex justify-center items-center relative text-center overflow-hidden cursor-pointer rounded-lg">
            <form onSubmit={submit}>
                <button type="submit" className="trash-can">
                    <svg width="20" height="24" viewBox="0 0 464 596" className='absolute right-3 top-3'>
                        <path fill="black" d="M 1.00,34.00 C 1.00,34.00 108.00,34.00 108.00,34.00 110.09,34.00 113.06,34.12 115.00,33.40 118.34,32.17 122.42,27.58 125.00,25.00 129.06,20.95 145.43,3.81 149.00,2.02 151.43,0.81 154.35,1.01 157.00,1.00 157.00,1.00 308.00,1.00 308.00,1.00 310.65,1.01 313.57,0.81 316.00,2.02 319.57,3.81 335.94,20.95 340.00,25.00 345.28,30.27 347.18,33.85 355.00,34.00 355.00,34.00 464.00,34.00 464.00,34.00 464.00,34.00 464.00,99.00 464.00,99.00 464.00,99.00 1.00,99.00 1.00,99.00 1.00,99.00 1.00,34.00 1.00,34.00 Z M 34.00,133.00 C 34.00,133.00 431.00,133.00 431.00,133.00 431.00,133.00 431.00,395.00 431.00,395.00 431.00,395.00 431.00,527.00 431.00,527.00 430.58,562.39 405.20,594.94 368.00,595.00 368.00,595.00 97.00,595.00 97.00,595.00 86.36,594.98 79.45,593.04 70.00,588.24 45.98,576.06 34.04,553.37 34.00,527.00 34.00,527.00 34.00,133.00 34.00,133.00 Z M 303.00,247.00 C 303.00,247.00 277.00,272.00 277.00,272.00 277.00,272.00 232.00,317.00 232.00,317.00 227.55,310.78 215.94,299.94 210.00,294.00 210.00,294.00 180.00,264.28 180.00,264.28 180.00,264.28 168.00,253.02 168.00,253.02 166.49,251.58 164.24,249.20 162.00,249.20 158.78,249.20 151.45,257.55 149.00,260.00 149.00,260.00 115.00,295.00 115.00,295.00 115.00,295.00 166.00,346.00 166.00,346.00 166.00,346.00 178.99,358.17 178.99,358.17 178.99,358.17 182.96,364.00 182.96,364.00 182.96,364.00 178.99,370.00 178.99,370.00 178.99,370.00 166.00,383.00 166.00,383.00 166.00,383.00 134.00,415.00 134.00,415.00 134.00,415.00 115.00,435.00 115.00,435.00 115.00,435.00 149.00,469.00 149.00,469.00 151.45,471.45 158.78,479.80 162.00,479.80 164.24,479.80 166.49,477.42 168.00,475.98 168.00,475.98 181.00,463.00 181.00,463.00 181.00,463.00 233.00,411.00 233.00,411.00 233.00,411.00 268.00,447.00 268.00,447.00 268.00,447.00 303.00,481.00 303.00,481.00 313.83,470.17 342.46,444.53 350.00,434.00 350.00,434.00 299.00,383.00 299.00,383.00 299.00,383.00 286.01,370.00 286.01,370.00 284.59,368.52 282.04,366.20 282.04,364.00 282.04,360.79 293.30,350.70 296.00,348.00 296.00,348.00 335.00,309.00 335.00,309.00 337.68,306.32 347.80,297.38 347.80,294.00 347.80,290.78 339.45,283.45 337.00,281.00 337.00,281.00 303.00,247.00 303.00,247.00 Z" />
                    </svg>
                </button>
            </form>

            <div
                className="bg-[#AAA] hover:bg-gray-500 px-2 py-12 w-36 h-36 flex items-center justify-center"
                onClick={() => handleAdresseChange()}
            >
                <p className="text-white font-bold">{adresse.nom}</p>
            </div>
        </div>

    )
}
