export default function AccueilImg({src, alt, legend}) {

  return (
    <div className="relative">
        <img src={src} alt={alt} className='h-72 w-full object-cover'/>
        { legend ?
        <div className="font-serif absolute bottom-0 h-12 flex items-center text-white bg-black bg-opacity-60 w-full px-4">
            {legend}
        </div> : ""
        }
    </div>
  )
}
