import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId, setRole, setToken } from "../../store/userSlice";
import {jwtDecode} from "jwt-decode"; // Remove destructuring, use it as a function

function Login() {
  const dispatch = useDispatch();
  const URL = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const [error, setError] = useState(null); // State to hold error message

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email || !password) {
      setError("Invalid email or password. Please try again.");
      return;
    }
    try {
      const response = await axios.post(`${URL}auth/login`, {
        email,
        password,
      });
      const token = response.data.data;

      // Save token in local storage and Redux
      window.localStorage.setItem("token", token);
      dispatch(setToken(token));

      // Decode JWT token
      const decodedToken = jwtDecode(token);

      // Dispatch userId and role to Redux
      dispatch(setUserId(decodedToken.userId));
      dispatch(setRole(decodedToken.role));

      // Navigate to home page after successful login
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Login</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-4 rounded relative">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="relative md:me-2 my-4  w-full">
          <input
            type="email"
            className="input-des"
            name="email"
            placeholder="Enter email"
            required
          />
          <label htmlFor="email" className="label-des">
            Email address
          </label>
          <small className="text-gray-400">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="relative md:me-2 my-4  w-full">
          <input
            type="password"
            className="input-des"
            name="password"
            placeholder="Password"
            required
          />
          <label htmlFor="password" className="label-des">
            Password
          </label>
        </div>
        <div className="text-center">
          <button type="submit" className="btn-lightgreen">
            Submit
          </button>
          <Link to="/signup" className="m-3 text-blue-500 hover:text-blue-800">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
