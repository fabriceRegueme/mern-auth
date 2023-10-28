// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "mern-auth-91607.firebaseapp.com",
  projectId: "mern-auth-91607",
  storageBucket: "mern-auth-91607.appspot.com",
  messagingSenderId: "773746669251",
  appId: "1:773746669251:web:1b79443f0bdef0041d5476",
  measurementId: "G-ME9BLM6D42"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

