import { Head, usePage, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from "react";

import Producteur from './Producteur';
import AddProducteur from './AddProducteur';
import AddProducteurButton from './AddProducteurButton';
import PaginationBar from '@/Components/PaginationBar';
import HeadWithImage from '@/Components/HeadWithImage';

export default function Producteurs( { producteurs }) {
    const user = usePage().props.auth.user;

    const [t, i18n] = useTranslation("global"); // translation
    const [showProducteur, setShowProducteur] = useState(false)

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

                {producteurs.data.map(producteur => (
                    <div key={producteur.id}>
                        <form onSubmit={submit}>
                            <Producteur
                                producteur={producteur}
                                langue={i18n.language}
                                data={data}
                                setData={setData}
                                errors={errors}
                            />
                            <hr />
                        </form>
                    </div>
                ))}

                {user && user.data.role == "admin" ?
                    <div>
                        <AddProducteur className={showProducteur ? "block" : "hidden"} />
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
