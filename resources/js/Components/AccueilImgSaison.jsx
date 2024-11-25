export default function AccueilImgSaison({ classname, condition, src, alt, legend }) {
    return (
        <>
            {condition ? src ?
                <div className={"relative h-[500px] lg:h-[800px] " + classname}>
                    <img src={'../../../img/' + src} alt={alt} className='h-full w-full object-cover' />
                    <div className="font-serif absolute bottom-0 min-h-12 flex items-center text-white bg-black bg-opacity-60 w-full px-4 lg:text-lg">
                        {legend}
                    </div>
                </div>
            : null : null}
        </>
    );
}
