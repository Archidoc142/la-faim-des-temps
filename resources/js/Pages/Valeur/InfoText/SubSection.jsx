import SubTitle from "./SubTitle";

export default function SubSection(props) {
    return(
        <div>
            <div className="p-4 m-5">
                <img
                    className="w-1/3 mx-auto py-5"
                    src={"img/"+props.image}
                    alt={props.image+" picture"}
                />

                <SubTitle title={props.SubTitle} />

                <p>{props.text}</p>
            </div>
        </div>
    );
}