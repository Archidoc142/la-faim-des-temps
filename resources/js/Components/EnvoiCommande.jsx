import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useTranslation } from "react-i18next";

export default function EnvoiCommande({post, enLigne}) {

    const [t, i18n] = useTranslation("global")

    useEffect(() => {
        const routeName = enLigne ? 'checkout' : 'envoiCommande';
        post(route(routeName))
    }, [])

    return (
    <div className="my-3">
        <h2 className="font-bold text-2xl text-center">{t("Panier.envoi_cmd")}...</h2>
        <div className="flex justify-center items-center h-36 my-3">
            <LoadingSpinner size={72}/>
        </div>
    </div>);
}
