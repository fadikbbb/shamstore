import { useEffect, useState } from "react";
import axios from "axios";
function Feedback({ left, right }) {
    const [formData, setFormData] = useState([]);
const URL=process.env.REACT_APP_URL
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${URL}users/message`);
                setFormData([...response.data.data]);
            } catch (error) {
                console.error('Error fetching feedback data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div id="feedback" className="py-10">
            <h1 className="title">Customer Feedback</h1>
            <div className="flex justify-between">

                <p className="text-gray-400">See what our customers have to say about us!</p>
                <div className="flex space-x-4"> 
                    <svg
                        onClick={() => left("customers")} // Scroll left
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ transform: "rotate(180deg)" }}
                        className="arrow"
                        width={40}

                        viewBox="0 0 25 25"
                    >
                        <path fill="currentColor" d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" />
                    </svg>
                    <svg
                        onClick={() => right("customers")} // Scroll right
                        xmlns="http://www.w3.org/2000/svg"
                        className="arrow "
                        width={40}

                        viewBox="0 0 25 25"
                    >
                        <path fill="currentColor" d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" />
                    </svg>
                </div>
            </div>
            <div className="customers space-x-6 flex w-full overflow-x-auto py-4 scrollbar-none">

                {formData.map((data) => (
                    <div key={data.id} className="bg-white shadow-lg rounded-lg p-6 min-w-[50%] ">
                        <div className="flex items-center mb-4 ">
                            <div className="bg-cyan-800 rounded-full p-2 w-fit">
                                <svg width="50px" height="50px" viewBox="0 0 48 48" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#55aae1" d="M24,28A12,12,0,1,1,36,16,12,12,0,0,1,24,28ZM24,6A10,10,0,1,0,34,16,10,10,0,0,0,24,6Z" />
                                    <path fill="#55aae1" d="M41,44H7.05a1,1,0,0,1-.73-.31,1,1,0,0,1-.27-.75,18,18,0,0,1,35.9,0,1,1,0,0,1-.27.75A1,1,0,0,1,41,44ZM8.15,42h31.7a16,16,0,0,0-31.7,0Z" />
                                    <g style={{ opacity: "0.35" }}>
                                        <path fill="#55aae1" d="M30.71,7.29A11,11,0,0,1,15.29,22.71,11,11,0,1,0,30.71,7.29Z" />
                                    </g>
                                    <g style={{ opacity: "0.35" }}>
                                        <path fill="#55aae1" d="M32,29a16.87,16.87,0,0,1,4.81,9.82,1,1,0,0,1-1,1.15H7.51a16.45,16.45,0,0,0-.46,3H41A17,17,0,0,0,32,29Z" />
                                    </g>
                                </svg>
                            </div>
                            <h2 className="ml-4 text-xl font-semibold">{data.name}</h2>
                        </div>
                        <p className="text-gray-700">{data.message}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Feedback;
