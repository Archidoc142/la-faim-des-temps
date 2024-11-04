import Title from "./InfoText/Title";
import Text from "./InfoText/Text";
import Image from "./InfoText/Image";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextAreaInput from '@/Components/TextAreaInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';


export default function Producteur({
    producteur, 
    langue, 
    editableId,
    seteditableId,
    resetData,
    toggledMenuId,
    setToggledMenuId
}) {
    const imgFile = '/img/';

    function upload(e) {
        if (e.target.files[0].type.includes("image/")) {
            setImgSrc(URL.createObjectURL(e.target.files[0]));
            setFilename(e.target.files[0].name);
            setData("img", e.target.files[0]);
        }
        else {
            alert("Fichier invalide.");
        }
    }

    const { data, setData, post, errors, reset } = useForm({
        nom: producteur.nom,
        filename: producteur.image.nom_fichier,
        url: producteur.url,
        descriptionFR: producteur.description['fr'],
        descriptionEN: producteur.description['en'],
        adresse: producteur.adresse,
    });

    return (
            <>
                <div
                    className={`${producteur.id % 2 === 0 ? 'bg-[#7A163C80]' : ''} my-5 rounded-lg m-3 py-4 lg:m-8`}
                    id='newProducteur'
                >
                    <div className='lg:grid lg:grid-cols-2 lg:p-4'>
                        {
                            !editable ? (
                                <>
                                    <Image producteur={producteur}/>
                                    <div className={`${producteur.id % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                                        <Title url={producteur.url} nom={producteur.nom} />

                                        <Text description={producteur.description[langue]} adresse={producteur.adresse} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <img 
                                        className={`${producteur.id % 2 === 0 ? '' : 'lg:order-1'} m-auto px-10 py-2 lg:pl-6 lg:w-5/6`} 
                                        src={ imgFile + producteur.image.nom_fichier} 
                                        alt={"image " + producteur.nom}
                                    />

                                    <div className='lg:order-3'>
                                        <p className="italic text-center mb-6 text-white">{producteur.image.nom_fichier}</p>

                                        <div className="bg-[#7A163C] py-2 px-3 flex flex-nowrap w-fit rounded hover:bg-slate-700 cursor-pointer m-auto mb-6 relative">
                                            <svg className="self-center" width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="#fff" fillRule="evenodd" d="M11.5,3 C13.9852814,3 16,5.01375071 16,7.49783811 C16,7.58918732 15.9972755,7.6799005 15.9919032,7.76990088 L16,7.76976423 L15.999,8.997 C18.1421954,8.99711747 19.8910789,10.6802769 19.9951047,12.7956514 L20,12.9951958 C20,15.136362 18.3160315,16.8844053 16.1996403,16.9883812 L16,16.9932741 C15.9996653,16.9932741 15.9993306,16.9932741 15.9989959,16.993274 L16,17 L10.999,17 L10.9996688,13.0768434 L13.463273,13.0764006 L10,9.00384337 L6.5456688,13.0791659 L8.9996688,13.0778434 L8.999,17 L4,17 C1.79031836,16.9927317 -1.8189894e-12,15.2029389 -1.8189894e-12,12.9951958 C-1.8189894e-12,11.0615262 1.37340211,9.44847778 3.19839432,9.07741965 C3.0701163,8.74470702 3,8.38269974 3,8.00432379 C3,6.34826553 4.34314575,5.00576505 6,5.00576505 C6.55131242,5.00576505 7.06789096,5.154407 7.51180935,5.41378283 C8.26266931,3.97924323 9.76692243,3 11.5,3 Z" />
                                            </svg>
                                            <p className="ml-3 text-white font-bold">Remplacer l'image</p>
                                            <input
                                                type="file"
                                                name="image"
                                                id="image"
                                                className="opacity-0 absolute top-0 left-0 w-full h-full hover:cursor-pointer"
                                                onChange={upload}
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>
                                    <div className='order-2'>
                                        <div>
                                            <InputLabel 
                                                htmlFor="nom" 
                                                value="Nom du producteur:" 
                                                className='text-[#296ACF]'
                                            />

                                            <TextInput
                                                id="nom"
                                                type="text"
                                                name="nom"
                                                value={data.nom}
                                                className="mt-1 block w-full"
                                                autoComplete=""
                                                placeholder="Nom du producteur"
                                                onChange={(e) => setData('nom', e.target.value)}
                                                required
                                            />

                                            <InputError message={errors.nom} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel 
                                                htmlFor="url" 
                                                value="Lien vers le site du producteur:" 
                                                className='text-[#296ACF]'
                                            />

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
                                                <InputLabel 
                                                    htmlFor="descriptionFR" 
                                                    value="Description du producteur (Français):" 
                                                    className='text-[#296ACF]'
                                                />

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
                                                <InputLabel 
                                                    htmlFor="descriptionEN" 
                                                    value="Description du producteur (Anglais):" 
                                                    className='text-[#296ACF]'
                                                />

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
                                            <InputLabel 
                                                htmlFor="adresse" 
                                                value="Adresse du producteur:" 
                                                className='text-[#296ACF]'
                                            />

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
                                    </div>
                                </>
                            )
                    }
                    </div>
                </div>
            </>
    )
}