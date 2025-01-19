import React, { useEffect, useState } from "react";
import axiosInstance from "../help/axiosInstance";
import { Userscard } from "../components/Userscard";
import { Navbar } from "../components/Navbar";
import { useParams } from "react-router-dom";
import { ViewNotesCard } from "../components/ViewNotesCard";
import moment from "moment";

export const Explore = () => {
  const [users, Setusers] = useState([]);
  const [name, setName] = useState("");
  const [alluser, Setallusers] = useState([]);
  const [selecteduser, Setselecteduser] = useState();
  const [note, setNote] = useState([]);
  console.log("motes ", note);

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
    }
  };

  const getallUsers = async () => {
    try {
      const response = await axiosInstance.get("/get-all-users");
      if (response.data) {
        console.log(response.data);
        Setusers(response.data.users);
        Setallusers(response.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selecteduserinfo = async () => {
    try {
      const response = await axiosInstance.get(`/user/${userID}`);
      if (response.data && response.data.user) {
        console.log(response.data);
        Setselecteduser(response.data.user);
        console.log(selecteduser);
      }
    } catch (error) {
      console.log("Error occ", error);
    }
  };

  const handlesearch = (text) => {
    const filteredUsers = alluser.filter((user) => {
      return user.username.toLowerCase().includes(text.toLowerCase());
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

  // useEffect(() => {
  //   selecteduserinfo();
  //   userID;
  // }, userID);

  return Object.keys(userID).length === 0 ? (
    <div>
      <Navbar name={name} handlesearch={handlesearch} />
      <hr />
      <h1 className="text-3xl font-bold tracking-wide text-center my-5 font-serif">
        Peoples
      </h1>
      <div className="flex flex-wrap justify-center ">
        {users.map((user, index) => {
          return (
            <Userscard
              user={user}
              key={index}
              handleUserNotes={handleUserNotes}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <div>
      <Navbar name={name} handlesearch={handlesearch} />
      <hr />
      <h1 className="text-3xl font-bold tracking-wide text-center my-5 font-serif">
        Notes for {selecteduser} :
      </h1>
      <div className="grid grid-cols-3 gap-8 w-full mt-10 mb-20">
        {note.length > 0 ? (
          note.map((note, index) => {
            return (
              <ViewNotesCard
                key={index}
                title={note.title}
                date={moment(note.date).format("DD/MM/YYYY")}
                content={note.content}
                tags={note.tags}
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
    </div>
  );
};
