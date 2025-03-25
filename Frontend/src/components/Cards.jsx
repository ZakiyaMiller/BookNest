import React from "react";
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Cards({ item }) {
    const { addToCart } = useCart();
    const [authUser] = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        if (!authUser) {
            navigate('/signup');
            return;
        }
        try {
            await addToCart({
                bookId: item.id,
                name: item.name,
                price: item.price,
                image: item.image
            });
            toast.success('Item added to cart successfully!');
        } catch (error) {
            toast.error('Failed to add item to cart');
        }
    };

    return (
        <div className="p-3 flex justify-center">
            <div className="relative w-72 h-[400px] group overflow-hidden rounded-xl">
                {/* Main Image */}
                <img
                    src={item.image}
                    alt="Book Cover"
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                />

                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/95"></div>

                {/* Content Overlay with enhanced visibility */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform transition-transform duration-300">
                    <div className="space-y-3 drop-shadow-lg">
                        <div className="flex justify-between items-start">
                            <h2 className="font-bold text-lg line-clamp-1 text-shadow-lg">{item.name}</h2>
                            {item.price === 0 && (
                                <div className="badge bg-gray-500 text-white font-semibold shadow-lg rounded-full px-3">
                                    Free
                                </div>
                            )}
                        </div>

                        <p className="text-sm text-white font-medium text-shadow-lg">{item.author}</p>

                        <div className="flex justify-between items-center pt-2">
                            <span className="text-lg font-bold text-shadow-lg">
                                {item.price === 0 ? 'Free' : `₹${item.price}`}
                            </span>

                            <button
                                onClick={handleAddToCart}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 hover:bg-white/40 backdrop-blur-sm transition duration-200 shadow-lg font-medium"
                            >
                                {item.price === 0 ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <span>Read</span>
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span>Add</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cards;