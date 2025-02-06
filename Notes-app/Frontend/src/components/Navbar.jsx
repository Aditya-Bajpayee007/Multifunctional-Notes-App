import React, { useEffect, useState } from "react";
import { Searchbar } from "./Searchbar";
import { Profile } from "./Profile";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ name, handlesearch }) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const clearsearch = () => {
    setText("");
    handlesearch("");
  };

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-between px-6 items-center py-3">
      <div className="flex">
        <div
          className="text-3xl font-serif font-bold hover:cursor-pointer"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Notes
        </div>
        <div
          className="text-xl font-serif font-semibold hover:cursor-pointer ml-5 pt-1.5 "
          onClick={() => {
            navigate("/myprofile");
          }}
        >
          myProfile
        </div>
      </div>

      <div>
        <Searchbar
          onChange={(e) => {
            setText(e.target.value);
            handlesearch(e.target.value);
          }}
          value={text}
          // handlesearch={() => handlesearch(text)}
          clearsearch={clearsearch}
        />
      </div>
      <div className="flex">
        {window.location.pathname !== "/explore" ? (
          <button
            className="mx-4 text-lg font-semibold font-serif"
            onClick={() => navigate("/explore")}
          >
            People
          </button>
        ) : (
          <button
            className="mx-4 text-lg font-semibold font-serif"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        )}

        <Profile name={name} onLogout={onLogout} />
      </div>
    </div>
  );
};
