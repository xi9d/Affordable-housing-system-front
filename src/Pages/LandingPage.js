import React from 'react';
import SingleRoom from '../Images/singlerooms.jpg';
import BedSitter from '../Images/bedsitter.jpg';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
 const naviagate = useNavigate();
  const handleAvailablePlots = ()=>{
    naviagate('/main');
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Explore Available Rentals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105">
    <img
      src={SingleRoom}
      alt="Single Room"
      className="w-full h-64 object-cover"
    />
    <div className="p-6">
      <h3 className="text-base font-semibold text-gray-800 mb-2">
        Single Room
      </h3>
      <p className="text-gray-600">
        Find affordable single room accommodations.
      </p>
    </div>
  </div>
  <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105">
    <img
      src={BedSitter}
      alt="Double Room"
      className="w-full h-64 object-cover"
    />
    <div className="p-6">
      <h3 className="text-base font-semibold text-gray-800 mb-2">
        Double Room
      </h3>
      <p className="text-gray-600">
        Explore comfortable double room accommodations.
      </p>
    </div>
  </div>
  <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105">
    <img
      src={SingleRoom}
      alt="Bedsitter"
      className="w-full h-64 object-cover"
    />
    <div className="p-6">
      <h3 className="text-base font-semibold text-gray-800 mb-2">
        Bedsitter
      </h3>
      <p className="text-gray-600">
        Discover cozy bedsitter options for your convenience.
      </p>
    </div>
  </div>
  <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105">
    <img
      src={BedSitter}
      alt="One Bedroom"
      className="w-full h-64 object-cover"
    />
    <div className="p-6">
      <h3 className="text-base font-semibold text-gray-800 mb-2">
        One Bedroom
      </h3>
      <p className="text-gray-600">
        Find spacious one-bedroom apartments within your budget.
      </p>
    </div>
  </div>
  <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105">
    <img
      src={BedSitter}
      alt="Two Bedroom"
      className="w-full h-64 object-cover"
    />
    <div className="p-6">
      <h3 className="text-base font-semibold text-gray-800 mb-2">
        Two Bedroom
      </h3>
      <p className="text-gray-600">
        Browse comfortable two-bedroom homes for your family.
      </p>
    </div>
  </div>
</div>

        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            How It Works
          </h2>
          <p className="text-gray-600 text-base">
            Our system makes house hunting simple:
          </p>
          <ol className="list-decimal list-inside mt-4 text-gray-800">
            <li>Browse available properties.</li>
            <li>Filter by type, location, and price.</li>
            <li>Contact the landlord directly.</li>
          </ol>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Get Started Today
          </h2>
          <p className="text-gray-600 text-base">
            Start your journey to finding the perfect home now. We provice you with a wide range of houses spread across the country.
          </p>
          <button className="bg-blue-900 text-white px-8 py-4 mt-6 rounded-lg shadow-md hover:bg-blue-800 transition duration-300"
          onClick={() =>handleAvailablePlots()}>
            Browse Available Plots
          </button>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
