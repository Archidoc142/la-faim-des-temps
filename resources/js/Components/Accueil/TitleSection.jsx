export default function TitleSection({title, color}) {

    const styles = "font-serif text-4xl py-8 flex items-center justify-center h-12 text-white " + color;
    return (
        <div className={styles}>
            {title}
        </div>
    )
}
