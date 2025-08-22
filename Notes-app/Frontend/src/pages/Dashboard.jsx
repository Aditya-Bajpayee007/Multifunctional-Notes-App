import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Notescard } from "../components/Notescard";
import { Button } from "../input/Button";
import { GoPlus } from "react-icons/go";
import Modal from "../components/Modal";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../help/axiosInstance";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]); // To keep a copy of all notes
  const [notedata, setnotedata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    }
  };

  const getsinglenote = async (data) => {
    const noteId = data;
    try {
      const response = await axiosInstance.get("/single-note/" + noteId);
      if (response.data) {
        setnotedata(response.data);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load note details");
    }
  };

  const getnotes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data) {
        setNotes(response.data.notes);
        setAllNotes(response.data.notes); // Set original notes to allNotes
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (data) => {
    const noteId = data;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data) {
        getnotes();
      }
    } catch (error) {
      console.log(error);
      setError("Failed to delete note");
    }
  };

  useEffect(() => {
    getuserinfo();
    getnotes();
  }, []);

  const handleModal = () => {
    setnotedata(null);
    setShowModal(!showModal);
  };

  const handleSearch = (text) => {
    if (!text.trim()) {
      setNotes(allNotes);
      return;
    }
    const filteredNotes = allNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(text.toLowerCase()) ||
        note.content.toLowerCase().includes(text.toLowerCase())
    );
    setNotes(filteredNotes);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar name={name} handlesearch={handleSearch} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading your notes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      <Navbar name={name} handlesearch={handleSearch} />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome back, {name.username}!
              </h1>
              <p className="text-gray-600 font-light">
                {notes.length > 0
                  ? `You have ${notes.length} ${
                      notes.length === 1 ? "note" : "notes"
                    }`
                  : "Start creating your first note"}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="hidden md:flex space-x-4">
              <div className="bg-white rounded-lg shadow-md p-4 text-center min-w-[100px]">
                <p className="text-2xl font-bold text-blue-600">
                  {allNotes.length}
                </p>
                <p className="text-sm text-gray-600">Total Notes</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 text-center min-w-[100px]">
                <p className="text-2xl font-bold text-green-600">
                  {allNotes.filter((note) => !note.hidden).length}
                </p>
                <p className="text-sm text-gray-600">Public</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
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
        {notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
            {notes.map((note, index) => {
              return (
                <div
                  key={note._id || index}
                  className="transform hover:scale-105 transition-transform duration-200"
                >
                  <Notescard
                    title={note.title}
                    date={moment(note.date).format("DD/MM/YYYY")}
                    content={note.content}
                    tags={note.tags}
                    hidden={note.hidden}
                    onDelete={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this note?"
                        )
                      ) {
                        onDelete(note._id);
                      }
                    }}
                    onEdit={() => {
                      getsinglenote(note._id);
                      handleModal();
                    }}
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
                {allNotes.length === 0 ? "No notes yet" : "No notes found"}
              </h3>
              <p className="text-gray-500 mb-6">
                {allNotes.length === 0
                  ? "Start your journey by creating your first note. Click the + button to get started!"
                  : "Try adjusting your search terms or create a new note."}
              </p>
              <button
                onClick={handleModal}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
              >
                <GoPlus className="mr-2" />
                Create Your First Note
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <Button
          text={<GoPlus />}
          className="h-14 w-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center text-2xl border-none"
          onClick={handleModal}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50">
          <Modal
            notedata={notedata}
            closeModal={handleModal}
            getnotes={getnotes}
          />
        </div>
      )}
    </div>
  );
};
