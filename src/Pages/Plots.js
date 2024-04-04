import React, { useState } from 'react';
import Logo from "../Images/Logo2.png";
import { useNavigate } from 'react-router-dom';

function Plots({ plots, loading }) {
    const navigate = useNavigate();
    const [priceRangeValue, setPriceRangeValue] = useState(500);

    const handleViewPlot = (plotId) => {
        const selectedPlot = plots.find((item) => item.id === plotId);
        if (selectedPlot) {
            navigate(`/view-plot?id=${plotId}`, { state: { viewPlot: selectedPlot } });
        } else {
            console.error("Selected plot not found.");
        }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {plots.map((plot) => (
                <div key={plot.id} className="border-2 rounded-sm shadow-sm bg-white hover:shadow-lg overflow-hidden">
                    <div className="relative">
                        <div
                            className={`absolute top-0 right-0 ${
                                plot.availability === "VACANCY_UNAVAILABLE" ? "bg-red-400" : "bg-green-400"
                            } text-white text-center py-1 px-2 font-semibold transform z-10`}
                            style={{ transformOrigin: "top right" }}
                        >
                            {plot.availability === "VACANCY_UNAVAILABLE" ? "Unavailable" : "Available"}
                        </div>
                        <img
                            src={plot.image ? `data:image/png;base64,${plot.image}` : Logo}
                            alt={plot.name}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold mb-2 text-slate-700 text-2xl">{plot.name}</h3>
                        <p className="text-slate-700 mb-2">{plot.location}</p>
                        <div className="flex items-center mb-2">
                            <p className="font-bold">{plot.roomType}</p>
                        </div>
                        <p className="text-slate-700 mb-2">
                            {plot.description.length > 100 ? `${plot.description.slice(0, 100)}...` : plot.description}
                        </p>
                    </div>
                    <div className="p-4">
                        <p className="font-semibold text-slate-800 text-center capitalize">Ksh {parseInt(plot.price, 10).toLocaleString("en-US")}</p>
                        <button
                            type="button"
                            className="px-2 py-1 rounded-sm bg-slate-700 hover:bg-slate-800 text-white font-bold mt-2 w-full"
                            onClick={() => handleViewPlot(plot.id)}
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            ))}
        </div>

    );
}

export default Plots;
