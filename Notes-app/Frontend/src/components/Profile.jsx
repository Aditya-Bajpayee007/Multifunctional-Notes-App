import React from "react";
// import { useNavigate } from "react-router-dom";

export const Profile = ({ name, onLogout }) => {
  // const navigate = useNavigate();
  const initial = (names) => {
    if (!names) return "";
    const word = String(names).split(" ");
    let initial = "";
    for (let i = 0; i < Math.min(word.length, 2); i++) {
      if (word[i]) {
        initial += word[i][0];
      }
    }
    return initial.toUpperCase();
  };

  // const onclick = () => {
  //   localStorage.clear();
  //   navigate("/signup");
  // };

  return (
    <div className="flex">
      <div className=" font-bold mr-4 h-12 w-12 flex items-center border rounded-full justify-center bg-slate-200">
        {initial(name.username)}
      </div>
      <div>
        <h4 className="font-semibold">{name.username}</h4>
        <button className="underline text-slate-600" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
