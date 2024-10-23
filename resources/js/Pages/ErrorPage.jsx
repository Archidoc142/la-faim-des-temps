import { Head } from "@inertiajs/react"
import { useTranslation } from "react-i18next"

export default function ErrorPage({ status }) {
    const [t, i18n] = useTranslation("global")

    const title = {
        503: t("Error.503"),
        500: t("Error.500"),
        404: t("Error.404"),
        403: t("Error.403")
      }[status]

      const description = {
        503: t("Error.503Desc"),
        500: t("Error.500Desc"),
        404: t("Error.404Desc"),
        403: t("Error.403Desc")
      }[status]

      return (
        <div className="flex gap-8 flex-col justify-center items-center h-screen text-center text-white font-bold text-4xl">
            <Head title={t("Error.title") + status} />

            <h1>{title}</h1>
            <p>{description}</p>
        </div>
      )
}
