import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6 flex flex-col items-center">
        <p className="text-lg font-semibold mb-2">Lets stay Connected</p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">
            Twitter
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">
            Pauls Facebook
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">
            Instagram
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-500">&copy; 2024 Paul Webo. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
