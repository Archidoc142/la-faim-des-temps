export default function Cell({children, key, className = ""}) {

    return (
        <td className={"overflow-hidden border even:bg-gray-100 text-center " + className} key={key}>
          {children}
        </td>
    )
  }
