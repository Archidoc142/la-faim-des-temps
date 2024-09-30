export default function TitleSection({title, color}) {

    const styles = "lg:flex lg:block lg:w-1/3 lg:h-full font-serif text-4xl lg:text-5xl py-8 flex items-center justify-center h-12 text-white " + color;
    return (
        <div className={styles}>
            <div className="lg:m-auto">
                {title}
            </div>

        </div>
    )
}
