export default function AccueilImg({src, alt, legend}) {

  return (
    <div className="relative lg:w-2/3">
        <img src={src} alt={alt} className='h-72 lg:h-full w-full object-cover'/>
        { legend ?
        <div className="font-serif absolute bottom-0 h-12 flex items-center text-white bg-black bg-opacity-60 w-full px-4 lg:text-lg">
            {legend}
        </div> : ""
        }
    </div>
  )
}
