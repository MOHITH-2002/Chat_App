// import firebase from "firebase/app";
// import "firebase/storage";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "chatomatic-37c73.firebaseapp.com",
  projectId: "chatomatic-37c73",
  storageBucket: "chatomatic-37c73.appspot.com",
  messagingSenderId: "503941282785",
  appId:process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-PFSMWJ357Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);


