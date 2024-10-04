import React, {useState} from "react";
import SectionTitle from "./SectionTitle";
import SubSection from "./SubSection";

export default function WhiteSection(props) {

    const [title, setTitle] = useState(props.title);
    const [textAlignment, setTextAlignment] = useState(props.textAlignment);

    return(
        <div className="">
            <div className="bg-[#F8ECE0] p-4 m-5">
                <SectionTitle title={title} textAlignment={textAlignment}/>
                
                <SubSection image={props.image1} SubTitle={props.subTitle1} text={props.text1}/>
                <SubSection image={props.image2} SubTitle={props.subTitle1} text={props.text2}/>
            </div>
        </div>
    );
}