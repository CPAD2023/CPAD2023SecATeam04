import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "",
  authDomain: "cpadproject.firebaseapp.com",
  projectId: "cpadproject",
  storageBucket: "cpadproject.appspot.com",
  messagingSenderId: "957865390382",
  appId: "1:957865390382:web:6aa22056f86ff4779ccabf",
  measurementId: "G-8WPRBH4SHY"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
