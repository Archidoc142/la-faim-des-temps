import { Link, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from "react";
import Item from '../item'
import MenuBase from '@/Components/MenuBase';
import MenuPrinc from '@/Components/MenuPrinc';

export default function Menu({ produits, formats, prodDesc, langFormats, menu }) {

    console.log(menu)
    const [t, i18n] = useTranslation("global");

    //séparer les formats selon la langue
    const FrFormats = langFormats.filter(format => format.id_langue == 1);
    const EnFormats = langFormats.filter(format => format.id_langue == 2);

    /*vendredi.setDate(vendredi.getDate() + (5 + 7 - vendredi.getDay()) % 7);*/
    let d = new Date();

    const optionsDel = { day: 'numeric', month: 'long' };
    const optionsAdmin = { weekday: 'long', day: 'numeric', month: 'long' };
    const tempDate = d.toLocaleDateString('fr-FR', optionsDel);
    const [dateDelivery, setDateDelivery] = useState(tempDate)
    const [dateAdmin, setDateAdmin] = useState(tempDate)

    // Format la date pour avoir le prochain vendredi
    useEffect(() => {
        /* if (d.getDay() == 1 && d.getHours() > 15) {
             d.setDate(d.getDate() + (((5 + 7 - d.getDay()) % 7) || 7));
         } else {*/
        d.setDate(d.getDate() + (5 + 7 - d.getDay()) % 7);
        //}

        if (i18n.language === 'fr') {
            setDateDelivery(d.toLocaleDateString('fr-FR', optionsDel))
            setDateAdmin(d.toLocaleDateString('fr-FR', optionsAdmin))
        } else {
            setDateDelivery(d.toLocaleDateString('en-EN', optionsDel))
            setDateAdmin(d.toLocaleDateString('en-EN', optionsAdmin))
        }
    }, [i18n.language])



    function putPanier(format, produit) {
        let panier = JSON.parse(localStorage.getItem("panier"))
        checkKeys(panier, produit, format)

        localStorage.setItem("panier", JSON.stringify(panier))
    }

    // Key 1 = produit - Key 2 = format
    function checkKeys(panier, key1, key2) {
        const found = panier.some(item => {
            if (item["produitId"] === key1 && item["formatId"] === key2) {
                item["qte"] += 1;
                return true;
            }
            return false;
        });
        // Si aucun doublon - créer nouvel élément
        if (!found) {
            const lastId = panier.length > 0 ? panier[panier.length - 1]['id'] : 0;
            panier.push(new Item(lastId + 1, key1, 1, key2));
        }
    }

    return (
        <div className='Menu bg-white'>

            <Head title="Menu de la semaine" />

            {/*Entête*/}
            <div className='bg-[#EBEBEB] justify-center py-12 px-20'>
                <h1 className='text-center text-2xl font-semibold mb-2'>{t("Menu.titre")}</h1>
                <p className='text-center'>{t("Menu.sous-titre")}</p>
            </div>

            {/*Coût des portions*/}
            <div className='p-10 md:p-20 m-auto'>
                <h2 className='text-xl text-[#BB285C] text-center mb-9 md:mb-12 max-w-96 m-auto font-bold'>{t("Menu.portion")}</h2>
                <div className='flex flex-wrap gap-y-7 gap-x-12 m-auto justify-center max-w-[1000px]'>
                    {i18n.language === "fr" ?
                        FrFormats.map(format => (
                            <div key={format.id} className='border-2 border-[#EBEBEB] rounded-2xl p-5 justify-center text-center w-[90%] md:w-[30%] max-w-[350px]'>
                                <p className='font-semibold pb-2'>{format.nom}</p>
                                <p className='text-sm pb-2'>{format.description}</p>
                                <p className='text-[#2E6FED] font-semibold text-lg'>{formats.map(f => (f.id == format.id_format ? (Math.trunc(f.montant)) : ""))}$</p>
                                {/*                                <p className='text-[#2E6FED] font-semibold text-lg'>{formats.map(f => (f.id == format.id_format ? (i18n.language == 'fr' ? Math.trunc(f.montant) + "$" : "$" + Math.trunc(f.montant)) : ""))}$</p>
                                 */}
                            </div>
                        ))

                        :
                        EnFormats.map(format => (
                            <div key={format.id} className='border-2 border-[#EBEBEB] rounded-2xl p-5 justify-center text-center w-[90%] md:w-[30%] max-w-[350px]'>
                                <p className='font-semibold pb-2'>{format.nom}</p>
                                <p className='text-sm pb-2'>{format.description}</p>
                                <p className='text-[#2E6FED] font-semibold text-lg'>{formats.map(f => (f.id == format.id_format ? Math.trunc(f.montant) : ""))}$</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/*Récupérer ta commande*/}
            <div className='p-10 !pt-5 w-fit m-auto md:p-20'>
                <h2 className='text-2xl text-[#BB285C] text-center font-bold mb-9 md:mb-12 max-w-96 m-auto'>{t("Menu.recuperer")}</h2>

                <div className='bg-[#EBEBEB] rounded-2xl p-10 mb-12 max-w-[1000px] md:w-auto'>
                    <h3 className='text-xl text-center font-bold mb-5'>{t("Menu.livr-titre")}</h3>
                    <p>{t("Menu.livr-p")}</p>
                    <br />
                    <br />
                    <p className='mb-5'>{t("Menu.livr-heure")}<b>{dateDelivery}</b>.</p>
                    <div className='mb-5'>
                        <p><b>{t("Menu.livr-titre-sherb")} : </b>{dateAdmin} $</p>
                        <p><b>{t("Menu.livr-titre-autre")} : </b> $</p>
                    </div>
                    <p className='text-[#BB285C] italic'>{t("Menu.livr-info")}</p>
                </div>

                <div className='bg-[#EBEBEB] rounded-2xl p-10 justify-center max-w-[1000px] md:w-auto'>
                    <h3 className='text-xl text-center font-bold mb-5'>{t("Menu.venir-titre")}</h3>
                    <p>{t("Menu.venir-p")}</p>
                </div>
            </div>

            {/*Menu de la semaine*/}
            <div className='bg-[#04203f] !pt-5 p-10 md:p-12 lg:p-20 mt-7'>
                <h2 className='text-[#FFD8AD] text-center my-8 imperial text-6xl md:text-7xl md:my-12'>{t("Menu.menu-titre")}</h2>
                <div className='m-auto justify-center pb-10 grid gap-10 grid-cols-1 md:grid-cols-2 max-w-[1000px]'>
                    {/* SOUPE + PLAT DU CHEF */}
                    <MenuBase
                        produit={menu.data[0]}
                        putPanier={putPanier}
                    />
                    <MenuBase
                        produit={menu.data[1]}
                        putPanier={putPanier}
                    />
                </div>
                {/* PLAT PRINCIPAUX */}
                <div className='border-2 border-[#EBEBEB] rounded-2xl p-7 justify-center text-center w-[100%] md:max-w-[1000px] md:m-auto'>
                    <h3 className='imperial text-[#FFD8AD] pb-4 text-5xl md:text-6xl'>{t("Menu.plat-principaux")}</h3>

                    {menu.data.map(produit => (
                        <div key={produit.id}>{produit.id > 2 ?
                            <MenuPrinc
                                produit={menu.data[menu.data.findIndex(data => data.id === produit.id)]}
                                putPanier={putPanier}
                            />
                            : ""}
                        </div>
                    ))}
                </div>

                <Link
                    href='/panier'
                    className="block m-auto w-fit py-4 px-12 mt-10 md:mt-12 lg:mt-20  text-[#BB285C] font-bold bg-transparent border-2 border-[#BB285C] hover:bg-[#BB285C] hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 justify-self-center"
                >
                    {t("Menu.go-panier")}
                </Link>
            </div>
        </div>
    );

}
