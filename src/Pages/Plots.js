import React, { useState } from 'react';

function Plots({ plots, loading }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlots, setFilteredPlots] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState(''); // New state for filter criteria

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterPlots(e.target.value);
  };

  // Function to handle filter button click
  const handleFilterClick = (criteria) => {
    setFilterCriteria(criteria);
    filterPlots(searchQuery, criteria);
  };

  // Function to filter plots based on search query and filter criteria
  const filterPlots = (query, criteria) => {
    let filtered = plots.filter((plot) =>
      plot.nameOfPlot.toLowerCase().includes(query.toLowerCase())
    );

    if (criteria) {
      filtered = filtered.filter((plot) => plot.roomType === criteria);
    }

    setFilteredPlots(filtered);
  };

  const plotsToDisplay = searchQuery || filterCriteria ? filteredPlots : plots;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Available Plots</h1>
      <div className="mb-4 relative">
  <input
    type="text"
    placeholder="Search plots..."
    value={searchQuery}
    onChange={handleSearchChange}
    className="block w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
  />
  <button className="absolute inset-y-0 right-0 px-4 py-2 bg-indigo-500 text-white rounded-r-lg focus:outline-none hover:bg-indigo-600">
    Search
  </button>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plotsToDisplay.map((plot) => (
          <div key={plot.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{plot.nameOfPlot}</h3>
              <p className="mt-2 text-gray-800">Location: {plot.location}</p>
              <p className="text-gray-800">Price: {plot.price}</p>
              <p className="text-gray-800">Room Type: {plot.roomType}</p>
              <p className="text-gray-800">Availability: {plot.availability}</p>
              <p className="text-gray-800">Rate: {plot.rate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plots;
