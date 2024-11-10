import AdminLayout from "@/Layouts/AdminLayout";

export default function QuickBooksAuth({url, tokensValid}) {
  return (
    <AdminLayout title="QuickBooks">
        <p className="mb-4">Connexion QuickBooks :
            <span className={"font-bold text-white ml-2 px-3 py-1 " + (tokensValid ? "bg-green-600" : "bg-red-600")}>
                {tokensValid ? "OK" : "Non authentifiée"}
            </span>
        </p>
        <a href={url}>
            <button type="button" className="text-white bg-green-600 mt-2 px-12 py-2 font-bold hover:shadow-lg text-lg hover:bg-green-500 border-2 border-red-500 hover:cursor-pointer rounded-lg">
                { tokensValid ? "Reconnecter" : "Connecter"} votre compte QuickBooks
            </button>
        </a>
    </AdminLayout>
  )
}
