import { Link, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import React, { useState } from "react";
import Item from '../item'
import MenuBase from '@/Components/MenuBase';

export default function Menu({ produits, formats, prodDesc, langFormats, menu }) {

    console.log(menu)
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

    const moisArr = [["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
    ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]];
    var vendredi = new Date();
    vendredi.setDate(vendredi.getDate() + (5 + 7 - vendredi.getDay()) % 7);

    const jvendredi = vendredi.getDate();
    const mvendredi = moisArr[0][vendredi.getMonth()]

    console.log(jvendredi, mvendredi);


    // console.log(enBase, platPrinc, EnFormats, FrFormats);
    //console.log(frPrinc, enPrinc);


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


            {/*Menu de la semaine*/}
            <div className='bg-[#04203f] !pt-5 p-10 md:p-20 m-auto'>
                <h2 className='text-[#FFD8AD] text-center my-8 imperial text-6xl lg:text-7xl'>{t("Menu.menu-titre")}</h2>
                <div className='m-auto justify-center p-3 pb-10 grid gap-7 grid-cols-1 md:grid-cols-2 max-w-[1000px]'>
                    {/* SOUPE + PLAT DU CHEF */}

                    <MenuBase
                        produitId={1}
                        formatId={1}
                        produit={i18n.language == 'fr' ? frBase[0] : enBase[0]}
                        formats={i18n.language == 'fr' ? FrFormats : EnFormats}
                        otherFormats={formats}
                        putPanier={putPanier}
                    />

                    <MenuBase
                        produitId={2}
                        formatId={2}
                        produit={i18n.language == 'fr' ? frBase[1] : enBase[1]}
                        formats={i18n.language == 'fr' ? FrFormats : EnFormats}
                        otherFormats={formats}
                        putPanier={putPanier}
                    />

                </div>
                {/* PLAT PRINCIPAUX */}
                <div className='border-2 border-[#EBEBEB] rounded-2xl p-5 justify-center text-center max-w-[1000px] md:m-auto'>
                    <h3 className='imperial text-[#FFD8AD] pb-2 text-4xl lg:text-5xl'>{t("Menu.plat-principaux")} - {formats.map(f => (f.id > 2 ? Math.trunc(f.montant) + (f.id < formats.length ? "/" : "") : ""))}$</h3>
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
                                    <thead onClick={() => openFormat(produit.id, frPrinc)}>
                                        <tr>
                                            <th>{t("Menu.formats")}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {console.log("id" + produit.id, "id-liste" + (produit.id - frPrinc[0].id), "cont" +
                                            bodyFormats[produit.id_produit - frPrinc[0].id])}
                                        {FrFormats.map(format => format.id > 2 ? (
                                            <tr onClick={() => putPanier(format.id, produit.id_produit)} key={format.id} className='cursor-pointer border-2 border-[#BB285C] rounded-2xl p-5 justify-center text-start'>
                                                <td className='py-1 px-2 border-x-2 border-b-2 border-[#BB285C] bg-white hover:bg-[#F8ECE0] hover:text-[#7A163C] flex flex-nowrap items-center justify-between'>
                                                    <p className='mr-5 text-lg'>{format.nom} ({formats.map(f => (f.id == format.id_format ? Math.trunc(f.montant) : ""))}$)</p>
                                                    <div className='hover:path:fill-slate-600'>
                                                        <svg width="20px" height="20px" viewBox="0 0 256 256">
                                                            <path fill="#BB285C" d="M 44.00,38.00 C 44.00,38.00 18.00,38.00 18.00,38.00 14.59,38.00 9.00,38.40 6.04,36.83 0.13,33.68 -0.65,24.76 4.23,20.43 6.88,18.07 9.67,18.05 13.00,18.00 13.00,18.00 47.00,18.00 47.00,18.00 50.22,18.01 53.93,17.79 56.81,19.45 62.21,22.56 64.75,36.08 66.67,42.00 66.67,42.00 89.98,118.00 89.98,118.00 89.98,118.00 96.02,138.00 96.02,138.00 96.84,140.61 97.84,144.46 100.27,145.98 102.24,147.21 105.72,147.00 108.00,147.00 108.00,147.00 191.00,147.00 191.00,147.00 193.22,147.00 196.70,147.22 198.59,145.98 201.10,144.31 205.39,132.39 206.85,129.00 206.85,129.00 229.00,77.00 229.00,77.00 224.35,77.00 211.60,77.69 208.02,75.83 201.51,72.43 200.44,61.92 207.11,58.17 209.57,56.79 213.23,57.00 216.00,57.00 216.00,57.00 243.00,57.00 243.00,57.00 251.01,57.11 256.48,61.37 254.39,70.00 254.39,70.00 245.01,93.00 245.01,93.00 245.01,93.00 222.80,146.00 222.80,146.00 220.38,151.98 216.75,163.55 210.98,166.55 207.83,168.19 204.44,167.99 201.00,168.00 201.00,168.00 97.00,168.00 97.00,168.00 92.70,167.99 87.79,168.14 84.22,165.30 80.12,162.03 76.00,144.74 74.28,139.00 74.28,139.00 55.66,78.00 55.66,78.00 55.66,78.00 44.00,38.00 44.00,38.00 Z M 128.00,56.00 C 128.00,56.00 128.00,31.00 128.00,31.00 128.05,27.42 128.22,24.13 130.65,21.23 134.83,16.24 144.63,16.95 147.77,24.04 149.86,28.75 149.00,49.59 149.00,56.00 149.00,56.00 172.00,56.00 172.00,56.00 174.84,56.00 178.27,55.84 180.91,57.01 187.63,59.98 188.76,69.88 182.79,74.26 180.43,75.99 177.78,75.96 175.00,76.00 175.00,76.00 149.00,76.00 149.00,76.00 149.00,76.00 148.47,106.00 148.47,106.00 147.08,111.68 142.94,114.94 137.00,114.14 132.29,113.51 129.29,110.62 128.17,106.00 128.17,106.00 128.17,76.00 128.17,76.00 128.17,76.00 102.00,76.00 102.00,76.00 98.67,75.95 95.88,75.93 93.23,73.57 88.38,69.26 89.44,60.32 95.10,57.17 97.42,55.89 100.42,56.01 103.00,56.00 103.00,56.00 128.00,56.00 128.00,56.00 Z M 82.00,192.71 C 86.18,192.84 89.43,193.14 92.98,195.65 106.05,204.90 100.99,229.30 81.00,227.90 65.68,226.83 59.44,207.66 70.19,197.21 73.86,193.64 77.14,193.07 82.00,192.71 Z M 210.00,192.61 C 215.53,192.67 220.66,193.84 224.47,198.19 233.78,208.82 227.48,226.74 213.00,227.91 193.91,229.44 187.69,207.80 198.33,197.34 201.74,193.98 205.46,193.18 210.00,192.61 Z" />
                                                        </svg>
                                                    </div>
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
                    className="block m-auto w-fit py-4 px-12 mt-12  text-[#BB285C] font-bold bg-transparent border-2 border-[#BB285C] hover:bg-[#BB285C] hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 justify-self-center"
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
            <div className='p-10 !pt-5 w-fit m-auto md:p-20'>
                <h2 className='text-2xl text-[#BB285C] text-center font-bold mb-8'>{t("Menu.recuperer")}</h2>

                <div className='bg-[#EBEBEB] rounded-2xl p-10 mb-12 max-w-[1000px] md:w-auto'>
                    <h3 className='text-xl text-center font-bold mb-5'>{t("Menu.livr-titre")}</h3>
                    <p>{t("Menu.livr-p")}</p>
                    <br />
                    <br />
                    <p className='mb-5'>{t("Menu.livr-heure")}<b>{i18n.language == 'fr' ? jvendredi + " " + moisArr[0][vendredi.getMonth()] : moisArr[1][vendredi.getMonth()] + " " + jvendredi}</b>.</p>
                    <div className='mb-5'>
                        <p><b>{t("Menu.livr-titre-sherb")} : </b> $</p>
                        <p><b>{t("Menu.livr-titre-autre")} : </b> $</p>
                    </div>
                    <p className='text-[#BB285C] italic'>{t("Menu.livr-info")}</p>
                </div>

                <div className='bg-[#EBEBEB] rounded-2xl p-10 justify-center max-w-[1000px] md:w-auto'>
                    <h3 className='text-xl text-center font-bold mb-5'>{t("Menu.venir-titre")}</h3>
                    <p>{t("Menu.venir-p")}</p>
                </div>
            </div>
        </div>
    );

}
