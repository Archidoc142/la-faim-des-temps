export default function Text({description, adresse}) {
    return (
        <div className="mx-auto text-white px-5 sm:mx-0 sm:pl-0 sm:py-7 sm:raw-span-3 sm:text-xl">
            <p>
                {description['fr']}
            </p>

            <p className="italic my-3 sm:mt-6">
                {adresse}
            </p>

        </div>
    )
  }