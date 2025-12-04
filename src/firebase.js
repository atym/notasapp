import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

// Initialize Firestore (the database) and export it
export const db = getFirestore(app);