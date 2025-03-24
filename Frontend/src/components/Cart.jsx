import React from 'react';
import Navbar from './Navbar';
import { useCart } from '../hooks/useCart';

function Cart() {
    const { cart, updateCartItem, loading } = useCart();

    const handleUpdateQuantity = async (bookId, change) => {
        const item = cart.find(item => item.bookId === bookId);
        if (item) {
            const newQuantity = Math.max(0, item.quantity + change);
            await updateCartItem(bookId, newQuantity);
        }
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container mx-auto px-4 py-8 mt-20">
                    Loading cart...
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8 mt-20">
                <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="lg:w-2/3">
                        {cart.map(item => (
                            <div key={item.bookId} className="flex flex-col sm:flex-row items-center gap-4 p-4 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                                <img src={item.image} alt={item.name} className="w-24 h-32 object-cover rounded-md" />
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="font-semibold text-lg dark:text-gray-200">{item.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">₹{item.price}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleUpdateQuantity(item.bookId, -1)} className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">-</button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button onClick={() => handleUpdateQuantity(item.bookId, 1)} className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">+</button>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">₹{item.price * item.quantity}</p>
                                </div>
                            </div>
                        ))}
                        {cart.length === 0 && (
                            <div className="text-center py-8">
                                Your cart is empty
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    {cart.length > 0 && (
                        <div className="lg:w-1/3">
                            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
                                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>₹{total}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Platform Fee</span>
                                        <span>₹50</span>
                                    </div>
                                    <div className="border-t pt-2 mt-2">
                                        <div className="flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>₹{total + 50}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Cart;
