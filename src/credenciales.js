// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjzo9k3OKQb2isqE4UIpgIxHOSxAiadfE",
  authDomain: "exercise-firebase-9.firebaseapp.com",
  projectId: "exercise-firebase-9",
  storageBucket: "exercise-firebase-9.appspot.com",
  messagingSenderId: "1007421867173",
  appId: "1:1007421867173:web:d654fe33f8a95463d2b94c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp