import { Link } from "@inertiajs/react";
import { space } from "postcss/lib/list";

export default function PaginationBar({ links }) {
    return (
        <div className="py-6 text-center">
            {links.map(link => (
                // Si il y a une page suivante ou précédente, on affiche un lien cliquable, sinon on affiche rien
                link.url ? (
                    <Link 
                        preserveScroll
                        key={link.label} 
                        href={link.url} 
                        className={`border px-4 py-2 mx-1 font-bold ${link.active ? 'text-white bg-[#7A163C]' : (isNaN(link.label) ? 'bg-[#7A163C] text-white' : 'text-gray-500')}`} 
                    >
                        {/* On remplace les caractères spéciaux par les flèches pour éviter d'utiliser dangerouslySetInnerHTML  */}
                        {link.label.replace('&raquo;', '»').replace('&laquo;', '«')}
                    </Link>
                ) : null
            ))}
        </div>
    )
}