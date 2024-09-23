export default function Text({description, adresse}) {
    return (
        <div className="mx-auto text-white px-5 sm:mx-0 sm:pl-0 sm:py-7 sm:raw-span-3 sm:text-2xl">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                 been the industry's standard dummy text ever since the 1500s, when an unknown printer took 
                 a galley of type and scrambled it to make a type specimen book. It has survived not only five 
                 centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was 
                 popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages
            </p>

            <p className="italic my-3 sm:mt-6">
                {adresse}
            </p>

        </div>
    )
  }