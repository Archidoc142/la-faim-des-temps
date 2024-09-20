export default function Cell({children}) {
    return (
        <td className="border even:bg-gray-100 text-center py-3">
          {children}
        </td>
    )
  }
