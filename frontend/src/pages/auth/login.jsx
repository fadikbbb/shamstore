import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Login() {
  const navigator = useNavigate();
  const [users, setUsers] = useState([]); // Initialize as array to store user data
  const [error, setError] = useState(null); // State to hold error message

  useEffect(() => {
    fetch(`https://666da7c37a3738f7caccf44a.mockapi.io/shamstore/user`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data); // Set user data array
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again later.");
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Check if the credentials match any user
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      // Set login state and store user in local storage
      window.localStorage.setItem("login", "true");
      window.localStorage.setItem("user", JSON.stringify(foundUser));
      navigator("/"); // Navigate to home or desired page
    } else {
      // Invalid login

      setError("Invalid email or password. Please try again.");
    }
  }

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
