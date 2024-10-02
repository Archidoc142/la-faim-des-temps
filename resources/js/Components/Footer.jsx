import { useTranslation } from 'react-i18next';
import FooterProps from './FooterProps';
import FooterArray from './FooterArray';
import FooterLink from './FooterLink';
import { usePage } from '@inertiajs/react';

import logoRect from '../../../public/img/logo-rect.jpg'
import logoBig from '../../../public/img/logo-big.jpg'
import InstagramLogo from './InstagramLogo';
import FacebookLogo from './FacebookLogo';

export default function Footer() {

    const [t, i18n] = useTranslation("global");
    const newH = usePage().props.horaire;

    return (
        <footer className='Footer w-full border-t-2 border-gray-500 bg-[#0a1732] p-7 flex text-center'>
            {/* Bloc image*/}
            <div className='hidden lg:block w-[30%] max-w-[300px]'>
                <img src={logoBig} alt="img-logo-big" className='w-5/6 mb-6' />
            </div>

            {/* Bloc d'écriture*/}
            <div className='lg:w-2/3 2xl:flex justify-center'>
                <img src={logoRect} alt="img-logo-rect" className='block lg:hidden w-1/2 m-auto border-gray-500 border-2' />

                <div className='lg:flex gap-32 2xl:gap-48'>
                    {/* Côté gauche en format lg*/}
                    <div className='my-6 lg:m-0'>
                        <FooterProps title="Contact" message="cavistefaimdestemps@gmail.com" />
                        <FooterArray title="Horaire" array={newH} />
                        <FooterProps title="Adresse" message="9-297 rue King Ouest, Sherbrooke, J1H 1R2" />
                    </div>

                    {/* Côté droit en format lg*/}
                    <div>
                        <FooterLink title="À propos" />

                        <div className='flex justify-center'>
                            <p className='arsenal italic text-white text-xl font-bold'>Entrez dans notre ruelle méconnue!</p>
                        </div>

                        <div className='mt-2 flex p-6 lg:p-0 justify-center lg:justify-normal gap-6 2xl:justify-center'>
                            <InstagramLogo />
                            <FacebookLogo />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
