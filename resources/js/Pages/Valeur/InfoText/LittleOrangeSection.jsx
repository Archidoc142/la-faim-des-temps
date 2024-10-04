import React, {useState} from "react";
import SectionTitle from "./SectionTitle";

export default function LittleOrangeSection(props) {

    const [title, setTitle] = useState(props.title);
    const [textAlignment, setTextAlignment] = useState(props.textAlignment);

    return(
        <div className={`py-5 ${props.hidden ? 'hidden' : ''}`}>
            <img
                className={`w-1/3 mx-auto py-5 ${props.imgIn ? 'hidden' : ''} lg:absolute lg:z-0 lg:w-48 lg:top-36 lg:-rotate-8`}
                src={"img/"+props.image}
                alt={props.image+" picture"}
            />

            <div className="bg-[#E2A76C] p-4 m-5 lg:relative lg:z-10 lg:grid lg:grid-cols-6 lg:m-0 lg:w-1/3 lg:p-5 lg:ml-20">
                <img
                    className={`w-1/3 mx-auto py-5 ${props.imgIn ? '' : 'hidden'} lg:hidden`}
                    src={"img/"+props.image}
                    alt={props.image+" picture"}
                />
                <SectionTitle title={title}  textAlignment={textAlignment}/>

                {/* Cette image n'apparaît que en format laptop */}
                <img 
                    className="w-1/3 hidden lg:block lg:z-20 lg:col-span-2 lg:w-full lg:my-auto"
                    src="img/handPlant.png" 
                    alt="hand planting picture" 
                />
                <p className=" lg:z-10 lg:col-span-4 lg:mt-3">{props.text}</p>
            </div>
        </div>
    );
}