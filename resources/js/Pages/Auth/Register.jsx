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

    const { data, setData, post, processing, errors, reset } = useForm({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        password: '',
        password_confirmation: '',
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
                <table className='border-none md: border-2 border-[#BB285C] border-separate w-full'>
                    <thead>
                        <tr>
                            <th className="bg-white text-2xl border-b-2 border-[#BB285C] md:border-2  py-2 rounded-t-2xl" colSpan={2}>{t("Compte.titre")}</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr className='md:grid grid-cols-[35%_65%]'>
                            <td className='bg-white hidden md:flex border-2 border-[#BB285C] items-center rounded-bl-2xl'>
                                <img src={logoBig} alt="La faim des temps logo-big-img" />
                            </td>
                            <td className='bg-white border-t-2 border-r-0 border-b-0 rounded-b-2xl md:border-r-2 md:border-y-2 border-[#BB285C] p-10 md:rounded-bl-none grid'>
                                <div className='text-xl font-bold w-full text-center md:text-start'>{t("Compte.bienvenue")}</div>

                                <form onSubmit={submit} className='bg-[#F7F6F6] p-10 md:p-20 md:pb-10 mt-5'>
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
                                            isFocused={true}
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
                                            onChange={(tel) => { setData('telephone', normalize(tel)); console.log(data.telephone) }}
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
                                    href={route('login')}
                                    className="w-fit mt-3 p-3 underline text-sm text-[#0844A4] hover:text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 justify-self-center md:justify-self-end"
                                >
                                    {t("Compte.deja_inscrit")}
                                </Link>
                                <img src={logoRect} alt="La faim des temps logo-rect-img" className='mt-10 md:hidden' />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
