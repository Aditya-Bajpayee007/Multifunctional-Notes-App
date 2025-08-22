import React from "react";
import { Button } from "../input/Button";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdLock } from "react-icons/md";
import { MdPublic } from "react-icons/md";

export const Notescard = ({
  title,
  date,
  onDelete,
  tags,
  onEdit,
  content,
  hidden,
  onClick,
}) => {
  // Function to truncate content for preview
  const truncateContent = (text, maxLength = 120) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Function to format tags
  const formatTags = (tagData) => {
    if (!tagData) return [];

    // If it's already an array, return it
    if (Array.isArray(tagData)) {
      return tagData
        .map((tag) => String(tag).trim())
        .filter((tag) => tag.length > 0);
    }

    // If it's a string, split it
    if (typeof tagData === "string") {
      return tagData
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    }

    // If it's something else, convert to string and split
    return String(tagData)
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  };

  const formattedTags = formatTags(tags);

  return (
    <div
      className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Privacy Indicator */}
      <div className="absolute top-3 right-3 z-10">
        {hidden ? (
          <div className="flex items-center bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
            <MdLock className="w-3 h-3 mr-1" />
            Private
          </div>
        ) : (
          <div className="flex items-center bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
            <MdPublic className="w-3 h-3 mr-1" />
            Public
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {title || "Untitled Note"}
          </h2>
          <p className="text-sm text-gray-500 font-medium">{date}</p>
        </div>

        {/* Content Preview */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {truncateContent(content)}
          </p>
        </div>

        {/* Tags */}
        {formattedTags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {formattedTags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
              {formattedTags.length > 3 && (
                <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                  +{formattedTags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
          <Button
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
            text={<MdDelete className="w-5 h-5" />}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="Delete note"
          />
          <Button
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
            text={<MdEdit className="w-5 h-5" />}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            title="Edit note"
          />
        </div>
      </div>

      {/* Hover Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
    </div>
  );
};
