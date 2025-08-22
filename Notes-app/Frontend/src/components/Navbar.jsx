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
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Left Section - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo/Brand */}
            <div
              className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text hover:cursor-pointer transition-all duration-200 hover:scale-105"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Notes
            </div>

            {/* My Profile Link */}
            <div
              className="text-lg font-semibold text-gray-700 hover:text-blue-600 hover:cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50"
              onClick={() => {
                navigate("/myprofile");
              }}
            >
              My Profile
            </div>
          </div>

          {/* Center Section - Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <Searchbar
              onChange={(e) => {
                setText(e.target.value);
                handlesearch(e.target.value);
              }}
              value={text}
              clearsearch={clearsearch}
            />
          </div>

          {/* Right Section - Actions and Profile */}
          <div className="flex items-center space-x-4">
            {/* Dynamic Button */}
            {window.location.pathname !== "/explore" ? (
              <button
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold rounded-lg transition-all duration-200 hover:bg-blue-50 flex items-center space-x-2"
                onClick={() => navigate("/explore")}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239"
                  />
                </svg>
                <span>People</span>
              </button>
            ) : (
              <button
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold rounded-lg transition-all duration-200 hover:bg-blue-50 flex items-center space-x-2"
                onClick={() => navigate("/dashboard")}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span>Dashboard</span>
              </button>
            )}

            {/* Profile Component */}
            <Profile name={name} onLogout={onLogout} />
          </div>
        </div>
      </div>
    </nav>
  );
};
