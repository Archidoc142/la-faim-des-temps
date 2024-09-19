export default function Producteur( { producteurs }) {
    console.log(producteurs);
    return (
        <>
        <h1>Nos Producteurs</h1>

        <div>
            {producteurs.map(producteur => (
                <div className="mb-8" key={producteur.id}>
                    <img className="w-32 h-32" src="https://www.cantonsdelest.com/files/mediaupload/741/1/75d08fc6.jpg" alt={producteur.id_image} />
                    
                    <h2><a href={producteur.url}>{producteur.nom}</a></h2>
                    
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                    <p>{producteur.adresse}</p>

                    <hr />
                </div>
            ))}
        </div>
        </>
    )
}