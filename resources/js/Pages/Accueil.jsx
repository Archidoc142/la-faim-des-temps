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

    const [messageVisibility, setMessageVisibility] = useState(true)

    useEffect(() => {
        let isLogout = params.get("isLogout");
        let commandePassee = params.get("commandePassee");

        if (isLogout || commandePassee) {
            localStorage.setItem("panier", JSON.stringify([]));
        }

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
            {loggedIn ?
                <MessageFlash
                    status={1}
                    message={"Bienvenue " + user.data.prenom + "!"}
                    visibility={messageVisibility}
                    setVisibility={setMessageVisibility}
                />
            : null}

            <Head title={t("Onglet.accueil")} />
            {/* this dont work */}
            <HeadWithImage
                imgFile="/img/accueil.jpg"
                title={t("Accueil.titre")}
                button={true}
                buttonText={t("Menu.menu-titre")}
                path="/menu"
            />
            {/* This works
             <div className='flex h-[37rem] lg:h-[48rem] bg-[url("../../../img/accueil.jpg")] bg-cover'>
                <div className='bg-white py-16 bg-opacity-75 my-auto w-full lg:py-10'>
                    <h1 className='w-80 m-auto font-serif text-[#04203f] leading-tight text-center text-5xl lg:w-[42rem]'>Votre option traiteur et plats cuisinés au Centro</h1>
                    <div className='flex justify-center'>
                        <Link href="/menu">
                            <button className='mt-8 lg:mt-6 uppercase bg-[#7A163C] text-white font-bold text-lg lg:text-base px-8 py-2 rounded-sm shadow-md hover:shadow-lg'>Menu de la semaine</button>
                        </Link>
                    </div>
                </div>
            </div> */}


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
