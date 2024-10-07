import SubTitle from "./SubTitle";

export default function SubSection(props) {
    const isEven = props.index % 2 === 0;

    return(
        <div>
            <div className="p-4 m-5 lg:grid lg:grid-cols-2">
                <img
                    className={`w-1/3 mx-auto py-5 ${props.imgRight ? 'lg:order-2' : ''}`}
                    src={"img/"+props.image}
                    alt={props.image+" picture"}
                />

                <div>
                    <SubTitle title={props.SubTitle} />

                    <p>{props.text}</p>
                </div>
            </div>
        </div>
    );
}