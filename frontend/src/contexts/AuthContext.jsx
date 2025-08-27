// // // // // // // // import React, { useContext, useState, useEffect, useCallback } from 'react';
// // // // // // // // import { auth, getFcmToken } from '../components/firebase'; // 1. Import getFcmToken
// // // // // // // // import axios from 'axios';
// // // // // // // // import { 
// // // // // // // //     createUserWithEmailAndPassword, 
// // // // // // // //     signInWithEmailAndPassword, 
// // // // // // // //     signOut, 
// // // // // // // //     onAuthStateChanged,
// // // // // // // //     sendEmailVerification,
// // // // // // // //     signInWithPopup,
// // // // // // // //     GoogleAuthProvider,
// // // // // // // //     FacebookAuthProvider,
// // // // // // // //     updateProfile
// // // // // // // // } from 'firebase/auth';

// // // // // // // // const AuthContext = React.createContext();

// // // // // // // // export function useAuth() {
// // // // // // // //   return useContext(AuthContext);
// // // // // // // // }

// // // // // // // // export function AuthProvider({ children }) {
// // // // // // // //   const [currentUser, setCurrentUser] = useState(null);
// // // // // // // //   const [userProfile, setUserProfile] = useState(null);
// // // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // // //   const fetchUserProfile = useCallback(async (user) => {
// // // // // // // //     try {
// // // // // // // //       const idToken = await user.getIdToken(true);
// // // // // // // //       const response = await axios.post(
// // // // // // // //         'http://localhost:3000/api/users/sync',
// // // // // // // //         {},
// // // // // // // //         { headers: { Authorization: `Bearer ${idToken}` } }
// // // // // // // //       );
// // // // // // // //       setUserProfile(response.data);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Error syncing user with backend:', error);
// // // // // // // //     }
// // // // // // // //   }, []);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
// // // // // // // //       setCurrentUser(user);
// // // // // // // //       if (user) {
// // // // // // // //         await fetchUserProfile(user);
// // // // // // // //       }
// // // // // // // //       setLoading(false);
// // // // // // // //     });
// // // // // // // //     return unsubscribe;
// // // // // // // //   }, [fetchUserProfile]);

// // // // // // // //   // 2. This function handles the logic for requesting permission and saving the token
// // // // // // // //   const requestNotificationPermission = async () => {
// // // // // // // //     if (!currentUser) return;
// // // // // // // //     try {
// // // // // // // //       const permission = await Notification.requestPermission();
// // // // // // // //       if (permission === 'granted') {
// // // // // // // //         const token = await getFcmToken();
// // // // // // // //         if (token) {
// // // // // // // //           const idToken = await currentUser.getIdToken();
// // // // // // // //           await axios.post(
// // // // // // // //             'http://localhost:3000/api/users/fcm-token',
// // // // // // // //             { token },
// // // // // // // //             { headers: { Authorization: `Bearer ${idToken}` } }
// // // // // // // //           );
// // // // // // // //         }
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Error requesting notification permission:', error);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   async function signup(email, password, name) {
// // // // // // // //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// // // // // // // //     await updateProfile(userCredential.user, { displayName: name });
// // // // // // // //     await sendEmailVerification(userCredential.user, { url: 'http://localhost:5173/profile' });
// // // // // // // //     return userCredential;
// // // // // // // //   }
  
// // // // // // // //   function signInWithProvider(provider) {
// // // // // // // //     return signInWithPopup(auth, provider);
// // // // // // // //   }

// // // // // // // //   function login(email, password) {
// // // // // // // //     return signInWithEmailAndPassword(auth, email, password);
// // // // // // // //   }

// // // // // // // //   function logout() {
// // // // // // // //     setUserProfile(null);
// // // // // // // //     return signOut(auth);
// // // // // // // //   }

// // // // // // // //   const value = {
// // // // // // // //     currentUser,
// // // // // // // //     userProfile,
// // // // // // // //     signup,
// // // // // // // //     login,
// // // // // // // //     logout,
// // // // // // // //     signInWithProvider,
// // // // // // // //     GoogleAuthProvider,
// // // // // // // //     FacebookAuthProvider,
// // // // // // // //     refreshUserProfile: () => fetchUserProfile(currentUser),
// // // // // // // //     requestNotificationPermission, // 3. Expose the new function to the rest of the app
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <AuthContext.Provider value={value}>
// // // // // // // //       {!loading && children}
// // // // // // // //     </AuthContext.Provider>
// // // // // // // //   );
// // // // // // // // }





// // // // // // // import React, { useContext, useState, useEffect, useCallback } from 'react';
// // // // // // // import { auth, getFcmToken } from '../components/firebase';
// // // // // // // import axios from 'axios';
// // // // // // // import { 
// // // // // // //     createUserWithEmailAndPassword, 
// // // // // // //     signInWithEmailAndPassword, 
// // // // // // //     signOut, 
// // // // // // //     onAuthStateChanged,
// // // // // // //     sendEmailVerification,
// // // // // // //     signInWithPopup,
// // // // // // //     GoogleAuthProvider,
// // // // // // //     FacebookAuthProvider,
// // // // // // //     updateProfile
// // // // // // // } from 'firebase/auth';

// // // // // // // const AuthContext = React.createContext();

// // // // // // // export function useAuth() {
// // // // // // //   return useContext(AuthContext);
// // // // // // // }

// // // // // // // export function AuthProvider({ children }) {
// // // // // // //   const [currentUser, setCurrentUser] = useState(null);
// // // // // // //   const [userProfile, setUserProfile] = useState(null);
// // // // // // //   const [friendRequests, setFriendRequests] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // //   const fetchUserProfile = useCallback(async (user) => {
// // // // // // //     try {
// // // // // // //       const idToken = await user.getIdToken(true);
// // // // // // //       const response = await axios.post(
// // // // // // //         'http://localhost:3000/api/users/sync',
// // // // // // //         {},
// // // // // // //         { headers: { Authorization: `Bearer ${idToken}` } }
// // // // // // //       );
// // // // // // //       setUserProfile(response.data);
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Error syncing user with backend:', error);
// // // // // // //     }
// // // // // // //   }, []);

// // // // // // //   const fetchFriendRequests = useCallback(async (user) => {
// // // // // // //     if (!user) return;
// // // // // // //     try {
// // // // // // //         const idToken = await user.getIdToken();
// // // // // // //         const response = await axios.get('http://localhost:3000/api/friends/requests', {
// // // // // // //             headers: { Authorization: `Bearer ${idToken}` }
// // // // // // //         });
// // // // // // //         setFriendRequests(response.data);
// // // // // // //     } catch (error) {
// // // // // // //         console.error("Could not fetch friend requests", error);
// // // // // // //     }
// // // // // // //   }, []);

// // // // // // //   useEffect(() => {
// // // // // // //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
// // // // // // //       setCurrentUser(user);
// // // // // // //       if (user) {
// // // // // // //         await fetchUserProfile(user);
// // // // // // //         await fetchFriendRequests(user);
// // // // // // //       }
// // // // // // //       setLoading(false);
// // // // // // //     });
// // // // // // //     return unsubscribe;
// // // // // // //   }, [fetchUserProfile, fetchFriendRequests]);

// // // // // // //   const requestNotificationPermission = async () => {
// // // // // // //     if (!currentUser) return;
// // // // // // //     try {
// // // // // // //       const permission = await Notification.requestPermission();
// // // // // // //       if (permission === 'granted') {
// // // // // // //         const token = await getFcmToken();
// // // // // // //         if (token) {
// // // // // // //           const idToken = await currentUser.getIdToken();
// // // // // // //           await axios.post(
// // // // // // //             'http://localhost:3000/api/users/fcm-token',
// // // // // // //             { token },
// // // // // // //             { headers: { Authorization: `Bearer ${idToken}` } }
// // // // // // //           );
// // // // // // //         }
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Error requesting notification permission:', error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   async function signup(email, password, name) {
// // // // // // //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// // // // // // //     await updateProfile(userCredential.user, { displayName: name });
// // // // // // //     await sendEmailVerification(userCredential.user, { url: 'http://localhost:5173/profile' });
// // // // // // //     return userCredential;
// // // // // // //   }
  
// // // // // // //   function signInWithProvider(provider) {
// // // // // // //     return signInWithPopup(auth, provider);
// // // // // // //   }

// // // // // // //   function login(email, password) {
// // // // // // //     return signInWithEmailAndPassword(auth, email, password);
// // // // // // //   }

// // // // // // //   function logout() {
// // // // // // //     setUserProfile(null);
// // // // // // //     setFriendRequests([]);
// // // // // // //     return signOut(auth);
// // // // // // //   }

// // // // // // //   const value = {
// // // // // // //     currentUser,
// // // // // // //     userProfile,
// // // // // // //     friendRequests,
// // // // // // //     fetchFriendRequests,
// // // // // // //     signup,
// // // // // // //     login,
// // // // // // //     logout,
// // // // // // //     signInWithProvider,
// // // // // // //     GoogleAuthProvider,
// // // // // // //     FacebookAuthProvider,
// // // // // // //     refreshUserProfile: () => fetchUserProfile(currentUser),
// // // // // // //     requestNotificationPermission,
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <AuthContext.Provider value={value}>
// // // // // // //       {!loading && children}
// // // // // // //     </AuthContext.Provider>
// // // // // // //   );
// // // // // // // }




// // // // // // import React, { useContext, useState, useEffect, useCallback } from 'react';
// // // // // // import { auth, getFcmToken } from '../components/firebase';
// // // // // // import axios from 'axios';
// // // // // // import { 
// // // // // //     createUserWithEmailAndPassword, 
// // // // // //     signInWithEmailAndPassword, 
// // // // // //     signOut, 
// // // // // //     onAuthStateChanged,
// // // // // //     sendEmailVerification,
// // // // // //     signInWithPopup,
// // // // // //     GoogleAuthProvider,
// // // // // //     FacebookAuthProvider,
// // // // // //     updateProfile
// // // // // // } from 'firebase/auth';

// // // // // // const AuthContext = React.createContext();

// // // // // // export function useAuth() {
// // // // // //   return useContext(AuthContext);
// // // // // // }

// // // // // // export function AuthProvider({ children }) {
// // // // // //   const [currentUser, setCurrentUser] = useState(null);
// // // // // //   const [userProfile, setUserProfile] = useState(null);
// // // // // //   const [friendRequests, setFriendRequests] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [isProfileComplete, setIsProfileComplete] = useState(false);

// // // // // //   const fetchUserProfile = useCallback(async (user) => {
// // // // // //     try {
// // // // // //       const idToken = await user.getIdToken(true);
// // // // // //       const response = await axios.post(
// // // // // //         'http://localhost:3000/api/users/sync',
// // // // // //         {},
// // // // // //         { headers: { Authorization: `Bearer ${idToken}` } }
// // // // // //       );
// // // // // //       const profile = response.data;
// // // // // //       setUserProfile(profile);
// // // // // //       if (profile.selectedInterests && profile.selectedInterests.length >= 3) {
// // // // // //           setIsProfileComplete(true);
// // // // // //       } else {
// // // // // //           setIsProfileComplete(false);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Error syncing user with backend:', error);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   const fetchFriendRequests = useCallback(async (user) => {
// // // // // //     if (!user) return;
// // // // // //     try {
// // // // // //         const idToken = await user.getIdToken();
// // // // // //         const response = await axios.get('http://localhost:3000/api/friends/requests', {
// // // // // //             headers: { Authorization: `Bearer ${idToken}` }
// // // // // //         });
// // // // // //         setFriendRequests(response.data);
// // // // // //     } catch (error) {
// // // // // //         console.error("Could not fetch friend requests", error);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
// // // // // //       setCurrentUser(user);
// // // // // //       if (user) {
// // // // // //         await fetchUserProfile(user);
// // // // // //         await fetchFriendRequests(user);
// // // // // //       }
// // // // // //       setLoading(false);
// // // // // //     });
// // // // // //     return unsubscribe;
// // // // // //   }, [fetchUserProfile, fetchFriendRequests]);

// // // // // //   const requestNotificationPermission = async () => {
// // // // // //     if (!currentUser) return;
// // // // // //     try {
// // // // // //       const permission = await Notification.requestPermission();
// // // // // //       if (permission === 'granted') {
// // // // // //         const token = await getFcmToken();
// // // // // //         if (token) {
// // // // // //           const idToken = await currentUser.getIdToken();
// // // // // //           await axios.post(
// // // // // //             'http://localhost:3000/api/users/fcm-token',
// // // // // //             { token },
// // // // // //             { headers: { Authorization: `Bearer ${idToken}` } }
// // // // // //           );
// // // // // //         }
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error('Error requesting notification permission:', error);
// // // // // //     }
// // // // // //   };

// // // // // //   async function signup(email, password) { // Name is removed
// // // // // //     return createUserWithEmailAndPassword(auth, email, password);
// // // // // //   }
  
// // // // // //   function signInWithProvider(provider) {
// // // // // //     return signInWithPopup(auth, provider);
// // // // // //   }

// // // // // //   function login(email, password) {
// // // // // //     return signInWithEmailAndPassword(auth, email, password);
// // // // // //   }

// // // // // //   function logout() {
// // // // // //     setUserProfile(null);
// // // // // //     setFriendRequests([]);
// // // // // //     setIsProfileComplete(false);
// // // // // //     return signOut(auth);
// // // // // //   }

// // // // // //   const value = {
// // // // // //     currentUser,
// // // // // //     userProfile,
// // // // // //     isProfileComplete,
// // // // // //     friendRequests,
// // // // // //     fetchFriendRequests,
// // // // // //     signup,
// // // // // //     login,
// // // // // //     logout,
// // // // // //     signInWithProvider,
// // // // // //     GoogleAuthProvider,
// // // // // //     FacebookAuthProvider,
// // // // // //     refreshUserProfile: () => fetchUserProfile(currentUser),
// // // // // //     requestNotificationPermission,
// // // // // //   };

// // // // // //   return (
// // // // // //     <AuthContext.Provider value={value}>
// // // // // //       {!loading && children}
// // // // // //     </AuthContext.Provider>
// // // // // //   );
// // // // // // }





// // // // // import React, { useContext, useState, useEffect, useCallback } from 'react';
// // // // // import { auth, getFcmToken } from '../components/firebase';
// // // // // import axios from 'axios';
// // // // // import { 
// // // // //     createUserWithEmailAndPassword, 
// // // // //     signInWithEmailAndPassword, 
// // // // //     signOut, 
// // // // //     onAuthStateChanged,
// // // // //     sendEmailVerification,
// // // // //     signInWithPopup,
// // // // //     GoogleAuthProvider,
// // // // //     FacebookAuthProvider,
// // // // //     updateProfile
// // // // // } from 'firebase/auth';

// // // // // const AuthContext = React.createContext();

// // // // // export function useAuth() {
// // // // //   return useContext(AuthContext);
// // // // // }

// // // // // export function AuthProvider({ children }) {
// // // // //   const [currentUser, setCurrentUser] = useState(null);
// // // // //   const [userProfile, setUserProfile] = useState(null);
// // // // //   const [friendRequests, setFriendRequests] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [isProfileComplete, setIsProfileComplete] = useState(false);

// // // // //   const fetchUserProfile = useCallback(async (user) => {
// // // // //     try {
// // // // //       const idToken = await user.getIdToken(true);
// // // // //       const response = await axios.post(
// // // // //         'http://localhost:3000/api/users/sync',
// // // // //         {},
// // // // //         { headers: { Authorization: `Bearer ${idToken}` } }
// // // // //       );
// // // // //       const profile = response.data;
// // // // //       setUserProfile(profile);
// // // // //       if (profile.selectedInterests && profile.selectedInterests.length >= 3) {
// // // // //           setIsProfileComplete(true);
// // // // //       } else {
// // // // //           setIsProfileComplete(false);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error syncing user with backend:', error);
// // // // //     }
// // // // //   }, []);

// // // // //   const fetchFriendRequests = useCallback(async (user) => {
// // // // //     if (!user) return;
// // // // //     try {
// // // // //         const idToken = await user.getIdToken();
// // // // //         const response = await axios.get('http://localhost:3000/api/friends/requests', {
// // // // //             headers: { Authorization: `Bearer ${idToken}` }
// // // // //         });
// // // // //         setFriendRequests(response.data);
// // // // //     } catch (error) {
// // // // //         console.error("Could not fetch friend requests", error);
// // // // //     }
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
// // // // //       setCurrentUser(user);
// // // // //       if (user) {
// // // // //         await fetchUserProfile(user);
// // // // //         await fetchFriendRequests(user);
// // // // //       }
// // // // //       setLoading(false);
// // // // //     });
// // // // //     return unsubscribe;
// // // // //   }, [fetchUserProfile, fetchFriendRequests]);

// // // // //   const requestNotificationPermission = async () => {
// // // // //     if (!currentUser) return;
// // // // //     try {
// // // // //       const permission = await Notification.requestPermission();
// // // // //       if (permission === 'granted') {
// // // // //         const token = await getFcmToken();
// // // // //         if (token) {
// // // // //           const idToken = await currentUser.getIdToken();
// // // // //           await axios.post(
// // // // //             'http://localhost:3000/api/users/fcm-token',
// // // // //             { token },
// // // // //             { headers: { Authorization: `Bearer ${idToken}` } }
// // // // //           );
// // // // //         }
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error requesting notification permission:', error);
// // // // //     }
// // // // //   };

// // // // //   async function signup(email, password) { // Name is removed
// // // // //     return createUserWithEmailAndPassword(auth, email, password);
// // // // //   }
  
// // // // //   function signInWithProvider(provider) {
// // // // //     return signInWithPopup(auth, provider);
// // // // //   }

// // // // //   function login(email, password) {
// // // // //     return signInWithEmailAndPassword(auth, email, password);
// // // // //   }

// // // // //   function logout() {
// // // // //     setUserProfile(null);
// // // // //     setFriendRequests([]);
// // // // //     setIsProfileComplete(false);
// // // // //     return signOut(auth);
// // // // //   }

// // // // //   const value = {
// // // // //     currentUser,
// // // // //     userProfile,
// // // // //     isProfileComplete,
// // // // //     friendRequests,
// // // // //     fetchFriendRequests,
// // // // //     signup,
// // // // //     login,
// // // // //     logout,
// // // // //     signInWithProvider,
// // // // //     GoogleAuthProvider,
// // // // //     FacebookAuthProvider,
// // // // //     refreshUserProfile: () => fetchUserProfile(currentUser),
// // // // //     requestNotificationPermission,
// // // // //   };

// // // // //   return (
// // // // //     <AuthContext.Provider value={value}>
// // // // //       {!loading && children}
// // // // //     </AuthContext.Provider>
// // // // //   );
// // // // // }




// // // // import React, { useContext, useState, useEffect, useCallback } from 'react';
// // // // import { auth, getFcmToken } from '../components/firebase';
// // // // import axios from 'axios';
// // // // import { 
// // // //     createUserWithEmailAndPassword, 
// // // //     signInWithEmailAndPassword, 
// // // //     signOut, 
// // // //     onAuthStateChanged,
// // // //     sendEmailVerification,
// // // //     signInWithPopup,
// // // //     GoogleAuthProvider,
// // // //     FacebookAuthProvider,
// // // //     updateProfile
// // // // } from 'firebase/auth';

// // // // const AuthContext = React.createContext();

// // // // export function useAuth() {
// // // //   return useContext(AuthContext);
// // // // }

// // // // export function AuthProvider({ children }) {
// // // //   const [currentUser, setCurrentUser] = useState(null);
// // // //   const [userProfile, setUserProfile] = useState(null);
// // // //   const [friendRequests, setFriendRequests] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [isProfileComplete, setIsProfileComplete] = useState(false);

// // // //   const fetchUserProfile = useCallback(async (user) => {
// // // //     try {
// // // //       const idToken = await user.getIdToken(true);
// // // //       const response = await axios.post(
// // // //         'http://localhost:3000/api/users/sync',
// // // //         {},
// // // //         { headers: { Authorization: `Bearer ${idToken}` } }
// // // //       );
// // // //       const profile = response.data;
// // // //       setUserProfile(profile);
// // // //       if (profile.selectedInterests && profile.selectedInterests.length >= 3) {
// // // //           setIsProfileComplete(true);
// // // //       } else {
// // // //           setIsProfileComplete(false);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error syncing user with backend:', error);
// // // //     }
// // // //   }, []);

// // // //   // --- THIS FUNCTION IS UPDATED ---
// // // //   const fetchFriendRequests = useCallback(async (user) => {
// // // //     if (!user) return;
// // // //     try {
// // // //         const idToken = await user.getIdToken();
// // // //         // By adding a unique timestamp, we prevent the browser from using a cached result.
// // // //         const cacheBust = `?t=${new Date().getTime()}`;
// // // //         const response = await axios.get(`http://localhost:3000/api/friends/requests${cacheBust}`, {
// // // //             headers: { Authorization: `Bearer ${idToken}` }
// // // //         });
// // // //         setFriendRequests(response.data);
// // // //     } catch (error) {
// // // //         console.error("Could not fetch friend requests", error);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
// // // //       setCurrentUser(user);
// // // //       if (user) {
// // // //         await fetchUserProfile(user);
// // // //         await fetchFriendRequests(user);
// // // //       }
// // // //       setLoading(false);
// // // //     });
// // // //     return unsubscribe;
// // // //   }, [fetchUserProfile, fetchFriendRequests]);

// // // //   const requestNotificationPermission = async () => {
// // // //     if (!currentUser) return;
// // // //     try {
// // // //       const permission = await Notification.requestPermission();
// // // //       if (permission === 'granted') {
// // // //         const token = await getFcmToken();
// // // //         if (token) {
// // // //           const idToken = await currentUser.getIdToken();
// // // //           await axios.post(
// // // //             'http://localhost:3000/api/users/fcm-token',
// // // //             { token },
// // // //             { headers: { Authorization: `Bearer ${idToken}` } }
// // // //           );
// // // //         }
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error requesting notification permission:', error);
// // // //     }
// // // //   };

// // // //   async function signup(email, password) {
// // // //     return createUserWithEmailAndPassword(auth, email, password);
// // // //   }
  
// // // //   function signInWithProvider(provider) {
// // // //     return signInWithPopup(auth, provider);
// // // //   }

// // // //   function login(email, password) {
// // // //     return signInWithEmailAndPassword(auth, email, password);
// // // //   }

// // // //   function logout() {
// // // //     setUserProfile(null);
// // // //     setFriendRequests([]);
// // // //     setIsProfileComplete(false);
// // // //     return signOut(auth);
// // // //   }

// // // //   const value = {
// // // //     currentUser,
// // // //     userProfile,
// // // //     isProfileComplete,
// // // //     friendRequests,
// // // //     fetchFriendRequests: () => fetchFriendRequests(currentUser), // Ensure it uses the current user
// // // //     signup,
// // // //     login,
// // // //     logout,
// // // //     signInWithProvider,
// // // //     GoogleAuthProvider,
// // // //     FacebookAuthProvider,
// // // //     refreshUserProfile: () => fetchUserProfile(currentUser),
// // // //     requestNotificationPermission,
// // // //   };

// // // //   return (
// // // //     <AuthContext.Provider value={value}>
// // // //       {!loading && children}
// // // //     </AuthContext.Provider>
// // // //   );
// // // // }





// // // import React, { useContext, useState, useEffect, useCallback } from 'react';
// // // import { auth, getFcmToken } from '../components/firebase';
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
// // //   const [userProfile, setUserProfile] = useState(null);
// // //   const [friendRequests, setFriendRequests] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [isProfileComplete, setIsProfileComplete] = useState(false);

// // //   const fetchUserProfile = useCallback(async (user) => {
// // //     try {
// // //       const idToken = await user.getIdToken(true);
// // //       const response = await axios.post(
// // //         'http://localhost:3000/api/users/sync',
// // //         {},
// // //         { headers: { Authorization: `Bearer ${idToken}` } }
// // //       );
// // //       const profile = response.data;
// // //       setUserProfile(profile);
// // //       if (profile.selectedInterests && profile.selectedInterests.length >= 3) {
// // //           setIsProfileComplete(true);
// // //       } else {
// // //           setIsProfileComplete(false);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error syncing user with backend:', error);
// // //     }
// // //   }, []);

// // //   // This function fetches the list of pending friend requests
// // //   const fetchFriendRequests = useCallback(async (user) => {
// // //     if (!user) return;
// // //     try {
// // //         const idToken = await user.getIdToken();
// // //         // By adding a unique timestamp, we prevent the browser from using a cached result.
// // //         // This is the key to the fix.
// // //         const cacheBust = `?t=${new Date().getTime()}`;
// // //         const response = await axios.get(`http://localhost:3000/api/friends/requests${cacheBust}`, {
// // //             headers: { Authorization: `Bearer ${idToken}` }
// // //         });
// // //         setFriendRequests(response.data);
// // //     } catch (error) {
// // //         console.error("Could not fetch friend requests", error);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
// // //       setCurrentUser(user);
// // //       if (user) {
// // //         await fetchUserProfile(user);
// // //         await fetchFriendRequests(user);
// // //       }
// // //       setLoading(false);
// // //     });
// // //     return unsubscribe;
// // //   }, [fetchUserProfile, fetchFriendRequests]);

// // //   const requestNotificationPermission = async () => {
// // //     if (!currentUser) return;
// // //     try {
// // //       const permission = await Notification.requestPermission();
// // //       if (permission === 'granted') {
// // //         const token = await getFcmToken();
// // //         if (token) {
// // //           const idToken = await currentUser.getIdToken();
// // //           await axios.post(
// // //             'http://localhost:3000/api/users/fcm-token',
// // //             { token },
// // //             { headers: { Authorization: `Bearer ${idToken}` } }
// // //           );
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Error requesting notification permission:', error);
// // //     }
// // //   };

// // //   async function signup(email, password) {
// // //     return createUserWithEmailAndPassword(auth, email, password);
// // //   }
  
// // //   function signInWithProvider(provider) {
// // //     return signInWithPopup(auth, provider);
// // //   }

// // //   function login(email, password) {
// // //     return signInWithEmailAndPassword(auth, email, password);
// // //   }

// // //   function logout() {
// // //     setUserProfile(null);
// // //     setFriendRequests([]);
// // //     setIsProfileComplete(false);
// // //     return signOut(auth);
// // //   }

// // //   const value = {
// // //     currentUser,
// // //     userProfile,
// // //     isProfileComplete,
// // //     friendRequests,
// // //     // This ensures that when other components call fetchFriendRequests, it uses the current user
// // //     fetchFriendRequests: () => fetchFriendRequests(currentUser), 
// // //     signup,
// // //     login,
// // //     logout,
// // //     signInWithProvider,
// // //     GoogleAuthProvider,
// // //     FacebookAuthProvider,
// // //     refreshUserProfile: () => fetchUserProfile(currentUser),
// // //     requestNotificationPermission,
// // //   };

// // //   return (
// // //     <AuthContext.Provider value={value}>
// // //       {!loading && children}
// // //     </AuthContext.Provider>
// // //   );
// // // }




// // import React, { useContext, useState, useEffect, useCallback } from 'react';
// // import { auth, getFcmToken } from '../components/firebase';
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
// //   const [userProfile, setUserProfile] = useState(null);
// //   const [friendRequests, setFriendRequests] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [isProfileComplete, setIsProfileComplete] = useState(false);

// //   const fetchUserProfile = useCallback(async (user) => {
// //     try {
// //       const idToken = await user.getIdToken(true);
// //       const response = await axios.post(
// //         'http://localhost:3000/api/users/sync',
// //         {},
// //         { headers: { Authorization: `Bearer ${idToken}` } }
// //       );
// //       const profile = response.data;
// //       setUserProfile(profile);
// //       if (profile.selectedInterests && profile.selectedInterests.length >= 3) {
// //           setIsProfileComplete(true);
// //       } else {
// //           setIsProfileComplete(false);
// //       }
// //     } catch (error) {
// //       console.error('Error syncing user with backend:', error);
// //     }
// //   }, []);

// //   // This function fetches the list of pending friend requests
// //   const fetchFriendRequests = useCallback(async (user) => {
// //     if (!user) return;
// //     try {
// //         const idToken = await user.getIdToken();
// //         // By adding a unique timestamp, we prevent the browser from using a cached result.
// //         // This is the key to the fix.
// //         const cacheBust = `?t=${new Date().getTime()}`;
// //         const response = await axios.get(`http://localhost:3000/api/friends/requests${cacheBust}`, {
// //             headers: { Authorization: `Bearer ${idToken}` }
// //         });
// //         setFriendRequests(response.data);
// //     } catch (error) {
// //         console.error("Could not fetch friend requests", error);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
// //       setCurrentUser(user);
// //       if (user) {
// //         await fetchUserProfile(user);
// //         await fetchFriendRequests(user);
// //       }
// //       setLoading(false);
// //     });
// //     return unsubscribe;
// //   }, [fetchUserProfile, fetchFriendRequests]);

// //   const requestNotificationPermission = async () => {
// //     if (!currentUser) return;
// //     try {
// //       const permission = await Notification.requestPermission();
// //       if (permission === 'granted') {
// //         const token = await getFcmToken();
// //         if (token) {
// //           const idToken = await currentUser.getIdToken();
// //           await axios.post(
// //             'http://localhost:3000/api/users/fcm-token',
// //             { token },
// //             { headers: { Authorization: `Bearer ${idToken}` } }
// //           );
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error requesting notification permission:', error);
// //     }
// //   };

// //   async function signup(email, password) {
// //     return createUserWithEmailAndPassword(auth, email, password);
// //   }
  
// //   function signInWithProvider(provider) {
// //     return signInWithPopup(auth, provider);
// //   }

// //   function login(email, password) {
// //     return signInWithEmailAndPassword(auth, email, password);
// //   }

// //   function logout() {
// //     setUserProfile(null);
// //     setFriendRequests([]);
// //     setIsProfileComplete(false);
// //     return signOut(auth);
// //   }

// //   const value = {
// //     currentUser,
// //     userProfile,
// //     isProfileComplete,
// //     friendRequests,
// //     // This ensures that when other components call fetchFriendRequests, it uses the current user
// //     fetchFriendRequests: () => fetchFriendRequests(currentUser), 
// //     signup,
// //     login,
// //     logout,
// //     signInWithProvider,
// //     GoogleAuthProvider,
// //     FacebookAuthProvider,
// //     refreshUserProfile: () => fetchUserProfile(currentUser),
// //     requestNotificationPermission,
// //   };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {!loading && children}
// //     </AuthContext.Provider>
// //   );
// // }





// import React, { useContext, useState, useEffect, useCallback } from 'react';
// import { auth, getFcmToken } from '../components/firebase';
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
//   const [friendRequests, setFriendRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isProfileComplete, setIsProfileComplete] = useState(false);

//   const fetchUserProfile = useCallback(async (user) => {
//     try {
//       const idToken = await user.getIdToken(true);
//       const response = await axios.post(
//         'http://localhost:3000/api/users/sync',
//         {},
//         { headers: { Authorization: `Bearer ${idToken}` } }
//       );
//       const profile = response.data;
//       setUserProfile(profile);

//       // This is the key logic: Check if the user's profile is complete.
//       // A complete profile must have at least 3 interests.
//       if (profile.selectedInterests && profile.selectedInterests.length >= 3) {
//           setIsProfileComplete(true);
//       } else {
//           setIsProfileComplete(false);
//       }
//     } catch (error) {
//       console.error('Error syncing user with backend:', error);
//     }
//   }, []);

//   // This function fetches the list of pending friend requests
//   const fetchFriendRequests = useCallback(async (user) => {
//     if (!user) return;
//     try {
//         const idToken = await user.getIdToken();
//         // By adding a unique timestamp, we prevent the browser from using a cached result.
//         const cacheBust = `?t=${new Date().getTime()}`;
//         const response = await axios.get(`http://localhost:3000/api/friends/requests${cacheBust}`, {
//             headers: { Authorization: `Bearer ${idToken}` }
//         });
//         setFriendRequests(response.data);
//     } catch (error) {
//         console.error("Could not fetch friend requests", error);
//     }
//   }, []);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       setCurrentUser(user);
//       if (user) {
//         await fetchUserProfile(user);
//         await fetchFriendRequests(user);
//       }
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, [fetchUserProfile, fetchFriendRequests]);

//   const requestNotificationPermission = async () => {
//     if (!currentUser) return;
//     try {
//       const permission = await Notification.requestPermission();
//       if (permission === 'granted') {
//         const token = await getFcmToken();
//         if (token) {
//           const idToken = await currentUser.getIdToken();
//           await axios.post(
//             'http://localhost:3000/api/users/fcm-token',
//             { token },
//             { headers: { Authorization: `Bearer ${idToken}` } }
//           );
//         }
//       }
//     } catch (error) {
//       console.error('Error requesting notification permission:', error);
//     }
//   };

//   async function signup(email, password) {
//     return createUserWithEmailAndPassword(auth, email, password);
//   }
  
//   function signInWithProvider(provider) {
//     return signInWithPopup(auth, provider);
//   }

//   function login(email, password) {
//     return signInWithEmailAndPassword(auth, email, password);
//   }

//   function logout() {
//     setUserProfile(null);
//     setFriendRequests([]);
//     setIsProfileComplete(false);
//     return signOut(auth);
//   }

//   const value = {
//     currentUser,
//     userProfile,
//     isProfileComplete,
//     friendRequests,
//     // This ensures that when other components call fetchFriendRequests, it uses the current user
//     fetchFriendRequests: () => fetchFriendRequests(currentUser), 
//     signup,
//     login,
//     logout,
//     signInWithProvider,
//     GoogleAuthProvider,
//     FacebookAuthProvider,
//     refreshUserProfile: () => fetchUserProfile(currentUser),
//     requestNotificationPermission,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }




import React, { useContext, useState, useEffect, useCallback } from 'react';
import { auth, getFcmToken } from '../components/firebase';
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
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const fetchUserProfile = useCallback(async (user) => {
    try {
      const idToken = await user.getIdToken(true);
      const response = await axios.post(
        'http://localhost:3000/api/users/sync',
        {},
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      const profile = response.data;
      setUserProfile(profile);

      // This logic correctly determines if a user's profile is complete.
      // A complete profile must have selectedInterests with at least 3 items.
      if (profile.selectedInterests && profile.selectedInterests.length >= 3) {
          setIsProfileComplete(true);
      } else {
          setIsProfileComplete(false);
      }
    } catch (error) {
      console.error('Error syncing user with backend:', error);
    }
  }, []);

  // This function fetches the list of pending friend requests
  const fetchFriendRequests = useCallback(async (user) => {
    if (!user) return;
    try {
        const idToken = await user.getIdToken();
        // By adding a unique timestamp, we prevent the browser from using a cached result.
        const cacheBust = `?t=${new Date().getTime()}`;
        const response = await axios.get(`http://localhost:3000/api/friends/requests${cacheBust}`, {
            headers: { Authorization: `Bearer ${idToken}` }
        });
        setFriendRequests(response.data);
    } catch (error) {
        console.error("Could not fetch friend requests", error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user);
        await fetchFriendRequests(user);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [fetchUserProfile, fetchFriendRequests]);

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

  async function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  
  function signInWithProvider(provider) {
    return signInWithPopup(auth, provider);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setUserProfile(null);
    setFriendRequests([]);
    setIsProfileComplete(false);
    return signOut(auth);
  }

  const value = {
    currentUser,
    userProfile,
    isProfileComplete,
    friendRequests,
    // This ensures that when other components call fetchFriendRequests, it uses the current user
    fetchFriendRequests: () => fetchFriendRequests(currentUser), 
    signup,
    login,
    logout,
    signInWithProvider,
    GoogleAuthProvider,
    FacebookAuthProvider,
    refreshUserProfile: () => fetchUserProfile(currentUser),
    requestNotificationPermission,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
