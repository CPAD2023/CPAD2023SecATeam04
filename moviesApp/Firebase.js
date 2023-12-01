import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAunBW21mXN7HTjpEuTP_AvM-kwXiw0uoE",
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
