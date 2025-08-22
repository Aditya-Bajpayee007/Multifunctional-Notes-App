import React, { useEffect, useState } from "react";
import axiosInstance from "../help/axiosInstance";
import { Userscard } from "../components/Userscard";
import { Navbar } from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { ViewNotesCard } from "../components/ViewNotesCard";
import moment from "moment";

export const Explore = () => {
  const [users, Setusers] = useState([]);
  const [name, setName] = useState("");
  const [alluser, Setallusers] = useState([]);
  const [selecteduser, Setselecteduser] = useState();
  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notesLoading, setNotesLoading] = useState(false);

  const navigate = useNavigate();
  let userID = useParams();

  const getuserinfo = async () => {
    try {
      const response = await axiosInstance.get("/user");
      if (response.data && response.data.user) {
        setName(response.data.user);
      }
    } catch (error) {
      console.log("Error response:", error.response);
      localStorage.clear();
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const getallUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/get-all-users");
      if (response.data) {
        console.log(response.data);
        Setusers(response.data.users);
        Setallusers(response.data.users);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const selecteduserinfo = async () => {
    try {
      setNotesLoading(true);
      const response = await axiosInstance.get(`/user/${userID}`);
      if (response.data && response.data.user) {
        console.log(response.data);
        Setselecteduser(response.data.user);
        console.log(selecteduser);
      }
    } catch (error) {
      console.log("Error occ", error);
      setError("Failed to load user details");
    } finally {
      setNotesLoading(false);
    }
  };

  const handlesearch = (text) => {
    if (!text.trim()) {
      Setusers(alluser);
      return;
    }
    const filteredUsers = alluser.filter((user) => {
      return (
        user.username.toLowerCase().includes(text.toLowerCase()) ||
        (user.email && user.email.toLowerCase().includes(text.toLowerCase()))
      );
    });
    Setusers(filteredUsers);
  };

  const handleUserNotes = (userId, userNotes) => {
    setNote(userNotes); // Update notes state
    Setselecteduser(userId); // Set the selected user
  };

  useEffect(() => {
    getallUsers();
    getuserinfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading explore page...</p>
        </div>
      </div>
    );
  }

  return Object.keys(userID).length === 0 ? (
    // Users List View
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      <Navbar name={name} handlesearch={handlesearch} />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Discover People
          </h1>
          <p className="text-gray-600 font-light text-lg">
            Connect with other users and explore their public notes
          </p>

          {/* Stats */}
          <div className="flex justify-center mt-6">
            <div className="bg-white rounded-lg shadow-md p-4 text-center min-w-[120px]">
              <p className="text-2xl font-bold text-blue-600">{users.length}</p>
              <p className="text-sm text-gray-600">
                {users.length === alluser.length
                  ? "Total Users"
                  : "Search Results"}
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-2xl mx-auto">
            {error}
            <button
              onClick={() => setError("")}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Users Grid */}
        {users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map((user, index) => {
              return (
                <div
                  key={user._id || index}
                  className="transform hover:scale-105 transition-transform duration-200"
                >
                  <Userscard user={user} handleUserNotes={handleUserNotes} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center max-w-md">
              <div className="mb-6">
                <svg
                  className="w-24 h-24 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                {alluser.length === 0 ? "No users found" : "No matching users"}
              </h3>
              <p className="text-gray-500">
                {alluser.length === 0
                  ? "There are no other users on the platform yet."
                  : "Try adjusting your search terms to find users."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    // User Notes View
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      <Navbar name={name} handlesearch={handlesearch} />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <button
              onClick={() => navigate("/explore")}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors duration-200"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to People
            </button>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Notes by {selecteduser || "User"}
          </h1>
          <p className="text-gray-600 font-light text-lg">
            Explore public notes shared by this user
          </p>

          {/* Stats */}
          <div className="flex justify-center mt-6">
            <div className="bg-white rounded-lg shadow-md p-4 text-center min-w-[120px]">
              <p className="text-2xl font-bold text-green-600">{note.length}</p>
              <p className="text-sm text-gray-600">Public Notes</p>
            </div>
          </div>
        </div>

        {/* Loading State for Notes */}
        {notesLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading notes...</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-2xl mx-auto">
            {error}
            <button
              onClick={() => setError("")}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Notes Grid */}
        {!notesLoading && (
          <>
            {note.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
                {note.map((noteItem, index) => {
                  return (
                    <div
                      key={noteItem._id || index}
                      className="transform hover:scale-105 transition-transform duration-200"
                    >
                      <ViewNotesCard
                        title={noteItem.title}
                        date={moment(noteItem.date).format("DD/MM/YYYY")}
                        content={noteItem.content}
                        tags={noteItem.tags}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center max-w-md">
                  <div className="mb-6">
                    <svg
                      className="w-24 h-24 text-gray-300 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">
                    No Public Notes
                  </h3>
                  <p className="text-gray-500 mb-6">
                    This user hasn't shared any public notes yet.
                  </p>
                  <button
                    onClick={() => navigate("/explore")}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
                  >
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Explore Other Users
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
