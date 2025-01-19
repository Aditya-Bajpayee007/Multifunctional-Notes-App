import React, { useState } from "react";
import { Inpu } from "../input/Inpu";
import { Button } from "../input/Button";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../help/axiosInstance";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlesignup = async (e) => {
    e.preventDefault();
    //set username in the localstorage
    //localStorage.setItem("username", username);
    if (!username) {
      setError("Please enter username");
      return;
    }

    if (!email) {
      setError("please enter email");
      return;
    }

    if (!password) {
      setError("please enter password");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post("/signup", {
        username: username,
        email: email,
        password: password,
      });

      if (response.data && response.data.accesstoken) {
        localStorage.setItem("token", response.data.accesstoken);
        // localStorage.setItem("user._id", response.data.newUser._id);

        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-slate-400 font-serif">
      <div className="bg-white h-auto w-96 shadow-xl shadow-slate-900">
        <h1 className="m-4 text-left text-3xl font-semibold text-black font-serif">
          Signup
        </h1>
        <form onSubmit={handlesignup} className="mt-10 ml-8 mr-8">
          <label className="text-xl font-light">
            <Inpu
              type={"text"}
              placeholder={"Enter your Username"}
              value={"username"}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </label>
          <label className="text-xl font-light">
            <Inpu
              type={"email"}
              placeholder={"Enter your Email"}
              value={"email"}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label className="text-xl font-light">
            <Inpu
              type={"password"}
              placeholder={"Enter your Password"}
              value={"password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <p className="text-red-500 text-sm font-light">{error}</p>
          <div className="flex justify-center bg-blue-500 h-10 mt-3 text-white rounded-md">
            <Button text={"Signup"} className={"text-xl w-full"} />
          </div>
        </form>
        <p className="ml-8 mr-8 mt-3 text-center">
          Already have an Account ?{" "}
          <Link className="text-blue-600 underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
