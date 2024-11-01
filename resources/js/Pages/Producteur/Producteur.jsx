import Title from "./InfoText/Title";
import Text from "./InfoText/Text";
import Image from "./InfoText/Image";

export default function Producteur({producteur, langue, editable, setData, data, key}) {
    return (
        <>
            <div
                className={`${producteur.id % 2 === 0 ? 'bg-[#7A163C80]' : ''} my-5 rounded-lg m-3 py-4 lg:m-8`}
                id='newProducteur'
            >
                <div className='lg:grid lg:grid-cols-2 lg:p-4'>
                    <Image producteur={producteur} />

                    <div className={`${producteur.id % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                        <Title url={producteur.url} nom={producteur.nom} />

                        <Text description={producteur.description[langue]} adresse={producteur.adresse} />
                    </div>
                </div>
            </div>
        </>
    )
}