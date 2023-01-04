// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCdlhMcrqWj3Pc9yQexj5EdzyRDkN0-kEM",
  authDomain: "signal-73bb2.firebaseapp.com",
  projectId: "signal-73bb2",
  storageBucket: "signal-73bb2.appspot.com",
  messagingSenderId: "993475368769",
  appId: "1:993475368769:web:7e4fff0df4db2091d233c0",
  measurementId: "G-NCYJ0E0GNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {db, auth};