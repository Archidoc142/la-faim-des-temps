export default function PanierIndicateur({nbPanier}) {
    return <div className={"absolute -top-2 -right-3 bg-red-500 text-white font-bold w-6 h-6 rounded-full border-2 border-white text-center" + (nbPanier > 9 ? " text-xs leading-5" : " leading-4")}>{nbPanier}</div>;
}
