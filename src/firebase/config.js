import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBzLkCvb--2wprTHNCMKkrepuI9Rav1t7k",
  authDomain: "eshop-41ed4.firebaseapp.com",
  projectId: "eshop-41ed4",
  storageBucket: "eshop-41ed4.appspot.com",
  messagingSenderId: "518959876237",
  appId: "1:518959876237:web:dcd4fb92ace24d0ef3fac4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  auth = getAuth(app);
export const  db = getFirestore(app);
export const  storage = getStorage(app);
export default app;