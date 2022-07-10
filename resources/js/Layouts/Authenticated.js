import React, { useState } from 'react';
// import Footer from '@/Components/Footer';
import Sidebar from '@/Components/Sidebar';

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <>
            <Sidebar header={header} auth={auth} >
                {children}
            </Sidebar>
        </>
    );
}
