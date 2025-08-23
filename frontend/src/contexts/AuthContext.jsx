
// // // import React, { useContext, useState, useEffect } from 'react';
// // // import { auth } from '../components/firebase'; 
// // // import axios from 'axios';
// // // import { 
// // //     createUserWithEmailAndPassword, 
// // //     signInWithEmailAndPassword, 
// // //     signOut, 
// // //     onAuthStateChanged,
// // //     sendEmailVerification,
// // //     signInWithPopup,
// // //     GoogleAuthProvider,
// // //     FacebookAuthProvider,
// // //     updateProfile
// // // } from 'firebase/auth';

// // // const AuthContext = React.createContext();

// // // export function useAuth() {
// // //   return useContext(AuthContext);
// // // }

// // // export function AuthProvider({ children }) {
// // //   const [currentUser, setCurrentUser] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   async function signup(email, password, name) {
// // //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// // //     await updateProfile(userCredential.user, { displayName: name });
// // //     await sendEmailVerification(userCredential.user, { url: 'http://localhost:5173/profile' });
// // //     return userCredential;
// // //   }
  
// // //   function signInWithProvider(provider) {
// // //     return signInWithPopup(auth, provider);
// // //   }

// // //   function login(email, password) {
// // //     return signInWithEmailAndPassword(auth, email, password);
// // //   }

// // //   function logout() {
// // //     return signOut(auth);
// // //   }

// // //   useEffect(() => {
// // //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
// // //       setCurrentUser(user);
// // //       if (user) {
// // //         try {
// // //           const idToken = await user.getIdToken(true);
// // //           await axios.post(
// // //             'http://localhost:3000/api/users/sync', // <-- Corrected this line
// // //             {},
// // //             { headers: { Authorization: `Bearer ${idToken}` } }
// // //           );
// // //         } catch (error) {
// // //           console.error('Error syncing user with backend:', error);
// // //         }
// // //       }
// // //       setLoading(false);
// // //     });
// // //     return unsubscribe;
// // //   }, []);

// // //   const value = {
// // //     currentUser,
// // //     signup,
// // //     login,
// // //     logout,
// // //     signInWithProvider,
// // //     GoogleAuthProvider,
// // //     FacebookAuthProvider
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
// //     updateProfile
// // } from 'firebase/auth';

// // const AuthContext = React.createContext();

// // export function useAuth() {
// //   return useContext(AuthContext);
// // }

// // export function AuthProvider({ children }) {
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userProfile, setUserProfile] = useState(null); // 1. Add state for DB profile
// //   const [loading, setLoading] = useState(true);

// //   async function signup(email, password, name) {
// //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// //     await updateProfile(userCredential.user, { displayName: name });
// //     await sendEmailVerification(userCredential.user, { url: 'http://localhost:5173/profile' });
// //     return userCredential;
// //   }
  
// //   function signInWithProvider(provider) {
// //     return signInWithPopup(auth, provider);
// //   }

// //   function login(email, password) {
// //     return signInWithEmailAndPassword(auth, email, password);
// //   }

// //   function logout() {
// //     setUserProfile(null); // 3. Clear profile on logout
// //     return signOut(auth);
// //   }

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
// //       setCurrentUser(user);
// //       if (user) {
// //         try {
// //           const idToken = await user.getIdToken(true);
// //           const response = await axios.post( // 2. Get profile from backend
// //             'http://localhost:3000/api/users/sync',
// //             {},
// //             { headers: { Authorization: `Bearer ${idToken}` } }
// //           );
// //           setUserProfile(response.data); // And store it in state
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
// //     userProfile, // 4. Expose profile to the app
// //     signup,
// //     login,
// //     logout,
// //     signInWithProvider,
// //     GoogleAuthProvider,
// //     FacebookAuthProvider
// //   };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {!loading && children}
// //     </AuthContext.Provider>
// //   );
// // }




// import React, { useContext, useState, useEffect, useCallback } from 'react';
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
//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUserProfile = useCallback(async (user) => {
//     try {
//       const idToken = await user.getIdToken(true);
//       const response = await axios.post(
//         'http://localhost:3000/api/users/sync',
//         {},
//         { headers: { Authorization: `Bearer ${idToken}` } }
//       );
//       setUserProfile(response.data);
//     } catch (error) {
//       console.error('Error syncing user with backend:', error);
//     }
//   }, []);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       setCurrentUser(user);
//       if (user) {
//         await fetchUserProfile(user);
//       }
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, [fetchUserProfile]);

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
//     setUserProfile(null);
//     return signOut(auth);
//   }

//   const value = {
//     currentUser,
//     userProfile,
//     signup,
//     login,
//     logout,
//     signInWithProvider,
//     GoogleAuthProvider,
//     FacebookAuthProvider,
//     refreshUserProfile: () => fetchUserProfile(currentUser), // Expose the refresh function
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }





import React, { useContext, useState, useEffect, useCallback } from 'react';
import { auth, getFcmToken } from '../components/firebase'; // 1. Import getFcmToken
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
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = useCallback(async (user) => {
    try {
      const idToken = await user.getIdToken(true);
      const response = await axios.post(
        'http://localhost:3000/api/users/sync',
        {},
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error syncing user with backend:', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [fetchUserProfile]);

  // 2. This function handles the logic for requesting permission and saving the token
  const requestNotificationPermission = async () => {
    if (!currentUser) return;
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getFcmToken();
        if (token) {
          const idToken = await currentUser.getIdToken();
          await axios.post(
            'http://localhost:3000/api/users/fcm-token',
            { token },
            { headers: { Authorization: `Bearer ${idToken}` } }
          );
        }
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

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
    setUserProfile(null);
    return signOut(auth);
  }

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    signInWithProvider,
    GoogleAuthProvider,
    FacebookAuthProvider,
    refreshUserProfile: () => fetchUserProfile(currentUser),
    requestNotificationPermission, // 3. Expose the new function to the rest of the app
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
