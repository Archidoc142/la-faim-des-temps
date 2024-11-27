import React from 'react'
import AdminLayout from "@/Layouts/AdminLayout";
import ImageForm from "@/Components/Admin/ImageForm";
import { useState } from 'react';
import Image from '@/Components/Admin/Image';

export default function Images({ res, token }) {

    const [popupActif, setPopupActif] = useState(false)
    const [sendImage, setSendImage] = useState(null)

    function handleClick(id) {
        setSendImage(res.data.find(img => { return img.id == id }));
        setPopupActif(true);
    }

    return (
        <AdminLayout title="Images">
            <button onClick={() => handleClick(null)} className="p-2 w-60 rounded-md text-lg bg-[#7A163C] text-white font-bold hover:cursor-pointer hover:bg-slate-700">Ajouter une image</button>

            <div className="flex flex-wrap gap-x-5 gap-y-5 mt-5">
                {res.data.map((img, i) =>
                    <Image img={img} key={i} handleClick={handleClick} />
                )}
            </div>

            {popupActif ?
                <ImageForm
                    image={sendImage}
                    setPopupActif={setPopupActif}
                    token={token}
                />
                : null}

            {res.data.length == 0 ? <p className='mt-10 italic text-xl'>Aucune image</p> : null}

        </AdminLayout>
    );
}
