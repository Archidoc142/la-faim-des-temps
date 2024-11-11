import React from 'react';
import { useForm } from '@inertiajs/react';
import TextAreaInput from '@/Components/TextAreaInput';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function AddTarifForm({ setPopupActif }) {
    const { data, setData, post } = useForm({
        montant: "",
        nomFR: "",
        descriptionFR: "",
        nomEN: "",
        descriptionEN: "",
    });

    function submit(e) {
        e.preventDefault();
        setPopupActif(false);

        post('/admin/tarif', {
            preserveScroll: true,
            onError: (errors) => { setPopupActif(true); alert(errors[0]); },
        });
    }

    return (
        <form method="post" onSubmit={submit}>
            <div className="z-40">
                <div onClick={() => setPopupActif(false)} className="z-20 hover:cursor-pointer fixed top-0 left-0 w-full h-screen bg-black opacity-50"></div>

                <div className="fixed top-0 left-0 w-full h-screen z-40">
                    <div className="absolute w-full flex justify-center top-[50%] translate-y-[-50%] left-0 p-4">
                        <div onClick={() => setPopupActif(false)} className="hover:cursor-pointer fixed top-0 left-0 w-full h-screen z-20"></div>

                        <div className="flex flex-col gap-y-2 bg-white rounded-md p-6 z-40 w-[550px]">
                            <div className="flex flex-nowrap justify-end align-right w-full mb-2">
                                <svg onClick={() => setPopupActif(false)} fill="black" height="160px" width="200px" className="h-fit self-center max-w-7 hover:fill-[#7A163C] cursor-pointer" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xmlSpace="preserve" stroke="none" >
                                    <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
                                </svg>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <InputLabel 
                                    htmlFor="montant" 
                                    value="Montant:" 
                                    className='text-xl'
                                />
                                <TextInput
                                    id="montant"
                                    type="number"
                                    name="montant"
                                    value={data.montant}
                                    className="border rounded-md p-2 mt-1"
                                    autoComplete=""
                                    isFocused={true}
                                    placeholder="Ajoutez un montant"
                                    onChange={(e) => setData('montant', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <InputLabel 
                                    htmlFor="nomFR" 
                                    value="Nom (Français):" 
                                    className='text-xl'
                                />
                                <TextInput
                                    id="nomFR"
                                    type="text"
                                    name="nomFR"
                                    value={data.nomFR}
                                    className="border rounded-md p-2 mt-1"
                                    autoComplete=""
                                    isFocused={false}
                                    placeholder="Ajoutez un nom en Français"
                                    onChange={(e) => setData('nomFR', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <InputLabel 
                                    htmlFor="descriptionFR" 
                                    value="Description (Français):" 
                                    className='text-xl'
                                />
                                <TextAreaInput
                                    id="descriptionFR"
                                    type="text"
                                    name="descriptionFR"
                                    value={data.descriptionFR}
                                    className="mt-1 block w-full"
                                    autoComplete=""
                                    isFocused={false}
                                    placeholder="Ajoutez une description en Français"
                                    onChange={(e) => setData('descriptionFR', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <InputLabel 
                                    htmlFor="nomEN" 
                                    value="Nom (Anglais):" 
                                    className='text-xl'
                                />
                                <TextInput
                                    id="nomEN"
                                    type="text"
                                    name="nomEN"
                                    value={data.nomEN}
                                    className="border rounded-md p-2 mt-1"
                                    autoComplete=""
                                    isFocused={false}
                                    placeholder="Ajoutez un nom en Anglais"
                                    onChange={(e) => setData('nomEN', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <InputLabel 
                                    htmlFor="descriptionEN" 
                                    value="Desciption (Anglais):" 
                                    className='text-xl'
                                />
                                <TextAreaInput
                                    id="descriptionEN"
                                    type="text"
                                    name="descriptionEN"
                                    value={data.descriptionEN}
                                    className="mt-1 block w-full"
                                    autoComplete=""
                                    isFocused={false}
                                    placeholder="Ajoutez une description en Anglais"
                                    onChange={(e) => setData('descriptionEN', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex justify-end mt-2">
                                <button type="submit" className="p-2 w-60 rounded-md text-lg bg-[#7A163C] text-white font-bold hover:cursor-pointer hover:bg-slate-700">Ajouter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}