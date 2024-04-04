import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../Hooks/AuthContext";
import {toast} from "react-toastify";
import PlotService from "../Service/PlotService";
import Logo from "../Images/Logo2.png"


function ViewPlot() {
    const location = useLocation();
    const plot = location.state && location.state.viewPlot;
    const [id, setId] = useState("");
    const {isLoggedIn} = useAuth();
    const [passedComments,setPassedComments] = useState("");
    const [booked, setBooked]= useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (plot) {
            setId(plot.id);
        } else {
            console.error("Plot data not found in route state.");
        }
        fetchComments();
    }, [plot]);
    const fetchComments = async ()=>{
        try {
            const response = await PlotService.getAllCommentsByPlotId(id);
            setPassedComments(response.data)
        }catch (err){
            toast.error("Could not fetch comments")
        }
    }
    const  fetchBooked = async ()=>{
        try {
            const response = await PlotService.checkIfBookedByPlotId(id);
            if (response.data !=null){
                setBooked(true);
            }

        }catch (err){
            console.log("Error fetching book");
        }
    }

    const handleAddComment = async (event) =>{
        event.preventDefault();
        try {
            await PlotService.addCommentByPlotId(id,)
            fetchComments();
        }catch (err){
            toast.error("Error Adding comment");
        }
    }
    const handleGetLandlordDetails = async ()=>{
        try {
            const response = await PlotService.getPlotOwnerDetailsByPlotId(id);
            console.log(response.data)
            navigate(`/view-plot-owner?plot-id=${id}`,{state :{plotOwner: response.data}});
        }catch (err){
            toast.error("Error getting landlord details");
        }
    }
    // {`data:image/png;base64,${plot.image}`}
    return (
        <>
            <div className="container mx-auto px-4 py-8 bg-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="col-span-1">
                        {plot && Logo && (
                            <div className="relative">
                                <img
                                    src={plot.image ? `data:image/png;base64,${plot.image}` : Logo}
                                    alt="Product"
                                    className="w-auto h-auto object-cover rounded-md shadow-lg"
                                />
                                {booked && (
                                    <div
                                        className="absolute top-0 left-0 w-full bg-yellow-200 text-gray-800 text-center py-2 font-bold shadow-md"
                                    >
                                        Booked
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="col-span-1 flex flex-col justify-center">
                        <h1 className="font-bold text-3xl text-gray-900 mb-4">{plot?.name}</h1>
                        <h2 className="text-lg text-gray-700 font-semibold mb-2">Description</h2>
                        <p className="text-base text-gray-600 mb-4">{plot?.description}</p>
                        <h2 className="text-lg text-gray-700 font-semibold mb-2">Pricing</h2>
                        <p className="text-base text-green-600 font-semibold mb-4">Now: Ksh {plot?.price}</p>
                        <div className="flex flex-col space-y-2">
                            <p className="text-base text-gray-600">Room Type: {plot?.roomType}</p>
                            <p className="text-base text-gray-600">Availability: {plot?.availability}</p>
                        </div>
                        <div className="flex space-x-4 mt-4">
                            <button
                                onClick={handleGetLandlordDetails}
                                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md focus:outline-none"
                            >
                                Get Landlord Details
                            </button>
                            {isLoggedIn ? (
                                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-sm focus:outline-none">
                                    Book Now
                                </button>
                            ) : (
                                <p className="p-4 rounded-sm font-bold text-gray-600 text-center bg-gray-200 cursor-no-drop">
                                    Book now
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <hr className="border-gray-400" />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col">
                        <h1 className="capitalize font-bold text-lg text-gray-700 mb-4">Comments</h1>
                        {isLoggedIn && (
                            <form onSubmit={handleAddComment}>
                                <div className="flex items-center">
                                    <label htmlFor="comment" className="mr-2 text-sm font-medium text-gray-700">Add a Comment:</label>
                                    <input type="text" id="comment" className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-blue-400" />
                                    <button type="submit" className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none">Comment</button>
                                </div>
                            </form>
                        )}
                        {passedComments.length > 0 ? (
                            <div className="mt-4">
                                {passedComments.map((comment, index) => (
                                    <div key={index} className="bg-gray-100 p-2 rounded-md mb-2">
                                        <p className="text-gray-800">{comment}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-4 flex items-center">
                                <p className="text-gray-600 mr-2">No comments</p>
                            </div>
                        )}
                    </div>
                </div>
                <hr className="border-gray-400" />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="capitalize font-bold text-lg text-gray-700 mb-4">More like this...</h1>
                </div>
            </div>
        </>



    )
}
export default ViewPlot;
