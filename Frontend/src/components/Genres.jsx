import React from 'react';

function Genres() {
    const genres = [
        "Fiction",
        "Fantasy",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Self-Help",
        "Non-Fiction"
    ];

    return (
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 my-8">
            <div className="flex flex-wrap justify-center gap-4">
                {genres.map((genre) => (
                    <button
                        key={genre}
                        className="px-6 py-2 rounded-full border-2 border-gray-600 text-gray-600 
                                 hover:bg-gray-600 hover:text-white transition duration-200 text-sm"
                    >
                        {genre}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Genres;
