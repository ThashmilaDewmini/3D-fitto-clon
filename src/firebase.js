//import firbase from 'firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCJo9MoPaQFXkO9pgbyjaEwACCO9y4JZjQ",
    authDomain: "onlineshop-6d8df.firebaseapp.com",
    projectId: "onlineshop-6d8df",
    storageBucket: "onlineshop-6d8df.appspot.com",
    messagingSenderId: "576097412588",
    appId: "1:576097412588:web:6ff1541f78ada433a48cc9",
    measurementId: "G-MNYKSBHVTW"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};