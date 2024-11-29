import { useEffect, useRef, useState } from "react"
import PanierChoix from "./PanierChoix"
import PanierLivraison from "./PanierLivraison"
import PanierFinal from "./PanierFinal"
import EnvoiCommande from "./EnvoiCommande"
import AddAddress from "./AddAddress"
import { useForm } from "@inertiajs/react"

export default function PanierFinalisation({panier, prix, setBoxVisible, adresses, secteurs, codesValides, seuilGratuit}) {

    // boxVisible - 0 = PanierChoix
    // boxVisible - 1 = PanierLivraison
    // boxVisible - 2 = PanierFinal
    // boxVisible - 3 = AddAddress
    // boxVisible - 4 = EnvoiCommande

    const [contentBox, setContentBox] = useState(0)
    const [adresse, setAdresse] = useState({nom: null, montant: 0, code_postal: ""})

    const [secteur, setSecteur] = useState(null);

    const [submitting, setSubmitting] = useState(false)
    const [enLigne, setEnLigne] = useState(false)

    const out = useRef(null);
    useOutside(out);

    // id_secteur_code et visible seront géré dans le controller
    const { data, setData, post, errors, processing } = useForm({
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

    function useOutside(ref) {
        const submittingRef = useRef(submitting);

        useEffect(() => {
            submittingRef.current = submitting;
        }, [submitting]);

        useEffect(() => {
            function handleClickOutside(e) {
                if (out.current && !out.current.contains(e.target) && !submittingRef.current) {
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
            <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50 z-40"></div>

            <div className="absolute w-full flex justify-center top-[15%] left-0 p-4 z-50">
                <div ref={out} className={"bg-white w-[450px] sm:w-[500px] p-4 px-6 rounded-lg border-black border-2 " + (contentBox === 2 ? "h-full pb-8 !w-[420px] !px-4 " : "") + (contentBox === 1 ? "!w-[500px] " : "") + (contentBox === 2 && adresse.id === 0 ? "!h-[550px]" : "")}>
                    {/* Content*/}
                    {contentBox === 0 ? <PanierChoix data={data} setData={setData} setSecteur={setSecteur} setContentBox={setContentBox} setBoxVisible={setBoxVisible} setAdresse={setAdresse} /> : null}
                    {contentBox === 1 ? <PanierLivraison data={data} setSecteur={setSecteur} seuilGratuit={seuilGratuit} secteurs={secteurs} setData={setData} setContentBox={setContentBox} setBoxVisible={setBoxVisible} adresses={adresses} setAdresse={setAdresse} /> : null}
                    {contentBox === 2 ? <PanierFinal secteurs={secteurs} secteur={secteur} post={post} data={data} setData={setData} setContentBox={setContentBox} setBoxVisible={setBoxVisible} prix={prix} adresse={adresse} submitting={submitting} setSubmitting={setSubmitting} setEnLigne={setEnLigne}/> : null}
                    {contentBox === 3 ? <AddAddress seuilGratuit={seuilGratuit} setSecteur={setSecteur} codesValides={codesValides} secteurs={secteurs} setContentBox={setContentBox} setBoxVisible={setBoxVisible} setAdresse={setAdresse} data={data} setData={setData} /> : null}
                    {contentBox === 4 ? <EnvoiCommande data={data} post={post} setSubmitting={setSubmitting} enLigne={enLigne} /> : null}
                </div>
            </div>
        </div>
    )
}
