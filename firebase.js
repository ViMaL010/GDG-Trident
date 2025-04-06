// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8VeKsjID0TXyegFX1OxroJ3L1i96L01c",
  authDomain: "funded-328fb.firebaseapp.com",
  projectId: "funded-328fb",
  storageBucket: "funded-328fb.firebasestorage.app",
  messagingSenderId: "450597928002",
  appId: "1:450597928002:web:140e9dc4ee5d89a75c41db",
  measurementId: "G-1YD28XXGWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app); 

export { storage , db};
