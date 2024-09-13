import axios from "axios";
import React, { useState, useEffect } from "react";
import Comment from "./comment";
const ContactForm = ({ left, right }) => {
  const URL = process.env.REACT_APP_URL;

  // Initialize form data
  const [formData, setFormData] = useState({
    content: "",
  });

  // Initialize token from localStorage only once during first render
  const [token, setToken] = useState(null);
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, [token]);

  // For success or error message
  const [message, setMessage] = useState(null);

  // For loading state
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ content: e.target.content.value });
    try {
      // Make a POST request to send form data
      await axios.post(`${URL}users/comments`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubmitting(true);
      setMessage("Message sent successfully!");
    
    } catch (error) {
      console.error("Error sending form data:", error);
      console.error("Error sending form data:", error);
      setMessage("Error sending message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="contact" className="w-full p-4">
      <h1 className="title">Comment</h1>
      <p className="text-center text-gray-400 text-sm mb-6">
        Connect effortlessly and receive quick responses. Contact us now for
        fast and efficient communication
      </p>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="relative">
          <textarea
            name="content"
            required
            className="input-des"
            placeholder="Leave a comment here"
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            id="contentInput"
            style={{ height: "100px" }}
          ></textarea>
          <label htmlFor="contentInput" className="label-des">
            Comment
          </label>
        </div>
        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.includes("successfully")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
        <button
          type="submit"
          className="block mx-auto my-3 py-2 px-4 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      <Comment added={formData} right={right} left={left} />
    </div>
  );
};

export default ContactForm;
