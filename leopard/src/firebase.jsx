// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1_-H2iOj3xrszQ6oQG9o7zjWZSDX9z5g",
  authDomain: "social-b6dbb.firebaseapp.com",
  projectId: "social-b6dbb",
  storageBucket: "social-b6dbb.appspot.com",
  messagingSenderId: "224772905608",
  appId: "1:224772905608:web:47396bb0926933bed19d3d",
  measurementId: "G-SM5TMDRCXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const googleauth = new getAuth(app);
export const googleprovider = new GoogleAuthProvider(app)
googleauth.languageCode = 'nl';


export const db = getFirestore(app);
