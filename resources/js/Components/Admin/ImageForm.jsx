import { useEffect, useState } from "react";
import { router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react'
import SaisonCheckbox from "./SaisonCheckbox";

export default function ImageForm({ image, setPopupActif }) {

    const imgUrl = '../../../img/';

    const [imgSrc, setImgSrc] = useState(imgUrl + (image ? image.src : "placeholder_img.png"));
    const [filename, setFilename] = useState(image ? image.src : "")

    const [anneeSelected, setAnneeSelected] = useState(image ? !image.saisonnier : true);

    const saisons = ["Automne", "Hiver", "Printemps", "Été"];

    const { data, setData, post } = useForm({
        img: null,
        imgExists: !!image,
        imgId: image ? image.id : null,

        descriptionFr: image ? image.legende.fr : "",
        descriptionEn: image ? image.legende.en : "",

        saisonnier: image ? image.saisonnier : false,
        saisons: image ? image.saisons : [false, false, false, false]
    })

    useEffect(() => {
        setData("saisonnier", !anneeSelected);
    }, [anneeSelected]);

    function handleSaisonChange(id) {
        let newCheckbox = data.saisons;
        newCheckbox[id] = !data.saisons[id];
        setData("saisons", newCheckbox);
    }

    function submit(e) {
        e.preventDefault();
        setPopupActif(false);
        post('/admin/image', {
            preserveScroll: true,
            onError: (errors) => {
                setPopupActif(true);
                alert(errors[0]);
            }
        });
    }

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

    function deleteImage(id) {
        const imgData = {
            id: id,
        };

        setPopupActif(false);

        router.post('/admin/del-image', imgData, {
            preserveScroll: true,
            onError: (errors) => { alert(errors[0]); }
        });
    }

    return (
        <form onSubmit={submit}>
            <div className="z-40">
                <div onClick={() => setPopupActif(false)} className="z-20 hover:cursor-pointer fixed top-0 left-0 w-full h-screen bg-black opacity-50"></div>

                <div className="fixed top-0 left-0 w-full h-screen z-40">
                    <div className="absolute w-full flex justify-center top-[50%] translate-y-[-50%] left-0 p-4">
                        <div onClick={() => setPopupActif(false)} className="hover:cursor-pointer fixed top-0 left-0 w-full h-screen z-20"></div>

                        <div className="bg-white w-[850px] rounded-md p-6 z-40">
                            <div className="flex flex-nowrap justify-between align-middle w-full mb-10">
                                <h2 className="text-3xl font-bold">{image ? "Modifier une image" : "Ajouter une nouvelle image"}</h2>
                                <svg onClick={() => setPopupActif(false)} fill="black" height="160px" width="200px" className="h-fit self-center max-w-8 hover:fill-[#7A163C] cursor-pointer" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xmlSpace="preserve" stroke="none" >
                                    <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
                                </svg>
                            </div>
                            <img className="h-52 mb-2 m-auto" src={imgSrc} alt={image ? image.alt : "image vide"} />
                            <p className="italic text-sm text-center mb-6">{filename}</p>

                            <div className="bg-[#7A163C] py-2 px-3 flex flex-nowrap w-fit rounded hover:bg-slate-700 cursor-pointer m-auto mb-6 relative">
                                <svg className="self-center" width="18px" height="18px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#fff" fillRule="evenodd" d="M11.5,3 C13.9852814,3 16,5.01375071 16,7.49783811 C16,7.58918732 15.9972755,7.6799005 15.9919032,7.76990088 L16,7.76976423 L15.999,8.997 C18.1421954,8.99711747 19.8910789,10.6802769 19.9951047,12.7956514 L20,12.9951958 C20,15.136362 18.3160315,16.8844053 16.1996403,16.9883812 L16,16.9932741 C15.9996653,16.9932741 15.9993306,16.9932741 15.9989959,16.993274 L16,17 L10.999,17 L10.9996688,13.0768434 L13.463273,13.0764006 L10,9.00384337 L6.5456688,13.0791659 L8.9996688,13.0778434 L8.999,17 L4,17 C1.79031836,16.9927317 -1.8189894e-12,15.2029389 -1.8189894e-12,12.9951958 C-1.8189894e-12,11.0615262 1.37340211,9.44847778 3.19839432,9.07741965 C3.0701163,8.74470702 3,8.38269974 3,8.00432379 C3,6.34826553 4.34314575,5.00576505 6,5.00576505 C6.55131242,5.00576505 7.06789096,5.154407 7.51180935,5.41378283 C8.26266931,3.97924323 9.76692243,3 11.5,3 Z" />
                                </svg>
                                <p className="ml-3 text-white text-sm font-bold">{image ? "Remplacer l'image" : "Ajouter une image"}</p>
                                <input type="file" name="file" id="file" className="opacity-0 absolute top-0 left-0 w-full h-full hover:cursor-pointer" onChange={upload} accept="image/*" required={!!!image} />
                            </div>

                            <label htmlFor={"desc_fr"} className='font-bold'>Description <span className="text-[#2563eb]">française</span> de l'image</label> <br />
                            <textarea className="w-full mt-1 mb-6 text-sm" rows={1} name={"desc_fr"} id={"desc_fr"}
                                placeholder="Cette description s'affichera comme légende dans la page d'accueil en FRANÇAIS."
                                value={data.descriptionFr}
                                onChange={(e) => { setData("descriptionFr", e.target.value) }}
                                required
                            ></textarea>

                            <label htmlFor={"desc_en"} className='font-bold'>Description <span className="text-[#2563eb]">anglaise</span> de l'image</label> <br />
                            <textarea className="w-full mt-1 mb-6 text-sm" rows={1} name={"desc_en"} id={"desc_en"}
                                placeholder="Cette description s'affichera comme légende dans la page d'accueil en ANGLAIS."
                                value={data.descriptionEn}
                                onChange={(e) => { setData("descriptionEn", e.target.value) }}
                                required
                            ></textarea>


                            <div className="flex flex-nowrap mb-10">
                                <p className='font-bold mr-12'>Saison</p>

                                <div>
                                    <div className="flex flex-nowrap">
                                        <input onClick={() => setAnneeSelected(true)} defaultChecked={anneeSelected} className="border-[#2563eb] self-center mr-2" type="radio" id="annee" name="annee_saison" value="Toute l'année" />
                                        <label htmlFor="annee">Toute l'année</label>

                                        <input onClick={() => setAnneeSelected(false)} defaultChecked={!anneeSelected} className="border-[#2563eb] self-center ml-8 mr-2" type="radio" id="saison" name="annee_saison" value="Saison(s)" />
                                        <label htmlFor="saison">Saison(s)</label>
                                    </div>
                                    <div className={(anneeSelected ? "text-slate-300 " : "") + "flex flex-nowrap mt-2"}>
                                        {saisons.map((saison, i) => <SaisonCheckbox data={data} key={i} checked={data.saisons[i]} saison={saison} index={i} enabled={!anneeSelected} handleSaisonChange={handleSaisonChange} />)}
                                    </div>
                                </div>
                            </div>

                            <div className={(image ? "justify-between " : "justify-end ") + "flex flex-nowrap align-middle w-full"}>
                                {image ?
                                    <button type="button" onClick={() => deleteImage(image.id)} className="bg-red-700 text-white text-sm font-bold py-1.5 px-3 w-40 rounded hover:bg-slate-700 cursor-pointer">Supprimer</button>
                                    : null
                                }
                                <button type="submit" className="bg-[#06306D] text-white text-sm font-bold py-1.5 px-3 w-40 rounded hover:bg-slate-700 cursor-pointer">Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
