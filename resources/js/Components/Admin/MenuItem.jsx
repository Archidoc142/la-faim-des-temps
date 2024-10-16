import { Link } from '@inertiajs/react'

export default function MenuItem({name, routeName, children}) {
  return (
    <Link href={route("admin." + routeName)} className="bg-[#061F3D] text-white font-bold h-20 flex items-center hover:bg-[#06306D] px-6">
        <div className="flex gap-4 items-center">
            {children}
            <p>{name}</p>
        </div>
    </Link>
  )
}
