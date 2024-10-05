import { Link, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import Item from '../item'
import MessageFlash from '@/Components/MessageFlash';
import PanierItem from '@/Components/PanierItem';
import PanierFinalisation from '@/Components/PanierFinalisation';
import { useState, useEffect } from 'react';

export default function Panier({ produits, adresses }) {
    const [t, i18n] = useTranslation("global")
    const [panier, setPanier] = useState(JSON.parse(localStorage.getItem("panier")))
    const [total, setTotal] = useState(0)
    const [boxVisible, setBoxVisible] = useState(false)

    // Message Flash
    const [message, setMessage] = useState("")
    const [messageV, setMessageV] = useState(false)
    const [messageS, setMessageS] = useState(false)

    const calculateCost = () => {
        const totalCost = panier.reduce((acc, item) => {
            const produit = produits.data.find(p => p.id === item.produitId)
            const format = produit.formats.find(f => f.id === item.formatId)

            return acc + (item['qte'] * format.montant)
        }, 0);

        setTotal(totalCost)
    };

    useEffect(() => {
        calculateCost()
    }, []);

    const showMessageFlash = (status, message, visibility) => {
        setMessageS(status)
        setMessage(message)
        setMessageV(visibility)
    }

    return (
        <div className='py-8 px-12'>
            <Head title="Panier" />

            <MessageFlash
                status={messageS}
                message={message}
                visibility={messageV}
                setVisibility={setMessageV}
            />

            <h2 className='text-white text-2xl font-bold border-b-[1px] border-b-white pb-2 mb-8'>{t("Panier.titre")}</h2>

            {panier.length > 0 ?
                <>
                    {panier.map(item => {
                        const p = produits.data.find((p) => p.id == item['produitId'])

                        return <PanierItem
                            key={item['id']}
                            produit={p}
                            id={item['id']}
                            formatId={item['formatId']}
                            quantity={item['qte']}
                            panier={panier}
                            setPanier={setPanier}
                            setTotal={setTotal}
                            calcul={calculateCost}
                            ln={i18n.language}
                            showMessageFlash={showMessageFlash} />
                    })}

                    <div className='text-white text-right mt-8'>
                        <p className='text-2xl'>{t("Panier.total")}</p>
                        <p className='mb-4 text-4xl font-bold'>{total}$</p>

                        <button
                            className='bg-[#7A163C] text-2xl px-4 py-2 border-black border-[1px]'
                            onClick={() => setBoxVisible(true)}
                        >
                            {t("Panier.pass")}
                        </button>
                    </div>

                    {boxVisible ? <PanierFinalisation
                                        prix={total}
                                        setBoxVisible={setBoxVisible}
                                        adresses={adresses}
                                    /> : null}
                </>

                : <p className='text-[#929292] font-bold text-xl'>{t("Panier.vide")}</p>
            }
        </div>
    );
}
