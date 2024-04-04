import React, { useState } from 'react';

function SearchForm({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleOnChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center rounded-md border border-gray-300 shadow-sm">
            <input
                type="search"
                className="flex-auto px-4 py-2 text-gray-700 bg-white border-none focus:outline-none"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
                onChange={handleOnChange}
            />
            {/* Search icon */}
            <button
                type="submit"
                className="flex items-center justify-center px-4 py-2 bg-slate-500 text-white hover:bg-slate-600 focus:outline-none focus:bg-blue-600"
                id="button-addon2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6"
                >
                    <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </form>





    );
}

export default SearchForm;
