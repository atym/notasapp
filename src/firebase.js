import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// PASTE YOUR CONFIG HERE
const firebaseConfig = {
    apiKey: "AIzaSyAli0drPr4qj9qKoe376UXvLLDyu-1lTGY",
    authDomain: "notas-1f37f.firebaseapp.com",
    projectId: "notas-1f37f",
    storageBucket: "notas-1f37f.firebasestorage.app",
    messagingSenderId: "216586156036",
    appId: "1:216586156036:web:2a070111c818d407789d51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
