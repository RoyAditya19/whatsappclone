import React from "react";
import Image from "next/image";
import {FcGoogle} from "react-icons/fc"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import { useRouter } from "next/router";


function login() {
  // the below handle login function allows you to login through the same way we login using google login.
  const router = useRouter();
  const handleLogin = async()=>{
    const provider = new GoogleAuthProvider()
    const {
      user:{ displayName: name, email, photoUrl:profileImage},
  } = await signInWithPopup(firebaseAuth, provider);
  try {
    if(email)
      {
        const {data} = await axios.post(CHECK_USER_ROUTE, {email});
        console.log({data});
        if(!data.status)
          {
            router.push("/onboarding");
          }
      }
  } catch (err) {
    console.log(err);
  }
  }
  return( 
  <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
    <div className="flex items-center justify-center gap-2 text-white">
    <Image src="/whatsapp.gif" alt="Whatsapp" height={300} width={300} />
    <span className="text-7xl ">WhatsApp</span>
    </div>
    <button className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg" onClick={handleLogin}>
      <FcGoogle className="text-4xl"/>
      <span className="text-white text-2xl">Login with Google</span>
    </button>
  </div>
)
}

export default login;
