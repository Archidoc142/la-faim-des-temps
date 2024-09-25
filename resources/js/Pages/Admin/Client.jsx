import ClientInfo from '@/Components/Admin/ClientInfo'
import AdminLayout from '@/Layouts/AdminLayout'
import React from 'react'

export default function Client({client}) {

  const nomComplet = client.data.prenom + " " + client.data.nom
  return (
    <AdminLayout title="Informations du client" clientPage={true}>
        <ClientInfo title="Nom complet" value={nomComplet}/>
        <ClientInfo title="Téléphone" value={client.data.telephone}/>
        <ClientInfo title="Courriel" value={client.data.email}/>
        <ClientInfo title="Date de création du compte" value={client.data.created_at_hour}/>

        {/* Ajouter tableau des commandes du client ici */}
    </AdminLayout>
  )
}
