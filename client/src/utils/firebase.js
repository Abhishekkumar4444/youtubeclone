// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth"
//you have to import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV1tYH4_0qjNYsep4YE7svG14wSUhRmYg",
  authDomain: "fir-5fa01.firebaseapp.com",
  projectId: "fir-5fa01",
  storageBucket: "fir-5fa01.appspot.com",
  messagingSenderId: "177542024699",
  appId: "1:177542024699:web:5e109b2087cb45939a4f5e",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
// you have to add
export default app
