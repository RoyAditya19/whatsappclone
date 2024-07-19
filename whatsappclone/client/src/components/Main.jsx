import React, { useEffect, useRef, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE, HOST } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
import axios from "axios";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";
import { io } from "socket.io-client";
import SearchMessages from "./Chat/SearchMessages";

function Main() {
  const router = useRouter()
  const[{userInfo,currentChatUser, messagesSearch},dispatch] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [socketEvent, setSocketEvent] = useState(false)
  const socket = useRef()

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

    useEffect(()=>{
    if(userInfo){
     socket.current = io(HOST);
     socket.current.emit("add-user", userInfo.id);
     dispatch({type:reducerCases.SET_SOCKET, socket});
    }
    },[userInfo]);

    useEffect(()=>{
     if(socket.current && !socketEvent){
          socket.current.on("msg-recieve",(data)=>{
               dispatch({type:reducerCases.ADD_MESSAGE,
                    newMessage:{
                         ...data.message,
                    },
               });
          });
          setSocketEvent(true)
     }
    },[socket.current])

    useEffect(()=>{
      const getMessages = async()=>{
          const {data: {messages}}= await axios.get(`${GET_MESSAGES_ROUTE}/${userInfo.id}/${currentChatUser.id}`);
          dispatch({
               type:reducerCases.SET_MESSAGES,messages})
      }
      if(currentChatUser?.id){
          getMessages();
      }
    },[currentChatUser])
  return <>
    <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
      <ChatList/>
      {
        currentChatUser ? <div className={messagesSearch ? " grid grid-cols-2": "grid-cols-2 "}>
        <Chat/>
        {
          messagesSearch && <SearchMessages />
        }
        </div>

          : <Empty/>
      }
    </div>
  </>;
}

export default Main;
