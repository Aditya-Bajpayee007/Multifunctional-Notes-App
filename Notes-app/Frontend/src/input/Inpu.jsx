import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export const Inpu = ({ placeholder, type, value, onChange }) => {
  const [showpass, setShowpass] = useState(false);

  const showchange = () => {
    setShowpass(!showpass);
  };

  return (
    <div>
      <h3 className="mb-2">{value}</h3>
      <div className="flex border p-2 w-full mb-4 text-lg font-extralight justify-between items-center">
        <input
          className="outline-none w-full"
          type={type === "password" && showpass ? "text" : type}
          placeholder={placeholder}
          onChange={onChange}
        />
        {type === "password" && (
          <button onClick={showchange} type="button">
            {showpass ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        )}
      </div>
    </div>
  );
};
