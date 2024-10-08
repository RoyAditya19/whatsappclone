import React, { useEffect } from "react";
import Image from "next/image";
import {FcGoogle} from "react-icons/fc"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";


function login() {
  // the below handle login function allows you to login through the same way we login using google login.
  const router = useRouter();
  const [{userInfo,newUser},dispatch] = useStateProvider();

  useEffect(() => {
    if(userInfo?.id && !newUser) router.push("/");
  }, [userInfo,newUser])
  
  const handleLogin = async()=>{
    const provider = new GoogleAuthProvider() //firebase being used for getting the required details from the google login.
    const {
      user:{ displayName: name, email, photoUrl:profileImage}, //here displayname and photoUrl are being renamed to name and profileImage respectively.
  } = await signInWithPopup(firebaseAuth, provider);
  try {
    if(email)
      {
        const {data} = await axios.post(CHECK_USER_ROUTE, {email});
        if(!data.status)
          {
            dispatch({type:reducerCases.SET_NEW_USER, newUser:true}); //when we are using this dispatch both the type and newUser are being send as an action, so when it goes to the reducer (it consist state and action) these two variables are send through the action parameter only.
            dispatch({ type:reducerCases.SET_USER_INFO, userInfo:{name,email,profileImage,status:"",},});
            router.push("/onboarding");
          }else{
            const{id,name,email,profilePicture:profileImage,status} = data.data;
            dispatch({ type:reducerCases.SET_USER_INFO, userInfo:{ id,name,email,profileImage,status},});
                router.push("/")
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
