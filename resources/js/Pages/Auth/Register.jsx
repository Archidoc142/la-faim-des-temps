import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import PhoneInput, { format, normalize } from "react-phone-input-auto-format";
import logoRect from '../../../../public/img/logo-rect.jpg';
import logoBig from '../../../../public/img/logo-big.jpg';

export default function Register() {

    const [t, i18n] = useTranslation("global");
    const params = new URLSearchParams(document.location.search);
    const redirectToPanier = !!params.get("target");

    const { data, setData, post, processing, errors, reset } = useForm({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        password: '',
        password_confirmation: '',
        redirectToPanier: redirectToPanier
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />


            <div className="w-full m-0 py-10 md:py-20 md:w-[75%] md:m-auto ">

                <div className='bg-white rounded-lg m-6 min-h-[80%] 2xl:min-h-[90%] border-2 border-[#BB285C]'>
                    <div className='text-center p-3 text-2xl font-bold border-b-2 border-[#BB285C]'>{t("Compte.titre")}</div>
                    <div className='flex w-[100%] justify-center'>
                        <div className='hidden lg:flex items-center border-r-2 border-r-[#BB285C] w-[40%] p-6'>
                            <img src={logoBig} alt="La faim des temps logo-big-img" />
                        </div>

                        <div className='w-[95%] lg:w-[60%]'>
                            <div className='p-10 2xl:px-16 '>
                                <h2 className='text-center font-bold text-2xl mb-8 mt-2'>{t("Compte.bienvenue")}</h2>

                                <div className='bg-[#f7f6f6] rounded-md text-center p-6 2xl:pt-10 lg:px-10 lg:pb-12 md:text-end'>
                                    <form onSubmit={submit} className='bg-[#F7F6F6] text-start p-3 md:p-7 lg:px-10 pb-10'>
                                        <div>
                                            <InputLabel htmlFor="prenom" value={t("Compte.prenom")} />

                                            <TextInput
                                                id="prenom"
                                                name="prenom"
                                                value={data.prenom}
                                                className="mt-1 block w-full"
                                                autoComplete="prenom"
                                                isFocused={true}
                                                onChange={(e) => setData('prenom', e.target.value)}
                                                required
                                            />

                                            <InputError message={errors.prenom} className="mt-2" />
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel htmlFor="nom" value={t("Compte.nom")} />

                                            <TextInput
                                                id="nom"
                                                name="nom"
                                                value={data.nom}
                                                className="mt-1 block w-full"
                                                autoComplete="nom"
                                                onChange={(e) => setData('nom', e.target.value)}
                                                required
                                            />

                                            <InputError message={errors.nom} className="mt-2" />
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel htmlFor="email" value={t("Compte.courriel")} />

                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="mt-1 block w-full"
                                                max="100"
                                                autoComplete="email"
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                            />

                                            <InputError message={errors.email} className="mt-2" />
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel htmlFor="telephone" value={t("Compte.telephone")} />

                                            <PhoneInput
                                                id="telephone"
                                                onChange={(tel) => { setData('telephone', normalize(tel));}}
                                                className="bg-[#F7F6F6] mt-1 block w-full border-t-transparent border-x-transparent border-b-[#BB285C] focus:border-[#7A163C] focus:ring-[#7A163C] shadow-sm"
                                            />

                                            <InputError message={errors.telephone} className="mt-2" />
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel htmlFor="password" value={t("Compte.mdp")} />

                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="mt-1 block w-full"
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                            />

                                            <InputError message={errors.password} className="mt-2" />
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel htmlFor="password_confirmation" value={t("Compte.confirmer_mdp")} />

                                            <TextInput
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                className="mt-1 block w-full"
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                required
                                            />

                                            <InputError message={errors.password_confirmation} className="mt-2" />
                                        </div>

                                        <div className="flex items-center justify-center mt-10">
                                            <PrimaryButton className="ms-4 !bg-[#0844A4] hover:!bg-gray-600" disabled={processing}>
                                                {t("Compte.inscription")}
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                    <Link
                                        href={"/login" + (redirectToPanier ? "?target=panier&fromRegister=1" : "")}
                                        className="w-fit mt-3 p-3 underline text-sm text-[#0844A4] hover:text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 justify-self-center md:justify-self-end"
                                    >
                                        {t("Compte.deja_inscrit")}
                                    </Link>
                                </div>

                                <img src={logoRect} alt="La faim des temps logo-rect-img" className='mt-10 lg:hidden' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
