import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function EnvoiCommande({post, enLigne}) {

    useEffect(() => {
        const routeName = enLigne ? 'checkout' : 'envoiCommande';
        post(route(routeName))
    }, [])

    return (
    <div className="my-3">
        <h2 className="font-bold text-2xl text-center">Envoi de votre commande...</h2>
        <div className="flex justify-center items-center h-36 my-3">
            <LoadingSpinner size={72}/>
        </div>
    </div>);
}
