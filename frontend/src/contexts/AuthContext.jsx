// // // import React, { useContext, useState, useEffect } from 'react';
// // // import { auth, db } from '../components/firebase'; 
// // // import { 
// // //     createUserWithEmailAndPassword, 
// // //     signInWithEmailAndPassword, 
// // //     signOut, 
// // //     onAuthStateChanged,
// // //     sendEmailVerification,
// // //     signInWithPopup,
// // //     GoogleAuthProvider,
// // //     FacebookAuthProvider
// // // } from 'firebase/auth';
// // // import { doc, setDoc, getDoc } from "firebase/firestore";

// // // const AuthContext = React.createContext();

// // // export function useAuth() {
// // //   return useContext(AuthContext);
// // // }

// // // export function AuthProvider({ children }) {
// // //   const [currentUser, setCurrentUser] = useState(null);
// // //   const [userProfile, setUserProfile] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   // Helper function to create a user profile if it doesn't exist
// // //   async function checkAndCreateUserProfile(user) {
// // //     const docRef = doc(db, "users", user.uid);
// // //     const docSnap = await getDoc(docRef);
// // //     if (!docSnap.exists()) {
// // //       await setDoc(docRef, {
// // //         name: user.displayName,
// // //         email: user.email,
// // //       });
// // //     }
// // //   }

// // //   // Email/Password Signup
// // //   async function signup(email, password) {
// // //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// // //     const user = userCredential.user;
// // //     await sendEmailVerification(user, {
// // //         url: 'http://localhost:5173/profile',
// // //     });
// // //     return userCredential;
// // //   }
  
// // //   // Google Sign-In Function
// // //   async function signInWithGoogle() {
// // //     const provider = new GoogleAuthProvider();
// // //     const result = await signInWithPopup(auth, provider);
// // //     await checkAndCreateUserProfile(result.user); // Ensure profile exists
// // //     return result;
// // //   }

// // //   // Facebook Sign-In Function
// // //   async function signInWithFacebook() {
// // //     const provider = new FacebookAuthProvider();
// // //     const result = await signInWithPopup(auth, provider);
// // //     await checkAndCreateUserProfile(result.user); // Ensure profile exists
// // //     return result;
// // //   }

// // //   function login(email, password) {
// // //     return signInWithEmailAndPassword(auth, email, password);
// // //   }

// // //   function logout() {
// // //     setUserProfile(null);
// // //     return signOut(auth);
// // //   }

// // //   useEffect(() => {
// // //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
// // //       if (user) {
// // //         await user.reload();
// // //       }
// // //       setCurrentUser(user);
// // //       if (user) { // No email verification check here for social logins
// // //         const docRef = doc(db, "users", user.uid);
// // //         const docSnap = await getDoc(docRef);
// // //         if (docSnap.exists()) {
// // //           setUserProfile(docSnap.data());
// // //         }
// // //       }
// // //       setLoading(false);
// // //     });
// // //     return unsubscribe;
// // //   }, []);

// // //   const value = {
// // //     currentUser,
// // //     userProfile,
// // //     signup,
// // //     login,
// // //     logout,
// // //     signInWithGoogle,
// // //     signInWithFacebook
// // //   };

// // //   return (
// // //     <AuthContext.Provider value={value}>
// // //       {!loading && children}
// // //     </AuthContext.Provider>
// // //   );
// // // }


// // import React, { useContext, useState, useEffect } from 'react';
// // import { auth } from '../components/firebase'; 
// // import axios from 'axios';
// // import { 
// //     createUserWithEmailAndPassword, 
// //     signInWithEmailAndPassword, 
// //     signOut, 
// //     onAuthStateChanged,
// //     sendEmailVerification,
// //     signInWithPopup,
// //     GoogleAuthProvider,
// //     FacebookAuthProvider,
// //     updateProfile // Import updateProfile
// // } from 'firebase/auth';

// // const AuthContext = React.createContext();

// // export function useAuth() {
// //   return useContext(AuthContext);
// // }

// // export function AuthProvider({ children }) {
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // Updated signup function to include name
// //   async function signup(email, password, name) {
// //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// //     // Update the user's profile in Firebase Auth to include their name
// //     await updateProfile(userCredential.user, { displayName: name });
// //     // Send verification email
// //     await sendEmailVerification(userCredential.user, {
// //         url: 'http://localhost:5173/profile',
// //     });
// //     return userCredential;
// //   }
  
// //   // A single function for all social providers
// //   function signInWithProvider(provider) {
// //     return signInWithPopup(auth, provider);
// //   }

// //   function login(email, password) {
// //     return signInWithEmailAndPassword(auth, email, password);
// //   }

// //   function logout() {
// //     return signOut(auth);
// //   }

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
// //       setCurrentUser(user);
      
// //       if (user) {
// //         try {
// //           // Get the Firebase ID token
// //           const idToken = await user.getIdToken(true);
          
// //           // Send the token to your backend to sync/create the user in MongoDB
// //           // This runs for ANY successful login/signup (email, Google, Facebook)
// //           await axios.post(
// //             'http://localhost:5000/api/users/sync', // Use your backend's port
// //             {}, // The body is empty as the backend uses the token for user data
// //             {
// //               headers: {
// //                 Authorization: `Bearer ${idToken}`,
// //               },
// //             }
// //           );

// //         } catch (error) {
// //           console.error('Error syncing user with backend:', error);
// //         }
// //       }
      
// //       setLoading(false);
// //     });

// //     return unsubscribe;
// //   }, []);

// //   const value = {
// //     currentUser,
// //     signup,
// //     login,
// //     logout,
// //     signInWithProvider,
// //     GoogleAuthProvider, // Export providers for the UI to use
// //     FacebookAuthProvider
// //   };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {!loading && children}
// //       </AuthContext.Provider> 
// //   );
// // }


// import React, { useContext, useState, useEffect } from 'react';
// import { auth } from '../components/firebase'; 
// import axios from 'axios';
// import { 
//     createUserWithEmailAndPassword, 
//     signInWithEmailAndPassword, 
//     signOut, 
//     onAuthStateChanged,
//     sendEmailVerification,
//     signInWithPopup,
//     GoogleAuthProvider,
//     FacebookAuthProvider,
//     updateProfile
// } from 'firebase/auth';

// const AuthContext = React.createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   async function signup(email, password, name) {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     await updateProfile(userCredential.user, { displayName: name });
//     await sendEmailVerification(userCredential.user, { url: 'http://localhost:5173/profile' });
//     return userCredential;
//   }
  
//   function signInWithProvider(provider) {
//     return signInWithPopup(auth, provider);
//   }

//   function login(email, password) {
//     return signInWithEmailAndPassword(auth, email, password);
//   }

//   function logout() {
//     return signOut(auth);
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       setCurrentUser(user);
//       if (user) {
//         try {
//           const idToken = await user.getIdToken(true);
//           await axios.post(
//             'http://localhost:5000/api/users/sync',
//             {},
//             { headers: { Authorization: `Bearer ${idToken}` } }
//           );
//         } catch (error) {
//           console.error('Error syncing user with backend:', error);
//         }
//       }
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     signup,
//     login,
//     logout,
//     signInWithProvider,
//     GoogleAuthProvider,
//     FacebookAuthProvider
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }



import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../components/firebase'; 
import axios from 'axios';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    sendEmailVerification,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    updateProfile
} from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, name) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    await sendEmailVerification(userCredential.user, { url: 'http://localhost:5173/profile' });
    return userCredential;
  }
  
  function signInWithProvider(provider) {
    return signInWithPopup(auth, provider);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const idToken = await user.getIdToken(true);
          await axios.post(
            'http://localhost:3000/api/users/sync', // <-- Corrected this line
            {},
            { headers: { Authorization: `Bearer ${idToken}` } }
          );
        } catch (error) {
          console.error('Error syncing user with backend:', error);
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    signInWithProvider,
    GoogleAuthProvider,
    FacebookAuthProvider
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}