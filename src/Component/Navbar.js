// Navbar.js
import React, { useState } from 'react';
import AuthDialog from '../Hooks/AuthDialog';
import backgroundImg from '../Images/mesh.png';
import { useNavigate } from 'react-router-dom';
import Menu from "./Menu";
import { useAuth } from '../Hooks/AuthContext';
import { logout } from "../Service/AccountsService";

function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [authType, setAuthType] = useState(null);
    const { isLoggedIn, userName, setIsLoggedIn, setUserName } = useAuth();
    const navigate = useNavigate();

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

    const handleLogout = async () => {
        try {
            await logout();
            setIsLoggedIn(false);
            setUserName(null);
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error('Error logging out', error);
        }
    };

    const handleProfileClick = () => {
        navigate("/profile");
    };

    const menuItems = [
        { label: 'Home', onClick: handleHomeClick },
        { label: 'Explore', onClick: handleExploreClick },
        { label: isLoggedIn ? 'Profile' : 'Sign Up', onClick: isLoggedIn ? handleProfileClick : handleSignupClick },
        { label: isLoggedIn ? 'Logout' : 'Log In', onClick: isLoggedIn ? handleLogout : handleLoginClick },
        { label: 'About', onClick: handleAboutClick }
    ];

    return (
        <div className="relative bg-gray-200 text-gray-800 shadow-lg">
            <div className="absolute inset-0 bg-contain bg-center z-0" style={{ backgroundImage: `url(${backgroundImg})`, opacity: 0.5 }}></div>
            <div className="container mx-auto px-4 py-6 relative z-10">
                <div className={`fixed top-0 right-0 h-full bg-gray-200 text-gray-800 w-64 py-6 transition-transform transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-between items-center mb-6 px-4">
                        <div className="text-xl font-bold">{isLoggedIn ? (userName) : ('Menu')}</div>
                        <button onClick={handleCloseSidebar} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <Menu items={menuItems} onItemClick={handleItemClick} />
                </div>
                <nav className="flex justify-between items-center">
                    <div>
                        <h1 onClick={handleHomeClick} className="text-3xl font-bold flex items-center cursor-pointer">
                            JAWABU
                        </h1>
                        <p className="mt-1 text-sm">
                            Find your ideal home in Kenya with ease.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Search"
                            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400 shadow-sm transition duration-300 ease-in-out placeholder-gray-500 text-gray-700"
                        />
                        <button onClick={handleSidebarToggle} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out">
                            {isLoggedIn ? userName : 'Menu'}
                        </button>
                        <AuthDialog isOpen={dialogOpen} onClose={handleCloseDialog} type={authType} />
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
