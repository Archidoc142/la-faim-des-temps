export default function SectionTitle(props) {
    console.log(props);
    return (
        <h2 className={`text-${props.textAlignment} text-xl font-extrabold angkor-regular lg:col-span-6 lg:text-4xl`}>{props.title}</h2>
    );
}