import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import PlotService from "../Service/PlotService";
import { mailto } from 'react-mailto-link';
import Logo from '../Images/Logo2.png'
function ViewPlotOwner() {
    const location = useLocation();
    const plotOwner = location.state && location.state.plotOwner;
    const [plots, setPlots] = useState([]);

    useEffect(() => {
        const fetchPlots = async () => {
            try {
                const response = await PlotService.getPlotByPlotOwnerId(plotOwner.id);
                setPlots(response.data);
            } catch (err) {
                console.log("Error fetching plots");
            }
        }
        fetchPlots();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Plot Owner Information</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Plot Owner Picture */}
                    <div className="bg-white shadow-md rounded-md p-6 mb-8">
                        <img src={Logo} alt="Plot Owner" className="w-full h-auto object-cover rounded-md" />
                    </div>
                    {/* Plot Owner Information */}
                    <div className="bg-white shadow-md rounded-md p-6 mb-8">
                        <div className="">
                            <div>
                                <p className="text-gray-600"><span className="font-semibold">Name:</span> {plotOwner.name}</p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Email: </span>
                                    <a href={`mailto:${plotOwner.email}`}>{plotOwner.email}</a>
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Telephone: </span>
                                    <a href={`tel:${plotOwner.telephone}`}>{plotOwner.telephone}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {plots.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {plots.map((plot, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105">
                                <img src={plot.image ? `data:image/png;base64,${plot.image}` : Logo} alt={plot.name} className="w-full h-48 object-cover rounded-t-md" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{plot.name}</h3>
                                    <ul className="text-gray-600">
                                        <li><span className="font-semibold">Location:</span> {plot.location}</li>
                                        <li><span className="font-semibold">Price:</span> {plot.price}</li>
                                        <li><span className="font-semibold">Type:</span> {plot.type}</li>
                                        <li><span className="font-semibold">Availability:</span> {plot.availability}</li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white shadow-md rounded-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommendations</h2>
                        <p className="text-gray-600">No other plots found. Here are some recommendations:</p>
                    </div>
                )}
            </div>
        </div>

    );
}

export default ViewPlotOwner;
