import React, { useState } from "react";
import { Inpu } from "../input/Inpu";
import { Button } from "../input/Button";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../help/axiosInstance";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter email");
      return;
    }

    if (!password) {
      setError("Please enter password");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accesstoken) {
        localStorage.setItem("token", response.data.accesstoken);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center bg-gradient-to-br from-blue-50 to-indigo-100 font-sans p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 backdrop-blur-sm border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 font-light">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-m font-medium text-gray-700 mb-2">
                Email
              </label>
              <Inpu
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-m font-medium text-gray-700 mb-2">
                Password
              </label>
              <Inpu
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="pt-2">
            <Button
              text="Sign In"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
            />
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors duration-200"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
