import React from "react";
import SectionTitle from "./SectionTitle";
import SubSection from "./SubSection";

export default function WhiteSection(props) {
    return(
        <div className="lg:px-48 lg:py-8">
            <div className="bg-[#F8ECE0] p-4 m-5">
                <SectionTitle title={props.title} textAlignment={props.textAlignment}/>
                
                <SubSection image={props.image1} SubTitle={props.subTitle1} text={props.text1}/>
                <SubSection image={props.image2} SubTitle={props.subTitle2} text={props.text2} imgRight={true}/>
            </div>
        </div>
    );
}