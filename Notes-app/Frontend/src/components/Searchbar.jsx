import React from "react";
import { Inpu } from "../input/Inpu";
import { RxCross2 } from "react-icons/rx";
import { FaMagnifyingGlass } from "react-icons/fa6";

export const Searchbar = ({ value, onChange, handlesearch, clearsearch }) => {
  return (
    <div className="flex items-center w-96 border p-2 bg-slate-200 rounded-lg">
      <input
        className="w-full bg-slate-200 outline-none text-xl font-light"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search Notes"
      />
      {value && (
        <RxCross2
          className="cursor-pointer text-xl text-gray-500 mr-3 hover:text-black"
          onClick={clearsearch}
        />
      )}
      {/* <FaMagnifyingGlass
        className="cursor-pointer text-2xl text-gray-500 mr-3 hover:text-black"
        onClick={handlesearch}
      /> */}
    </div>
  );
};
