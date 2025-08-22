
// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../contexts/AuthContext';
// // import { toast } from 'react-toastify';
// // import { fetchSignInMethodsForEmail } from 'firebase/auth';
// // import { auth } from './firebase'; // Make sure this path is correct

// // const styles = {
// //     container: {
// //         marginTop: '20px',
// //         borderTop: '1px solid #ccc',
// //         paddingTop: '20px',
// //         display: 'flex',
// //         flexDirection: 'column',
// //         gap: '10px',
// //     },
// //     button: {
// //         width: '100%',
// //         padding: '10px',
// //         border: 'none',
// //         borderRadius: '5px',
// //         color: 'white',
// //         cursor: 'pointer',
// //         fontWeight: 'bold',
// //         fontSize: '1rem',
// //     },
// //     googleButton: {
// //         backgroundColor: '#4285F4',
// //     },
// //     facebookButton: {
// //         backgroundColor: '#1877F2',
// //     }
// // };

// // function SocialLogins() {
// //     const { signInWithGoogle, signInWithFacebook } = useAuth();
// //     const navigate = useNavigate();

// //     const handleSocialLogin = async (provider) => {
// //         try {
// //             await provider();
// //             toast.success("Signed in successfully!");
// //             navigate('/profile');
// //         } catch (error) {
// //             // Check for the specific error code
// //             if (error.code === 'auth/account-exists-with-different-credential') {
// //                 // Get the email from the error
// //                 const email = error.customData.email;
// //                 // Find out which method the user originally used
// //                 const methods = await fetchSignInMethodsForEmail(auth, email);
                
// //                 // Show a helpful error message
// //                 toast.error(`You already have an account with this email. Please sign in using ${methods[0]}.`);
// //             } else {
// //                 toast.error("Failed to sign in. Please try again.");
// //                 console.error(error);
// //             }
// //         }
// //     };

// //     return (
// //         <div style={styles.container}>
// //             <button 
// //                 style={{ ...styles.button, ...styles.googleButton }} 
// //                 onClick={() => handleSocialLogin(signInWithGoogle)}
// //             >
// //                 Continue with Google
// //             </button>
// //             <button 
// //                 style={{ ...styles.button, ...styles.facebookButton }} 
// //                 onClick={() => handleSocialLogin(signInWithFacebook)}
// //             >
// //                 Continue with Facebook
// //             </button>
// //         </div>
// //     );
// // }

// // export default SocialLogins;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { toast } from 'react-toastify';
// import styles from '../styles/Auth.module.css';

// // ... (SVG Icons remain the same)

// function SocialLogins() {
//     // Get the new signInWithProvider function and the providers themselves
//     const { signInWithProvider, GoogleAuthProvider, FacebookAuthProvider } = useAuth();
//     const navigate = useNavigate();

//     const handleSocialLogin = async (provider) => {
//         try {
//             await signInWithProvider(new provider());
//             toast.success("Signed in successfully!");
//             navigate('/profile');
//         } catch (error) {
//             // Error handling can be simplified as specific cases are rare with this setup
//             toast.error("Failed to sign in. Please try again.");
//             console.error(error);
//         }
//     };

//     return (
//         <div className={styles.form}>
//             <button className={`${styles.socialButton} ${styles.googleButton}`} onClick={() => handleSocialLogin(GoogleAuthProvider)}>
//                 {/* ... (Google Icon and Span) */}
//             </button>
//             <button className={`${styles.socialButton} ${styles.facebookButton}`} onClick={() => handleSocialLogin(FacebookAuthProvider)}>
//                 {/* ... (Facebook Icon and Span) */}
//             </button>
//         </div>
//     );
// }

// export default SocialLogins;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import styles from '../styles/Auth.module.css';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from './firebase';

// SVG Icons for the buttons
const GoogleIcon = () => <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,5 12,5C14.1,5 15.7,5.8 16.9,6.9L19,4.8C17.1,3 14.7,2 12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,11.63 21.95,11.37 21.86,11.1H21.35Z"></path></svg>;
const FacebookIcon = () => <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.32 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 12 2.04Z"></path></svg>;

function SocialLogins() {
    const { signInWithProvider, GoogleAuthProvider, FacebookAuthProvider } = useAuth();
    const navigate = useNavigate();

    const handleSocialLogin = async (provider) => {
        try {
            await signInWithProvider(new provider());
            toast.success("Signed in successfully!");
            navigate('/profile');
        } catch (error) {
            if (error.code === 'auth/account-exists-with-different-credential') {
                const email = error.customData.email;
                const methods = await fetchSignInMethodsForEmail(auth, email);
                toast.error(`An account with this email already exists. Please use the ${methods[0]} method.`);
            } else {
                toast.error("Failed to sign in. Please try again.");
                console.error(error);
            }
        }
    };

    return (
        <div className={styles.form}>
            <button className={`${styles.socialButton} ${styles.googleButton}`} onClick={() => handleSocialLogin(GoogleAuthProvider)}>
                <GoogleIcon />
                <span>Continue with Google</span>
            </button>
            <button className={`${styles.socialButton} ${styles.facebookButton}`} onClick={() => handleSocialLogin(FacebookAuthProvider)}>
                <FacebookIcon />
                <span>Continue with Facebook</span>
            </button>
        </div>
    );
}

export default SocialLogins;