import { useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const URL = process.env.REACT_APP_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setLoading(false);
      setError("Passwords do not match.");
      return;
    }
console.log(token)
try {
    await axios.post(`${URL}auth/forgot-password/${token}`, {
        newPassword,
        confirmPassword,
    });
    console.log(token)
      setLoading(false);
      setSuccess("password changed successfully");
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Show specific error from server
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-evenly p-4 rounded-md text-center bg-white shadow-md w-full max-w-2xl" // Increased width
      >
        <h1 className="text-3xl font-bold text-cyan-500 mb-4">
          Forgot Password
        </h1>

        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-500 mb-2">{success}</div>}

        <div className="relative my-4 w-full">
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            className="input-des"
            name="password"
            placeholder="Enter password"
            required
            disabled={loading}
          />
          <label htmlFor="password" className="label-des">
            Password
          </label>
        </div>

        <div className="relative my-4 w-full">
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            className="input-des"
            name="confirmPassword"
            placeholder="Confirm password"
            required
            disabled={loading}
          />
          <label htmlFor="confirmPassword" className="label-des">
            Confirm Password
          </label>
        </div>

        <input
          type="submit"
          className="btn-lightgreen"
          disabled={loading}
          value={loading ? "Sending..." : "Submit"}
        />
      </form>
    </div>
  );
}

export default ResetPassword;
