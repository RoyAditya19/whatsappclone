import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";
import React from "react";
import {BiSearchAlt2} from "react-icons/bi"
import {BsFilter} from "react-icons/bs"
function SearchBar() {
     const [{contactSearch},dispatch] = useStateProvider()
  return <div className="flex bg-search-input-container-background py-3 pl-5 items-center gap-3 h-14">
    <div className=" bg-panel-header-background flex items-center py-1 rounded-lg flex-grow gap-5 px-3">
      <div>
        <BiSearchAlt2 className=" text-panel-header-icon cursor-pointer text-l " />
      </div>
      <div>
        <input type="text" placeholder="Search or Start a New Chat" className="bg-transparent text-sm focus:outline-none text-white w-full" 
          value={contactSearch}
          onChange={e=> dispatch({type: reducerCases.SET_CONTACT_SEARCH, contactSearch:e.target.value,})}
        />
      </div>
    </div>
    <div className="pr-5 pl-3 ">
    <BsFilter className=" text-panel-header-icon cursor-pointer text-l" />
    </div>
  </div>;
}

export default SearchBar;
