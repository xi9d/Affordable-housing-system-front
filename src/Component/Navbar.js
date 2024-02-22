import React from 'react';

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Affordable House Hunting System
          </h1>
          <p className="mt-2 text-lg">
            Find your ideal home in Kenya with ease.
          </p>
        </div>
        <div>
          {/* Add your additional information or button here */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Explore Now
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
