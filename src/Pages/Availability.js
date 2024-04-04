import Logo from "../Images/Logo2.png";
import {useEffect, useState} from "react";
import PlotService from "../Service/PlotService";
import {useNavigate} from "react-router-dom";
import PlotOwnerService from "../Service/PlotOwnerService";

function Availability() {
    const navigate = useNavigate();
    const [plots,setPlots] = useState([]);
    const handleFetchPlotByPlotOwner = async () =>{
        const id = sessionStorage.getItem("id");
        try {
          const res = await PlotService.getPlotByPlotOwnerId(id);
          setPlots(res.data)
        }catch (err){
            console.log("Fetch plots by owner")
        }

    }
    const handleViewPlot = (plotId) => {
        const selectedPlot = plots.find((item) => item.id === plotId);
        if (selectedPlot) {
            navigate(`/view-plot?id=${plotId}`, { state: { viewPlot: selectedPlot } });
        } else {
            console.error("Selected plot not found.");
        }
    };
    const handleDeletePlot =async (id) =>{
        try {
            await PlotService.deletePlotByPlotId(sessionStorage.getItem("id"), id);
            if(plots){
                setPlots((prevElement) =>
                    prevElement.filter((employee) => employee.id !== id))
            }

        }catch (err){
            console.log("Could ot delete the given plot from the system")
        }
    }
    const handleMakeAvailable = async (id) =>{
        try {
            await PlotOwnerService.makeAvailable(id);
        }catch (er){
            console.log("Could not be able to make available")
        }
    }
    const handleMakeUnavailable = async (id) =>{
        try {
            await PlotOwnerService.makeUnavailable(id);
        }catch (er){
            console.log("Could not be able to make available")
        }
    }
    useEffect(()=>{
        handleFetchPlotByPlotOwner();
    },[])
    return (
        <>
            <h1 className="text-slate-600 font-semibold text-2xl m-2 ">{sessionStorage.getItem("username")}'s Rentals</h1>
            <p className="text-slate-900 p-4">This are you personal rental buildings that are found in the system</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5 m-4">
                {plots.map((plot) => (
                    <div
                        key={plot.id}
                        className="border-2 rounded-sm shadow-sm bg-white hover:shadow-lg overflow-hidden"
                    >
                        <div className="relative">
                            <div
                                className={`absolute top-2 right-2 ${
                                    plot.availability === "VACANCY_UNAVAILABLE" ? "bg-red-400" : "bg-green-400"
                                } text-white text-center py-1 px-2 font-semibold transform z-10 rounded`}
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
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <p className="font-semibold text-slate-800 capitalize">
                                Ksh {parseInt(plot.price, 10).toLocaleString("en-US")}
                            </p>

                            <button
                                type="button"
                                className="px-2 py-1 rounded-sm bg-slate-700 hover:bg-slate-800 text-white font-bold"
                                onClick={() =>
                                    plot.availability === "VACANCY_UNAVAILABLE"
                                        ? handleMakeAvailable(plot.id)
                                        : handleMakeUnavailable(plot.id)
                                }
                            >
                                {plot.availability === "VACANCY_UNAVAILABLE" ? "Mark as Available" : "Mark as Unavailable"}
                            </button>
                            <button
                                type="button"
                                className="px-2 py-1 rounded-sm bg-red-700 hover:bg-red-800 text-white font-bold"
                                onClick={() => handleDeletePlot(plot.id)}
                            >
                                Delete Plot
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Availability;