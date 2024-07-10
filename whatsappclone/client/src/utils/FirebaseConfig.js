import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCiySwtEDvjaYFloP7yqyNUVz_o-2n9iWI",
    authDomain: "whatsappclone-88dbe.firebaseapp.com",
    projectId: "whatsappclone-88dbe",
    storageBucket: "whatsappclone-88dbe.appspot.com",
    messagingSenderId: "413733618635",
    appId: "1:413733618635:web:7d25521e5f799ae1172c4e",
    measurementId: "G-1F2B6GV8XM"
  };


const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);