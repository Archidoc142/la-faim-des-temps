import React from 'react'
import MenuItem from './MenuItem'

export default function Menu() {
  return (
    <div className="bg-blue-950 h-screen w-56">
        <MenuItem name="Clients" routeName="clients"/>
        <MenuItem name="Commandes" routeName="clients"/>
        <MenuItem name="Images" routeName="clients"/>
        <MenuItem name="Commentaires" routeName="clients"/>
        <MenuItem name="Tarifs" routeName="clients"/>
    </div>
  )
}
