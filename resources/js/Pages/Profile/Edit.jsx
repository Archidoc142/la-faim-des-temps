import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <div className='bg-white'>
            <Head title="Profile" />

            <div className='sm:py-12'>
                <div className=" mx-auto sm:px-6 lg:px-8 space-y-6 flex flex-col justify-center">
                    <div className="p-4 sm:p-8 bg-white">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className='p-8 sm:max-w-[80%] mx-auto sm:bg-[#F7F6F6] shadow sm:rounded-lg'
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white">
                        <UpdatePasswordForm
                            className='p-8 sm:max-w-[40%] mx-auto sm:bg-[#F7F6F6] shadow sm:rounded-lg'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
