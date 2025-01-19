import React from "react";

export const ViewNotesCard = ({ title, date, tags, content }) => {
  return (
    <div className="flex justify-center px-20">
      <div className="flex border rounded-lg items-center">
        <div className="h-48 w-[22rem] p-4 overflow-auto px-5">
          <h2 className="text-2xl font-medium">{title}</h2>
          <p className="text-gray-500 mb-4">{date}</p>
          <p className="font-medium w-full break-words">{content}</p>
          <p className="font-normal text-sm text-gray-600">{tags + ""}</p>
        </div>
      </div>
    </div>
  );
};
