export default function Title({url, nom}) {
    return (
        <div className="m-3 font-bold underline text-center text-[#296ACF] sm:m-0 sm:mt-6 sm:text-left sm:row-span-1">
            <h2 className="text-3xl sm:text-5xl"><a href={url}>{nom}</a></h2>
        </div>
    )
  }