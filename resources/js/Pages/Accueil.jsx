import TitleSection from '@/Components/TitleSection';
import { Head, router, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import AccueilImg from '@/Components/AccueilImg';
import AccueilImgSaison from '@/Components/AccueilImgSaison';
import HeadWithImage from '@/Components/HeadWithImage';

import ferme from '../../../public/img/ferme.jpg'
import assiette from '../../../public/img/assiette.jpg'
import { useEffect, useState } from 'react';
import StarsComment from '@/Components/StarsComment';
import Carrousel from '@/Components/Carrousel';
import ModifButton from '@/Components/Admin/ModifButton';
import TextareaStatique from '@/Components/Admin/TextareaStatique';
import MessageFlash from '@/Components/MessageFlash';

export default function Accueil({ commentaires, images, qbValid, idsImgs }) {

    console.log(idsImgs)
    console.log(images)

    const [t, i18n] = useTranslation("global");
    const user = usePage().props.auth.user;

    const params = new URLSearchParams(document.location.search);
    const loggedIn = params.get("loggedIn");
    const isLogout = params.get("isLogout");
    const commandePassee = params.get("commandePassee");
    const avisEnvoye = params.get("avisEnvoye");

    const [messageVisibility, setMessageVisibility] = useState(true)
    const [message, setMessage] = useState("")

    useEffect(() => {

        if (isLogout || commandePassee) {
            localStorage.setItem("panier", JSON.stringify([]));
            window.dispatchEvent(new Event("storage"));
        }

        if (isLogout)
            setMessage(t("Login.logout"));
        else if (loggedIn)
            setMessage(t("Login.bienvenue") + " " + user.data.prenom + "!");
        else if (commandePassee)
            setMessage(t("Panier.commande_recue"));
        else if (avisEnvoye)
            setMessage(t("Avis.submitted"));


        if (user && user.data.role == "admin" && !qbValid) {
            alert("AVERTISSEMENT: Authentification QuickBooks échouée.\n\nLes nouveaux clients et les commandes n'apparaîtront pas sur votre QuickBooks.\n\nReconnectez votre compte dans la section \"QuickBooks\" du menu administrateur pour régler le problème.")
        }

    }, [])

    const [index, setIndex] = useState(0)

    const movePostLeft = () => {
        const newIndex = (index > 0) ? index - 1 : commentaires.data.length - 1;
        setIndex(newIndex);
    };

    const movePostRight = () => {
        const newIndex = (index < commentaires.data.length - 1) ? index + 1 : 0;
        setIndex(newIndex);
    };

    const moveToIndex = (index) => {
        setIndex(index)
    }

    const [plus2Img, setPlusPort] = useState(idsImgs[1] != null)

    /* TEXTE STATIQUE "UNE CUISINE DE STYLE BISTRO" */
    const [editBistroMode, setEditBistroMode] = useState(false);

    const [bistropfr, setBistropfr] = useState(t('Accueil.bistro-description', { lng: 'fr' }));
    const [bistropen, setBistropen] = useState(t('Accueil.bistro-description', { lng: 'en' }));

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
                onFinish: () => { setEditBistroMode(false); window.location.reload(); }
            });
        }
        else {
            alert("Un élément est manquant.")
        }
    }

    return (
        <>
            {loggedIn || commandePassee || isLogout || avisEnvoye ?
                <MessageFlash
                    status={1}
                    message={message}
                    visibility={messageVisibility}
                    setVisibility={setMessageVisibility}
                />
                : null}

            <Head title={t("Onglet.accueil")} />

            <HeadWithImage
                imgFile="/img/accueil.jpg"
                title={t("Accueil.titre")}
                button={true}
                buttonText={t("Menu.menu-titre")}
                path="/menu"
            />

            <div className={'grid grid-cols-1 ' + (plus2Img ? 'md:grid-cols-2 lg:grid-cols-3' : (idsImgs[0] != null ? 'lg:grid-cols-2' : null))}>
                {idsImgs[1] != null ?
                    <AccueilImgSaison
                        classname="hidden lg:block"
                        condition={plus2Img}
                        src={images.data[idsImgs[1]]['src']}
                        alt={i18n.language === 'fr' ? images.data[idsImgs[1]]['legende']['fr'] : images.data[idsImgs[1]]['legende']['en']}
                        legend={i18n.language === 'fr' ? images.data[idsImgs[1]]['legende']['fr'] : images.data[idsImgs[1]]['legende']['en']}
                    /> : null}

                <div className='py-12 px-8 items-center content-center'>
                    <ModifButton
                        afficher={user && user.data.role == "admin"}
                        editMode={editBistroMode}
                        setEditMode={setEditBistroMode}
                        changeText={changeText}
                        elemChange={[["Accueil", "bistro-description", bistropfr, bistropen]]}
                        couleur="white"
                    />

                    <h2 className='font-serif text-white text-center text-2xl md:text-4xl font-medium mb-8 px-4'>
                        {t("Accueil.bistro")}
                    </h2>
                    {editBistroMode ?
                        <TextareaStatique
                            setStatiqueFR={setBistropfr}
                            setStatiqueEN={setBistropen}
                            element="Accueil.bistro-description"
                            couleur="white"
                        />
                        :
                        <p className='font-serif text-white text-center text-base md:text-xl'>{t("Accueil.bistro-description")}</p>
                    }

                </div>

                {idsImgs[0] != null ?
                    <AccueilImgSaison
                        classname=""
                        condition={idsImgs[0] != null}
                        src={images.data[idsImgs[0]]['src']}
                        alt={i18n.language === 'fr' ? images.data[idsImgs[0]]['legende']['fr'] : images.data[idsImgs[0]]['legende']['en']}
                        legend={i18n.language === 'fr' ? images.data[idsImgs[0]]['legende']['fr'] : images.data[idsImgs[0]]['legende']['en']}
                    /> : null}
            </div>

            {/* Carrousel images */}

            <div className='lg:flex lg:h-[40rem]'>
                <TitleSection title={t("Accueil.ferme")} color="bg-lime-600" />
                <AccueilImg src={ferme} alt="De la ferme..." />
            </div>

            <div className='lg:flex flex-row-reverse lg:h-[40rem] '>
                <TitleSection title={t("Accueil.assiette")} color="bg-rose-900" />
                <AccueilImg src={idsImgs[2] ? ('../../../img/' + images.data[idsImgs[2]]['src']) : assiette} alt="...à l'assiette!" legend={idsImgs[2] ? (i18n.language === 'fr' ? images.data[idsImgs[2]]['legende']['fr'] : images.data[idsImgs[2]]['legende']['en']) : "...à l'assiette!"} />
            </div>

            {commentaires && commentaires.data.length > 0 ? <div className='bg-[#041A37] pt-6 text-center'>
                <p className='text-white font-bold text-3xl'>{t("Accueil.commentaire")}</p>

                <div className='py-6 px-4 flex items-center justify-center gap-8'>
                    <button onClick={() => movePostLeft()}>
                        <svg className='w-20 h-20 md:w-24 md:h-24 rounded-[50%]' viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>

                    <div className='bg-white rounded-lg px-8 w-[50%] min-h-[160px] border-gray-400 border-4 pt-8 py-2'>
                        <p className='text-xl font-semibold text-[#1a1d24] italic min-h-36 flex justify-center items-center'>{commentaires.data[index].commentaire}</p>

                        <div className='mt-4 text-left'>
                            <StarsComment note={commentaires.data[index].note} updatable={false} />
                            <p className='font-bold text-[#4a5366] text-lg'>{commentaires.data[index].utilisateur}</p>
                        </div>
                    </div>


                    <button onClick={() => movePostRight()}>
                        <svg className='w-20 h-20 md:w-24 md:h-24 rounded-[50%]' viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>

                <div className='flex gap-4 justify-center pb-6'>
                    {commentaires.data.map((item, tempIndex) => (
                        <span
                            onClick={() => moveToIndex(tempIndex)}
                            key={tempIndex}
                            className={"dot cursor-pointer" + (index === tempIndex ? " !bg-white" : "")}
                        ></span>
                    ))}
                </div>
            </div> : null}

            {images.data.length > 0 ? <Carrousel images={images.data} i18n={i18n} /> : null}
        </>
    );
}
