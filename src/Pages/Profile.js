import React, { useState, useEffect } from 'react';
import AppService from "../Service/AppService";
import { toast, ToastContainer } from 'react-toastify';

function Profile() {
    const [plotOwner, setPlotOwner] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const id = sessionStorage.getItem("id");
    const fetchPlotOwnerDetails = async () => {
        try {
            const response = await AppService.getPlotOwnerDetails(id);
            setPlotOwner(response);
            const userAuthorities = sessionStorage.getItem("authorities");
            setIsAdmin(userAuthorities && userAuthorities.includes("ROLE_ADMIN"));
        } catch (error) {
            toast.error(error.message)
            console.error('Error fetching plot owner details:', error);
        }
    };
    useEffect(() => {
        fetchPlotOwnerDetails();
    }, []);

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
            <div className="px-6 py-8">
                <ToastContainer/>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome{plotOwner && `, ${plotOwner.name}`}!</h2>
                <div className="flex justify-center">
                    {isAdmin && (
                        <div className="bg-blue-500 text-white rounded-md px-4 py-2 mb-4">
                            You have administrative privileges.
                        </div>
                    )}
                    {plotOwner && (
                        <div>
                            <p className="text-gray-700"><strong>Email:</strong> {plotOwner.email}</p>
                            <p className="text-gray-700"><strong>Telephone:</strong> {plotOwner.telephone}</p>
                            {/* Add more profile information as needed */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
