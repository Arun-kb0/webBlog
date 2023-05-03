// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPe-m8JoxY6VgKAOlsHMJKZa7_wxwdDeg",
  authDomain: "webblog-1bd07.firebaseapp.com",
  projectId: "webblog-1bd07",
  storageBucket: "webblog-1bd07.appspot.com",
  messagingSenderId: "485841120030",
  appId: "1:485841120030:web:bf4c34b0fe8f3e2101770f",
  measurementId: "G-CM3E74E3MR"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db =getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)



// export const provider =new GoogleAuthProvider()
// export const provider2 = signInWithEmailAndPassword()