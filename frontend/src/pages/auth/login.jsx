import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Login() {
  const URL = process.env.REACT_APP_URL;
  const navigator = useNavigate();
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
        email: email,
        password: password,
      });
      const token = response.data.data;
      window.localStorage.setItem("token", token);

      navigator("/"); // Navigate to home or desired page
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
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
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="relative md:me-2 my-4  w-full">
          <input
            type="email"
            className="input-des"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <label htmlFor="exampleInputEmail" className="label-des">
            Email address
          </label>
          <small id="emailHelp" className="text-gray-400">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="relative md:me-2 my-4  w-full">
          <input
            type="password"
            className="input-des"
            name="password"
            id="exampleInputPassword1"
            placeholder="Password"
          />
          <label htmlFor="exampleInputPassword1" className="label-des">
            Password
          </label>
        </div>
        <br />
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
