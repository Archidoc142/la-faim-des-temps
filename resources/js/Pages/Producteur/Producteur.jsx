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
    data,
    setData,
    errors
}) {
    const imgFile = '/img/';
    let image = null;

    const [imgSrc, setImgSrc] = useState(imgFile +  producteur.filename);
    const [filename, setFilename] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [ editableId, setEditableId ] = useState(0);
    const [ toggledMenuId, setToggledMenuId ] = useState(0);

    const setProducteurData = () => {
        setImgSrc(imgFile + producteur.image.nom_fichier);
        setFilename(producteur.image.nom_fichier);
        setData({
            "id": producteur.id,
            "nom": producteur.nom,
            "filename": producteur.image.nom_fichier,
            "url": producteur.url,
            "descriptionFR": producteur.description["fr"],
            "descriptionEN": producteur.description["en"],
            "adresse": producteur.adresse
        })
    }

    useEffect(() =>
        {
            if(Object.keys(errors).length == 0)
            {
                setEditableId(0);
                setToggledMenuId(0);
            }
            else
            {
                let errorMsg = ""
                Object.keys(errors).forEach((k) => {
                    errorMsg += "- " + errors[k] + "\n";
                })
    
                alert(errorMsg);
                console.log(errors);
            }

        }, [errors])

        const toggleMenu = (e) => {
            if (toggledMenuId != e.target.id) {
                setToggledMenuId(e.target.id);
            } else {
                setToggledMenuId(0);
            }
        };

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

    return (
            <>
                <div
                    className={`${producteur.id % 2 === 0 ? 'bg-[#7A163C80]' : ''} my-5 rounded-lg m-3 py-4 lg:m-8`}
                    id='newProducteur'
                >
                    {editMode ?
                        <div className="flex items-end gap-5 pt-3">
                            <svg onClick={() => {
                                setEditMode(false);
                                setEditableId(0);
                                setToggledMenuId(0);
                                }} 
                                fill="#ffffff" 
                                height="200px" 
                                width="200px" 
                                className="h-fit max-w-8 hover:fill-[#BB285C] cursor-pointer ml-auto" 
                                version="1.1" 
                                id="Capa_1" 
                                xmlns="http://www.w3.org/2000/svg" 
                                xmlnsXlink="http://www.w3.org/1999/xlink" 
                                viewBox="0 0 460.775 460.775" 
                                xmlSpace="preserve" 
                                stroke="none" 
                            >
                                <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
                            </svg>

                            <button type='submit'>
                                <svg width="118px" height="118px" className="h-fit max-w-10  hover:fill-[#BB285C]  mr-9" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" stroke="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z" fill="#fffff" />
                                </svg>
                            </button>
                        </div>
                        :
                        <div className="flex items-end gap-5 pt-3">
                            <svg onClick={() => {
                                setEditMode(true);
                                setProducteurData();
                                setEditableId(producteur.id);
                                toggleMenu({target: {id: producteur.id}});
                                }} 
                                id={producteur.id}
                                width="200px" 
                                height="200px" 
                                viewBox="0 0 24 24" 
                                className="h-fit max-w-10 hover:stroke-[#BB285C] hover:cursor-pointer ml-auto" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="#ffffff" 
                                stroke="#ffffff"
                            >
                                <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#fffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>

                            <svg onClick={() => setEditMode(false)} fill="#ffffff" height="200px" width="200px" className="h-fit max-w-8 hover:fill-[#BB285C] cursor-pointer mr-9" version="1.1" id="Capa_2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xmlSpace="preserve" stroke="none" >
                                <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
                            </svg>
                        </div>
                    }
                    <div className='lg:grid lg:grid-cols-2 lg:p-4'>
                        {
                            editMode && producteur.id == editableId ? (
                                <>
                                <img 
                                    className={`${producteur.id % 2 === 0 ? '' : 'lg:order-1'} m-auto px-10 py-2 lg:pl-6 lg:w-5/6`} 
                                    src={ imgSrc } 
                                    alt={filename}
                                />

                                <div className='lg:order-3'>
                                    <p className="italic text-center mb-6 text-white"> {filename} </p>

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
                                            value={data.url != null ? data.url : ''}
                                            className="mt-1 block w-full"
                                            autoComplete=""
                                            isFocused={false}
                                            placeholder="https://www.site-du-producteur.com"
                                            onChange={(e) => setData('url', e.target.value)}
                                        />

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

                                    </div>
                                </div>
                            </>
                            ) : (
                                <>
                                <Image producteur={producteur}/>
                                <div className={`${producteur.id % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                                    <Title url={producteur.url} nom={producteur.nom} />

                                    <Text description={producteur.description[langue]} adresse={producteur.adresse} />
                                </div>
                            </>
                            )
                    }
                    </div>
                </div>
            </>
    )
}