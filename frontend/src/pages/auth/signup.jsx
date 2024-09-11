import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [checkBox, setCheckBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let role = checkBox
      ? event.target.code.value === "1234"
        ? "admin"
        : "user"
      : "user";
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    setUser({ name, email, password, role });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:4000/api/v1/users");
      } catch (error) {
        console.error("Error registering user:", error);
        setErrorMessage("Error registering user. Please try again later.");
      }
    };

    fetchData();
  }, [user, navigate]);

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
            name="name"
            id="exampleInputName"
            aria-describedby="emailHelp"
            placeholder="Enter name"
          />
          <label htmlFor="exampleInputName" className="label-des">
            Name
          </label>
        </div>
        <div className="relative md:me-2 my-4  w-full">
          <input
            type="email"
            className="input-des"
            name="email"
            id="exampleInputEmail"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <label htmlFor="exampleInputEmail" className="label-des">
            Email
          </label>
          <small id="nameHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="relative md:me-2 my-4  w-full">
          <input
            type="password"
            className="input-des"
            name="password"
            id="exampleInputPassword"
            placeholder="Password"
          />
          <label htmlFor="exampleInputPassword" className="label-des">
            Password
          </label>
          <small id="nameHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-check my-3">
          <input
            type="checkbox"
            onClick={() => setCheckBox(!checkBox)}
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Are you admin?
          </label>
          {checkBox && (
            <input
              type="number"
              name="code"
              style={{ marginLeft: "10px", width: "20%" }}
              placeholder="Code"
            />
          )}
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
