import { Head } from '@inertiajs/react';

import MainTitle from "./InfoText/MainTitle";
import Line from "./InfoText/Line";
import LittleSection from "./InfoText/LittleSection";

export default function Valeurs() {
    return(
        <>
            <div className='Producteur bg-[#EFBD9A]'>
                <Head title="Nos Valeurs" />

                <MainTitle/>

                <Line/>

                <LittleSection image={"loveBag.png"} title={"Nos Valeurs"}/>

                <LittleSection image={"loveBag.png"} title={"Pour un centro plus vert et inclusif"}/>
            </div>
        </>
    )
}