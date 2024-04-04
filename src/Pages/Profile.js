import React, { useState, useEffect } from 'react';
import PlotService from "../Service/PlotService";
import { toast, ToastContainer } from 'react-toastify';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Hooks/AuthContext";
import AccountsService, {logout} from "../Service/AccountsService";
import Logo from "../Images/Logo2.png"
import AdminService from "../Service/AdminService";

function Profile() {
    const [isPlotOwner, setIsPlotOwner]= useState(false);
    const [isAdmin, setIsAdmin] =useState(false);
    const { userName,setUserName } = useAuth();
    const id = sessionStorage.getItem("id");
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [telephone,setTelephone]= useState("");
    const [ownerPlot, setOwnerPlot] = useState(0)
    const [plots, setPlots] = useState(0);
    const [owners, setOwners] = useState(0);
    const [clients,setClients] = useState(0);


    const editLoggedInUser = async () => {
      try {
          let response = null;
          if (isPlotOwner){
         response= await AccountsService.editPlotOwner(name,email,password, telephone);
          }else if(isAdmin){
             response=  await AccountsService.editAdmin(name,email,password,telephone);
          }else{
           response= await AccountsService.editClient(name,email,password);
          }
          if (response !== null){
              setUserName(response.data.name);
          }
      }catch (err){
          console.log("Error edditing logged in user", err);
      }
    }
    const fetchPlotOwnerDetails = async () => {
        try {
           const res = await PlotService.getPlotOwnerDetails(id);
            const role = sessionStorage.getItem("role");
            if (role === "PLOT-OWNER"){
                setIsPlotOwner(true)
                setIsAdmin(false)
            }else if (role === "ADMIN"){
                setIsAdmin(true);
                setIsPlotOwner(false);
            }else{
                setIsPlotOwner(false);
                setIsAdmin(false);
            }
            setName((res.data).name);
            setEmail((res.data).email);
            setTelephone((res.data).telephone)

        } catch (error) {
            toast.error('Error fetching plot owner details:',error.message)

        }
    };

    useEffect(() => {
        fetchPlotOwnerDetails();
        handleGetTotalOwnerPlots();
    }, []);

    const handleAddPlot =()=>{
        const id=sessionStorage.getItem("id");
        navigate(`/addPlot?user-id=${id}`)
    }

    const handleAdminDashboard = () =>{
        const id = sessionStorage.getItem("id");
        navigate(`/dashboard?id=${id}`);
    }
    const handleGetTotalOwnerPlots = async () =>{
        const id = sessionStorage.getItem("id");
        try {
            const res = await PlotService.getPlotByPlotOwnerId(id);
            setOwnerPlot(res.data.length);
            const pts = await AdminService.getTotalNumberPlots();
            setPlots(pts.data.length);
            const own = await AdminService.getTotalNumberPlotOwner();
            setOwners(own.data.length);
            const cli = await AdminService.getTotalNumberClient();
            setClients(cli.data.length);
        }catch (err){
            console.log("Couldnt fetch total number if plots")
        }

    }

     const handleDeleteAccount = () =>{
        console.log("delete account");
        logout();
        navigate("/");
     }

    return (

        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <div className="bg-white px-8 py-6">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 capitalize">
                        {userName}
                        {isPlotOwner && (
                            <span className="inline-block bg-green-200 text-green-800 font-medium px-2 py-0.5 rounded ml-2">
                        Landlord
                    </span>
                        )}
                        {isAdmin && (
                            <span className="inline-block bg-yellow-200 text-yellow-800 font-medium px-2 py-0.5 rounded ml-2">
                        Admin
                    </span>
                        )}
                    </h2>
                    <p className="text-gray-600 mt-2">Edit your profile information</p>
                </div>
            </div>

            <hr className="border-gray-300" />

            {isPlotOwner && (
                <div className="bg-white border rounded-sm  px-8 py-6 flex flex-col items-center md:flex-row md:items-stretch md:justify-between">
                    <div className="flex flex-col space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800 capitalize mb-2">Analytics</h3>
                        <p className="text-gray-700">Number of plots: {ownerPlot}</p>
                    </div>
                    <div className="mt-6 m-2 flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center">
                        <button
                            onClick={handleAddPlot}
                            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Add Plot
                        </button>
                        <button
                            onClick={() => navigate("/available/set")}
                            className="bg-white hover:bg-gray-100 text-slate-700 font-semibold py-2 px-6 rounded-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            View Plots
                        </button>
                    </div>
                </div>


            )}

            {isAdmin && (
                <div className="bg-white px-8 py-6">
                    <div className="container mx-auto flex items-center justify-between">
                        <div className="flex flex-col space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800 capitalize">Admin Stats:</h2>
                            <div className="flex items-center space-x-8">
                                <div>
                                    <span className="text-3xl font-bold text-gray-700">{plots}</span>
                                    <span className="text-sm font-semibold text-gray-600 ml-2">Plots</span>
                                </div>
                                <div>
                                    <span className="text-3xl font-bold text-gray-700">{owners}</span>
                                    <span className="text-sm font-semibold text-gray-600 ml-2">Landlords</span>
                                </div>
                                <div>
                                    <span className="text-3xl font-bold text-gray-700">{clients}</span>
                                    <span className="text-sm font-semibold text-gray-600 ml-2">Clients</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleAdminDashboard}
                            className="px-6 py-3 text-lg font-semibold rounded-md bg-blue-500 hover:bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Dashboard
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white px-8 py-6">
                <form onSubmit={editLoggedInUser} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-semibold">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md w-full sm:text-sm px-3 py-2 border border-gray-300"
                            name="name"
                            value={name}
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md w-full sm:text-sm px-3 py-2 border border-gray-300"
                            name="email"
                            value={email}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {(isPlotOwner || isAdmin) && (
                        <div>
                            <label htmlFor="telephone" className="block text-gray-700 font-semibold">
                                Telephone
                            </label>
                            <input
                                type="tel"
                                id="telephone"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md w-full sm:text-sm px-3 py-2 border border-gray-300"
                                name="telephone"
                                value={telephone}
                                autoComplete="off"
                                onChange={(e) => setTelephone(e.target.value)}
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-md w-full sm:text-sm px-3 py-2 border border-gray-300"
                            name="password"
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-4 py-2 text-white font-bold rounded-sm bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Update Account
                        </button>
                    </div>
                </form>
            </div>

            <hr className="border-gray-300" />

            {!isAdmin && (
                <div className="bg-white px-8 py-6">
                    <h3 className="text-xl font-semibold text-red-800 capitalize mb-4">Delete Account</h3>
                    <p className="text-gray-600">
                        By pressing this, you are completely wiping out all your information
                        {isPlotOwner
                            ? ' and you are deleting also all plots you added over the period you were with us!!'
                            : ''}
                    </p>
                    <form onSubmit={handleDeleteAccount} className="max-w-md mx-auto text-center my-5">
                        <button
                            type="submit"
                            className="px-4 py-2 text-white font-semibold rounded-md bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Delete Account
                        </button>
                    </form>
                </div>
            )}
        </div>


    );
}

export default Profile;
