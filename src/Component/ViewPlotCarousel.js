import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ViewPlotCarousel({ recentPlot, handleViewPlot }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            {recentPlot.map((plot) => (
                <div
                    key={plot.id}
                    className="relative rounded-lg overflow-hidden mx-4 my-6 cursor-pointer transition duration-300 transform hover:scale-105"
                >
                    <img
                        src={`data:image/png;base64,${plot.image}`}
                        alt={plot.name}
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                        loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                        <h3 className="text-xl font-bold text-white mb-2">{plot.name}</h3>
                        <button
                            type="button"
                            className="bg-white text-slate-800 font-semibold py-2 px-4 rounded-md transition duration-300 hover:bg-slate-200"
                            onClick={() => handleViewPlot(plot.id)}
                        >
                            Let's See
                        </button>
                    </div>
                </div>
            ))}
        </Slider>
    );
}

export default ViewPlotCarousel;