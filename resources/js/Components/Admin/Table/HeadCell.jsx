export default function HeadCell({title, index, width}) {

  const className = width ? `border py-3 bg-gray-300 w-${width}` : "border py-3 bg-gray-300"

  return (
    <th className={className} key={index}>
        {title}
    </th>
  )
}
