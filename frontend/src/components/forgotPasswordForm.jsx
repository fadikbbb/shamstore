import { useState } from "react";
import axios from "axios";

function ForgotPasswordForm({ closeForm }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const URL = process.env.REACT_APP_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!email) {
      setLoading(false);
      setError("Please enter your email.");
      return;
    }

    try {
      await axios.post(`${URL}auth/forgot-password/request`, {
        email,
      });
      setLoading(false);
      setSuccess("Password reset link has been sent to your email.");
      setTimeout(() => closeForm(false), 5000); // Close the form after a short delay
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Show specific error from server
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="absolute h-screen w-screen bg-[rgba(0,0,0,0.5)] flex flex-col justify-center items-center -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col justify-evenly p-4 rounded-md text-center h-[50%] w-[50%] bg-white"
      >
        <h1 className="text-3xl font-bold text-cyan-500">Forgot Password</h1>

        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}

        <div className="relative md:me-2 my-4 w-full">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="input-des"
            name="email"
            placeholder="Enter email"
            required
            disabled={loading}
          />
          <label htmlFor="email" className="label-des">
            Email address
          </label>
        </div>

        <small className="text-gray-400">
          We'll never share your email with anyone else.
        </small>

        <input
          type="submit"
          className="btn-lightgreen"
          disabled={loading}
          value={loading ? "Sending..." : "Submit"}
        />

        <input
          type="button"
          className="btn-lightgreen"
          onClick={() => closeForm(false)}
          value="Cancel"
        />
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
