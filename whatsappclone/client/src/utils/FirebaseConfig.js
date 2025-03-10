import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
    apiKey: "",
    authDomain: "whatsappclone-88dbe.firebaseapp.com",
    projectId: "whatsappclone-88dbe",
    storageBucket: "whatsappclone-88dbe.appspot.com",
    messagingSenderId: "413733618635",
    appId: "1:413733618635:web:7d25521e5f799ae1172c4e",
    measurementId: "G-1F2B6GV8XM"
  };


const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

// the above code firebaseconfig was used to get the mail-id, name and id of the user. we need to add google provider(refer timestamp 15:25) and then we are good to go.
