import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export const Inpu = ({ placeholder, type, value, onChange, className }) => {
  const [showpass, setShowpass] = useState(false);

  const showchange = () => {
    setShowpass(!showpass);
  };

  return (
    <div className={className}>
      <div className="flex border border-gray-300 rounded-lg px-4 py-3 w-full text-lg font-normal justify-between items-center focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
        <input
          className="outline-none w-full bg-transparent"
          type={type === "password" && showpass ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <button
            onClick={showchange}
            type="button"
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            {showpass ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        )}
      </div>
    </div>
  );
};
