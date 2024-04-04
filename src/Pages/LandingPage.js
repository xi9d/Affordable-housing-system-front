import React, {useEffect, useState} from "react";
import SingleRoom from '../Images/singlerooms.jpg';
import BedSitter from '../Images/bedsitter.jpg';
import DoubleRoom from '../Images/double room.jpg'
import OneBedRoom from '../Images/one bed room.jpg'
import TwoBedRoom from '../Images/two bed room.jpg'
import { useNavigate } from 'react-router-dom';
import PlotService from "../Service/PlotService";
import Logo from "../Images/Logo2.png";
import ViewPlotCarousel from "../Component/ViewPlotCarousel";
import LandingPageBanner from "../Component/LandingPageBanner";




const LandingPage = () => {
    const navigate = useNavigate();
    const [plots, setPlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recentPlot, setRecentPlot] = useState([]);
    const [newId] = useState("")
    const handleAvailablePlots = () => {
        navigate('/main');
    }
    useEffect(() =>{
        const fetchRecentHouse = async ()=>{
            try {
                const response = await PlotService.getRecentlyAddedPlot();
                setLoading(false);
                setRecentPlot(response.data);
            }catch (err){
                console.log("Error fetching recent plots", err)
            }
        }
        fetchRecentHouse();
    },[]);

    const handleViewPlots = async (room) => {
        try {
            const response = await PlotService.getAllPlotsByRoomType(room);
            console.log(response.data)
            setPlots(response.data);
            navigate(`/main?type=${room}`, { state: { tPlots: response.data} });
        } catch (error) {
            console.error('Error fetching plots:', error);
        }
    };
    const handleViewPlot = (newId) => {
        const selectedPlot = recentPlot.find((item) => item.id === newId);
        if (selectedPlot) {
            navigate(`/view-plot?id=${newId}`, { state: { viewPlot: selectedPlot } });
        } else {
            console.error("Selected plot not found.");
        }
    };
    const handleSearchSubmit = async (searchTerm) => {
        try {
            const response = await PlotService.searchPlots(searchTerm);
            navigate(`/main?query=${searchTerm}`, { state: { tPlots: response.data } });
        } catch (error) {
            console.error("Error search submission", error);
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
        <div className="bg-gray-100 min-h-screen">
            { sessionStorage.getItem("model")=== null ? <LandingPageBanner />:
           <main className="container mx-auto px-4 py-8">
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-slate-800 mb-6">
                        Recently Added Plots
                    </h2>
                    <hr/>
                    <ViewPlotCarousel recentPlot={recentPlot} handleViewPlot={handleViewPlot} id={newId}/>
                </section>
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-slate-800 mb-6">
                        Explore Available Rentals
                    </h2>
                    <hr/>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105" onClick={() => handleViewPlots("single room")}>

                            <img src={SingleRoom} alt="Single Room" className="w-full h-48 object-cover" />

                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Single Room</h3>
                                <p className="text-gray-600">Find affordable single room accommodations.</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105" onClick={() => handleViewPlots("bedsitter")}>
                            <img src={BedSitter} alt="Bed Sitter" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Bed Sitter</h3>
                                <p className="text-gray-600">Discover cozy bed sitter options for your convenience.</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105" onClick={() => handleViewPlots("double room")}>
                            <img src={DoubleRoom} alt="Double Room" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-base font-semibold text-gray-800 mb-2">Double Room</h3>
                                <p className="text-gray-600">Discover Double rooms options for your convenience.</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105" onClick={() => handleViewPlots("one bedroom")}>
                            <img src={OneBedRoom} alt="One Bedroom" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-base font-semibold text-gray-800 mb-2">One Bedroom</h3>
                                <p className="text-gray-600">Find spacious one-bedroom apartments within your budget.</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105" onClick={() => handleViewPlots("two bedroom")}>
                            <img src={TwoBedRoom} alt="two bedroom" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-base font-semibold text-gray-800 mb-2">Two Bedroom</h3>
                                <p className="text-gray-600">Browse comfortable two-bedroom homes for your family.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-slate-800 mb-6">
                        How It Works
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Our system makes house hunting simple:
                    </p>
                    <ol className="list-decimal list-inside mt-4 text-slate-800 text-lg">
                        <li>Browse available properties.</li>
                        <li>Filter by type, location, and price.</li>
                        <li>Contact the landlord directly.</li>
                    </ol>
                </section>
                <section>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                        Get Started Today
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Start your journey to finding the perfect home now. We provide you with a wide range of houses spread across the country.
                    </p>
                    <button className="bg-slate-800 text-white px-4 py-4 mt-6 rounded-sm shadow-md hover:bg-slate-600 transition duration-300" onClick={() => handleAvailablePlots()}>
                        Browse Available Rentals
                    </button>
                </section>
            </main>}

        </div>



    );
};

export default LandingPage;
