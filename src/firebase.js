// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNUyQ8reZSRqVauXDyEcKlZECeoPzTOHs",
  authDomain: "blogging-app-8fb65.firebaseapp.com",
  projectId: "blogging-app-8fb65",
  storageBucket: "blogging-app-8fb65.appspot.com",
  messagingSenderId: "113179545282",
  appId: "1:113179545282:web:175ef04df4011567f3b55b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);