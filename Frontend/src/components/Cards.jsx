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
        <div className="mt-4 my-3 p-3">
            <div className="card w-72 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border group">

                <figure className="relative overflow-hidden h-[300px]">
                    <img
                        src={item.image}
                        alt="Book Cover"
                        className="h-[300px] w-auto object-cover transition-transform duration-300 ease-in-out hover:scale-120"
                    />
                </figure>

                <div className="card-body p-4">
                    <div className="flex justify-between items-start">
                        <h2 className="card-title text-lg">
                            {item.name}
                        </h2>
                        <div className={`badge ${item.price === 0 ? 'bg-gray-500' : 'bg-gray-700'} text-white`}>
                            {item.category}
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.author}</p>
                    <p className="text-sm line-clamp-2">{item.title}</p>

                    <div className="card-actions justify-between items-center mt-4">
                        <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            {item.price === 0 ? 'Free' : `₹${item.price}`}
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white duration-200 dark:border-gray-400 dark:text-gray-300"
                        >
                            {item.price === 0 ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Read Now
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Add to Cart
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cards;