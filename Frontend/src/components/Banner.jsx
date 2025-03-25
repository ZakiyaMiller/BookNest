import React from "react";
import HomeBg1 from "../assets/HomeBg1.mp4";

function Banner() {
    return (
        <div className="relative min-h-screen w-full">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src={HomeBg1} type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 md:px-20">
                <div className="max-w-4xl text-center space-y-8">
                    <span className="text-xl md:text-2xl font-bold">
                        Welcome to BookNest!
                    </span>

                    <h1 className="text-3xl md:text-6xl font-bold italic">
                        Where stories breathe life and dreams take flight!
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                        Discover bestsellers, timeless classics, and hidden gems that ignite your imagination. Whether you're a fiction lover, a knowledge seeker, or an adventure enthusiast, we have the perfect book for you.
                    </p>

                    {/* Search Bar */}
                    <div className="flex gap-2 max-w-md mx-auto mt-8">
                        <label className="input input-bordered flex items-center gap-2 flex-1 bg-white/10 backdrop-blur-sm border-white/20">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input
                                type="text"
                                className="grow bg-transparent outline-none placeholder-white/70"
                                placeholder="Search for books..."
                            />
                        </label>
                        <button className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-md transition duration-200">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;