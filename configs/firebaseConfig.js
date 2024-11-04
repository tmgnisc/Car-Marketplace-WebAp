// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "car-marketplace-bfe57.firebaseapp.com",
  projectId: "car-marketplace-bfe57",
  storageBucket: "car-marketplace-bfe57.firebasestorage.app",
  messagingSenderId: "439806093429",
  appId: "1:439806093429:web:88b3b857ce913631f2b03c",
  measurementId: "G-NF46YENW3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)