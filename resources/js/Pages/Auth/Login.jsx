import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import logo from '../../../../public/img/logo-rect.jpg'

export default function Login({ status, canResetPassword }) {

    const [t, i18n] = useTranslation("global");

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className='h-full md:p-8 xl:px-[8rem]'>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className='bg-white rounded-lg m-6 flex min-h-[80%] 2xl:min-h-[90%] border-2 border-gray-500'>
                <div className='hidden lg:block border-r-2 border-r-gray-500 w-[60%] p-6'>
                    {/* div Image*/}
                    <div className='flex h-full'>
                        <img src={logo} alt="image-logo" className='block m-auto w-full' />
                    </div>
                </div>

                <div className='lg:w-[40%]'>
                    {/* div du formulaire (blanc)*/}
                    <div className='p-6 2xl:px-16'>
                        <h2 className='text-center font-bold text-2xl mb-8 mt-2'>{t("Login.title1")}<br />{t("Login.title2")}</h2>

                        {/* div de la partie utile du formulaire (grise)*/}
                        <div className='bg-[#f7f6f6] rounded-md p-6 2xl:pt-10 lg:px-10 lg:pb-24'>
                            <form onSubmit={submit}>

                                <div>
                                    <InputLabel htmlFor="email" value={t("Login.email")} />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">

                                    <InputLabel htmlFor="password" value={t("Login.mdp")} />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="block mt-4 2xl:mt-6">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                        />
                                        <span className="ms-2 text-sm text-gray-600">{t("Login.souvenir")}</span>
                                    </label>
                                </div>

                                <div className='text-right lg:mt-4 2xl:mt-12'>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="underline text-sm text-[#006ce5] hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            {t("Login.mdp_oublie")}
                                        </Link>
                                    )}

                                    <br />

                                    <Link
                                        href={route('register')}
                                        className="underline text-sm text-[#006ce5] hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {t("Login.creer_compte")}
                                    </Link>

                                    <div className="flex justify-center mt-8 2xl:mt-14">
                                        <button className='bg-[#0844a4] text-white font-bold p-2 px-8 rounded-[4px]'>
                                            {t("Login.connexion")}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* logo*/}
                        <img src={logo} alt="image-logo" className='lg:hidden' />
                    </div>
                </div>
            </div>
        </div>
    );
}
