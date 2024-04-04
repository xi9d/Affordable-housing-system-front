import React, { useState, useEffect } from 'react';
import AuthDialog from '../Hooks/AuthDialog';
import backgroundImg from '../Images/mesh.png';
import { useNavigate } from 'react-router-dom';
import Menu from "./Menu";
import { useAuth } from '../Hooks/AuthContext';
import SearchForm from './SearchForm';
import PlotService from "../Service/PlotService";
import {useController} from "../Hooks/ControllerProvider"

function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [authType, setAuthType] = useState(null);
    const { isLoggedIn, userName, setIsLoggedIn, setUserName } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    useEffect(() => {



        const token = sessionStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            setUserName(sessionStorage.getItem("username"));
        } else {
            setIsLoggedIn(false);
            setUserName(null);
        }
        setLoading(false);
    }, [setIsLoggedIn, setUserName]);

    const handleSignupClick = () => {
        setDialogOpen(true);
        setAuthType('signup');
        handleCloseSidebar();
    };

    const handleLoginClick = () => {
        setDialogOpen(true);
        setAuthType('login');
        handleCloseSidebar();
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleCloseSidebar = () => {
        setSidebarOpen(false);
    };

    const handleItemClick = (item) => {
        item.onClick();
        handleCloseSidebar();
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleExploreClick = () => {
        navigate('/main');
    };

    const handleAboutClick = () => {
        navigate('/about');
    };
    const handleContactClick = () =>{
        navigate('/contact');
    }
    const handleLogout = async () => {
        try {
            setIsLoggedIn(false);
            setUserName(null);
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("name");
            navigate('/');
        } catch (error) {
            console.error('Error logging out', error);
        }
    };

    const handleProfileClick = () => {
        const id = sessionStorage.getItem("id");
        navigate(`/profile?id=${id}`);
    };

    const handleSearchSubmit = async (searchTerm) => {
        try {
            const response = await PlotService.searchPlots(searchTerm);
            navigate(`/main?query=${searchTerm}`, { state: { tPlots: response.data } });
        } catch (error) {
            console.error("Error search submission", error);
        }
    };

    const menuItems = [
        { label: 'Home', onClick: handleHomeClick },
        { label: 'Explore', onClick: handleExploreClick },
        { label: isLoggedIn ? 'Profile' : 'Sign Up', onClick: isLoggedIn ? handleProfileClick : handleSignupClick },
        { label: isLoggedIn ? 'Logout' : 'Log In', onClick: isLoggedIn ? handleLogout : handleLoginClick },
        { label: 'About', onClick: handleAboutClick },
        { label: 'Contact Us', onClick: handleContactClick }
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (

        <div className="relative bg-gray-100 text-slate-800 shadow-lg">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-contain bg-center z-0"
                style={{
                    backgroundImage: `url(${backgroundImg})`,
                    opacity: 1,
                }}
            ></div>

            {/* Header Content */}
            <div className="container mx-auto px-4 py-6 relative z-10">
                {/* Sidebar */}
                <div
                    className={`fixed top-0 right-0 h-full bg-gray-300 text-gray-800 w-64 py-6 transition-transform transform ${
                        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    style={{ zIndex: 1000 }}
                >
                    {/* Increase the z-index */}
                    <div className="flex justify-between items-center mb-6 px-4">
                        <div className="text-xl font-bold">
                            {isLoggedIn ? userName : 'Menu'}
                        </div>
                        <button
                            onClick={handleCloseSidebar}
                            className="text-slate-500 hover:text-slate-700 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            <span className="sr-only">Close sidebar</span>
                        </button>
                    </div>
                    <Menu items={menuItems} onItemClick={handleItemClick} />
                </div>

                {/* Main Header */}
                <nav className="flex justify-between items-center relative z-10">
                    {/* Increase the z-index */}
                    <div>
                        <h1
                            onClick={handleHomeClick}
                            className="text-3xl font-bold flex items-center cursor-pointer text-slate-600"
                        >
                            Luxury Homes
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Find your ideal home in Kenya with ease.
                        </p>
                    </div>

                    {/* Search Form and Menu Button */}
                    <div className="flex items-center space-x-4">
                        <SearchForm onSearch={handleSearchSubmit} />
                        <button
                            onClick={handleSidebarToggle}
                            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-sm shadow-md transition duration-300 ease-in-out"
                        >
                            {isLoggedIn ? userName : 'Menu'}
                        </button>
                        <AuthDialog
                            isOpen={dialogOpen}
                            onClose={handleCloseDialog}
                            type={authType}
                        />
                    </div>
                </nav>
            </div>
        </div>



    );
}

export default Navbar;
