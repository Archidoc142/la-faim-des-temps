export default function Image({ producteur }) {
    const imgFile = '/img/';

    return (
        <img
            className={`${producteur.id % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} mx-auto px-10 py-2 order-1 lg:row-span-4 lg:pl-6 lg:w-5/6`}
            src={producteur.image.nom_fichier !== '' ? imgFile + producteur.image.nom_fichier : imgFile + 'logo-big.jpg'}   //Si il y à un nom de fichier qui à été spécifié pour le producteur alors on affiche l'image liée, sinon on affiche le logo comme "image par défaut"
            alt={producteur.nom}
        />
    )
}