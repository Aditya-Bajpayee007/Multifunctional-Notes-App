import React, { useState } from "react";
import axiosInstance from "../help/axiosInstance";
import { useNavigate } from "react-router-dom";

export const Userscard = ({ user, handleUserNotes }) => {
  const navigate = useNavigate();

  const userNotes = async () => {
    navigate(`/explore/${user._id}`);
    try {
      const response = await axiosInstance.get(`/get-user-notes/${user._id}`);
      if (response.data) {
        handleUserNotes(user.username, response.data.usernotes);
      }
      console.log(response.data.usernotes);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      onClick={() => userNotes()}
      className="bg-slate-500 h-52 mx-10 my-5 w-48 hover:cursor-pointer hover:scale-110 transition-all"
    >
      <img
        className="h-32 w-32 mx-auto my-5 rounded-full "
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt=""
      />
      <h1 className="text-white text-xl text-center ">{user.username}</h1>
    </div>
  );
};
