export default function Cell({children, key}) {
    return (
        <td className="border even:bg-gray-100 text-center " key={key}>
          {children}
        </td>
    )
  }
