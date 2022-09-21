import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import '../assets/css/login.css'


export default function Guest({ children }) {
    return (
        <div className={`min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 login`}>
            <div>
                <Link href="/">
                    <h2 className='font-bold text-xl'>UMUM Sysinter</h2>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
