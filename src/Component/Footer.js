import React from 'react';

function Footer() {
  return (
      <footer className="bg-gray-200 py-6">
        <div className="container mx-auto px-4 flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            <a href="#" className="text-gray-800 hover:text-white transition duration-300">
              Twitter
            </a>
            <a href="#" className="text-gray-800 hover:text-white transition duration-300">
              Facebook
            </a>
            <a href="#" className="text-gray-800 hover:text-white transition duration-300">
              Instagram
            </a>
          </div>
          <p className="text-sm text-gray-500">&copy; 2024 Paul Webo. All rights reserved.</p>
        </div>
      </footer>

  );
}

export default Footer;
