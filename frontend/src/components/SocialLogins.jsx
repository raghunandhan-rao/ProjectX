// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { toast } from 'react-toastify';

// const styles = {
//     container: {
//         marginTop: '20px',
//         borderTop: '1px solid #ccc',
//         paddingTop: '20px',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '10px',
//     },
//     button: {
//         width: '100%',
//         padding: '10px',
//         border: 'none',
//         borderRadius: '5px',
//         color: 'white',
//         cursor: 'pointer',
//         fontWeight: 'bold',
//         fontSize: '1rem',
//     },
//     googleButton: {
//         backgroundColor: '#4285F4',
//     },
//     facebookButton: {
//         backgroundColor: '#1877F2',
//     }
// };

// function SocialLogins() {
//     const { signInWithGoogle, signInWithFacebook } = useAuth();
//     const navigate = useNavigate();

//     const handleSocialLogin = async (provider) => {
//         try {
//             await provider();
//             toast.success("Signed in successfully!");
//             navigate('/profile');
//         } catch (error) {
//             toast.error("Failed to sign in. Please try again.");
//             console.error(error);
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <button 
//                 style={{ ...styles.button, ...styles.googleButton }} 
//                 onClick={() => handleSocialLogin(signInWithGoogle)}
//             >
//                 Continue with Google
//             </button>
//             <button 
//                 style={{ ...styles.button, ...styles.facebookButton }} 
//                 onClick={() => handleSocialLogin(signInWithFacebook)}
//             >
//                 Continue with Facebook
//             </button>
//         </div>
//     );
// }

// export default SocialLogins;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from './firebase'; // Make sure this path is correct

const styles = {
    container: {
        marginTop: '20px',
        borderTop: '1px solid #ccc',
        paddingTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    button: {
        width: '100%',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1rem',
    },
    googleButton: {
        backgroundColor: '#4285F4',
    },
    facebookButton: {
        backgroundColor: '#1877F2',
    }
};

function SocialLogins() {
    const { signInWithGoogle, signInWithFacebook } = useAuth();
    const navigate = useNavigate();

    const handleSocialLogin = async (provider) => {
        try {
            await provider();
            toast.success("Signed in successfully!");
            navigate('/profile');
        } catch (error) {
            // Check for the specific error code
            if (error.code === 'auth/account-exists-with-different-credential') {
                // Get the email from the error
                const email = error.customData.email;
                // Find out which method the user originally used
                const methods = await fetchSignInMethodsForEmail(auth, email);
                
                // Show a helpful error message
                toast.error(`You already have an account with this email. Please sign in using ${methods[0]}.`);
            } else {
                toast.error("Failed to sign in. Please try again.");
                console.error(error);
            }
        }
    };

    return (
        <div style={styles.container}>
            <button 
                style={{ ...styles.button, ...styles.googleButton }} 
                onClick={() => handleSocialLogin(signInWithGoogle)}
            >
                Continue with Google
            </button>
            <button 
                style={{ ...styles.button, ...styles.facebookButton }} 
                onClick={() => handleSocialLogin(signInWithFacebook)}
            >
                Continue with Facebook
            </button>
        </div>
    );
}

export default SocialLogins;