import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";


function LandingPageBanner() {
    const [showModal, setShowModal] = useState(true);
    const navigate = useNavigate();
    const handleConfirm = (landlord) => {
        if (landlord){
            sessionStorage.setItem("model","landlord");
            navigate("/");

        }else {
            sessionStorage.setItem("model","user")
            navigate("/")
        }
        setShowModal(false);
    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${showModal ? '' : 'hidden'}`}>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Are you a landlord?</h2>
                <p className="text-gray-700 mb-4">Select your role to continue:</p>
                <div className="flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-4" onClick={() => handleConfirm(false)}>Nope, Just a Regular User</button>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md" onClick={() => handleConfirm(true)}>Yes i am, Landlord</button>
                </div>
            </div>
        </div>
    );
}

export default LandingPageBanner;
