import React from "react";
import { RxCross2 } from "react-icons/rx";
import { FaMagnifyingGlass } from "react-icons/fa6";

export const Searchbar = ({ value, onChange, handlesearch, clearsearch }) => {
  return (
    <div className="relative flex items-center w-full max-w-lg">
      <div className="relative flex items-center w-full bg-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
        <FaMagnifyingGlass className="absolute left-3 text-gray-400 text-lg" />

        <input
          className="w-full pl-10 pr-10 py-3 bg-transparent outline-none text-gray-700 placeholder-gray-400 font-medium"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search notes, users..."
        />

        {value && (
          <button
            type="button"
            onClick={clearsearch}
            className="absolute right-3 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200 group"
          >
            <RxCross2 className="text-gray-400 group-hover:text-gray-600 text-lg" />
          </button>
        )}
      </div>
    </div>
  );
};
