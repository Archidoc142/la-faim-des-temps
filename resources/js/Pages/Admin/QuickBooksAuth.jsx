import AdminLayout from "@/Layouts/AdminLayout";

export default function QuickBooksAuth({url}) {
  return (
    <AdminLayout title="QuickBooks">
        {url}
        <br />

        <a href={url}>QuickBooks</a>
    </AdminLayout>
  )
}
