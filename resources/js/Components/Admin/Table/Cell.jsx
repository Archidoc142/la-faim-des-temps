export default function Cell({children, key, className = "", onClick = null}) {

    return (
        <td className={"py-2 overflow-hidden border even:bg-gray-100 text-center " + className} key={key} onClick={onClick}>
          {children}
        </td>
    )
  }
