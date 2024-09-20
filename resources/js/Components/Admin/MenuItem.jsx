import { Link } from '@inertiajs/react'

export default function MenuItem({name, routeName}) {
  return (
    <Link href={route("admin." + routeName)} className="bg-blue-950 text-white font-semibold h-16 flex items-center hover:bg-blue-800 px-6">
        {name}
    </Link>

  )
}
