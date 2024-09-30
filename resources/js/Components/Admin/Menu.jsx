import React from 'react'
import MenuItem from './MenuItem'

export default function Menu() {
  return (
    <div className="bg-[#061F3D] h-screen min-w-60">
        <MenuItem name="Clients" routeName="clients"/>
        <MenuItem name="Commandes" routeName="commandes"/>
        <MenuItem name="Images" routeName="clients"/>
        <MenuItem name="Commentaires" routeName="clients"/>
        <MenuItem name="Tarifs" routeName="clients"/>
    </div>
  )
}
