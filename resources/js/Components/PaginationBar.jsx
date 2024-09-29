import { Link } from "@inertiajs/react";

export default function PaginationBar({links}) {
    return (
        <div className="py-6 text-center">
            {links.map(link => (
                link.url ? (
                    <Link 
                        key={link.label} 
                        href={link.url} 
                        dangerouslySetInnerHTML={{ __html: link.label}}
                        className={`border px-4 py-2 mx-1 ${link.active ? 'bg-gray-200' : 'bg-white'}`} 
                    />
                ) :
                <span 
                    key={link.label} 
                    dangerouslySetInnerHTML={{ __html: link.label}}
                    className={`border px-4 py-2 mx-1 text-slate-300`}
                ></span>
            ))}
        </div>
    )
}