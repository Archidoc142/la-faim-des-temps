import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextAreaInput from '@/Components/TextAreaInput';
import AddImage from './Form/AddImage';
import { Head, Link, useForm } from '@inertiajs/react';
import { Description } from '@headlessui/react';

export default function AddProducteur() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nom: '',
        url: '',
        descriptionFR: '',
        descriptionEN: '',
        adresse: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('envoiNewProducteur'));
    };

    return (
        <>
            <div className='bg-[#7A163C80] my-5 rounded-lg m-3 py-4 lg:m-8 '>
                <form onSubmit={submit}>
                    <div className='lg:grid lg:grid-cols-2 lg:p-4'>
                        <AddImage />
                        <div className='order-2'>
                            <div>
                                <InputLabel htmlFor="nom" value="Nom du producteur:" />

                                <TextInput
                                    id="nom"
                                    type="text"
                                    name="nom"
                                    value={data.nom}
                                    className="mt-1 block w-full"
                                    autoComplete=""
                                    isFocused={true}
                                    placeholder="Nom du producteur"
                                    onChange={(e) => setData('nom', e.target.value)}
                                    required
                                />

                                <InputError message={errors.nom} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="url" value="lien vers le site du producteur:" />

                                <TextInput
                                    id="url"
                                    type="url"
                                    name="url"
                                    value={data.url}
                                    className="mt-1 block w-full"
                                    autoComplete=""
                                    isFocused={false}
                                    placeholder="https://www.site-du-producteur.com"
                                    onChange={(e) => setData('url', e.target.value)}
                                />

                                <InputError message={errors.url} className="mt-2" />
                            </div>
                            <div>
                                <div>
                                    <InputLabel htmlFor="descriptionFR" value="Description du producteur (Français):" />

                                    <TextAreaInput
                                        id="descriptionFR"
                                        type="text"
                                        name="descriptionFR"
                                        value={data.descriptionFR}
                                        className="mt-1 block w-full"
                                        autoComplete=""
                                        isFocused={false}
                                        placeholder="Ajoutez une description du producteur en Français"
                                        onChange={(e) => setData('descriptionFR', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.descriptionFR} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="descriptionEN" value="Description du producteur (Anglais):" />

                                    <TextAreaInput
                                        id="descriptionEN"
                                        type="text"
                                        name="descriptionEN"
                                        value={data.descriptionEN}
                                        className="mt-1 block w-full"
                                        autoComplete=""
                                        isFocused={false}
                                        placeholder="Ajoutez une description du producteur en Anglais"
                                        onChange={(e) => setData('descriptionEN', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.descriptionEN} className="mt-2" />
                                </div>
                            </div>
                            <div>
                                <InputLabel htmlFor="adresse" value="Adresse du producteur:" />

                                <TextInput
                                    id="adresse"
                                    type="text"
                                    name="adresse"
                                    value={data.adresse}
                                    className="mt-1 block w-full"
                                    autoComplete=""
                                    isFocused={false}
                                    placeholder="Ajoutez l'adresse du producteur"
                                    onChange={(e) => setData('adresse', e.target.value)}
                                    required
                                />

                                <InputError message={errors.adresse} className="mt-2" />
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    type="button"
                                    onClick={() => reset()}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-2 px-8 rounded-[4px] m-5"
                                >
                                    Effacer
                                </button>

                                <button
                                    type="submit"
                                    className="bg-[#0844a4] text-white font-bold p-2 px-8 rounded-[4px] m-5"
                                >
                                    Ajouter le producteur
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}