import AdminLayout from "@/Layouts/AdminLayout";

export default function QuickBooksAuth({url, qbExists}) {
  return (
    <AdminLayout title="QuickBooks">
        { !qbExists ?
            <h2 className="mb-6 text-xl font-bold text-red-700">Attention : Compte QuickBooks non lié! <br/>
            Les nouveaux clients et les commandes n'apparaîtront pas sur votre QuickBooks.<br/>
            Cliquez ci-dessous pour connecter le site à votre compte QuickBooks.</h2>: ""
        }
        <a href={url}>
            <button type="button" className="text-white bg-green-600 px-12 py-2 font-bold hover:shadow-lg text-lg hover:bg-green-500 border-2 border-red-500 hover:cursor-pointer rounded-lg">
                { qbExists ? "Reconnecter" : "Connecter"} votre compte QuickBooks
            </button>
        </a>
    </AdminLayout>
  )
}
