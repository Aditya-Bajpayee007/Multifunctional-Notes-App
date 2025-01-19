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
    }
  };

  const getnotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data) {
        setNotes(response.data.notes);
        setAllNotes(response.data.notes); // Set original notes to allNotes
      }
    } catch (error) {
      console.log(error);
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
    const filteredNotes = allNotes.filter((note) =>
      note.title.toLowerCase().includes(text.toLowerCase())
    );
    setNotes(filteredNotes);
  };

  return (
    <div>
      <Navbar name={name} handlesearch={handleSearch} />
      <hr />
      <div className="grid grid-cols-3 gap-8 w-full mt-10 mb-20">
        {notes.length > 0 ? (
          notes.map((note, index) => {
            return (
              <Notescard
                key={index}
                title={note.title}
                date={moment(note.date).format("DD/MM/YYYY")}
                content={note.content}
                tags={note.tags}
                onDelete={() => {
                  onDelete(note._id);
                }}
                onEdit={() => {
                  getsinglenote(note._id);
                  handleModal();
                }}
              />
            );
          })
        ) : (
          <div className="col-span-full pt-20">
            <h1 className="text-3xl text-center duration-100 animate-bounce">
              No notes found
            </h1>
          </div>
        )}
      </div>
      <div className="relative">
        <Button
          text={<GoPlus />}
          className={
            "hover:bg-blue-700 hover:scale-110 border text-4xl flex justify-center items-center h-12 w-12 font-bold bg-blue-500 text-white rounded-xl absolute bottom-0 right-10"
          }
          onClick={handleModal}
        />
        {showModal && (
          <Modal
            notedata={notedata}
            closeModal={handleModal}
            getnotes={getnotes}
          />
        )}
      </div>
    </div>
  );
};
