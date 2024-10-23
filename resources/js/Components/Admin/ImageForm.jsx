import { useState } from "react";
import { router } from '@inertiajs/react';

export default function ImageForm({ image, setPopupActif, token }) {

    const imgUrl = '../../../img/';

    const [anneeSelected, setAnneeSelected] = useState(image ? (image.saisons.length === 4) : true);
    const [descriptionFr, setDescriptionFr] = useState(image ? image.legende.fr : "");
    const [descriptionEn, setDescriptionEn] = useState(image ? image.legende.en : "");

    const [checkbox, setCheckbox] = useState(
        image ? [
            image.saisons.find((s) => s.id === 1) != null,
            image.saisons.find((s) => s.id === 2) != null,
            image.saisons.find((s) => s.id === 3) != null,
            image.saisons.find((s) => s.id === 4) != null]
            : [false, false, false, false]
    )

    //console.log("form", image);
    //console.log("c", checkbox);

    function handleSaisonChange(id, val) {
        checkbox[id] = val;
        //console.log("c", id, val, checkbox);
    }

    function ajouterBd() {
        if(anneeSelected)
            setCheckbox(true, true, true, true);

        const imageData = {
            _token: token,
            saisons: checkbox,
            descfr: descriptionFr,
            descen: descriptionEn
            //image
        };

        router.post('/admin/ajouter-image', imageData, {
            preserveScroll: true,
            onError: (errors) => { alert(errors[0]); }
        });
    }

    function modifierBD() {

    }

    return (
        <div className="z-40">
            <div onClick={() => setPopupActif(false)} className="z-20 hover:cursor-pointer fixed top-0 left-0 w-full h-screen bg-black opacity-50"></div>

            <div className="absolute w-full flex justify-center top-[15%] left-0 p-4">
                <div className="bg-white w-[850px] rounded-md p-6 z-40">
                    <div className="flex flex-nowrap justify-between align-middle w-full mb-10">
                        <h2 className="text-3xl font-bold">{image ? "Modifier une image" : "Ajouter une nouvelle image"}</h2>
                        <svg onClick={() => setPopupActif(false)} fill="black" height="160px" width="200px" className="h-fit self-center max-w-8 hover:fill-[#7A163C] cursor-pointer" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xmlSpace="preserve" stroke="none" >
                            <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
                        </svg>
                    </div>
                    <img className="h-60 mb-2 m-auto" src={imgUrl + (image ? image.src : "placeholder_img.png")} alt={image ? image.alt : "image vide"} />
                    <p className="italic text-center mb-6">{image ? image.src : ""}</p>

                    <div className="bg-[#7A163C] py-2 px-3 flex flex-nowrap w-fit rounded hover:bg-slate-700 cursor-pointer m-auto mb-6">
                        <svg className="self-center" width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#fff" fill-rule="evenodd" d="M11.5,3 C13.9852814,3 16,5.01375071 16,7.49783811 C16,7.58918732 15.9972755,7.6799005 15.9919032,7.76990088 L16,7.76976423 L15.999,8.997 C18.1421954,8.99711747 19.8910789,10.6802769 19.9951047,12.7956514 L20,12.9951958 C20,15.136362 18.3160315,16.8844053 16.1996403,16.9883812 L16,16.9932741 C15.9996653,16.9932741 15.9993306,16.9932741 15.9989959,16.993274 L16,17 L10.999,17 L10.9996688,13.0768434 L13.463273,13.0764006 L10,9.00384337 L6.5456688,13.0791659 L8.9996688,13.0778434 L8.999,17 L4,17 C1.79031836,16.9927317 -1.8189894e-12,15.2029389 -1.8189894e-12,12.9951958 C-1.8189894e-12,11.0615262 1.37340211,9.44847778 3.19839432,9.07741965 C3.0701163,8.74470702 3,8.38269974 3,8.00432379 C3,6.34826553 4.34314575,5.00576505 6,5.00576505 C6.55131242,5.00576505 7.06789096,5.154407 7.51180935,5.41378283 C8.26266931,3.97924323 9.76692243,3 11.5,3 Z" />
                        </svg>
                        <p className="ml-3 text-white font-bold">{image ? "Remplacer l'image" : "Ajouter une image"}</p>
                    </div>

                    <label htmlFor={"desc_fr"} className='text-lg font-bold'>Description <span className="text-[#2563eb]">française</span> de l'image</label> <br />
                    <textarea className="w-full mt-1 mb-6" rows={2} name={"desc_fr"} id={"desc_fr"}
                        placeholder="Cette description s'affichera comme légende dans la page d'accueil en FRANÇAIS."
                        value={image ? descriptionFr : null}
                        onChange={(e) => { setDescriptionFr(e.target.value) }}
                    ></textarea>

                    <label htmlFor={"desc_en"} className='text-lg font-bold'>Description <span className="text-[#2563eb]">anglaise</span> de l'image</label> <br />
                    <textarea className="w-full mt-1 mb-6" rows={2} name={"desc_en"} id={"desc_en"}
                        placeholder="Cette description s'affichera comme légende dans la page d'accueil en ANGLAIS."
                        value={image ? descriptionEn : null}
                        onChange={(e) => { setDescriptionEn(e.target.value) }}
                    ></textarea>


                    <div className="flex flex-nowrap mb-10">
                        <p className='text-lg font-bold mr-12'>Saison</p>

                        <div>
                            <div className="flex flex-nowrap">
                                <input onClick={() => setAnneeSelected(true)} defaultChecked={image ? image.saisons.length == 4 : true} className="border-[#2563eb] self-center mr-2" type="radio" id="annee" name="annee_saison" value="Toute l'année" />
                                <label htmlFor="annee" className='text-lg'>Toute l'année</label>

                                <input onClick={() => setAnneeSelected(false)} defaultChecked={image ? image.saisons.length < 4 : false} className="border-[#2563eb] self-center ml-8 mr-2" type="radio" id="saison" name="annee_saison" value="Saison(s)" />
                                <label htmlFor="saison" className='text-lg'>Saison(s)</label>
                            </div>
                            <div className={(anneeSelected ? "text-slate-300 " : "") + "flex flex-nowrap mt-2"}>

                                <input className={(anneeSelected ? "border-slate-300 " : "border-[#2563eb] ") + "self-center rounded mr-2"}
                                    onChange={() => handleSaisonChange(0, !checkbox[0])}
                                    disabled={anneeSelected}
                                    checked={anneeSelected ? false : null}
                                    defaultChecked={checkbox[0]}
                                    type="checkbox" id="automne" name="saisonChoix" value="Automne" />
                                <label className='text-lg' for="automne">Automne</label>

                                <input className={(anneeSelected ? "border-slate-300 " : "border-[#2563eb] ") + "self-center rounded ml-8 mr-2"}
                                    onChange={() => handleSaisonChange(1, !checkbox[1])}

                                    disabled={anneeSelected}
                                    checked={anneeSelected ? false : null}
                                    defaultChecked={checkbox[1]}
                                    type="checkbox" id="hiver" name="saisonChoix" value="Hiver" />
                                <label className='text-lg' for="hiver">Hiver</label>

                                <input className={(anneeSelected ? "border-slate-300 " : "border-[#2563eb] ") + "self-center rounded ml-8 mr-2"}
                                    onChange={() => handleSaisonChange(2, !checkbox[2])}

                                    disabled={anneeSelected}
                                    checked={anneeSelected ? false : null}
                                    defaultChecked={checkbox[2]}
                                    type="checkbox" id="printemps" name="saisonChoix" value="Printemps" />
                                <label className='text-lg' for="printemps">Printemps</label>

                                <input className={(anneeSelected ? "border-slate-300 " : "border-[#2563eb] ") + "self-center rounded ml-8 mr-2"}
                                    onChange={() => handleSaisonChange(3, !checkbox[3])}

                                    disabled={anneeSelected}
                                    checked={anneeSelected ? false : null}
                                    defaultChecked={checkbox[3]}
                                    type="checkbox" id="ete" name="saisonChoix" value="Été" />
                                <label className='text-lg' for="ete">Été</label>
                            </div>
                        </div>
                    </div>

                    <div className={(image ? "justify-between " : "justify-end ") + "flex flex-nowrap align-middle w-full"}>
                        {image ?
                            <button className="bg-red-700 text-white text-lg font-bold py-1 px-3 w-48 rounded hover:bg-slate-700 cursor-pointer">Supprimer</button>
                            : null
                        }
                        <button onClick={() => image ? modifierBD() : ajouterBd()} className="bg-[#06306D] text-white text-lg font-bold py-1 px-3 w-48 rounded hover:bg-slate-700 cursor-pointer">Enregistrer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
