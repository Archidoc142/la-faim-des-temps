import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="flex justify-center items-center bg-[#031b3e] h-svh">

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
                {children}
            </div>
        </div>
    );
}
