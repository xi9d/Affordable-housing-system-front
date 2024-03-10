import React, { useState } from 'react';
import Logo from "../Images/Logo2.png";
import { useNavigate } from 'react-router-dom';

function Plots({ plots, loading }) {
    const navigate = useNavigate();
    const [priceRangeValue, setPriceRangeValue] = useState(500);

    const handleViewPlot = (plotId) => {
        const selectedPlot = plots.find((item) => item.id === plotId);
        navigate('/viewplot/'+plotId, { state: { plot: selectedPlot } });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-200 text-white hover:cursor-progress">
                <div className="flex space-x-4 animate-pulse">
                    <img src={Logo} alt="Jawabu rentals" className="w-full h-64"/>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <aside className="col-span-3 md:col-span-1">
                <div className="bg-gray-100 rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
                    <div className="mb-4">
                        <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                        <select id="roomType" className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50">
                            <option value="">Select Room Type</option>
                            <option value="single room">Single Room</option>
                            <option value="bedsitter">BedSitter</option>
                            <option value="double room">Double room</option>
                            <option value="double room">One Bedroom</option>
                            <option value="double room">Two Bedroom</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <select id="location" className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50">
                            <option value="">Select Location</option>
                            <option value="Nairobi">Nairobi</option>
                            <option value="Mombasa">Mombasa</option>
                            <option value="Kisumu">Kisumu</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">Price Range: Ksh{priceRangeValue}</label>
                        <input type="range" id="priceRange" min="500" max="100000" step="1000" value={priceRangeValue} onChange={(e) => setPriceRangeValue(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"/>
                    </div>
                </div>
            </aside>
            <div className="col-span-3 md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plots.map((plot) => (
                        <div key={plot.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <img
                                    src={`data:image/png;base64,${plot.image}`}
                                    alt="Product"
                                    className="w-full h-64 object-cover rounded-md hover:scale-125 hover:transition duration-500 ease-in-out cursor-pointer"
                                    onClick={() => handleViewPlot(plot.id)}
                                />
                                <h3 className="text-xl font-semibold cursor-pointer text-gray-800 mb-2" onClick={() => handleViewPlot(plot.id)}>{plot.name}</h3>
                                <p className="mt-2 text-gray-800">Location: {plot.location}</p>
                                <p className="text-gray-800">Price: {plot.price}</p>
                                <p className="text-gray-800">Room Type: {plot.roomType}</p>
                                <p className="text-gray-800">Availability: {plot.availability}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Plots;
