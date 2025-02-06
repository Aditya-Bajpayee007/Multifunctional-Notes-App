import React, { useState, useEffect } from "react";
import axiosInstance from "../help/axiosInstance";

function Modal({ notedata, getnotes, closeModal }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    hide: false,
  });
  useEffect(() => {
    if (notedata?.note) {
      setFormData((prev) => ({
        ...prev,
        title: notedata.note.title || "",
        content: notedata.note.content || "",
        tags: notedata.note.tags || "",
        hide: notedata.note.hidden, // Ensure boolean
      }));
    }
  }, [notedata]); // Runs only when `notedata` changes

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/add-note", {
        title: formData.title,
        content: formData.content,
        tags: formData.tags,
        hidden: formData.hide,
      });
      console.log(response);

      if (response.data && response.data.note) {
        await getnotes();
        closeModal();
      }
    } catch (error) {
      console.log(error, "Error while adding note");
    }
  };

  const onEdit = async (id) => {
    try {
      const response = await axiosInstance.put(`/edit-note/${id}`, {
        title: formData.title,
        content: formData.content,
        tags: formData.tags,
        hidden: formData.hide,
      });
      console.log(response);

      if (response.data && response.data.note) {
        await getnotes();
        closeModal();
      }
    } catch (error) {
      console.log(error, "Error while editing note");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const hideToggle = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => {
      const newHideState = !prevFormData.hide;
      console.log("New hide state:", newHideState); // Correct log
      return { ...prevFormData, hide: newHideState };
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (notedata && notedata.note && notedata.note._id) {
              onEdit(notedata.note._id);
            } else {
              addNote(e);
            }
          }}
        >
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-1">Title</h2>
            <div className="flex w-full justify-end">
              <span className="mr-2 font-semibold pt-1">
                {formData.hide ? "unhide" : "hide"}
              </span>
              <button
                className={`${
                  !formData.hide
                    ? "justify-start bg-green-500"
                    : "justify-end bg-red-400"
                }  rounded-full h-8 w-[15%] mb-3 pb-2 flex items-center`}
                onClick={hideToggle}
                value={formData.hide}
                name="hidden"
              >
                <div className="bg-black h-full rounded-full w-5/12 mt-1.5 ml-1 mr-1"></div>
              </button>
            </div>
          </div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 text-lg mb-4 border rounded-md"
            placeholder="Title"
            required
          />
          <h4 className="text-lg font-normal mb-1">Description</h4>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded-md"
            placeholder="Content"
            required
          ></textarea>

          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded-md"
            placeholder="Tags"
          />

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded"
            >
              {notedata && notedata.note && notedata.note._id
                ? "Edit Note"
                : "Add Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
