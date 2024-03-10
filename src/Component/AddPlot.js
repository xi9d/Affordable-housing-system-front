import React from "react";
function AddPlot() {

    return(
        <>
        <div className="max-w-md mx-auto border my-4 px-4 py-4 rounded-md shadow-md">
            <h1 className="text-slate-900 block font-bold text-lg">Add Plot</h1>
            <form className="px-4 py-4">
                <div className="mb-4">
                <label htmlFor="name"
                       className="block text-gray-700 font-semibold mb-2">Plot name</label>
                <input type="text"
                       id="name"
                       name="name"
                       className="w-full px-3 py-2 text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"/>
                </div>

                <div className="mb-4">
                <label htmlFor="desc"
                       className="block text-gray-700 font-semibold mb-2">Description</label>
                <input type="text"
                       id="desc"
                       name="description"
                       className="w-full px-3 py-2 text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"/>
                </div>

                <div className="mb-4">
                {/*Todo: need to change from text to dropdown of singleroom, bedsitter, one bedroom, two bedroom, double room*/}
                <label htmlFor="type"
                       className="block text-gray-700 font-semibold mb-2">Room Type</label>
                <input type="text"
                       id="type"
                       name="type"
                       className="w-full px-3 py-2 text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"/>
                </div>

                <div className="mb-4">
                <label htmlFor="price"
                       className="block text-gray-700 font-semibold mb-2">Price</label>
                <input type="text"
                       id="price"
                       name="price"
                       className="w-full px-3 py-2 text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"/>
                </div>

                <div className="mb-4">
                {/*Todo: need to change this from text to coordinates*/}
                <label htmlFor="location"
                       className="block text-gray-700 font-semibold mb-2">Location</label>
                <input type="text"
                       id="location"
                       name="location"
                       className="w-full px-3 py-2 text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"/>
                </div>

                <div className="mb-4">
                <label htmlFor="image"
                       className="block text-gray-700 font-semibold mb-2">Image</label>
                <input type="file"
                       id="image"
                       name="image"
                       className="w-full px-3 py-2 text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"/>
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Add Plot</button>

            </form>

        </div>

        </>
    )
}
export default AddPlot