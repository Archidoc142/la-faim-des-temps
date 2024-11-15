import TitleSection from '@/Components/TitleSection';
import { Link, Head, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import AccueilImg from '@/Components/AccueilImg';
import HeadWithImage from '@/Components/HeadWithImage';

import ferme from '../../../public/img/ferme.jpg'
import assiette from '../../../public/img/assiette.jpg'
import { useEffect, useState } from 'react';
import StarsComment from '@/Components/StarsComment';
import Carrousel from '@/Components/Carrousel';
import MessageFlash from '@/Components/MessageFlash';

export default function Accueil({ commentaires, images, qbValid }) {

    const [t, i18n] = useTranslation("global");
    const user = usePage().props.auth.user;

    const params = new URLSearchParams(document.location.search);
    const loggedIn = params.get("loggedIn");
    const isLogout = params.get("isLogout");
    const commandePassee = params.get("commandePassee");

    const [messageVisibility, setMessageVisibility] = useState(true)
    const [message, setMessage] = useState("")

    useEffect(() => {

        if (isLogout || commandePassee) {
            localStorage.setItem("panier", JSON.stringify([]));
            window.dispatchEvent(new Event("storage"));
        }

        if(isLogout)
            setMessage("Déconnexion réussie, à la prochaine!");
        else if(loggedIn)
            setMessage("Bienvenue " + user.data.prenom + "!");
        else if(commandePassee)
            setMessage("Nous avons bien reçu votre commande, merci!");

        if(user && user.data.role == "admin" && !qbValid) {
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

    return (
        <>
            {loggedIn || commandePassee || isLogout ?
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

            <div className='bg-[#04203f] py-12 px-8'>
                <h2 className='font-serif text-white text-center text-4xl font-medium mb-8 px-4'>
                    {t("Accueil.bistro")}
                </h2>
                <p className='font-serif text-white text-center text-xl'>
                    {t("Accueil.bistro-description")}
                </p>
            </div>

            {/* Carrousel images */}

            <div className='lg:flex lg:h-[40rem]'>
                <TitleSection title={t("Accueil.ferme")} color="bg-lime-600" />
                <AccueilImg src={ferme} alt="De la ferme..." />
            </div>

            <div className='lg:flex flex-row-reverse lg:h-[40rem] '>
                <TitleSection title={t("Accueil.assiette")} color="bg-rose-900" />
                <AccueilImg src={assiette} alt="...à l'assiette!" legend="Lorem ipsum" />
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

                {images.data.length > 0 ? <Carrousel images={images.data} i18n={i18n} /> : null}
            </div> : null }
        </>
    );
}
