

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC5TeSYwp0ItE4fMFWK3loMDYcCfUEAs1U",
//   authDomain: "projectx-1225d.firebaseapp.com",
//   projectId: "projectx-1225d",
//   storageBucket: "projectx-1225d.appspot.com",
//   messagingSenderId: "265895248248",
//   appId: "1:265895248248:web:9696be14bd6df2c7b3488d",
//   measurementId: "G-P8JLY5GPP1"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Export services
// export const auth = getAuth(app);
// export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
