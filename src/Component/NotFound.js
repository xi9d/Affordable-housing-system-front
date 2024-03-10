import React from "react";
import Not_Found from "../Images/not found.png";

function NotFound() {
    return(
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-200 text-gray-500">
            <img
                src={Not_Found}
                alt="Not Found"
                className="w-24 h-24"
            />
            <h1 className="text-4xl font-bold mb-4 ">404 - Not Found</h1>
            <p className="text-lg">Oops! The page you're looking for could not be found.</p>
        </div>
    )
}
export default NotFound;