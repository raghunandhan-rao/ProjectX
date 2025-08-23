
// Use importScripts to load the Firebase SDK for service workers
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// MANUALLY PASTE YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "AIzaSyC5TeSYwp0ItE4fMFWK3loMDYcCfUEAs1U",
  authDomain: "projectx-1225d.firebaseapp.com",
  projectId: "projectx-1225d",
  storageBucket: "projectx-1225d.appspot.com",
  messagingSenderId: "265895248248",
  appId: "1:265895248248:web:9696be14bd6df2c7b3488d",
  measurementId: "G-P8JLY5GPP1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// This service worker only needs to be initialized.
// Firebase handles the rest automatically.
