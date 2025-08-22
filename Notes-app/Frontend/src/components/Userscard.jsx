import React, { useState } from "react";
import axiosInstance from "../help/axiosInstance";
import { useNavigate } from "react-router-dom";

export const Userscard = ({ user, handleUserNotes }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userNotes = async () => {
    try {
      setLoading(true);
      setError("");

      // Navigate first
      navigate(`/explore/${user._id}`);

      // Fetch user notes
      const response = await axiosInstance.get(`/get-user-notes/${user._id}`);
      if (response.data) {
        handleUserNotes(user.username, response.data.usernotes);
      }
      console.log(response.data.usernotes);
    } catch (err) {
      console.log("Error fetching user notes:", err);
      setError("Failed to load user notes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 cursor-pointer border border-gray-100">
      <div onClick={() => userNotes()} className="text-center">
        {/* Profile Image */}
        <div className="mb-4">
          <img
            className="h-16 w-16 mx-auto rounded-full border-2 border-gray-200"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt={`${user.username} profile`}
          />
        </div>

        {/* User Info */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {user.username}
          </h3>
          {user.email && (
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center mb-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-3 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
            {error}
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              userNotes();
            }}
            disabled={loading}
            className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                Loading...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View Notes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
