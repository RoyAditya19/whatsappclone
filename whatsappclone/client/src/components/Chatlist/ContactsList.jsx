import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect,useState } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";

function ContactsList() {

  const [allContacts, setAllContacts] = useState([])
  const [{}, dispatch] = useStateProvider()
  useEffect(()=>{
    const getContacts = async()=>{
      try {
      const {data:{users}} = await axios.get(GET_ALL_CONTACTS);
      setAllContacts(users)
      } catch (error) {
        console.log(error)
      }
    };
    getContacts()
  },[])
  return <div className=" h-full flex flex-col ">
    <div className=" h-24 flex items-end px-3 py-4 ">
      <div className=" flex items-center gap-12 text-white ">
        <BiArrowBack className=" cursor-pointer text-xl  " onClick={()=> dispatch({type: reducerCases.SET_ALL_CONTACTS_PAGE})} />
        <span>New Chat</span>
      </div>
    </div>
    <div className=" bg-panel-header-background flex items-center py-1 rounded-lg flex-grow gap-5 px-3">
      <div>
        <BiSearchAlt2 className=" text-panel-header-icon cursor-pointer text-l " />
      </div>
      <div>
        <input type="text" placeholder="Search" className="bg-transparent text-sm focus:outline-none text-white w-full" />
      </div>
    </div>
  </div>;
}

export default ContactsList;
