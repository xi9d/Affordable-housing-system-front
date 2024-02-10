import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold">
            Affordable House Hunting System
          </h1>
          <p className="mt-2 text-lg">
            Find your ideal home in Kenya with ease.
          </p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Explore Available Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="./images/bedsitter.jpg"
                alt="Single Room"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Single Room
                </h3>
                <p className="text-gray-600">
                  Find affordable single room accommodations.
                </p>
              </div>
              
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
                src="./images/singlerooms.jpg"
                alt="Double Room"
                className="w-full h-64 object-cover"
            />
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Double Room
                </h3>
                <p className="text-gray-600">
                Explore comfortable double room accommodations.
                </p>
            </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
                src="/src/images/singlerooms.jpg"
                alt="Bedsitter"
                className="w-full h-64 object-cover"
            />
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Bedsitter
                </h3>
                <p className="text-gray-600">
                Discover cozy bedsitter options for your convenience.
                </p>
            </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
                src="/src/images/singlerooms.jpg"
                alt="One Bedroom"
                className="w-full h-64 object-cover"
            />
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                One Bedroom
                </h3>
                <p className="text-gray-600">
                Find spacious one-bedroom apartments within your budget.
                </p>
            </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="./images/singlerooms.jpg"
                alt="Two Bedroom"
                className="w-full h-64 object-cover"
            />
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
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
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg">
            Our system makes house hunting simple:
          </p>
          <ol className="list-decimal list-inside mt-4 text-gray-800">
            <li>Browse available properties.</li>
            <li>Filter by type, location, and price.</li>
            <li>Contact the landlord directly.</li>
          </ol>
        </section>
        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Get Started Today
          </h2>
          <p className="text-gray-600 text-lg">
            Start your journey to finding the perfect home now.
          </p>
          <button className="bg-blue-900 text-white px-8 py-4 mt-6 rounded-lg shadow-md hover:bg-blue-800 transition duration-300">
            Browse Properties
          </button>
        </section>
      </main>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; 2024 Affordable House Hunting System</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
