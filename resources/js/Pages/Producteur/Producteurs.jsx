import { Head, usePage, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from "react";

import Producteur from './Producteur';
import AddProducteur from './AddProducteur';
import AddProducteurButton from './AddProducteurButton';
import PaginationBar from '@/Components/PaginationBar';
import HeadWithImage from '@/Components/HeadWithImage';
import MessageFlash from '@/Components/MessageFlash';

export default function Producteurs({ producteurs }) {
    const user = usePage().props.auth.user;

    const [t, i18n] = useTranslation("global"); // translation
    const [showProducteur, setShowProducteur] = useState(false)

    // Message Flash
    const [message, setMessage] = useState("")
    const [messageV, setMessageV] = useState(false)
    const [messageS, setMessageS] = useState(false)

    const showMessageFlash = (status, message, visibility = true) => {
        setMessageS(status)
        setMessage(message)
        setMessageV(visibility)
    }

    const toggleShowProducteur = () => {
        setShowProducteur(!showProducteur)
    }

    const { data, setData, post, errors, reset } = useForm({
        id: '',
        nom: '',
        filename: '',
        url: '',
        descriptionFR: '',
        descriptionEN: '',
        adresse: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('updateProducteur'), {
            preserveScroll: true
        });

        showMessageFlash(1, t("Producteur.flashUpdate"));
    };

    return (
        <>
            <div className='Producteur'>
                <Head title={t("Producteur.titre")} />

                <HeadWithImage
                    imgFile="/img/producteurBack.jpg"
                    title={t("Producteur.titre")}
                    button={false}
                    buttonText="none"
                    path="/"
                />

                <MessageFlash
                    status={messageS}
                    message={message}
                    visibility={messageV}
                    setVisibility={setMessageV}
                />

                {producteurs.data.map(producteur => (
                    <div key={producteur.id}>
                        <form onSubmit={submit}>
                            <Producteur
                                producteur={producteur}
                                langue={i18n.language}
                                data={data}
                                setData={setData}
                                errors={errors}
                                showMessageFlash={showMessageFlash}
                            />
                            <hr />
                        </form>
                    </div>
                ))}

                {user && user.data.role == "admin" ?
                    <div>
                        <AddProducteur className={
                            showProducteur ? "block" : "hidden"}
                            toggleShowProducteur={toggleShowProducteur} 
                        />
                        <AddProducteurButton
                            toggleShowProducteur={toggleShowProducteur}
                            className={showProducteur ? "hidden" : "block"}
                        />
                    </div>
                    : null}

                <PaginationBar links={producteurs.meta.links} />
            </div>
        </>
    )
}
