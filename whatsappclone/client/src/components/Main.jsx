import React, { useEffect, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
import axios from "axios";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";

function Main() {
  const router = useRouter()
  const[{userInfo,currentChatUser},dispatch] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState(false);

  useEffect(()=>{
    if(redirectLogin) router.push("/login")
  }, [redirectLogin])
  //the below onauthstate gets executed when there is a change in the page and it checks if the firebase auth user is present, if it is logged in,
  //it will return it in the callback function. if there is no current user it will redirect to login, for which we also need to implement 
  //useeffect method(above).
  onAuthStateChanged(firebaseAuth, async (currentUser) =>{
    if(!currentUser)  setRedirectLogin(true)
    if(!userInfo && currentUser?.email)
      {
      const {data} = await axios.post(CHECK_USER_ROUTE,{
        email:currentUser.email
      });
      
      if(!data.status){
        router.push("/login");
      }
      if(data?.data){
        const{id,name,email,profilePicture:profileImage,status} = data.data;
        dispatch({
          type:reducerCases.SET_USER_INFO,
          userInfo:{
            id,name,email,profileImage,status
          },
        });
      }
    }
    });
  return <>
    <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
      <ChatList/>
      {
        currentChatUser ? <Chat/>  : <Empty/>
      }
    </div>
  </>;
}

export default Main;
