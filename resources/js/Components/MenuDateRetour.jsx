import { useTranslation } from 'react-i18next';
import { useState, useEffect } from "react";
import autoprefixer from 'autoprefixer';

export default function MenuBase({ date_retour, vendrediYYYY, dateMenuVend, dateMenuLund, changeDateBD }) {

    return (
        <>
            {date_retour !== null ?
                //une date de retour est en place
                <div className="flex flex-wrap lg:mr-[-2.5em]">
                    <p className='w-full font-semibold italic text-white text-end text-lg'>*Ce menu sera caché jusqu'au {date_retour}</p>
                    <div className="flex items-center mt-2 w-full justify-end">
                        <p className='italic text-white text-end text-lg mr-5'>Changer la date programmée du menu pour le </p>
                        <input id="dateRetour"
                            min={vendrediYYYY}
                            defaultValue={vendrediYYYY}
                            type="date"
                            placeholder="Prochaine date d'affichage"
                            onChange={(event) => changeDateBD(1, event.target.value)}></input>
                    </div>
                    <div className="flex items-center mt-2 w-full justify-end">
                        <p className='italic text-white text-end text-lg mr-5'>Supprimer la date programmée du menu (le menu pourra être commandé au prochain vendredi)</p>
                        <svg onClick={() => changeDateBD(1, null)} fill="red" height="200px" width="200px" className="h-fit max-w-5 hover:fill-[#BB285C] cursor-pointer" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xmlSpace="preserve" stroke="none" >
                            <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
                        </svg>
                    </div>
                </div>
                :
                //les dates normales
                <div className="flex flex-wrap lg:mr-[-2.5em]">
                    <p className='w-full font-semibold italic text-white text-end text-lg'>*Ce menu pourra être commandé du {dateMenuVend} au {dateMenuLund}</p>
                    <div className="flex items-center mt-2 w-full justify-end">
                        <p className='italic text-white text-end text-lg mr-5'>Changer manuellement la date de commande du menu pour le </p>
                        <input id="dateRetour"
                            min={vendrediYYYY}
                            defaultValue={vendrediYYYY}
                            type="date"
                            placeholder="Prochaine date de commande"
                            onChange={(event) => changeDateBD(1, event.target.value)}></input>
                    </div>
                </div>
            }
        </>
    )
}
