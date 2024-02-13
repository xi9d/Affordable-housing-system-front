import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Plots() {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);

  /*useEffect(() => {
    const fetchPlots = async () => {
      try {
        const response = await axios.get('/api/plots'); // Assuming you have an API endpoint for fetching plots
        setPlots(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plots:', error);
      }
    };
    fetchPlots();
  }, []);*/

 /* if (!loading) {
    return <div>Loading...</div>;
  }*/

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Available Plots</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plots.map((plot) => (
          <div key={plot.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={plot.image} // Assuming you have an image URL for each plot
              alt={plot.nameOfPlot}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{plot.nameOfPlot}</h3>
              <p className="text-gray-600">{plot.description}</p>
              <p className="mt-2 text-gray-800">Location: {plot.location}</p>
              <p className="text-gray-800">Price: {plot.price}</p>
              <p className="text-gray-800">Room Type: {plot.roomType}</p>
              <p className="text-gray-800">Availability: {plot.availability}</p>
              <Link to={`/viewplot/${plot.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 inline-block">View Plot</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plots;
