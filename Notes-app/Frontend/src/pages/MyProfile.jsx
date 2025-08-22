import React, { useEffect, useState } from "react";
import axiosInstance from "../help/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Profile } from "../components/Profile";

export const MyProfile = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchuser = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/user");
        setData(response.data.user);
      } catch (error) {
        setError("Failed to load profile information");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchuser();
  }, []);

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Simple Navbar */}
        <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 font-sans">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center py-4">
              {/* Left Section - Logo */}
              <div
                className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text hover:cursor-pointer transition-all duration-200 hover:scale-105"
                onClick={() => navigate("/dashboard")}
              >
                Notes
              </div>

              {/* Right Section - Profile */}
              <Profile name={data} onLogout={onLogout} />
            </div>
          </div>
        </nav>

        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      {/* Simple Navbar */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 font-sans">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            {/* Left Section - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              {/* Logo/Brand */}
              <div
                className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text hover:cursor-pointer transition-all duration-200 hover:scale-105"
                onClick={() => navigate("/dashboard")}
              >
                Notes
              </div>

              {/* Navigation Links */}
              <div className="flex items-center space-x-4">
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
              </div>
            </div>

            {/* Right Section - Profile Component */}
            <Profile name={data} onLogout={onLogout} />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600 font-light">
            Manage your account information
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32"></div>

          <div className="relative px-8 pb-8">
            <div className="flex justify-center -mt-16 mb-8">
              <div className="relative">
                <img
                  className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover"
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Profile"
                />
                <div className="absolute bottom-2 right-2 bg-green-500 h-6 w-6 rounded-full border-2 border-white"></div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Username
                      </p>
                      <p className="text-xl font-bold text-gray-800 mt-1">
                        {data.username || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </p>
                      <p className="text-xl font-bold text-gray-800 mt-1 break-all">
                        {data.email || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-blue-600">Active</p>
                  <p className="text-sm text-gray-600 mt-1">Account Status</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-purple-600">Member</p>
                  <p className="text-sm text-gray-600 mt-1">Account Type</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
