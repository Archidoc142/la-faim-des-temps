import googleLogo from '../../../public/img/google_icon.png'

export default function GoogleLogin({redirectToPanier}) {
  return (
    <a href={"/auth/redirect" + (redirectToPanier ? "?target=panier" : "")} >
        <button type="button" className='w-full bg-blue-500 text-white my-4 px-4 py-2 font-bold rounded-md hover:shadow-md h-10'>
            <span className='flex gap-3 justify-center items-center'>
                <img src={googleLogo} alt="Google" height={24} width={24} />
                <p className='leading-4'>Se connecter avec Google</p>
            </span>
        </button>
    </a>
  )
}
