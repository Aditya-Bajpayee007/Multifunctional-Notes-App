import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center h-screen justify-center bg-slate-400
      font-serif"
    >
      <div className="text-[5rem] flex justify-center font-bold">Home</div>
      <div className="flex gap-32 mt-10 text-4xl font-semibold">
        <button
          onClick={() => navigate("/signup")}
          className="hover:animate-bounce"
        >
          Signup
        </button>
        <button
          onClick={() => navigate("/login")}
          className="hover:animate-bounce"
        >
          Login
        </button>
      </div>
    </div>
  );
};
