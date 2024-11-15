import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import PhoneInput, { format, normalize } from "react-phone-input-auto-format";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
    userType
}) {
    const [t, i18n] = useTranslation("global");
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            nom: user.data.nom,
            prenom: user.data.prenom,
            telephone: user.data.telephone,
            email: user.data.email,
        });

    const submit = (e) => {
        e.preventDefault()

        patch(route("profile.update"))
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    {t("Compte.prinfo")}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {t("Compte.updpr")}
                </p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6 space-y-6 bg-[#F7F6F6] shadow-md sm:shadow-none rounded-lg p-4 sm:p-0"
            >
                <div className="sm:flex justify-between">
                    <div className="mb-4 sm:w-[48%]">
                        <InputLabel htmlFor="nom" value={t("Compte.nom")} />

                        <TextInput
                            id="nom"
                            className="mt-1 block w-full bg-white rounded-md"
                            defaultValue={user.data.nom}
                            onChange={(e) => setData("nom", e.target.value)}
                            required
                            isFocused
                            autoComplete="nom"
                        />

                        <InputError className="mt-2" message={errors.nom} />
                    </div>

                    <div className="sm:w-[48%]">
                        <InputLabel
                            htmlFor="prenom"
                            value={t("Compte.prenom")}
                        />

                        <TextInput
                            id="prenom"
                            className="mt-1 block w-full bg-white rounded-md"
                            defaultValue={user.data.prenom}
                            onChange={(e) => setData("prenom", e.target.value)}
                            required
                            autoComplete="prenom"
                        />

                        <InputError className="mt-2" message={errors.prenom} />
                    </div>
                </div>

                <div className="sm:flex justify-between">
                    <div className="mb-4 sm:w-[48%]">
                        <InputLabel
                            htmlFor="telephone"
                            value={t("Compte.telephone")}
                        />

                        <PhoneInput
                            id="telephone"
                            onChange={(e) => {
                                setData("telephone", normalize(e));
                            }}
                            value={user.data.telephone == null ? "" : user.data.telephone}
                            placeholder={user.data.telephone == null ? t("Compte.vide") : null}
                            className="bg-white mt-1 block w-full border-t-transparent border-x-transparent border-b-[#BB285C] focus:border-[#7A163C] focus:ring-[#7A163C] shadow-sm  rounded-md"
                        />

                        <InputError
                            className="mt-2"
                            message={errors.telephone}
                        />
                    </div>

                    <div className="sm:w-[48%]">
                        <InputLabel
                            htmlFor="email"
                            value={t("Compte.courriel")}
                        />

                        <TextInput
                            id="email"
                            type="email"
                            className={"mt-1 block w-full bg-white rounded-md" + ( userType != 0 ? " text-gray-400 hover:cursor-not-allowed" : "")}
                            defaultValue={user.data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            disabled={userType != 0}
                            autoComplete="username"
                            max="100"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        {t("Compte.save")}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            {t("Compte.saved")}.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
