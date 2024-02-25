import React, { useState } from 'react';
import AuthDialog from '../Hooks/AuthDialog';
import backgroundImg from '../Images/mesh.png';

function Navbar() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [authType, setAuthType] = useState(null);

  const handleSignupClick = () => {
    setDialogOpen(true);
    setAuthType('signup');
  };

  const handleLoginClick = () => {
    setDialogOpen(true);
    setAuthType('login');
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <nav className="relative bg-gray-900 text-white shadow-lg">
      <div className="absolute inset-0 bg-contain bg-center z-0" style={{ backgroundImage: `url(${backgroundImg})`, opacity: 0.5 }}></div>
      <div className="container mx-auto px-4 py-6 relative z-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Affordable House Hunting System
          </h1>
          <p className="mt-2 text-lg">
            Find your ideal home in Kenya with ease.
          </p>
        </div>
        <div className="flex items-center space-x-4 ">
          <button className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md">
            Explore Now
          </button>
          <button onClick={handleSignupClick} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Sign Up
          </button>
          <button onClick={handleLoginClick} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Log In
          </button>
          <AuthDialog isOpen={dialogOpen} onClose={handleCloseDialog} type={authType} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
