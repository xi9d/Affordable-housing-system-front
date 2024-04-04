import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlotService from "../Service/PlotService";
import {useNavigate} from "react-router-dom";

function AddPlot() {
    const navigate = useNavigate();
    const [plot, setPlot] = useState({
        name: "",
        description: "",
        type: "",
        price: "",
        location: ""
    });
const [image, setImage] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlot(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];

        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const base64Data = event.target.result.split(',')[1];
                setImage(base64Data);

            };
            reader.readAsDataURL(selectedImage);
        } catch (error) {
            console.error('Error converting image to base64:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name',plot.name );
        formData.append('description', plot.description);
        formData.append('price', plot.price);
        formData.append('location', plot.location);
        formData.append('type', plot.type);
        formData.append('image', image);
        const id = sessionStorage.getItem("id");
        if (!id) {
            console.error('Missing owner ID in session storage');
            return;
        }
        try {
          await PlotService.addPlotByPlotOwnerId(id, formData);
            navigate(`/profile?id=${id}`)
            toast.success('Plot added successfully!');
        } catch (error) {
            toast.error('Error adding plot:', error.message );
        }
    };


    return (
        <>
            <div className="max-w-md mx-auto border my-4 px-8 py-6 rounded-md shadow-md">
                <h1 className="text-slate-900 block font-bold text-lg mb-6">Add Plot</h1>
                <ToastContainer />
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Plot information section */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Plot name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-4 py-2 text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="desc" className="block text-gray-700 font-semibold mb-2">Description</label>
                            <input
                                type="text"
                                id="desc"
                                name="description"
                                className="w-full px-4 py-2 text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                className="w-full px-4 py-2 text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-gray-700 font-semibold mb-2">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                className="w-full px-4 py-2 text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-gray-700 font-semibold mb-2">Room Type</label>
                            <select
                                id="type"
                                name="type"
                                value={plot.type}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            >
                                <option value="">Select room type</option>
                                <option value="single room">Single Room</option>
                                <option value="double room">Double Room</option>
                                <option value="bedsitter">Bedsitter</option>
                                <option value="one bedroom">One Bedroom</option>
                                <option value="two bedroom">Two Bedroom</option>
                            </select>
                        </div>
                    </div>
                    {/* Image upload section with clever preview */}
                    <div className="relative w-full">
                        <label
                            htmlFor="image"
                            className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <div className="absolute inset-0 flex items-center justify-center w-full h-full">
                                {image ? (
                                    <img
                                        src={`data:image/png;base64,${image}`}
                                        alt="Plot Preview"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <span className="text-gray-500">Upload Plot Image</span>
                                )}
                            </div>
                            <input type="file" id="image" name="image" className="hidden" onChange={handleImageChange} />
                        </label>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md">
                        Add Plot
                    </button>
                </form>
            </div>

        </>

    )
}

export default AddPlot;
