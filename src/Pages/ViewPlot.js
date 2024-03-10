import React from 'react';


function ViewPlot({plot}) {
    return (
        <>
            <div>
                <div className='grid grid-rows-1 '>
                    <div className='grid grid-cols-2 mx-10 my-5'>
                        <div>
                            {plot.image && (
                                <img
                                    src={`data:image/png;base64,${plot.image}`}
                                    alt="Product"
                                    className="w-full h-fit object-fill rounded-md"
                                />
                            )}
                        </div>
                        <div className='ml-16'>
                            <h1 className='font-bold text-4xl text-orange-600'>{plot.name}</h1>
                            <h2 className='text-slate-600'>Description</h2>
                            <p className='text-slate-900'>{plot.description}</p>
                            <h2 className='text-slate-600'>Pricing</h2>
                            <p className='text-2xl text-green-600 font-bold'>Now: Ksh {plot.price}</p>
                            <p className="text-gray-800">Room Type: {plot.roomType}</p>
                            <p className="text-gray-800">Availability: {plot.availability}</p>
                            <button>Book Now!</button>
                        </div>
                    </div>

                </div>
            </div>


        </>
    )
}
export default ViewPlot;