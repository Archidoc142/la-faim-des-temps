import React, {useState} from "react";
import SectionTitle from "./SectionTitle";

export default function LittleSection(props) {

    const [title, setTitle] = useState(props.title);

    return(
        <div className="">
            <img
                className="w-1/3 mx-auto py-5"
                src={"img/"+props.image}
                alt="loveBag picture"
            />

            <div className="bg-[#E2A76C] p-4 m-5">
                <SectionTitle title={title}/>

                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.
                  Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, 
                  tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia 
                  ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit 
                  amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam.
                  Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales 
                </p>
            </div>
        </div>
    );
}