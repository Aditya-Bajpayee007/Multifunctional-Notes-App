import React from "react";
import { Button } from "../input/Button";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

export const Notescard = ({
  title,
  date,
  onDelete,
  tags,
  onEdit,
  content,
  onClick,
}) => {
  return (
    <div className="flex justify-center px-20">
      <div className="flex border rounded-lg items-center">
        <div className="h-48 w-[22rem] p-4 overflow-auto px-5">
          <h2 className="text-2xl font-medium">{title}</h2>
          <p className="text-gray-500 mb-4">{date}</p>
          <p className="font-medium w-full break-words">{content}</p>
          <p className="font-normal text-sm text-gray-600">{tags + ""}</p>
        </div>
        <div className="flex flex-col justify-center items-center m-5">
          <Button
            className={
              "text-gray-500 hover:text-red-500 hover:scale-125 text-2xl mb-4"
            }
            text={<MdDelete />}
            onClick={onDelete}
          />
          <Button
            className={
              "text-2xl text-gray-500 hover:text-blue-600 hover:scale-125"
            }
            text={<MdEdit />}
            onClick={onEdit}
          />
        </div>
      </div>
    </div>
  );
};
