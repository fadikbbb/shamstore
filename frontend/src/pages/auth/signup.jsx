import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const URL = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
    };
    if (
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.email ||
      !newUser.password ||
      !newUser.confirmPassword
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (newUser.password !== newUser.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${URL}auth/register`, newUser);
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      // Extracting a user-friendly error message
      const message =
        error.response?.data?.message || "An error occurred. Please try again.";
      setErrorMessage(message);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Signup</h1>
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-4 rounded relative">
          {errorMessage}
        </div>
      )}
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="relative md:me-2 my-4  w-full">
          <input
            type="text"
            className="input-des"
            name="firstName"
            id="firstName"
            placeholder="Enter firstName"
          />
          <label htmlFor="firstName" className="label-des">
            first Name
          </label>
        </div>
        <div className="relative md:me-2 my-4  w-full">
          <input
            type="text"
            className="input-des"
            name="lastName"
            id="lastName"
            placeholder="Enter lastName"
          />
          <label htmlFor="lastName" className="label-des">
            last Name
          </label>
        </div>
        <div className="relative md:me-2 my-4  w-full">
          <input
            type="email"
            className="input-des"
            name="email"
            id="Email"
            placeholder="Enter email"
          />
          <label htmlFor="Email" className="label-des">
            Email
          </label>
        </div>
        <div className="relative md:me-2 my-4  w-full">
          <input
            type="password"
            className="input-des"
            name="password"
            id="Password"
            placeholder="Password"
          />
          <label htmlFor="Password" className="label-des">
            Password
          </label>
          <small id="nameHelp" className="form-text text-muted">
            We'll never share your password with anyone else.
          </small>
        </div>
        <div className="relative md:me-2 my-4  w-full">
          <input
            type="password"
            className="input-des"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="confirmPassword"
          />
          <label htmlFor="confirmPassword" className="label-des">
            confirmPassword"
          </label>
        </div>

        <div className="relative md:me-2 my-4  w-full">
          <button type="submit" className="btn-lightgreen">
            Submit
          </button>
          <Link to={"/login"} className="m-3 text-blue-500 hover:text-blue-800">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
