import { useTranslation } from "react-i18next";
import googleLogo from "../../../public/img/google_icon.png";

export default function GoogleLogin({ redirectToPanier }) {
    const [t, i18n] = useTranslation("global");

    return (
        <a href={"/auth/redirect" + (redirectToPanier ? "?target=panier" : "")}>
            <button type="button" className="w-full bg-blue-500 text-white my-4 px-4 py-2 rounded hover:shadow-md h-11">
                <span className="flex gap-3 justify-center items-center">
                    <img src={googleLogo} alt="Google" height={24} width={24} />
                    <p className="leading-4 ">{t("Login.google")}</p>
                </span>
            </button>
        </a>
    );
}
