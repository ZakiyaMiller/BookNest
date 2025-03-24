import React, { useState, useEffect, useRef } from "react";
import bannerImgLight from "../assets/bannerImgLight.png";
import bannerImgDark from "../assets/bannerImgDark.png";

function Banner() {
    const [currentBanner, setCurrentBanner] = useState(bannerImgLight);
    const [fade, setFade] = useState(false);
    const currentBannerRef = useRef(currentBanner);
    useEffect(() => {
        currentBannerRef.current = currentBanner;
    }, [currentBanner]);

    useEffect(() => {
        const updateBanner = () => {
            const theme = document.documentElement.getAttribute("data-theme");
            const newBanner = theme === "business" ? bannerImgDark : bannerImgLight;
            if (newBanner !== currentBannerRef.current) {
                setFade(true);
                setTimeout(() => {
                    setCurrentBanner(newBanner);
                    setFade(false);
                }, 350);
            }
        };

        updateBanner();
        // Observe theme changes
        const observer = new MutationObserver(updateBanner);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
                <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
                    <div className="space-y-8">
                        {/* Adjusted text sizes: make the welcome message smaller and the tagline larger */}
                        <span className="text-base md:text-xl font-bold">
                            Welcome to BookNest!<br />
                            <br />
                        </span>
                        {/* Updated container to vertically stack texts with spacing */}
                        <div className="flex flex-col space-y-10">
                            <span className="text-2xl md:text-5xl text-gray-700 italic dark:text-gray-300">
                                Where stories breathe life and dreams take flight!
                            </span>
                            <span className="text-lg md:text-xl dark:text-gray-300">
                                Discover bestsellers, timeless classics, and hidden gems that ignite your imagination. Whether you're a fiction lover, a knowledge seeker, or an adventure enthusiast, we have the perfect book for you.
                            </span>
                            {/* Add search bar and button here */}
                            <div className="flex gap-2 max-w-md">
                                <label className="input input-bordered flex items-center gap-2 flex-1">
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
                                    <input type="text" className="grow outline-none rounded-md px-1 dark:bg-slate-900 dark:text-white" placeholder="Search for books..." />
                                </label>
                                <button className="bg-gray-700 text-white px-4 py-2 text-sm rounded-md hover:bg-gray-600 transition duration-200">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-1 w-full mt-20 md:w-1/2">
                    <img
                        src={currentBanner}
                        alt="Banner"
                        className="md:w-[550px] md:h-[460px] md:ml-12"
                        style={{ opacity: fade ? 0 : 1, transition: "opacity 0.5s ease" }}
                    />
                </div>
            </div>
        </>
    );
}

export default Banner;