import { Link, Head, usePage, useForm, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from "react";
import Item from '../item'
import MenuBase from '@/Components/MenuBase';
import MenuPrinc from '@/Components/MenuPrinc';
import MenuDateRetour from '@/Components/MenuDateRetour';
import GoDownButton from '@/Components/GoDownButton';
import ModifButton from '@/Components/Admin/ModifButton';
import TextareaStatique from '@/Components/Admin/TextareaStatique';
import MessageFlash from '@/Components/MessageFlash';

export default function Menu({ formats, langFormats, tarifs, produits, dates_menu, token, ajd, heure }) {

    const menu = produits.data.filter((p) => p.dansMenu)

    const { data, setData, post, processing, errors, reset } = useForm([
        {
            "id": menu[0].id,
            "fr": menu[0].description.fr,
            "en": menu[0].description.en
        },
        {
            "id": menu[1].id,
            "fr": menu[1].description.fr,
            "en": menu[1].description.en
        },
        {
            "id": menu[2].id,
            "fr": menu[2].description.fr,
            "en": menu[2].description.en
        },
        {
            "id": menu[3].id,
            "fr": menu[3].description.fr,
            "en": menu[3].description.en
        },
        {
            "id": menu[4].id,
            "fr": menu[4].description.fr,
            "en": menu[4].description.en
        },
        {
            "id": menu[5].id,
            "fr": menu[5].description.fr,
            "en": menu[5].description.en
        }
    ]);

    const submit = (e) => {
        e.preventDefault();
        post(route('menu.update'), {
            preserveScroll: true,
            preserveState: 'errors',
            onSuccess: () => showMessageFlash(1, "Le menu a été modifié")
        });

    };

    async function changeDateBD(id, nouv_valeur, isDeletion) {

        if (nouv_valeur || nouv_valeur == null) {
            const dateData = {
                _token: token,
                id: id,
                date: nouv_valeur,
            };

            router.post('/dates-menu', dateData, {
                preserveScroll: true,
                onError: (errors) => { alert(errors[0]); },
                onSuccess: () => {
                    window.location.reload();
                    history.replaceState(null, null, "#menuAncre");
                    if (isDeletion) {
                        showMessageFlash(1, "La date de retour a été supprimée")
                    } else {
                        showMessageFlash(1, "La date a été modifiée")
                    }
                }
            });
        }
    }

    async function changeText(nouveau_texte) {
        if (nouveau_texte) {
            let textData = {};

            for (let index = 0; index < nouveau_texte.length; index++) {
                textData[index] = {
                    "groupe": nouveau_texte[index][0],
                    "target": nouveau_texte[index][1],
                    "fr": nouveau_texte[index][2],
                    "en": nouveau_texte[index][3]
                }
            }

            router.patch('/modifier-texte', textData, {
                preserveScroll: true,
                onError: (errors) => { alert(errors[0]); },
                preserveState: 'errors',
                onFinish: () => { setEditVenirMode(false); setEditLivrMode(false); window.location.reload(); }
            });
        }
        else {
            alert("Un élément est manquant.")
        }
    }


    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            let errorMsg = ""
            Object.keys(errors).forEach((k) => {
                errorMsg += "- " + errors[k] + "\n";
            })

            alert(errorMsg);
        }
    }, [errors])

    const user = usePage().props.auth.user;

    const [t, i18n] = useTranslation("global");

    let d = new Date(ajd);

    const [afficherMenu, setAfficherMenu] = useState(true);

    const optionsDel = { day: 'numeric', month: 'long' };
    const optionsMenu = { weekday: 'long', day: 'numeric', month: 'long' };
    const tempDate = d.toLocaleDateString('fr-FR', optionsDel);

    //Les dates au long (ex : [vendredi] 11 octobre)
    const [dateDelivery, setDateDelivery] = useState(tempDate);
    const [dateMenuVend, setDateMenuVend] = useState(tempDate);
    const [dateMenuLund, setDateMenuLund] = useState(tempDate);
    const [dateMenuRetour, setDateMenuRetour] = useState(tempDate);

    const [lundiYYYY, setLundiYYYY] = useState(dates_menu[2].date);
    const [vendrediYYYY, setVendrediYYYY] = useState(dates_menu[1].date);
    const [lundiNextYYYY, setLundiNextYYYY] = useState(dates_menu[4].date);
    const [vendrediNextYYYY, setVendrediNextYYYY] = useState(dates_menu[3].date);

    const [editMode, setEditMode] = useState(false);    //modifier les plats du menu


    /* TEXTE STATIQUE "LIVRAISON" */
    const [editLivrMode, setEditLivrMode] = useState(false);

    const [livrpfr, setLivrpfr] = useState(t('Menu.livr-p', { lng: 'fr' }));
    const [livrpen, setLivrpen] = useState(t('Menu.livr-p', { lng: 'en' }));

    const [livrinfofr, setLivrinfofr] = useState(t('Menu.livr-info', { lng: 'fr' }));
    const [livrinfoen, setLivrinfoen] = useState(t('Menu.livr-info', { lng: 'en' }));


    /* TEXTE STATIQUE "PASSEZ NOUS VOIR" */
    const [editVenirMode, setEditVenirMode] = useState(false);

    const [venirpfr, setVenirpfr] = useState(t('Menu.venir-p', { lng: 'fr' }));
    const [venirpen, setVenirpen] = useState(t('Menu.venir-p', { lng: 'en' }));


    let dr = new Date(dates_menu[0].date);  //date retour à partir de la BD
    let dv = new Date(dates_menu[1].date);  //vendredi de *cette* période de commande
    let dl = new Date(dates_menu[2].date);  //lundi de *cette* période de commande
    let dnextv = new Date(dates_menu[3].date);  //*prochain* vendredi
    let dnextl = new Date(dates_menu[4].date);  //*prochain* lundi

    dr.setDate(dr.getDate() + 1)    // +1 pour avoir la bonne date
    dv.setDate(dv.getDate() + 1)
    dl.setDate(dl.getDate() + 1)
    dnextv.setDate(dnextv.getDate() + 1)
    dnextl.setDate(dnextl.getDate() + 1)

    useEffect(() => {

        if (i18n.language === 'fr') {
            setDateMenuRetour(dr.toLocaleDateString('fr-FR', optionsMenu))
        } else {
            setDateMenuRetour(dr.toLocaleDateString('en-EN', optionsMenu))
        }

        //changer la date de livraison pour le prochain vendredi
        if (ajd >= vendrediYYYY || (ajd == vendrediYYYY && heure >= 18)) {
            if (i18n.language === 'fr') {
                setDateDelivery(dnextv.toLocaleDateString('fr-FR', optionsDel))
                setDateMenuVend(dv.toLocaleDateString('fr-FR', optionsMenu))
                setDateMenuLund(dl.toLocaleDateString('fr-FR', optionsMenu))
            } else {
                setDateDelivery(dnextv.toLocaleDateString('en-EN', optionsDel))
                setDateMenuVend(dv.toLocaleDateString('en-EN', optionsMenu))
                setDateMenuLund(dl.toLocaleDateString('en-EN', optionsMenu))
            }
        } else {
            if (i18n.language === 'fr') {
                setDateDelivery(dv.toLocaleDateString('fr-FR', optionsDel))
                setDateMenuVend(dnextv.toLocaleDateString('fr-FR', optionsMenu))
                setDateMenuLund(dnextl.toLocaleDateString('fr-FR', optionsDel))
            } else {
                setDateDelivery(dv.toLocaleDateString('en-EN', optionsDel))
                setDateMenuVend(dnextv.toLocaleDateString('en-EN', optionsMenu))
                setDateMenuLund(dnextl.toLocaleDateString('en-EN', optionsMenu))
            }
        }

        //si une date de retour est programmée
        if (dates_menu[0].date !== null) {
            // la fin du retour programmé
            if (ajd == dates_menu[0].date) {
                changeDateBD(1, null);  //enlever date retour
                checkIntervalleMenu();
            }
            else
                setAfficherMenu(false);
        }

        checkIntervalleMenu();

        //setAfficherMenu(true);  // Toujours afficher menu (pour tests) #####-/--###-####-########

    }, [i18n.language])

    function checkIntervalleMenu() {
        if ((ajd > vendrediNextYYYY || (ajd == vendrediNextYYYY && heure >= 12))/* && ()*/) {
            changeDateBD(1, "prochain");
            setAfficherMenu(true);
        }
        else if (ajd > lundiYYYY || (ajd === lundiYYYY && heure >= 16)) {
            setAfficherMenu(false);
            nextMenuText();
        }
    }

    function nextMenuText() {
        //vendredi
        if (i18n.language === 'fr') {
            setDateMenuVend(dnextv.toLocaleDateString('fr-FR', optionsMenu))
        } else {
            setDateMenuVend(dnextv.toLocaleDateString('en-EN', optionsMenu))
        }

        //lundi
        if (i18n.language === 'fr') {
            setDateMenuLund(dnextl.toLocaleDateString('fr-FR', optionsMenu))
        } else {
            setDateMenuLund(dnextl.toLocaleDateString('en-EN', optionsMenu))
        }
    }

    // Message Flash
    const [message, setMessage] = useState("")
    const [messageV, setMessageV] = useState(false)
    const [messageS, setMessageS] = useState(false)

    const showMessageFlash = (status, message, visibility = true) => {
        setMessageS(status)
        setMessage(message)
        setMessageV(visibility)
    }

    function putPanier(format, produit) {
        let panier = JSON.parse(localStorage.getItem("panier"))
        checkKeys(panier, produit, format)

        localStorage.setItem("panier", JSON.stringify(panier))
        window.dispatchEvent(new Event("storage"));
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

            <Head title="Menu" />
            <GoDownButton />

            <MessageFlash
                status={messageS}
                message={message}
                visibility={messageV}
                setVisibility={setMessageV}
            />

            {/*Entête*/}
            <div className='bg-[#EBEBEB] justify-center py-8 mb-20 px-10 md:py-20 md:px-20'>
                <h1 className='text-center text-3xl md:text-5xl font-semibold mb-2'>{t("Menu.titre")}</h1>
                <p className='text-center text-lg'>{t("Menu.sous-titre")}</p>
            </div>

            {/*Coût des portions - CETTE SECTION EST MISE EN COMMENTAIRE POUR POUVOIR L'AFFICHER AU BESOIN DANS LE FUTUR

            <div className='p-10 !pt-5 md:p-20 m-auto'>
                <h2 className='text-xl md:text-2xl text-[#BB285C] text-center mb-9 md:mb-12 max-w-96 m-auto font-bold'>{t("Menu.portion")}</h2>

                <div className='flex flex-wrap gap-y-7 gap-x-12 m-auto justify-center max-w-[1200px]'>
                    {formats.map(format => (
                        <div key={format.id} className='border-2 border-[#EBEBEB] rounded-2xl p-5 justify-center text-center w-[90%] md:w-[30%] max-w-[350px]'>
                            <FormatsMenu
                                formatLangue={i18n.language === "fr" ? FrFormats[format.id - 1].nom : EnFormats[format.id - 1].nom}
                                descLangue={i18n.language === "fr" ? FrFormats[format.id - 1].description : EnFormats[format.id - 1].description}
                                montant={i18n.language === "fr" ? format.montant + "$" : "$" + format.montant}
                            />
                        </div>
                    ))}
                </div>
            </div>*/}

            {/*Récupérer ta commande*/}
            <div className='p-10 !pt-5 w-fit m-auto md:p-20'>
                <h2 className='text-xl md:text-2xl text-[#BB285C] text-center font-bold mb-9 md:mb-12 max-w-96 m-auto'>{t("Menu.recuperer")}</h2>

                <div className='bg-[#EBEBEB] rounded-2xl p-10 mb-12 max-w-[1200px] md:w-auto'>

                    <ModifButton
                        afficher={user && user.data.role == "admin"}
                        editMode={editLivrMode}
                        setEditMode={setEditLivrMode}
                        changeText={changeText}
                        elemChange={[
                            ["Menu", "livr-p", livrpfr, livrpen],
                            ["Menu", "livr-info", livrinfofr, livrinfoen]
                        ]}
                        couleur="black"
                    />

                    <h3 className='text-center font-bold mb-5 md:text-xl'>{t("Menu.livr-titre")}</h3>
                    {editLivrMode ?
                        <TextareaStatique
                            setStatiqueFR={setLivrpfr}
                            setStatiqueEN={setLivrpen}
                            element="Menu.livr-p"
                            couleur="black"
                        />
                        :
                        <p className='text-sm md:text-base text-justify'>{t("Menu.livr-p")}</p>
                    }
                    <br /><br />
                    <p className='mb-5 text-sm md:text-base'>{t("Menu.livr-heure")}<b>{dateDelivery}</b>.</p>
                    <div className=''>
                        <p className='text-sm md:text-base'><b>{t("Menu.livr-titre-sherb")} : </b>{i18n.language == "fr" ? "" : "$"}{tarifs[0].montant}{i18n.language == "fr" ? "$" : ""} {t("Menu.livr-sherb")}</p>
                        <p className='text-sm md:text-base'><b>{t("Menu.livr-titre-autre")} : </b>{i18n.language == "fr" ? "" : "$"}{tarifs[1].montant}{i18n.language == "fr" ? "$" : ""}</p>
                    </div>
                    <br /><br />
                    {editLivrMode ?
                        <TextareaStatique
                            setStatiqueFR={setLivrinfofr}
                            setStatiqueEN={setLivrinfoen}
                            element="Menu.livr-info"
                            couleur="black"
                        />
                        :
                        <p className='text-[#BB285C] italic text-sm md:text-base lg:text-center'>{t("Menu.livr-info")}</p>
                    }
                </div>

                <div className='bg-[#EBEBEB] rounded-2xl p-10 justify-center max-w-[1200px] md:w-auto'>

                    <ModifButton
                        afficher={user && user.data.role == "admin"}
                        editMode={editVenirMode}
                        setEditMode={setEditVenirMode}
                        changeText={changeText}
                        elemChange={[
                            ["Menu", "venir-p", venirpfr, venirpen],
                        ]}
                        couleur="black"
                    />

                    <h3 className='text-center font-bold mb-5  md:text-xl'>{t("Menu.venir-titre")}</h3>
                    {editVenirMode ?
                        <TextareaStatique
                            setStatiqueFR={setVenirpfr}
                            setStatiqueEN={setVenirpen}
                            element="Menu.venir-p"
                            couleur="black"
                        />
                        :
                        <p className='text-sm md:text-base text-justify'>{t("Menu.venir-p")}</p>
                    }
                </div>
            </div>

            {/*Menu de la semaine*/}
            < div id="menuAncre" className='bg-[#04203f] !pt-5 p-10 md:p-12 lg:p-20 mt-7' >

                {user && user.data.role == "admin" ?
                    <MenuDateRetour
                        date_retour={dates_menu[0].date}
                        dateMenuRetour={dateMenuRetour}
                        vendrediYYYY={vendrediNextYYYY}
                        dateMenuVend={dateMenuVend}
                        dateMenuLund={dateMenuLund}
                        changeDateBD={changeDateBD}
                    />
                    : null}

                <form onSubmit={submit}>

                    <h2 className='text-[#FFD8AD] text-center my-8 imperial mr-2 text-6xl md:text-7xl lg:text-8xl md:my-12'>{t("Menu.menu-titre")}</h2>

                    {!afficherMenu ?
                        dates_menu[0].date !== null ?
                            <>
                                <p className='italic text-white text-center md:text-2xl mb-5'>{t("Menu.menu-indisponible")}</p>
                                <p className='text-white text-center text-sm md:text-xl mb-12'>{t("Menu.menu-back")}<span className='text-[#FFD8AD]'>{dateMenuRetour}</span>.</p>
                            </>
                            :
                            <><p className='italic text-white text-center text-lg md:text-2xl mb-5'>{t("Menu.date-passed")}</p>
                                <p className='text-white text-center md:text-xl mb-12'>{t("Menu.next-friday")}<span className='text-[#FFD8AD]'>{dateMenuVend}</span>.</p>
                            </>
                        : null}

                    <div className='max-w-[1200px] flex justify-end mb-5 m-auto'>
                        {user && user.data.role == "admin" ?
                            <>
                                {editMode ?
                                    <div className="flex items-center gap-5">
                                        <svg onClick={() => setEditMode(false)} fill="#ffffff" height="200px" width="200px" className="h-fit max-w-8 hover:fill-[#BB285C] cursor-pointer" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xmlSpace="preserve" stroke="none" >
                                            <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
                                        </svg>

                                        <button type='submit'>
                                            <svg width="118px" height="118px" className="h-fit max-w-10  hover:fill-[#BB285C]" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" stroke="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z" fill="#fffff" />
                                            </svg>
                                        </button>
                                    </div>
                                    :
                                    <svg onClick={() => setEditMode(true)} width="200px" height="200px" viewBox="0 0 24 24" className="h-fit max-w-10 hover:stroke-[#BB285C] hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" >
                                        <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#fffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                }
                            </> : null
                        }
                    </div>

                    <div className='m-auto justify-center pb-10 grid gap-10 grid-cols-1 md:grid-cols-2 max-w-[1200px]'>
                        {/* SOUPE + PLAT DU CHEF */}

                        <MenuBase
                            produit={menu[0]}
                            putPanier={putPanier}
                            editable={editMode}
                            setData={setData}
                            data={data}
                            afficherMenu={afficherMenu}
                            showMessageFlash={showMessageFlash}
                        />
                        <MenuBase
                            produit={menu[1]}
                            putPanier={putPanier}
                            editable={editMode}
                            setData={setData}
                            data={data}
                            afficherMenu={afficherMenu}
                            showMessageFlash={showMessageFlash}
                        />
                    </div>

                    {/* PLATS PRINCIPAUX */}
                    <div className='border-2 border-[#EBEBEB] rounded-2xl p-5 md:p-7 justify-center text-center w-[100%] md:max-w-[1200px] md:m-auto'>
                        <h3 className='imperial mr-2 text-[#FFD8AD] pb-4 text-5xl md:text-6xl'>{t("Menu.plat-principaux")}</h3>

                        {menu.map((produit, i) => (
                            <div key={produit.id}>{produit.id > 2 ?
                                <MenuPrinc
                                    produit={menu[menu.findIndex(data => data.id === produit.id)]}
                                    putPanier={putPanier}
                                    editable={editMode}
                                    setData={setData}
                                    categories={produits.data}
                                    data={data}
                                    formIndex={i + 1}
                                    key={produit.id}
                                    afficherMenu={afficherMenu}
                                    showMessageFlash={showMessageFlash}
                                />
                                : ""}
                            </div>
                        ))}
                    </div>

                    {afficherMenu ?
                        <Link
                            href='/panier'
                            className="block m-auto w-fit text-sm md:text-base py-4 px-8 mt-10 md:mt-12 lg:mt-20  text-[#BB285C] font-bold bg-transparent border-4 border-[#BB285C] hover:bg-[#BB285C] hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 justify-self-center"
                        >
                            {t("Menu.go-panier")}
                        </Link>
                        : null}
                </form>
            </div >
        </div >
    );
}
