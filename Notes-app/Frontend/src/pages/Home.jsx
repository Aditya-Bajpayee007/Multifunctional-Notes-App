import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      <div className="text-center mb-12">
        <h1 className="text-7xl font-bold text-gray-800 mb-4 tracking-tight">
          Welcome
        </h1>
        <p className="text-xl text-gray-600 font-light">
          Get started with your journey
        </p>
      </div>

      <div className="flex gap-8 mt-8">
        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg 
                   shadow-lg hover:bg-blue-700 hover:shadow-xl hover:scale-105 
                   transition-all duration-200 ease-in-out"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg 
                   border-2 border-blue-600 shadow-lg hover:bg-blue-50 
                   hover:shadow-xl hover:scale-105 transition-all duration-200 ease-in-out"
        >
          Sign In
        </button>
      </div>

      <div className="absolute bottom-8 text-center">
        <p className="text-sm text-gray-500">
          Join thousands of users already enjoying our platform
        </p>
      </div>
    </div>
  );
};
