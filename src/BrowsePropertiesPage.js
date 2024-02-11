import React, { useState } from 'react';

const BrowsePropertiesPage = () => {
  // Sample data for properties
  const properties = [
    {
      id: 1,
      type: 'Single Room',
      image: '/images/single_room.jpg',
      description: 'Find affordable single room accommodations.',
    },
    {
      id: 2,
      type: 'Double Room',
      image: '/images/double_room.jpg',
      description: 'Explore comfortable double room accommodations.',
    },
    {
      id: 3,
      type: 'Bedsitter',
      image: '/images/bedsitter.jpg',
      description: 'Discover cozy bedsitter options for your convenience.',
    },
    {
      id: 4,
      type: 'One Bedroom',
      image: '/images/one_bedroom.jpg',
      description: 'Find spacious one-bedroom apartments within your budget.',
    },
    {
      id: 5,
      type: 'Two Bedroom',
      image: '/images/two_bedroom.jpg',
      description: 'Browse comfortable two-bedroom homes for your family.',
    },
  ];

  // State for dropdown menu visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle dropdown menu visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-gray-900 text-white py-4 px-8">
        <h1 className="text-3xl font-semibold">Browse Properties</h1>
      </header>
      {/* Search/Filter Bar */}
      <div className="bg-gray-100 py-4 px-8">
        {/* Your search/filter component goes here */}
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="w-3/4">
              <input
                type="text"
                placeholder="Search properties..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-1/4 ml-4">
              {/* Dropdown Filter Button */}
              <div className="relative">
                <button
                  onClick={toggleDropdown} // Toggle dropdown menu visibility on button click
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none"
                >
                  Filter
                </button>
                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-md ${
                    isDropdownOpen ? '' : 'hidden' // Conditionally render hidden class based on dropdown menu visibility
                  }`}
                >
                  <div className="px-4 py-2">
                    {/* Dropdown content */}
                    {/* Add the select elements for location, price, and room type here */}
                    <select className="w-full mb-2 border border-gray-300 rounded-md">
                      <option value="">Select Location</option>
                      {/* Add location options here */}
                      <option value="nairobi">Nairobi</option>
                      <option value="mombasa">Mombasa</option>
                    </select>
                    {/* Price Dropdown */}
                    <select className="w-full mb-2 border border-gray-300 rounded-md">
                      <option value="">Select Price Range</option>
                      {/* Add price range options here */}
                      <option value="0-10000">0 - 10,000</option>
                      <option value="10001-20000">10,001 - 20,000</option>
                      {/* Add more price ranges as needed */}
                    </select>
                    {/* Room Type Dropdown */}
                    <select className="w-full mb-2 border border-gray-300 rounded-md">
                      <option value="">Select Room Type</option>
                      {/* Add room type options here */}
                      <option value="single_room">Single Room</option>
                      <option value="bedsitter">Bedsitter</option>
                      <option value="double_room">Double Room</option>
                      <option value="one_bedroom">One Bedroom</option>
                      <option value="two_bedroom">Two Bedroom</option>
                    </select>
                    {/* Apply Filter Button */}
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full">
                      Apply Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Property List */}
      <div className="container mx-auto py-8">
        <div className="space-y-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex"
            >
              {/* Property Image */}
              <div className="w-1/2">
                <img
                  src={property.image}
                  alt={property.type}
                  className="w-full h-64 object-cover"
                />
              </div>
              {/* Property Details */}
              <div className="w-1/2 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {property.type}
                </h3>
                <p className="text-gray-600">{property.description}</p>
                <a
                  href={`#property-${property.id}`}
                  className="text-blue-600 hover:text-blue-800 mt-2 block"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowsePropertiesPage;
