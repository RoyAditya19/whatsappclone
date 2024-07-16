import React from "react";
import {BiSearchAlt2} from "react-icons/bi"
import {BsFilter} from "react-icons/bs"
function SearchBar() {
  return <div className="flex bg-search-input-container-background py-3 pl-5 items-center gap-3 h-14">
    <div className=" bg-panel-header-background flex items-center py-1 rounded-lg flex-grow gap-5 px-3">
      <div>
        <BiSearchAlt2 className=" text-panel-header-icon cursor-pointer text-l " />
      </div>
      <div>
        <input type="text" placeholder="Search" className="bg-transparent text-sm focus:outline-none text-white w-full" />
      </div>
    </div>
    <div className="pr-5 pl-3 ">
    <BsFilter className=" text-panel-header-icon cursor-pointer text-l" />
    </div>
  </div>;
}

export default SearchBar;
