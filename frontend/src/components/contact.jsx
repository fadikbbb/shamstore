import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [message, setMessage] = useState(null); // State to hold success or error message
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // Check if user is logged in and set formData accordingly
        if (window.localStorage.getItem("login") === "true") {
            const user = JSON.parse(window.localStorage.getItem("user"));
            setFormData({
                name: user.name,
                email: user.email,
                message: formData.message // Preserve message if already typed
            });
        }
    }, []); // Run only once on component mount

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await axios.post('http://localhost:4000/api/v1/users/message');
            setMessage('Message sent successfully!');
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } catch (error) {
            console.error('Error sending form data:', error);
            setMessage('Error sending message. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div id='contact' className="w-full p-4">
            <h1 className='title'>Contact Us</h1>
            <p className="text-center text-gray-400 text-sm mb-6">Connect effortlessly and receive quick responses. Contact us now for fast and efficient communication</p>
            <form id='contact' onSubmit={handleSubmit} className=" w-full space-6">
                {!window.localStorage.getItem("login") || window.localStorage.getItem("login") !== "true" ? (
                    <div className=' w-full flex md:flex-row flex-col justify-between  items-center'>
                        <div className="relative md:me-2 my-4 md:w-1/2 w-full">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="input-des"
                                id="nameInput"
                                placeholder="Name" />
                            <label htmlFor="nameInput" className="label-des">Name</label>
                        </div>
                        <div className="relative md:mb-0 mb-4 md:w-1/2 w-full">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input-des"
                                id="emailInput"
                                placeholder="name@example.com" />
                            <label htmlFor="emailInput" className="label-des">Email address</label>
                        </div>
                    </div>
                ) : null}

                <div className="relative">
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="input-des"
                        placeholder="Leave a message here"
                        id="messageInput"
                        style={{ height: "100px" }}></textarea>
                    <label htmlFor="messageInput" className="label-des">Message</label>
                </div>
                {message && <div className={`p-4 rounded-lg ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`} role="alert">
                    {message}
                </div>}
                <button type="submit" className="block mx-auto my-3 py-2 px-4 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-green-500" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
