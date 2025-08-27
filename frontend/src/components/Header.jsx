// // import React from 'react';
// // import { Link, useLocation } from 'react-router-dom';
// // import { useAuth } from '../contexts/AuthContext';
// // import styles from '../styles/Auth.module.css'; // Reusing styles

// // // A simple Bell SVG icon
// // const BellIcon = () => (
// //     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //         <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
// //         <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
// //     </svg>
// // );

// // function Header() {
// //     const { userProfile, friendRequests } = useAuth();
// //     const location = useLocation();
// //     const requestCount = friendRequests.length;

// //     // Don't show the header on login/signup pages
// //     if (['/login', '/signup', '/verify-email'].includes(location.pathname)) {
// //         return null;
// //     }

// //     return (
// //         <header className={styles.header}>
// //             <nav className={styles.nav}>
// //                 <Link to="/profile">Profile</Link>
// //                 <Link to="/discover">Discover</Link>
// //             </nav>
// //             <div className={styles.notificationBell}>
// //                 <Link to="/notifications">
// //                     <BellIcon />
// //                     {requestCount > 0 && <span className={styles.notificationBadge}>{requestCount}</span>}
// //                 </Link>
// //             </div>
// //         </header>
// //     );
// // }

// // export default Header;




// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import styles from '../styles/Auth.module.css';

// const BellIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
//         <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
//     </svg>
// );

// function Header() {
//     const { userProfile, friendRequests, isProfileComplete, logout } = useAuth();
//     const location = useLocation();
    
//     // Don't show the header on auth pages or if the profile isn't loaded yet
//     if (['/login', '/signup', '/verify-email'].includes(location.pathname) || !userProfile) {
//         return null;
//     }

//     // If the profile is incomplete, show a simplified header with only a logout button
//     if (!isProfileComplete) {
//         return (
//             <header className={styles.header}>
//                 <div className={styles.nav}>
//                     <span>Welcome! Please complete your profile.</span>
//                 </div>
//                 <button onClick={logout} className={styles.submitButton} style={{padding: '8px 12px', fontSize: '0.9rem'}}>Logout</button>
//             </header>
//         );
//     }

//     // Full header for completed profiles
//     return (
//         <header className={styles.header}>
//             <nav className={styles.nav}>
//                 <Link to="/profile">Profile</Link>
//                 <Link to="/discover">Discover</Link>
//             </nav>
//             <div className={styles.notificationBell}>
//                 <Link to="/notifications">
//                     <BellIcon />
//                     {friendRequests.length > 0 && <span className={styles.notificationBadge}></span>}
//                 </Link>
//             </div>
//         </header>
//     );
// }

// export default Header;




import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Auth.module.css';

const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);

function Header() {
    const { userProfile, friendRequests, isProfileComplete, logout } = useAuth();
    const location = useLocation();
    
    if (['/login', '/signup', '/verify-email'].includes(location.pathname) || !userProfile) {
        return null;
    }

    if (!isProfileComplete) {
        return (
            <header className={styles.header}>
                <div className={styles.nav}>
                    <span>Welcome! Please complete your profile.</span>
                </div>
                <button onClick={logout} className={styles.submitButton} style={{padding: '8px 12px', fontSize: '0.9rem', backgroundColor: '#6c757d'}}>Logout</button>
            </header>
        );
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to="/profile">Profile</Link>
                <Link to="/discover">Discover</Link>
            </nav>
            <div className={styles.notificationBell}>
                <Link to="/notifications">
                    <BellIcon />
                    {friendRequests.length > 0 && <span className={styles.notificationBadge}></span>}
                </Link>
            </div>
        </header>
    );
}

export default Header;
