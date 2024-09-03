// Import React and Tailwind CSS styles
import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => {
    return (
        <div className="flex md:flex-no-wrap flex-wrap flex-row-reverse items-center justify-center h-screen">
            <div className='md:w-1/2 w-full'>
                <img src="../../404-page-not-found-illustration-2048x998-yjzeuy4v.png" alt="" />
            </div>
            <div className="text-center md:w-1/2 w-full">
                <h1 className="title">404 - Not Found</h1>
                <p className="text-md text-gray-400 my-6">The page you are looking for does not exist.</p>
                <Link to="/" className="btn-lightgreen ">Go Back</Link>
            </div>
        </div>
    );
};

export default NotFound;
