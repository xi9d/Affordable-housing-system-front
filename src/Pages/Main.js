import React, { useEffect, useState } from 'react';
import PlotService from '../Service/PlotService';
import Plots from './Plots';
import {useLocation, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Main() {
    const location = useLocation();
    const navigate = useNavigate();
    const fPlots = location.state && location.state.fPlots;
    const tPlots = location.state && location.state.tPlots;
    const [plots, setPlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 10;
    const [roomType, setRoomType] = useState('');
    const [location2, setLocation2] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        if (fPlots !== undefined && fPlots !== null) {
            setPlots(fPlots);
            setTotalPages(Math.ceil(fPlots.length / pageSize));
        } else if (tPlots !== undefined && tPlots !== null) {
            setPlots(tPlots);
            setTotalPages(Math.ceil(tPlots.length / pageSize));
        } else {
            fetchPlots(currentPage);
        }
    }, [currentPage, fPlots, tPlots]);


    const fetchPlots = async (page) => {
        setLoading(true);
        try {
            const response = await PlotService.getAllPlots(page, pageSize);
            setPlots(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error(error);
            toast.error("Could not fetch plots");
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleApplyFilter = async () => {
        try {
            if( roomType === '' && location2 === ''&& minPrice === ''&& maxPrice===''){
            navigate("/main");
            toast.error("There is nothing to filter!");
            }
            const filterPlots = await handleFilter(roomType, location2, minPrice, maxPrice);
            navigate(`/main?filter=room-type=${roomType}&location=${location2}&min-price${minPrice}&max-price=${maxPrice}`, { state: { fPlots: filterPlots } });

        } catch (error) {
            toast.error("Could not apply filter",error);
        }
    };

    const handleFilter = async (roomType, location2, minPrice, maxPrice) => {
        try {
            const res = await PlotService.getPlotByFilter(roomType, location2, minPrice, maxPrice)
            return res.data ;
        } catch (err) {
            console.error(err);
            throw new Error("Could not filter plots");
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-slate-200">
            <aside className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 md:px-0">
                <div className="bg-gray-100 rounded-sm shadow-md p-4">
                    <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
                    <ToastContainer/>
                    <div className="mb-4">
                        <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                        <select id="roomType" className="w-full h-12 border-slate-300 rounded-md shadow-sm focus:border-slate-500 focus:ring focus:ring-blue-400 focus:ring-opacity-50" onChange={(e) => setRoomType(e.target.value)}>
                            <option value="">Select Room Type</option>
                            <option value="single room">Single Room</option>
                            <option value="bedsitter">BedSitter</option>
                            <option value="double room">Double Room</option>
                            <option value="one bedroom">One Bedroom</option>
                            <option value="two bedroom">Two Bedroom</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <select id="location" className="w-full h-12 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50" onChange={(e) => setLocation2(e.target.value)}>
                            <option value="">Select Location</option>
                            <option value="Nairobi">Nairobi</option>
                            <option value="Mombasa">Mombasa</option>
                            <option value="Kisumu">Kisumu</option>
                        </select>
                    </div>
                    <div className="flex flex-col md:flex-row mb-4">
                        <div className="md:w-1/2 mr-2">
                            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                            <input type="text" id="minPrice" min="500" max="999999" step="1" placeholder="Min" className="w-full h-12 text-center border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50" onChange={(e) => setMinPrice(e.target.value)} />
                        </div>
                        <div className="md:w-1/2">
                            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                            <input type="text" id="maxPrice" min="501" max="1000000" step="1" placeholder="Max" className="w-full h-12 text-center border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50" onChange={(e) => setMaxPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={handleApplyFilter} className="bg-slate-500 hover:bg-slate-600 font-bold text-white px-4 py-2 rounded-sm">
                            Apply Filter
                        </button>
                    </div>
                </div>
            </aside>



            <div className="w-full md:w-5/6 mx-2 px-4 py-4 bg-slate-100"><h1
                className="capitalize font-semibold m-2 text-slate-500 text-3xl">Available Plots</h1>
                <hr className="mr-9 bg-red-500 hover:opacity-80"/>
                    <Plots plots={plots} loading={loading}/>
                    <div className="flex justify-center mt-4">
                        <button onClick={handlePrevPage} disabled={currentPage === 1}
                                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md mr-2 border border-gray-300"> Prev
                        </button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}
                                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-300"> Next
                        </button>
                    </div>
            </div>

        </div>


    );
}

export default Main;
