import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function MenuFormats({ produitId, formats, putPanier, showMessageFlash}) {

    const [t, i18n] = useTranslation("global");
    const [isSizesOpen, setIsSizesOpen] = useState(false);

    function toggleState() {
        setIsSizesOpen(!isSizesOpen);
    }

    const container = useRef()

    useGSAP(() => {
        if (isSizesOpen) {
            gsap.to(container.current, { height: "auto" });

        } else {
            gsap.to(container.current, {height:0})
        }
    }, [isSizesOpen])

    return (
        <>
            <div
                key={formats.id}
                className='border border-[#BB285C] hover:border-white hover:cursor-pointer self-end mt-4 md:mt-0'
                onClick={() => toggleState()}
            >
                <div className='md:w-64 text-center'>
                    <p className='select-none p-1 text-sm text-white font-semibold border-2 border-[#BB285C] bg-[#BB285C]'>{t("Menu.formats")}</p>

                    <div ref={container} className='overflow-hidden h-0'>
                        {(formats.map(format => (
                            <div onClick={() => {putPanier(format.id, produitId); showMessageFlash(1, t("Menu.bienajoute"));}} key={format.id} className='cursor-pointer border-2 border-[#BB285C] justify-center text-start'>
                                <div className='py-1 px-2 border-x-2 border-b-2 border-[#BB285C] bg-white hover:bg-[#f8ece1] flex flex-nowrap items-center justify-between'>
                                    <p className='mr-5'>{i18n.language == 'fr' ? format.nom.fr + " (" + format.montant + "$)" : format.nom.en + " ($" + format.montant + ")"} </p>
                                    <div className='group'>
                                        <svg width="20px" height="20px" viewBox="0 0 256 256">
                                            <path fill="#BB285C" className='group-hover:fill-slate-600' d="M 44.00,38.00 C 44.00,38.00 18.00,38.00 18.00,38.00 14.59,38.00 9.00,38.40 6.04,36.83 0.13,33.68 -0.65,24.76 4.23,20.43 6.88,18.07 9.67,18.05 13.00,18.00 13.00,18.00 47.00,18.00 47.00,18.00 50.22,18.01 53.93,17.79 56.81,19.45 62.21,22.56 64.75,36.08 66.67,42.00 66.67,42.00 89.98,118.00 89.98,118.00 89.98,118.00 96.02,138.00 96.02,138.00 96.84,140.61 97.84,144.46 100.27,145.98 102.24,147.21 105.72,147.00 108.00,147.00 108.00,147.00 191.00,147.00 191.00,147.00 193.22,147.00 196.70,147.22 198.59,145.98 201.10,144.31 205.39,132.39 206.85,129.00 206.85,129.00 229.00,77.00 229.00,77.00 224.35,77.00 211.60,77.69 208.02,75.83 201.51,72.43 200.44,61.92 207.11,58.17 209.57,56.79 213.23,57.00 216.00,57.00 216.00,57.00 243.00,57.00 243.00,57.00 251.01,57.11 256.48,61.37 254.39,70.00 254.39,70.00 245.01,93.00 245.01,93.00 245.01,93.00 222.80,146.00 222.80,146.00 220.38,151.98 216.75,163.55 210.98,166.55 207.83,168.19 204.44,167.99 201.00,168.00 201.00,168.00 97.00,168.00 97.00,168.00 92.70,167.99 87.79,168.14 84.22,165.30 80.12,162.03 76.00,144.74 74.28,139.00 74.28,139.00 55.66,78.00 55.66,78.00 55.66,78.00 44.00,38.00 44.00,38.00 Z M 128.00,56.00 C 128.00,56.00 128.00,31.00 128.00,31.00 128.05,27.42 128.22,24.13 130.65,21.23 134.83,16.24 144.63,16.95 147.77,24.04 149.86,28.75 149.00,49.59 149.00,56.00 149.00,56.00 172.00,56.00 172.00,56.00 174.84,56.00 178.27,55.84 180.91,57.01 187.63,59.98 188.76,69.88 182.79,74.26 180.43,75.99 177.78,75.96 175.00,76.00 175.00,76.00 149.00,76.00 149.00,76.00 149.00,76.00 148.47,106.00 148.47,106.00 147.08,111.68 142.94,114.94 137.00,114.14 132.29,113.51 129.29,110.62 128.17,106.00 128.17,106.00 128.17,76.00 128.17,76.00 128.17,76.00 102.00,76.00 102.00,76.00 98.67,75.95 95.88,75.93 93.23,73.57 88.38,69.26 89.44,60.32 95.10,57.17 97.42,55.89 100.42,56.01 103.00,56.00 103.00,56.00 128.00,56.00 128.00,56.00 Z M 82.00,192.71 C 86.18,192.84 89.43,193.14 92.98,195.65 106.05,204.90 100.99,229.30 81.00,227.90 65.68,226.83 59.44,207.66 70.19,197.21 73.86,193.64 77.14,193.07 82.00,192.71 Z M 210.00,192.61 C 215.53,192.67 220.66,193.84 224.47,198.19 233.78,208.82 227.48,226.74 213.00,227.91 193.91,229.44 187.69,207.80 198.33,197.34 201.74,193.98 205.46,193.18 210.00,192.61 Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )))}
                    </div>
                </div>
            </div>
        </>
    )
}
