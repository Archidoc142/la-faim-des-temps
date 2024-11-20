import { Link } from '@inertiajs/react';

export default function HeadWithImage(props) {
    return (
        <div className={`flex h-[37rem] lg:h-[48rem] bg-cover`} style={{ backgroundImage: `url('${props.imgFile}')` }}>
            <div className='bg-white py-16 bg-opacity-75 my-auto top-24 w-full lg:py-10'>
                <h1 className='w-80 m-auto font-serif text-[#04203f] leading-tight text-center text-5xl lg:w-[42rem]'>{props.title}</h1>
                {props.button && (
                    <div className='flex justify-center'>
                        <Link href={props.path}>
                            <button className='mt-8 lg:mt-6 uppercase bg-[#7A163C] text-white font-bold text-lg lg:text-base px-8 py-2 rounded-sm shadow-lg border border-[#7A163C] hover:border-white'>{props.buttonText}</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
