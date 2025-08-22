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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-1/2 max-w-2xl max-h-[90vh] overflow-y-auto">
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
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {notedata && notedata.note && notedata.note._id
                ? "Edit Note"
                : "Add New Note"}
            </h2>
            <div className="flex items-center">
              <span className="mr-3 font-medium text-gray-600">
                {formData.hide ? "Private" : "Public"}
              </span>
              <button
                className={`${
                  !formData.hide
                    ? "bg-green-500 justify-start"
                    : "bg-red-400 justify-end"
                } relative rounded-full h-6 w-12 transition-all duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500`}
                onClick={hideToggle}
                type="button"
              >
                <div className="bg-white h-5 w-5 rounded-full shadow-md transform transition-transform duration-200"></div>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter note title..."
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="6"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Write your note content..."
              required
            ></textarea>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter tags separated by commas..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {notedata && notedata.note && notedata.note._id
                ? "Update Note"
                : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
