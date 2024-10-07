import { Head } from '@inertiajs/react';

import MainTitle from "./InfoText/MainTitle";
import Line from "./InfoText/Line";
import LittleOrangeSection from "./InfoText/LittleOrangeSection";
import WhiteSection from './InfoText/WhiteSection';

export default function Valeurs() {
    return(
        <>
            <div className='Producteur bg-[#EFBD9A]'>
                <Head title="Nos Valeurs" />

                <MainTitle/>

                <Line/>

                <LittleOrangeSection 
                    image={"loveBag.png"} 
                    title={"Nos Valeurs"} 
                    textAlignment={'center'} 
                    text="La faim des temps à toujours chercher à intégrer le maximum de bonnes pratiques environnementales dans son fonctionnement pour la simple et bonne raison que cela fait partie des valeurs de base de ses fondateurs. On ne mange pas très bien avec un terroir exploité à l'extrême et pollué..."                />

                {/* Section unique dans la page Valeurs.jsx */}
                <div className="lg:grid lg:grid-cols-4">
                    <img
                        className="w-1/3 mx-auto py-5 lg:absolute lg:z-0 lg:w-48 lg:top-2/3 lg:right-0 lg:mr-24"
                        src="img/bigLeafPlant.png"
                        alt="bigLeafPlant.png picture"
                    />

                    <div className="bg-[#F8ECE0] py-5 px-8 mx-14 lg:relative lg:z-10 lg:mr-48 lg:-mt-16 lg:p-8 lg:col-start-3 lg:col-end-5">
                        <h2 className='text-xl font-extrabold angkor-regular pb-3 lg:text-4xl'>
                            Pour un Centro <br />
                            plus <span className='text-[#387E39]'>vert</span> et <br />
                            Inclusif
                        </h2>

                        <p>
                            Soucieux de notre environnement et conscients qu'une entreprise 
                            alimentaire peut rapidement produire beaucoup de déchets, nous 
                            avons mis sur pied plusieurs stratégies pour réduire au maximum 
                            notre empreinte environnementale.
                        </p>
                    </div>
                </div>

                <Line/>

                <WhiteSection 
                    image1={"leaf.png"} 
                    subTitle1={"Produits Locaux"}
                    text1={"Nos partenaires sont majoritairement Sherbrookois... ou Québécois (on aime un peu trop l'île d'Orléans pour s'en passer). De plus nous utilisons des ingrédients locaux autant que possible et notre menu bistro change au rythme des saisons. Nous choisissons aussi prioritairement des producteurs ou artisans biologiques/naturels."}                    image2={"plantBag.png"} 
                    subTitle2={"Viser le zéro déchet"}
                    text2={"À la fin des temps, quasiment tout est recyclé ou composté. Nous sommes très fiers que notre poubelle soit de la taille d'une corbeille à papiers de bureaux. Notre chère clientèle nous rapporte les contenants pour les plats du traiteur. Ces derniers sont ensuite nettoyés et assainis avant d'être réutilisés."}
                    title={"Nos Gestes"} 
                    textAlignment={'center'}/>

                <Line/>
                {/* Section caché pour le moment, en attente de confirmation du projet */}
                <LittleOrangeSection 
                    image={"crossHand.png"} 
                    title={"Un accueil pour tous"} 
                    text={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing"}
                    textAlignment={'center'} 
                    imgIn={true} 
                    hidden={true}/> 
            </div>
        </>
    )
}