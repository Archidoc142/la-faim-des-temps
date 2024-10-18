import React from 'react'
import MenuItem from './MenuItem'

export default function Menu() {
    return (
        <div className="bg-[#061F3D] h-screen min-w-52">
            <MenuItem name="Clients" routeName="clients">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3 M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20" />
                </svg>
            </MenuItem>

            <MenuItem name="Commandes" routeName="commandes">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z M14 3v5h5 M16 13H8 M16 17H8 M10 9H8" />
                </svg>
            </MenuItem>

            <MenuItem name="Images" routeName="clients">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M3 3h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h18M8.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M20.4 14.5L16 10 4 20" />
                </svg>
            </MenuItem>

            <MenuItem name="Commentaires" routeName="commentaires">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="white" stroke="#fff" strokeWidth="1">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            </MenuItem>

            <MenuItem name="Tarifs" routeName="clients">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                    <path d="M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>

            </MenuItem>
        </div>
    )
}
