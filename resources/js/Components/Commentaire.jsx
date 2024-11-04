import { useEffect, useRef } from "react"
import StarsComment from "./StarsComment";

export default function Commentaire({ commentaire, setCommentaireShow }) {

    const out = useRef(null);
    useOutside(out);

    function useOutside(ref) {
        useEffect(() => {
            function handleClickOutside(e) {
                if (out.current && !out.current.contains(e.target)) {
                    setCommentaireShow(false)
                }
            }

            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [out])
    };

    return (
        <div id="commentaire">
            <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50 z-10"></div>

            <div ref={out} className="absolute w-full flex justify-center top-[20%] left-0 p-4 z-10">
                <div className="bg-white min-w-[600px] max-w-[600px] p-6 rounded-lg border-black border-2">

                    <div className="flex justify-between items-center mb-2">
                        <h2 className="font-bold text-3xl">Commentaire</h2>

                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="cursor-pointer" onClick={() => setCommentaireShow(false)}>
                            <path d="M18 6 L6 18"></path>
                            <path d="M6 6 L18 18"></path>
                        </svg>
                    </div>

                    <div className="grid grid-cols-12 mt-4 mb-8 gap-1">
                        <p className="font-bold col-span-2">Client :</p>
                        <p className="col-span-10">{commentaire.utilisateur}</p>

                        <p className="font-bold col-span-2">Note :</p>
                        <StarsComment note={commentaire.note} updatable={false} className="col-span-10"/>
                    </div>

                    <p className="italic overflow-hidden">{commentaire.commentaire ? commentaire.commentaire : "---"}</p>
                </div>
            </div>
        </div>
    )
}
