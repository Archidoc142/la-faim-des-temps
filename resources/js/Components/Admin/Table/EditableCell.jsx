export default function EditableCell({value, name, setData}) {
  return (
    <td className="border even:bg-gray-100 text-center px-2">
        <input type="text" id={name} name={name} defaultValue={value == "---" ? "" : value} onChange={(e) => setData(name, e.target.value)}
        className="w-full h-7"/>
    </td>
  )
}
