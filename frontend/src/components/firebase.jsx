// // // import { initializeApp } from "firebase/app";
// // // import { getAuth } from "firebase/auth";
// // // import { getFirestore } from "firebase/firestore";

// // // // Firebase config using env variables
// // // const firebaseConfig = {
// // //   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
// // //   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
// // //   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
// // //   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
// // //   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
// // //   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// // //   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// // // };

// // // // Initialize Firebase
// // // const app = initializeApp(firebaseConfig);

// // // // Export services
// // // export const auth = getAuth(app);
// // // export const db = getFirestore(app);




// // import { initializeApp } from "firebase/app";
// // import { getAuth } from "firebase/auth";
// // import { getFirestore } from "firebase/firestore";
// // import { getMessaging, getToken } from "firebase/messaging"; // 1. Import messaging services

// // // Firebase config using env variables
// // const firebaseConfig = {
// //   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
// //   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
// //   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
// //   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
// //   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
// //   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// //   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);

// // // Export services
// // export const auth = getAuth(app);
// // export const db = getFirestore(app);
// // export const messaging = getMessaging(app); // 2. Initialize and export messaging

// // // 3. Function to get the FCM token
// // export const getFcmToken = async () => {
// //   try {
// //     const currentToken = await getToken(messaging, { 
// //       vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY // Your VAPID key from Firebase console
// //     });
// //     if (currentToken) {
// //       return currentToken;
// //     } else {
// //       console.log('No registration token available. Request permission to generate one.');
// //       return null;
// //     }
// //   } catch (err) {
// //     console.log('An error occurred while retrieving token. ', err);
// //     return null;
// //   }
// // };





// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getMessaging, getToken } from "firebase/messaging"; // 1. Import messaging services

// // Firebase config using env variables
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };
// console.log(import.meta.env.VITE_FIREBASE_VAPID_KEY)
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Export services
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const messaging = getMessaging(app); // 2. Initialize and export messaging

// // 3. Function to get the FCM token
// export const getFcmToken = async () => {
//   try {
//     const currentToken = await getToken(messaging, { 
//       vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY // Your VAPID key from Firebase console
//     });
//     if (currentToken) {
//       return currentToken;
//     } else {
//       console.log('No registration token available. Request permission to generate one.');
//       return null;
//     }
//   } catch (err) {
//     console.log('An error occurred while retrieving token. ', err);
//     return null;
//   }
// };




import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging"; // 1. Import messaging services

// Firebase config using env variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app); // 2. Initialize and export messaging

// 3. Function to get the FCM token
export const getFcmToken = async () => {
  try {
    const currentToken = await getToken(messaging, { 
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY // Your VAPID key from Firebase console
    });
    if (currentToken) {
      return currentToken;
    } else {
      console.log('No registration token available. Request permission to generate one.');
      return null;
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
    return null;
  }
};
