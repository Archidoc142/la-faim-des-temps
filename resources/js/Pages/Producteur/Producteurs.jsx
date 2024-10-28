import { Head, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from "react";

import Producteur from './Producteur';
import AddProducteur from './AddProducteur';
import AddProducteurButton from './AddProducteurButton';
import PaginationBar from '@/Components/PaginationBar';
import HeadWithImage from '@/Components/HeadWithImage';

export default function Producteurs({ producteurs }) {
    const user = usePage().props.auth.user;

    const [editMode, setEditMode] = useState(false);

    return (
        <>
            <div className='Producteur'>
                <Head title="Nos Producteurs" />

                <HeadWithImage
                    imgFile="/img/producteurBack.jpg"
                    title="Nos Producteurs"
                    button={false}
                    buttonText="none"
                    path="/"
                />

                {producteurs.data.map(producteur => (
                    <div key={producteur.id}>
                        {user && user.data.role == "admin" ?
                            <>
                                {editMode ?
                                    <div className="flex items-end gap-5 pt-3">
                                        <svg onClick={() => setEditMode(false)} fill="#ffffff" height="200px" width="200px" className="h-fit max-w-8 hover:fill-[#BB285C] cursor-pointer ml-auto" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xmlSpace="preserve" stroke="none" >
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
                                        <svg onClick={() => setEditMode(true)} width="200px" height="200px" viewBox="0 0 24 24" className="h-fit max-w-10 hover:stroke-[#BB285C] hover:cursor-pointer ml-auto" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff">
                                            <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                            <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#fffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        </svg>

                                        <svg onClick={() => setEditMode(false)} fill="#ffffff" height="200px" width="200px" className="h-fit max-w-8 hover:fill-[#BB285C] cursor-pointer mr-9" version="1.1" id="Capa_2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xmlSpace="preserve" stroke="none" >
                                            <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
                                        </svg>
                                    </div>
                                }
                            </> : null
                        }
                        <Producteur producteur={producteur} />
                        <hr />
                    </div>
                ))}

                {user && user.data.role == "admin" ?
                    <div>
                        <AddProducteur />
                        <AddProducteurButton />
                    </div>
                    : null}

                <PaginationBar links={producteurs.links} />
            </div>
        </>
    )
}