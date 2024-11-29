import { Head, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import StarsComment from "@/Components/starsComment";
import { useEffect, useState } from "react";

export default function Avis() {

    const [t, i18n] = useTranslation("global");

    // Demander à Yannick pour une valeur par défaut
    const [note, setNote] = useState(4)
    const [submitting, setSubmitting] = useState(false)
    const { data, setData, post, errors, processing } = useForm({
        note: note,
        comment: ''
    })

    const submit = (e) => {
        e.preventDefault();

        if(!submitting)
        {
            post('/avis');
            setSubmitting(true);
        }

    };

    useEffect(() => {
        setNote(data.note)
    }, [data])

    return (
        <div className="bg-white min-h-screen">
            <Head title={t("Onglet.avis")} />

            <div className="bg-[#7A163C] flex justify-center text-white text-2xl font-bold py-4">{t("Avis.addAvis")}</div>

            <form onSubmit={submit}>
                <div className="bg-[#EBEBEB] p-6 w-[70%] my-8 rounded-lg shadow-xl mx-auto md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%]">
                    <p className="text-center text-xl mb-12">{t("Avis.avisDesc")}</p>

                    <p className="text-2xl font-bold mb-2">Note</p>
                    <StarsComment note={note} setData={setData} />

                    <p className="text-2xl font-bold mb-2 mt-6">{t("Avis.comment")}</p>
                    <textarea
                        id="comment"
                        maxLength="255"
                        className="w-full min-h-44 max-h-[100px]"
                        onChange={(e) => setData('comment', e.target.value)}
                    />
                </div>

                <div className="flex justify-center">
                    <button className={(submitting ? "bg-gray-400 hover:cursor-not-allowed" : "bg-[#7A163C] hover:bg-[#550F2A]")+ " text-white font-bold rounded-md py-2 px-12"}>{t("Avis.send")}</button>
                </div>
            </form>
        </div>
    )
}
