import { Link, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import React, { useState } from "react";

import svgCart from '../../../public/icons/add-to-cart.svg';

export default function Menu({ produits, formats, prodDesc, langFormats }) {

    const [t, i18n] = useTranslation("global");

    //séparer les formats selon la langue
    const FrFormats = langFormats.filter(format => format.id_langue == 1);
    const EnFormats = langFormats.filter(format => format.id_langue == 2);

    //garder seulement les plats dans le menu de la semaine (ID + NOM)
    const menuBase = produits.filter(m => m.id <= 2 && m.dansMenu == true);
    const platPrinc = produits.filter(m => m.id > 2 && m.dansMenu == true);

    //séparer les descriptions selon la langue (ID_PRODUIT + ID_LANGUE + DESC)
    const frBase = prodDesc.filter(desc => desc.id_langue == 1 && desc.id_produit <= 2);
    const enBase = prodDesc.filter(desc => desc.id_langue == 2 && desc.id_produit <= 2);
    const frPrinc = prodDesc.filter(desc => desc.id_langue == 1 && desc.id_produit > 2);
    const enPrinc = prodDesc.filter(desc => desc.id_langue == 2 && desc.id_produit > 2);

    // console.log(enBase, platPrinc, EnFormats, FrFormats);
    console.log(frPrinc, enPrinc);


    var bodyFormats = [];
    function hideAllFormarts() {
        for (let i = 0; i < frPrinc.length; i++) {
            //bodyFormats[i] = "hidden";
            bodyFormats[i] = true;
        }
    }

    //const [formatState, setFormatState] = useState("hidden");


    function openFormat(id, liste) {
        hideAllFormarts();
        //bodyFormats[id - liste[0].id] = "block";
        //console.log("click" + id, id - liste[0].id, bodyFormats);

    }

    return (
        <div className='Menu bg-white'>

            <Head title="Menu de la semaine" />

            {/*Entête*/}
            <div className='bg-[#EBEBEB] justify-center py-12 px-20'>
                <h1 className='text-center text-2xl font-semibold mb-2'>{t("Menu.titre")}</h1>
                <p className='text-center'>{t("Menu.sous-titre")}</p>
            </div>


            {/*Menu de la semaine*/}
            <div className='bg-[#04203f] !pt-5 p-10 md:p-20 m-auto'>
                <h2 className='text-3xl text-[#FFD8AD] text-center font-semibold mb-8'>{t("Menu.menu-titre")}</h2>
                <div className='m-auto justify-center p-3 pb-10 grid gap-7 grid-cols-1 md:grid-cols-2 max-w-[1000px]'>
                    {/* SOUPE + PLAT DU CHEF */}
                    {i18n.language === "fr" ?
                        frBase.map(produit => (
                            <div key={produit.id} className='border-2 border-[#EBEBEB] rounded-2xl p-5 justify-center text-center md:w-auto'>
                                <h3 className='text-2xl text-[#FFD8AD] font-semibold pb-2'>{FrFormats.map(f => (f.id_format == produit.id_produit ? f.nom : ""))} - {formats.map(f => (f.id == produit.id_produit ? Math.trunc(f.montant) : ""))}$</h3>
                                <p className='text-white text-lg pb-2'>{produit.description}</p>
                                <Link
                                    href="#"
                                    className="inline-block w-fit mt-3 p-2 text-xs text-white font-semibold border-2 border-[#BB285C] bg-[#BB285C] hover:bg-transparent hover:text-[#BB285C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 justify-self-center"
                                >
                                    {t("Menu.add-panier")}
                                </Link>
                            </div>
                        ))
                        :
                        enBase.map(produit => (
                            <div key={produit.id} className='border-2 border-[#EBEBEB] rounded-2xl p-5 justify-center text-center md:w-auto'>
                                <h3 className='text-2xl text-[#FFD8AD] font-semibold pb-2'>{EnFormats.map(f => (f.id_format == produit.id_produit ? f.nom : ""))} - {formats.map(f => (f.id == produit.id_produit ? Math.trunc(f.montant) : ""))}$</h3>
                                <p className='text-white text-lg pb-2'>{produit.description}</p>
                                <Link
                                    href="#"
                                    className="inline-block w-fit mt-3 p-2 text-xs text-white font-semibold border-2 border-[#BB285C] bg-[#BB285C] hover:bg-transparent hover:text-[#BB285C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 justify-self-center"
                                >
                                    {t("Menu.add-panier")}
                                </Link>
                            </div>
                        ))
                    }
                </div>
                {/* PLAT PRINCIPAUX */}
                <div className='border-2 border-[#EBEBEB] rounded-2xl p-5 mb-20 justify-center text-center max-w-[1000px] md:w-auto'>
                    <h3 className='text-2xl text-[#FFD8AD] font-semibold pb-2'>{t("Menu.plat-principaux")} - {formats.map(f => (f.id > 2 ? Math.trunc(f.montant) + (f.id < formats.length ? "/" : "") : ""))}$</h3>
                    {i18n.language === "fr" ?
                        frPrinc.map(produit => (
                            <div key={produit.id} className='border-3 border-[#FFD8AD] p-5 justify-between text-start md:flex md:w-auto'>
                                <p className='text-white pb-2 mr-10 text-lg'>{produit.description}</p>
                                {/*<Link
                                    href="#"
                                    className="inline-block w-fit mt-3 p-2 text-xs text-white font-semibold border-2 border-[#BB285C] bg-[#BB285C] hover:bg-transparent hover:text-[#BB285C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 justify-self-center"
                                >
                                    {t("Menu.formats")}
                                </Link>*/}
                                <table className='bg-[#BB285C] w-full md:w-auto'>
                                    <thead onClick={() => openFormat(produit.id, frPrinc)}><tr>
                                        <th>{t("Menu.formats")}</th>
                                    </tr></thead>
                                    <tbody className="">
                                        {console.log("id" + produit.id, "id-liste" + (produit.id - frPrinc[0].id), "cont" +
                                            bodyFormats[produit.id - frPrinc[0].id])}
                                        {FrFormats.map(format => format.id > 2 ? (
                                            <tr key={format.id} className='border-2 border-[#BB285C] rounded-2xl p-5 justify-center text-start'>
                                                <td className='py-1 px-2 border-x-2 border-b-2 border-[#BB285C] bg-white hover:bg-[#F8ECE0] hover:text-[#7A163C] flex flex-nowrap items-center justify-between'>
                                                    <p className='mr-5 text-lg'>{format.nom} ({formats.map(f => (f.id == format.id_format ? Math.trunc(f.montant) : ""))}$)</p>
                                                    <a href="#"><img className='fill-[#BB285C] h-[1.25em]' src={svgCart} alt={t("Menu.add-panier")} /></a>
                                                </td>
                                            </tr>
                                        ) : "")
                                        }
                                    </tbody>
                                </table>
                            </div>
                        ))
                        :
                        "ENG ENGNENGNE ENGN PLAT PRINCIPAUX JE TRAVAILL"
                    }
                </div>

                <Link
                    href='/panier'
                    className="block m-auto w-fit py-4 px-12  text-[#BB285C] font-bold bg-transparent border-2 border-[#BB285C] hover:bg-[#BB285C] hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 justify-self-center"
                >
                    {t("Menu.go-panier")}
                </Link>
            </div>






            {/*Coût des portions*/}
            <div className='p-10 md:p-20 m-auto'>
                <h2 className='text-xl text-[#BB285C] text-center font-bold mb-8'>{t("Menu.portion")}</h2>
                <div className='flex flex-wrap gap-y-7 gap-x-12 m-auto justify-center p-3 max-w-[1000px]'>
                    {i18n.language === "fr" ?
                        FrFormats.map(format => (
                            <div key={format.id} className='border-2 border-[#EBEBEB] rounded-2xl p-5 justify-center text-center w-[90%] md:w-[30%] max-w-[350px]'>
                                <p className='font-semibold pb-2'>{format.nom}</p>
                                <p className='text-sm pb-2'>{format.description}</p>
                                <p className='text-[#2E6FED] font-semibold text-lg'>{formats.map(f => (f.id == format.id_format ? Math.trunc(f.montant) : ""))}$</p>
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
            <div className='p-10 !pt-5 md:p-20 m-auto'>
                <h2 className='text-xl text-[#BB285C] text-center font-bold mb-8'>{t("Menu.recuperer")}</h2>
                <div className='flex flex-wrap gap-y-7 gap-x-12 m-auto justify-center p-3 max-w-[1000px]'>

                </div>
            </div>





        </div>
    );
}
