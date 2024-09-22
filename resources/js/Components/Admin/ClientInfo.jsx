export default function ClientInfo({title, value}) {
  return (
    <div className="flex mb-1">
        <p className="font-bold block w-60">{title} :</p>
        <p>{value}</p>
    </div>
  )
}
