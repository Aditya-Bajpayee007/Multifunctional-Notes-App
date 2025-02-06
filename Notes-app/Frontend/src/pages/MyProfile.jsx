import React, { useEffect, useState } from "react";
import axiosInstance from "../help/axiosInstance";

export const MyProfile = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await axiosInstance.get("/user");
        setData(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchuser();
  }, []);

  return (
    <div className="">
      <h2 className="text-center pt-10 text-4xl font-bold">My Profile</h2>
      <div className="flex justify-between items-center">
        <div>
          <img
            className="h-2/3 w-2/3 ml-auto my-5 rounded-full "
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt=""
          />
        </div>
        <div className="text-left w-1/3 my-auto">
          <p className="text-3xl flex mb-10">
            Username:<p className="font-bold mx-auto">{data.username}</p>
          </p>
          <p className="text-3xl flex">
            Email:<p className="font-bold mx-auto">{data.email}</p>
          </p>
        </div>
      </div>
    </div>
  );
};
