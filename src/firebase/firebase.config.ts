// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore'; 
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCUTtG7Y5DbIwwxcSh96ofEdiITizAuddE",
    authDomain: "orion-centro-personalizado.firebaseapp.com",
    databaseURL: "https://orion-centro-personalizado-default-rtdb.firebaseio.com",
    projectId: "orion-centro-personalizado",
    storageBucket: "orion-centro-personalizado.appspot.com",
    messagingSenderId: "484658312825",
    appId: "1:484658312825:web:4d54b68e38f7db0b5846a8"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore();//cuando necesite hacer algun query obtengo la referencia a firebase mediante este export