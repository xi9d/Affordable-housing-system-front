import React from 'react';

function About() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">About Us</h2>
            {/* Introduction */}
            <div className="mb-4">
                <p className="text-gray-600">
                    Welcome to our Affordable House Hunting System! Our platform aims to revolutionize the way individuals discover and secure their dream homes in Kenya. In a country where finding suitable housing can be daunting, we're here to simplify the process and turn your house hunting journey into a seamless experience filled with excitement and possibility.
                </p>
            </div>
            {/* Key Features */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Features:</h3>
                <ul className="list-disc list-inside text-gray-600">
                    <li>User-friendly interface for easy navigation</li>
                    <li>Comprehensive property listings with detailed information and images</li>
                    <li>Advanced search and filter options to tailor results to your preferences</li>
                    <li>Direct communication with landlords for seamless transactions</li>
                    <li>Transparent and reliable process from search to signing</li>
                </ul>
            </div>
            {/* How to Use the System */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How to Use the System:</h3>
                <ol className="list-decimal list-inside text-gray-600">
                    <li>Sign up or log in to your account.</li>
                    <li>Browse available properties using the search bar or filters.</li>
                    <li>Click on a listing to view detailed information and images.</li>
                    <li>Contact landlords directly through our messaging system to arrange viewings or ask questions.</li>
                    <li>Once you find your ideal property, negotiate terms and finalize the rental agreement.</li>
                    <li>Enjoy your new home!</li>
                </ol>
            </div>
            {/* Mission */}
            <div className="mb-4">
                <p className="text-gray-600">
                    At the heart of our platform lies a commitment to empowering you with the tools and resources needed to make well-informed decisions about your housing needs. With intuitive search functionalities and comprehensive property listings enriched with detailed information and vivid imagery, you'll embark on your house hunting journey armed with unparalleled insight and clarity.
                </p>
            </div>
            {/* Conclusion */}
            <div className="mb-4">
                <p className="text-gray-600">
                    Thank you for entrusting us with your housing needs. Together, let's embark on a journey towards finding your perfect home - a place where cherished memories are made, dreams are realized, and new beginnings unfold.
                </p>
            </div>
        </div>
    );
}

export default About;
