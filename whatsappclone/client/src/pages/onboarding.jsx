import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function onboarding() {
  const router = useRouter()
  const [{userInfo, newUser},dispatch] = useStateProvider()
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("/default_avatar.png");

  useEffect(()=>{
    if(!newUser && !userInfo?.email) router.push("/login");
    else if(!newUser && userInfo?.email) router.push("/")
  },[newUser,userInfo,router])

  const onboardUserHandler = async()=>{
    if(validateDetails()){
        const email = userInfo.email
        //below axios.post is responsible for pushing the data to the database. let's understand how it happens: below input and avatar component has sent the setimage and setabout as props.
        //now how the image and about is getting updated with the help of re-rendering function, has been explained below. so this is the way how the data is being send to the database.
        //and later userinfo from context api is used to update the userinfo globally 
        try {
          const {data}= await axios.post(ONBOARD_USER_ROUTE,{
            email,
            name,
            about,
            image,
          });
          //after entering the login details, it checks that whether the user exists already or not. if not then
          //it sends to the onboarding page, else it sends to the chat page. 
          if(data.status){
            dispatch({type:reducerCases.SET_NEW_USER, newUser:false});
            dispatch({
              type:reducerCases.SET_USER_INFO,
              userInfo:{
                id:data.user.id,
                name,
                email,
                profileImage:image,
                status:about,
              },
            });
            router.push("/")
          }
        } catch (error) {
          console.log(error)
        }
    }
  };

  const validateDetails = ()=>{
    if(name.length<3){
      return false
    }
    return true
  }
  return <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
    <div className="flex items-center justify-center gap-2">
    <Image src="/whatsapp.gif"
    alt="whatsapp"
    width={300}
    height={300}
    />
    <span className="text-7xl">Whatsapp</span>
    </div>
    <h2 className="text-2xl ">Create your profile</h2>
    <div className="flex gap-6 mt-6">
      <div className="flex flex-col items-center justify-center mt-5 gap-6">
      <Input name="Display name" state={name} setState={setName} label /> 
      <Input name="About" state={about} setState={setAbout} label />
      {/*The setState function (passed from the parent component) is responsible for updating the state. 
      When setState is called with the new value from e.target.value, React updates the state of the parent component. 
      This causes the parent component to re-render, which, in turn, re-renders the Input component with the updated state. */}

      {/* Rendering: The Input component above receives state and setState as props. The input field's value is set to state. 
      When the user types in the input field, the onChange event is triggered, which then calls the setState with the new input value.
     setState updates the state in the parent component. This triggers a re-render of both the parent and Input components.
     On re-render, the input field's value is updated with the new state, reflecting the user's input. */}
      <div className="flex items-center justify-center">
        <button className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg" onClick={onboardUserHandler} >Create Profile</button>
      </div>
      </div>
      <div>
        <Avatar type="xl" image={image} setImage={setImage} />
      </div>
    </div>
  </div>;
}

export default onboarding;
