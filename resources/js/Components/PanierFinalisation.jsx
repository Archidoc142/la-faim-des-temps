import { useEffect, useRef, useState } from "react"
import PanierChoix from "./PanierChoix"
import PanierLivraison from "./PanierLivraison"
import PanierFinal from "./PanierFinal"
import AddAddress from "./AddAddress"
import { useForm, usePage } from "@inertiajs/react"

export default function PanierFinalisation({panier, prix, setBoxVisible, adresses}) {

    // boxVisible - 0 = PanierChoix
    // boxVisible - 1 = PanierLivraison
    // boxVisible - 2 = PanierFinal
    // boxVisible - 3 = AddAddress
    const [contentBox, setContentBox] = useState(0)
    const [adresse, setAdresse] = useState({nom: null, montant: 0, code_postal: ""})

    const out = useRef(null);
    useOutside(out);

    // id_secteur_code et visible seront géré dans le controller
    const { data, setData, post, errors, processing } = useForm({
        client: usePage().props.auth.user.data.id,
        allergenes: "",

        livraison: false,
        frais_livraison: 0,
        sous_total: prix,
        total: prix,

        adresse_exists: false,
        adresse_id: 0,
        adresse: null,

        produits: panier
    })

    /*useEffect(() => {
        setData("livraison", livraison)
        if(!livraison)
            setFraisLivraison(0)
    }, [livraison])

    useEffect(() => {
        setData("frais_livraison", fraisLivraison)
    }, [fraisLivraison])*/

    function useOutside(ref) {
        useEffect(() => {
            function handleClickOutside(e) {
                if (out.current && !out.current.contains(e.target)) {
                    setBoxVisible(false)
                }
            }

            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [out])
    };

    return (
        <div id="finalisation">
            <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50"></div>

            <div ref={out} className="absolute w-full flex justify-center top-[12%] left-0 p-4">
                <div className={"bg-white w-[450px] sm:w-[500px] p-4 px-6 rounded-lg border-black border-2 " + (contentBox === 2 ? "h-[610px] !w-[420px] !px-4 " : "") + (contentBox === 1 ? "!w-[500px] " : "") + (contentBox === 2 && adresse.id === 0 ? "!h-[550px]" : "")}>
                    {/* Content*/}
                    {contentBox === 0 ? <PanierChoix data={data} setData={setData} setContentBox={setContentBox} setBoxVisible={setBoxVisible} setAdresse={setAdresse} /> : null}
                    {contentBox === 1 ? <PanierLivraison data={data} setData={setData} setContentBox={setContentBox} setBoxVisible={setBoxVisible} adresses={adresses} setAdresse={setAdresse} /> : null}
                    {contentBox === 2 ? <PanierFinal data={data} setData={setData} setContentBox={setContentBox} setBoxVisible={setBoxVisible} prix={prix} adresse={adresse} /> : null}
                    {contentBox === 3 ? <AddAddress setContentBox={setContentBox} setBoxVisible={setBoxVisible} setAdresse={setAdresse} data={data} setData={setData}  /> : null}
                </div>
            </div>
        </div>
    )
}
